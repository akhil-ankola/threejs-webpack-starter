import { useRef, useState } from "react";
import { CanvasSection } from "./CanvasSection";

export function PageCanvas({ page, selSectionId, selElInfo, onSelectSection, onSelectEl, onAddEl, onAddSection, onDeleteSection, onReorderSections, onClearSelection }) {
  const [dragOverElId,  setDragOverElId]  = useState(null);
  const [secDragOver,   setSecDragOver]   = useState(null);
  const elDragRef  = useRef(null);
  const secDragRef = useRef(null);

  const handleSecDragEnd = () => {
    if (secDragRef.current && secDragOver && secDragRef.current !== secDragOver)
      onReorderSections(secDragRef.current, secDragOver);
    secDragRef.current = null; setSecDragOver(null);
  };

  if (!page) return (
    <div style={emptyWrap}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>📄</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#555", marginBottom: 7 }}>Select a page to edit</div>
      <div style={{ fontSize: 13, color: "#bbb" }}>Choose from the Pages tab</div>
    </div>
  );

  if (page.sections.length === 0) return (
    <div style={emptyWrap}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>✦</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#555", marginBottom: 7 }}>"{page.name}" is empty</div>
      <div style={{ fontSize: 13, color: "#bbb", marginBottom: 22 }}>Add a section to start building</div>
      <button onClick={onAddSection} style={addSecBtn}>+ Add Section</button>
    </div>
  );

  return (
    <div id="pb-canvas" style={{ flex: 1, overflowY: "auto", background: "#e8e8ee" }} onClick={onClearSelection}>
      <div style={{ background: "#fff", borderBottom: "1px solid #eaeaea", padding: "10px 20px", display: "flex", alignItems: "center", gap: 8, position: "sticky", top: 0, zIndex: 20 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>{page.name}</span>
        <span style={{ color: "#e0e0e0" }}>·</span>
        <span style={{ fontSize: 12, color: "#bbb" }}>{page.sections.length} section{page.sections.length !== 1 ? "s" : ""}</span>
      </div>
      {page.sections.map((sec) => (
        <CanvasSection key={sec.id} section={sec} isSelected={selSectionId === sec.id} selElInfo={selElInfo} onSelectSection={onSelectSection} onSelectEl={onSelectEl} onAddEl={onAddEl} onDeleteSection={onDeleteSection} elDragRef={elDragRef} onDragElEnd={() => { elDragRef.current = null; setDragOverElId(null); }} dragOverElId={dragOverElId} setDragOverElId={setDragOverElId} secDragRef={secDragRef} secDragOver={secDragOver} onSecDragEnter={setSecDragOver} onSecDragEnd={handleSecDragEnd} />
      ))}
      <div style={{ padding: 24, textAlign: "center" }}>
        <button onClick={onAddSection} style={{ padding: "9px 22px", background: "#fff", border: "1.5px dashed #c4b5fd", borderRadius: 9, color: "#6d28d9", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ Add Section</button>
      </div>
    </div>
  );
}

const emptyWrap = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#bbb", flex: 1 };
const addSecBtn = { padding: "11px 26px", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer" };
