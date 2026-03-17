import { createContext, useContext, useState, useRef } from "react";
import { initPages, mkEl, mkPage, mkSection, mkSectionFromTemplate } from "../utils/factories";

const PageBuilderContext = createContext(null);

export function PageBuilderProvider({ children }) {
  const [pages, setPages] = useState(initPages);

  const [selPageId, setSelPageId] = useState(null);
  const [selSectionId, setSelSectionId] = useState(null);
  const [selElInfo, setSelElInfo] = useState(null);

  const [sideTab, setSideTab] = useState("pages");
  const [showElPicker, setShowElPicker] = useState(null);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [showNewPage, setShowNewPage] = useState(false);
  const [newPageInput, setNewPageInput] = useState("");

  const elDragRef = useRef(null);
  const [dragOverElId, setDragOverElId] = useState(null);
  const secDragRef = useRef(null);
  const [secDragOver, setSecDragOver] = useState(null);

  // ── Derived ──
  const selPage = pages.find((p) => p.id === selPageId) || null;
  const selSection = selPage?.sections.find((s) => s.id === selSectionId) || null;

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

  // ── Page actions ──
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

  // ── Section actions ──
  // Opens the section picker modal instead of adding a blank section directly
  const openSectionPicker = () => setShowSectionPicker(true);

  // Called by SectionPicker after user selects a template
  const addSectionFromTemplate = (templateKey) => {
    const s = mkSectionFromTemplate(templateKey);
    setPages((prev) =>
      prev.map((p) =>
        p.id !== selPageId ? p : { ...p, sections: [...p.sections, s] }
      )
    );
    setSelSectionId(s.id);
    setSelElInfo(null);
  };

  // Legacy: still used internally if needed
  const addSection = () => openSectionPicker();

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

  // ── Element actions ──
  const handleAddEl = (sectionId, colIdx) => setShowElPicker({ sectionId, colIdx });

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
            if (colIdx === null) return { ...s, elements: [...s.elements, el] };
            return {
              ...s,
              elements: s.elements.map((e) => {
                if (e.type !== "columns") return e;
                return { ...e, children: e.children.map((col, ci) => ci === colIdx ? [...col, el] : col) };
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
              return { ...s, elements: s.elements.map((e) => e.id === updated.id ? updated : e) };
            return {
              ...s,
              elements: s.elements.map((e) => {
                if (e.type !== "columns") return e;
                return {
                  ...e,
                  children: e.children.map((col, ci) =>
                    ci === info.colIdx ? col.map((ce) => ce.id === updated.id ? updated : ce) : col
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
              return { ...s, elements: s.elements.filter((e) => e.id !== info.elId) };
            return {
              ...s,
              elements: s.elements.map((e) => {
                if (e.type !== "columns") return e;
                return {
                  ...e,
                  children: e.children.map((col, ci) =>
                    ci === info.colIdx ? col.filter((ce) => ce.id !== info.elId) : col
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

  // ── Drag actions ──
  const handleDragEl = () => { setDragOverElId(null); elDragRef.current = null; };

  const handleDragSection = () => {
    if (secDragRef.current && secDragOver && secDragRef.current !== secDragOver) {
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

  const value = {
    pages,
    selPageId, selPage,
    selSectionId, selSection,
    selElInfo, selEl,
    sideTab,
    showElPicker, showSectionPicker,
    showNewPage, newPageInput,
    dragOverElId, secDragOver,
    elDragRef, secDragRef,

    setSideTab,
    setSelSectionId, setSelElInfo,
    setShowElPicker, setShowSectionPicker,
    setShowNewPage, setNewPageInput,
    setDragOverElId, setSecDragOver,

    selectPage, addPage,
    addSection, openSectionPicker, addSectionFromTemplate,
    updateSection, deleteSection,
    handleAddEl, pickElement,
    updateEl, deleteEl,
    handleDragEl, handleDragSection,
  };

  return (
    <PageBuilderContext.Provider value={value}>
      {children}
    </PageBuilderContext.Provider>
  );
}

export function usePageBuilder() {
  const ctx = useContext(PageBuilderContext);
  if (!ctx) throw new Error("usePageBuilder must be used within a PageBuilderProvider");
  return ctx;
}
