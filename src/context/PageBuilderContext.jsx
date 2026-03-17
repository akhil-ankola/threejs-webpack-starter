import { createContext, useContext, useState, useRef } from "react";
import { initPages, mkEl, mkPage, mkSection } from "../utils/factories";

// ─────────────────────────────────────────────────────────────
// CONTEXT CREATION
// ─────────────────────────────────────────────────────────────
const PageBuilderContext = createContext(null);

// ─────────────────────────────────────────────────────────────
// PROVIDER
// Owns all state. Exports a clean action API consumed via hook.
// ─────────────────────────────────────────────────────────────
export function PageBuilderProvider({ children }) {
  // ── Core data ──
  const [pages, setPages] = useState(initPages);

  // ── Selection ──
  const [selPageId, setSelPageId] = useState(null);
  const [selSectionId, setSelSectionId] = useState(null);
  const [selElInfo, setSelElInfo] = useState(null); // { elId, sectionId, colIdx }

  // ── UI state ──
  const [sideTab, setSideTab] = useState("pages");
  const [showElPicker, setShowElPicker] = useState(null); // { sectionId, colIdx }
  const [showNewPage, setShowNewPage] = useState(false);
  const [newPageInput, setNewPageInput] = useState("");

  // ── Drag: elements ──
  const elDragRef = useRef(null); // { elId, sectionId, colIdx }
  const [dragOverElId, setDragOverElId] = useState(null);

  // ── Drag: sections ──
  const secDragRef = useRef(null);
  const [secDragOver, setSecDragOver] = useState(null);

  // ─────────────────────────────────────────────────────────────
  // DERIVED STATE
  // ─────────────────────────────────────────────────────────────
  const selPage = pages.find((p) => p.id === selPageId) || null;
  const selSection = selPage?.sections.find((s) => s.id === selSectionId) || null;

  /** Finds a selected element, supports nested columns */
  const findElInPage = (page, elId) => {
    for (const sec of page.sections) {
      const el = sec.elements.find((e) => e.id === elId);
      if (el) return { el, section: sec, colIdx: null };
      for (const e of sec.elements) {
        if (e.type === "columns") {
          for (let ci = 0; ci < e.children.length; ci++) {
            const cel = e.children[ci].find((x) => x.id === elId);
            if (cel) return { el: cel, section: sec, colIdx: ci, colEl: e };
          }
        }
      }
    }
    return null;
  };

  const selElFound = selElInfo && selPage ? findElInPage(selPage, selElInfo.elId) : null;
  const selEl = selElFound?.el || null;

  // ─────────────────────────────────────────────────────────────
  // PAGE ACTIONS
  // ─────────────────────────────────────────────────────────────
  const selectPage = (id) => {
    setSelPageId(id);
    setSelSectionId(null);
    setSelElInfo(null);
    setSideTab("layers");
  };

  const addPage = () => {
    if (!newPageInput.trim()) return;
    const page = mkPage(newPageInput);
    setPages((prev) => [...prev, page]);
    setNewPageInput("");
    setShowNewPage(false);
    selectPage(page.id);
  };

  // ─────────────────────────────────────────────────────────────
  // SECTION ACTIONS
  // ─────────────────────────────────────────────────────────────
  const addSection = () => {
    const s = mkSection();
    setPages((prev) =>
      prev.map((p) =>
        p.id !== selPageId ? p : { ...p, sections: [...p.sections, s] }
      )
    );
    setSelSectionId(s.id);
    setSelElInfo(null);
  };

  const updateSection = (sec) =>
    setPages((prev) =>
      prev.map((p) =>
        p.id !== selPageId
          ? p
          : { ...p, sections: p.sections.map((s) => (s.id === sec.id ? sec : s)) }
      )
    );

  const deleteSection = (id) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id !== selPageId
          ? p
          : { ...p, sections: p.sections.filter((s) => s.id !== id) }
      )
    );
    if (selSectionId === id) {
      setSelSectionId(null);
      setSelElInfo(null);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // ELEMENT ACTIONS
  // ─────────────────────────────────────────────────────────────
  const handleAddEl = (sectionId, colIdx) =>
    setShowElPicker({ sectionId, colIdx });

  const pickElement = (type) => {
    if (!showElPicker) return;
    const { sectionId, colIdx } = showElPicker;
    const el = mkEl(type);

    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== selPageId) return p;
        return {
          ...p,
          sections: p.sections.map((s) => {
            if (s.id !== sectionId) return s;
            // Top-level element
            if (colIdx === null) return { ...s, elements: [...s.elements, el] };
            // Inside a columns widget
            return {
              ...s,
              elements: s.elements.map((e) => {
                if (e.type !== "columns") return e;
                return {
                  ...e,
                  children: e.children.map((col, ci) =>
                    ci === colIdx ? [...col, el] : col
                  ),
                };
              }),
            };
          }),
        };
      })
    );

    setSelElInfo({ elId: el.id, sectionId, colIdx });
    setSelSectionId(sectionId);
    setShowElPicker(null);
  };

  const updateEl = (updated) => {
    const info = selElInfo;
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== selPageId) return p;
        return {
          ...p,
          sections: p.sections.map((s) => {
            if (s.id !== info.sectionId) return s;
            if (info.colIdx === null)
              return {
                ...s,
                elements: s.elements.map((e) =>
                  e.id === updated.id ? updated : e
                ),
              };
            return {
              ...s,
              elements: s.elements.map((e) => {
                if (e.type !== "columns") return e;
                return {
                  ...e,
                  children: e.children.map((col, ci) =>
                    ci === info.colIdx
                      ? col.map((ce) => (ce.id === updated.id ? updated : ce))
                      : col
                  ),
                };
              }),
            };
          }),
        };
      })
    );
  };

  const deleteEl = () => {
    const info = selElInfo;
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== selPageId) return p;
        return {
          ...p,
          sections: p.sections.map((s) => {
            if (s.id !== info.sectionId) return s;
            if (info.colIdx === null)
              return {
                ...s,
                elements: s.elements.filter((e) => e.id !== info.elId),
              };
            return {
              ...s,
              elements: s.elements.map((e) => {
                if (e.type !== "columns") return e;
                return {
                  ...e,
                  children: e.children.map((col, ci) =>
                    ci === info.colIdx
                      ? col.filter((ce) => ce.id !== info.elId)
                      : col
                  ),
                };
              }),
            };
          }),
        };
      })
    );
    setSelElInfo(null);
  };

  // ─────────────────────────────────────────────────────────────
  // DRAG ACTIONS
  // ─────────────────────────────────────────────────────────────
  const handleDragEl = () => {
    setDragOverElId(null);
    elDragRef.current = null;
  };

  const handleDragSection = () => {
    if (
      secDragRef.current &&
      secDragOver &&
      secDragRef.current !== secDragOver
    ) {
      setPages((prev) =>
        prev.map((p) => {
          if (p.id !== selPageId) return p;
          const secs = [...p.sections];
          const fi = secs.findIndex((s) => s.id === secDragRef.current);
          const ti = secs.findIndex((s) => s.id === secDragOver);
          const [moved] = secs.splice(fi, 1);
          secs.splice(ti, 0, moved);
          return { ...p, sections: secs };
        })
      );
    }
    secDragRef.current = null;
    setSecDragOver(null);
  };

  // ─────────────────────────────────────────────────────────────
  // CONTEXT VALUE
  // ─────────────────────────────────────────────────────────────
  const value = {
    // State
    pages,
    selPageId,
    selPage,
    selSectionId,
    selSection,
    selElInfo,
    selEl,
    sideTab,
    showElPicker,
    showNewPage,
    newPageInput,
    dragOverElId,
    secDragOver,
    elDragRef,
    secDragRef,

    // Setters (UI / selection)
    setSideTab,
    setSelSectionId,
    setSelElInfo,
    setShowElPicker,
    setShowNewPage,
    setNewPageInput,
    setDragOverElId,
    setSecDragOver,

    // Actions
    selectPage,
    addPage,
    addSection,
    updateSection,
    deleteSection,
    handleAddEl,
    pickElement,
    updateEl,
    deleteEl,
    handleDragEl,
    handleDragSection,
  };

  return (
    <PageBuilderContext.Provider value={value}>
      {children}
    </PageBuilderContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// HOOK  (must be used inside PageBuilderProvider)
// ─────────────────────────────────────────────────────────────
export function usePageBuilder() {
  const ctx = useContext(PageBuilderContext);
  if (!ctx) {
    throw new Error("usePageBuilder must be used within a PageBuilderProvider");
  }
  return ctx;
}
