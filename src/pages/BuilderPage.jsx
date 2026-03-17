/**
 * BuilderPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * URL: /#/builder/:slug  or  /#/builder/new/:slug
 *
 * • isNew=false → loads existing page from DB by slug
 * • isNew=true  → starts with an empty page; first Save calls createPage()
 *
 * After any save the URL stays at /#/builder/:slug (or transitions there
 * from builder-new) so the user can refresh without losing their location.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useState, useEffect } from "react";
import { getPageBySlug, createPage, updatePageBySlug } from "../api/client";
import { buildSavePayload, deserializePage }            from "../utils/serializer";
import { generateId }                                   from "../utils/idGen";
import { useBuilderStore }                              from "../store/useBuilderStore";
import { BuilderSidebar }                               from "../components/Sidebar/BuilderSidebar";
import { PageCanvas }                                   from "../components/Canvas/PageCanvas";
import { PropertiesPanel }                              from "../components/Editor/PropertiesPanel";
import { ElementPickerModal }                           from "../components/shared/ElementPickerModal";
import { TopToolbar }                                   from "../components/shared/TopToolbar";
import { JsonViewerPage }                               from "./JsonViewerPage";

const emptyPage = (name, slug) => ({ id: generateId(), name, slug, sections: [] });

export function BuilderPage({ slug, pageName, isNew, onBack, onPreview, onSaved }) {
  // ── Load from DB ────────────────────────────────────────────────────────────
  const [loading,    setLoading]    = useState(!isNew);
  const [loadErr,    setLoadErr]    = useState(null);
  const [everSaved,  setEverSaved]  = useState(!isNew); // new pages not yet in DB

  const store = useBuilderStore(isNew ? emptyPage(pageName ?? slug, slug) : null);

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    getPageBySlug(slug)
      .then((rec) => { store.setPage(deserializePage(rec)); })
      .catch((e)  => setLoadErr(e.message))
      .finally(()  => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, isNew]);

  // ── Selection state ─────────────────────────────────────────────────────────
  const [selSectionId,   setSelSectionId]   = useState(null);
  const [selElInfo,      setSelElInfo]       = useState(null);
  const [sideTab,        setSideTab]         = useState("layers");
  const [elPickerTarget, setElPickerTarget]  = useState(null);
  const [saveState,      setSaveState]       = useState("idle");
  const [lastSavedAt,    setLastSavedAt]     = useState(null);
  const [savedPayload,   setSavedPayload]    = useState(null);
  const [showJson,       setShowJson]        = useState(false);

  const page       = store.page;
  const selSection = page?.sections.find((s) => s.id === selSectionId) ?? null;
  const selEl      = selElInfo ? findElInPage(page, selElInfo.elId) : null;

  // ── Navigation helpers ──────────────────────────────────────────────────────
  const clearSel    = ()                   => { setSelSectionId(null); setSelElInfo(null); };
  const selectSec   = (id)                 => { setSelSectionId(id); setSelElInfo(null); };
  const selectEl    = (elId, secId, colIdx)=> { setSelElInfo({ elId, sectionId: secId, colIdx }); setSelSectionId(secId); };

  // ── Element mutations ───────────────────────────────────────────────────────
  const handleDeleteSec = (secId) => { store.deleteSection(secId); if (selSectionId === secId) clearSel(); };
  const handlePickEl    = (type)  => { if (!elPickerTarget) return; store.addElement(elPickerTarget.sectionId, elPickerTarget.colIdx, type); setElPickerTarget(null); };
  const handleUpdateEl  = (upd)   => { if (selElInfo) store.updateElement(selElInfo.sectionId, upd); };
  const handleDeleteEl  = ()      => { if (selElInfo) { store.deleteElement(selElInfo.sectionId, selElInfo.elId); setSelElInfo(null); } };

  // ── Save ────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!page || saveState === "saving") return;
    setSaveState("saving");
    try {
      const payload = buildSavePayload(page);
      if (!everSaved) {
        await createPage(payload);
        setEverSaved(true);
        // Transition URL from builder-new → builder
        onSaved?.(page.slug);
      } else {
        await updatePageBySlug(page.slug, payload);
      }
      setSavedPayload(payload);
      setLastSavedAt(new Date().toLocaleTimeString());
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (e) {
      console.error(e);
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  const handleViewJson = () => {
    const payload = buildSavePayload(page);
    setSavedPayload(payload);
    setShowJson(true);
  };

  // ── Loading / error states ───────────────────────────────────────────────────
  if (loading) return <Splash icon="⏳" msg="Loading page…" />;
  if (loadErr) return (
    <Splash icon="⚠️" msg={loadErr}>
      <button onClick={onBack} style={backBtnStyle}>← Back to Pages</button>
    </Splash>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", overflow: "hidden" }}>
      <TopToolbar
        pageName={page?.name}
        saveState={saveState}
        lastSavedAt={lastSavedAt}
        onSave={handleSave}
        onViewJson={handleViewJson}
        onPreview={() => page && onPreview(page.slug)}
        onBackToList={onBack}
        currentUrl={`/#/builder/${slug}`}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <BuilderSidebar
          pages={[page].filter(Boolean)}
          selPageId={page?.id}
          selPage={page}
          selSectionId={selSectionId}
          selElInfo={selElInfo}
          sideTab={sideTab}
          onChangeSideTab={setSideTab}
          onSelectPage={() => {}}
          onAddPage={() => {}}
          onSelectSection={selectSec}
          onSelectEl={selectEl}
          onDeleteSection={handleDeleteSec}
          onAddSection={store.addSection}
        />

        <PageCanvas
          page={page}
          selSectionId={selSectionId}
          selElInfo={selElInfo}
          onSelectSection={selectSec}
          onSelectEl={selectEl}
          onAddEl={(secId, colIdx) => setElPickerTarget({ sectionId: secId, colIdx })}
          onAddSection={store.addSection}
          onDeleteSection={handleDeleteSec}
          onReorderSections={store.reorderSections}
          onClearSelection={clearSel}
        />

        <PropertiesPanel
          selEl={selEl}
          selSection={selSection && !selEl ? selSection : null}
          onUpdateEl={handleUpdateEl}
          onUpdateSection={store.updateSection}
          onDeleteEl={handleDeleteEl}
          onClose={clearSel}
        />
      </div>

      {elPickerTarget && <ElementPickerModal onPick={handlePickEl} onClose={() => setElPickerTarget(null)} />}
      {showJson && savedPayload && <JsonViewerPage payload={savedPayload} onClose={() => setShowJson(false)} />}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function findElInPage(page, elId) {
  if (!page || !elId) return null;
  for (const sec of page.sections) {
    const el = sec.elements.find((e) => e.id === elId);
    if (el) return el;
    for (const e of sec.elements) {
      if (e.type === "columns")
        for (const col of e.children) { const ce = col.find((x) => x.id === elId); if (ce) return ce; }
    }
  }
  return null;
}

function Splash({ icon, msg, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "inherit", alignItems: "center", justifyContent: "center", background: "#f5f4ff", gap: 12 }}>
      <div style={{ fontSize: 40 }}>{icon}</div>
      <div style={{ fontSize: 16, color: "#555", fontWeight: 600 }}>{msg}</div>
      {children}
    </div>
  );
}

const backBtnStyle = { padding: "9px 22px", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", marginTop: 8 };
