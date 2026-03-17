import { useReducer, useCallback } from "react";
import { ELEMENT_REGISTRY, DEFAULT_SECTION } from "../constants/elements";
import { deepClone } from "../utils/serializer";
import { generateId } from "../utils/idGen";

// ─── Action Types ─────────────────────────────────────────────────────────────
export const A = {
  SET_PAGE:          "SET_PAGE",
  ADD_SECTION:       "ADD_SECTION",
  UPDATE_SECTION:    "UPDATE_SECTION",
  DELETE_SECTION:    "DELETE_SECTION",
  REORDER_SECTIONS:  "REORDER_SECTIONS",
  ADD_ELEMENT:       "ADD_ELEMENT",
  UPDATE_ELEMENT:    "UPDATE_ELEMENT",
  DELETE_ELEMENT:    "DELETE_ELEMENT",
  REORDER_ELEMENTS:  "REORDER_ELEMENTS",
};

// ─── Deep helpers ─────────────────────────────────────────────────────────────
const mapSections = (page, sectionId, fn) => ({
  ...page,
  sections: page.sections.map((s) => (s.id === sectionId ? fn(s) : s)),
});

const updateElDeep = (elements, elId, fn) =>
  elements.map((el) => {
    if (el.id === elId) return fn(el);
    if (el.type === "columns")
      return { ...el, children: el.children.map((col) => updateElDeep(col, elId, fn)) };
    return el;
  });

const removeElDeep = (elements, elId) =>
  elements
    .filter((el) => el.id !== elId)
    .map((el) =>
      el.type === "columns"
        ? { ...el, children: el.children.map((col) => removeElDeep(col, elId)) }
        : el
    );

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, { type, payload }) {
  switch (type) {
    case A.SET_PAGE:
      return { ...state, page: payload.page };

    case A.ADD_SECTION: {
      const section = { ...deepClone(DEFAULT_SECTION), id: generateId() };
      return { ...state, page: { ...state.page, sections: [...state.page.sections, section] } };
    }

    case A.UPDATE_SECTION:
      return {
        ...state,
        page: { ...state.page, sections: state.page.sections.map((s) => s.id === payload.section.id ? payload.section : s) },
      };

    case A.DELETE_SECTION:
      return {
        ...state,
        page: { ...state.page, sections: state.page.sections.filter((s) => s.id !== payload.sectionId) },
      };

    case A.REORDER_SECTIONS: {
      const secs = [...state.page.sections];
      const fi = secs.findIndex((s) => s.id === payload.fromId);
      const ti = secs.findIndex((s) => s.id === payload.toId);
      const [m] = secs.splice(fi, 1);
      secs.splice(ti, 0, m);
      return { ...state, page: { ...state.page, sections: secs } };
    }

    case A.ADD_ELEMENT: {
      const { sectionId, colIdx, elementType } = payload;
      const el = { id: generateId(), type: elementType, ...deepClone(ELEMENT_REGISTRY[elementType].defaults) };
      return {
        ...state,
        page: mapSections(state.page, sectionId, (s) => {
          if (colIdx == null) return { ...s, elements: [...s.elements, el] };
          return {
            ...s,
            elements: s.elements.map((e) =>
              e.type === "columns"
                ? { ...e, children: e.children.map((col, ci) => ci === colIdx ? [...col, el] : col) }
                : e
            ),
          };
        }),
        lastAddedElId: el.id,
      };
    }

    case A.UPDATE_ELEMENT: {
      const { sectionId, updatedEl } = payload;
      return {
        ...state,
        page: mapSections(state.page, sectionId, (s) => ({
          ...s,
          elements: updateElDeep(s.elements, updatedEl.id, () => updatedEl),
        })),
      };
    }

    case A.DELETE_ELEMENT: {
      const { sectionId, elId } = payload;
      return {
        ...state,
        page: mapSections(state.page, sectionId, (s) => ({
          ...s,
          elements: removeElDeep(s.elements, elId),
        })),
      };
    }

    case A.REORDER_ELEMENTS: {
      const { sectionId, fromId, toId } = payload;
      return {
        ...state,
        page: mapSections(state.page, sectionId, (s) => {
          const els = [...s.elements];
          const fi = els.findIndex((e) => e.id === fromId);
          const ti = els.findIndex((e) => e.id === toId);
          if (fi === -1 || ti === -1) return s;
          const [m] = els.splice(fi, 1);
          els.splice(ti, 0, m);
          return { ...s, elements: els };
        }),
      };
    }

    default:
      return state;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useBuilderStore(initialPage) {
  const [state, dispatch] = useReducer(reducer, { page: initialPage, lastAddedElId: null });

  return {
    page:           state.page,
    lastAddedElId:  state.lastAddedElId,
    setPage:        useCallback((page) => dispatch({ type: A.SET_PAGE, payload: { page } }), []),
    addSection:     useCallback(() => dispatch({ type: A.ADD_SECTION }), []),
    updateSection:  useCallback((section) => dispatch({ type: A.UPDATE_SECTION, payload: { section } }), []),
    deleteSection:  useCallback((sectionId) => dispatch({ type: A.DELETE_SECTION, payload: { sectionId } }), []),
    reorderSections:useCallback((fromId, toId) => dispatch({ type: A.REORDER_SECTIONS, payload: { fromId, toId } }), []),
    addElement:     useCallback((sectionId, colIdx, elementType) => dispatch({ type: A.ADD_ELEMENT, payload: { sectionId, colIdx, elementType } }), []),
    updateElement:  useCallback((sectionId, updatedEl) => dispatch({ type: A.UPDATE_ELEMENT, payload: { sectionId, updatedEl } }), []),
    deleteElement:  useCallback((sectionId, elId) => dispatch({ type: A.DELETE_ELEMENT, payload: { sectionId, elId } }), []),
    reorderElements:useCallback((sectionId, fromId, toId) => dispatch({ type: A.REORDER_ELEMENTS, payload: { sectionId, fromId, toId } }), []),
  };
}
