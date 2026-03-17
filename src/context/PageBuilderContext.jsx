import { createContext, useContext, useState, useRef } from "react";
import { initPages, mkEl, mkPage, mkSection, mkSectionFromTemplate } from "../utils/factories";
import { useSavePage } from "../hooks/useSavePage";
import { deletePage, downloadPageJSON, downloadAllPagesJSON, slugify, isSlugAvailable } from "../services/pageService";

const PageBuilderContext = createContext(null);

export function PageBuilderProvider({ children }) {
  // ── Core data ──
  const [pages, setPages] = useState(initPages);

  // ── Selection ──
  const [selPageId, setSelPageId]       = useState(null);
  const [selSectionId, setSelSectionId] = useState(null);
  const [selElInfo, setSelElInfo]       = useState(null);

  // ── UI state ──
  const [sideTab, setSideTab]                     = useState("pages");
  const [showElPicker, setShowElPicker]           = useState(null);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [showNewPage, setShowNewPage]             = useState(false);

  // ── New page form (Phase 4: name + slug) ──
  const [newPageInput, setNewPageInput]   = useState("");   // display name
  const [newSlugInput, setNewSlugInput]   = useState("");   // url slug
  const [slugManuallySet, setSlugManuallySet] = useState(false); // did user type slug?
  const [slugError, setSlugError]         = useState("");   // validation message

  // ── Drag: elements ──
  const elDragRef  = useRef(null);
  const [dragOverElId, setDragOverElId] = useState(null);

  // ── Drag: sections ──
  const secDragRef = useRef(null);
  const [secDragOver, setSecDragOver]   = useState(null);

  // ── Persistence ──
  const { saveStatus, lastSavedAt, isLoading, saveCurrentPage, saveAll } =
    useSavePage(pages, setPages, selPageId);

  // ── Derived ──
  const selPage    = pages.find((p) => p.id === selPageId) || null;
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
  const selEl      = selElFound?.el || null;

  // ── Page form helpers ─────────────────────────────────────────
  /**
   * When the user types a name, auto-generate the slug unless they
   * have manually edited it.
   */
  const handleNewPageNameChange = (name) => {
    setNewPageInput(name);
    if (!slugManuallySet) {
      setNewSlugInput(slugify(name));
      setSlugError("");
    }
  };

  /**
   * When the user manually edits the slug field, sanitise it and
   * flag that we should no longer auto-generate from the name.
   */
  const handleNewSlugChange = (raw) => {
    const clean = slugify(raw) || raw.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setNewSlugInput(clean);
    setSlugManuallySet(true);
    setSlugError("");
  };

  const resetNewPageForm = () => {
    setNewPageInput("");
    setNewSlugInput("");
    setSlugManuallySet(false);
    setSlugError("");
    setShowNewPage(false);
  };

  // ── Page actions ──────────────────────────────────────────────
  const selectPage = (id) => {
    setSelPageId(id);
    setSelSectionId(null);
    setSelElInfo(null);
    setSideTab("layers");
  };

  const addPage = async () => {
    const name = newPageInput.trim();
    const slug = newSlugInput.trim() || slugify(name);
    if (!name) return;
    if (!slug) { setSlugError("Slug cannot be empty."); return; }

    // Validate slug uniqueness against both in-memory pages AND storage
    const inMemory = pages.some((p) => p.slug === slug);
    const inStorage = !(await isSlugAvailable(slug));
    if (inMemory || inStorage) {
      setSlugError(`"/${slug}" is already in use. Choose a different slug.`);
      return;
    }

    const page = mkPage(name, slug);
    setPages((prev) => [...prev, page]);
    resetNewPageForm();
    selectPage(page.id);
  };

  const removePageById = async (pageId) => {
    await deletePage(pageId);
    setPages((prev) => prev.filter((p) => p.id !== pageId));
    if (selPageId === pageId) {
      setSelPageId(null);
      setSelSectionId(null);
      setSelElInfo(null);
      setSideTab("pages");
    }
  };

  const downloadCurrent = () => { if (selPage) downloadPageJSON(selPage); };
  const downloadAll     = () => downloadAllPagesJSON(pages);

  // ── Section actions ───────────────────────────────────────────
  const openSectionPicker      = () => setShowSectionPicker(true);
  const addSection             = () => openSectionPicker();

  const addSectionFromTemplate = (templateKey) => {
    const s = mkSectionFromTemplate(templateKey);
    setPages((prev) =>
      prev.map((p) => p.id !== selPageId ? p : { ...p, sections: [...p.sections, s] })
    );
    setSelSectionId(s.id);
    setSelElInfo(null);
  };

  const updateSection = (sec) =>
    setPages((prev) =>
      prev.map((p) =>
        p.id !== selPageId ? p :
        { ...p, sections: p.sections.map((s) => s.id === sec.id ? sec : s) }
      )
    );

  const deleteSection = (id) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id !== selPageId ? p :
        { ...p, sections: p.sections.filter((s) => s.id !== id) }
      )
    );
    if (selSectionId === id) { setSelSectionId(null); setSelElInfo(null); }
  };

  // ── Element actions ───────────────────────────────────────────
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

  // ── Drag actions ──────────────────────────────────────────────
  const handleDragEl = () => { setDragOverElId(null); elDragRef.current = null; };

  const handleDragSection = () => {
    if (secDragRef.current && secDragOver && secDragRef.current !== secDragOver) {
      setPages((prev) =>
        prev.map((p) => {
          if (p.id !== selPageId) return p;
          const secs = [...p.sections];
          const fi   = secs.findIndex((s) => s.id === secDragRef.current);
          const ti   = secs.findIndex((s) => s.id === secDragOver);
          const [moved] = secs.splice(fi, 1);
          secs.splice(ti, 0, moved);
          return { ...p, sections: secs };
        })
      );
    }
    secDragRef.current = null;
    setSecDragOver(null);
  };

  // ── Context value ─────────────────────────────────────────────
  const value = {
    pages,
    selPageId, selPage,
    selSectionId, selSection,
    selElInfo, selEl,
    sideTab,
    showElPicker, showSectionPicker,
    showNewPage,
    newPageInput, newSlugInput, slugError,
    saveStatus, lastSavedAt, isLoading,
    dragOverElId, secDragOver,
    elDragRef, secDragRef,

    setSideTab,
    setSelSectionId, setSelElInfo,
    setShowElPicker, setShowSectionPicker,
    setShowNewPage,
    setDragOverElId, setSecDragOver,
    handleNewPageNameChange, handleNewSlugChange,

    selectPage, addPage, removePageById,
    saveCurrentPage, saveAll,
    downloadCurrent, downloadAll,
    addSection, openSectionPicker, addSectionFromTemplate,
    updateSection, deleteSection,
    handleAddEl, pickElement,
    updateEl, deleteEl,
    handleDragEl, handleDragSection,
    resetNewPageForm,
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
