import { ELEMENT_EDITORS, SectionEditor } from "./ElementEditors";
import { ELEMENT_REGISTRY } from "../../constants/elements";

export function PropertiesPanel({ selEl, selSection, onUpdateEl, onUpdateSection, onDeleteEl, onClose }) {
  const isEl = !!selEl;
  if (!isEl && !selSection) return null;
  const Editor = isEl ? ELEMENT_EDITORS[selEl.type] : null;

  return (
    <div style={{ width: 280, background: "#fff", borderLeft: "1px solid #e6e6e6", display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{isEl ? ELEMENT_REGISTRY[selEl.type]?.label : "Section Settings"}</div>
          <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>Edit properties</div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {isEl && <button onClick={onDeleteEl} style={iconBtn("#fff0f0","#e55")} title="Delete">🗑</button>}
          <button onClick={onClose} style={iconBtn("#f3f3f5","#777")}>✕</button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {isEl && Editor && <Editor el={selEl} onChange={onUpdateEl} />}
        {!isEl && selSection && <SectionEditor section={selSection} onChange={onUpdateSection} />}
      </div>
    </div>
  );
}

const iconBtn = (bg, color) => ({ background: bg, border: "none", borderRadius: 7, width: 26, height: 26, cursor: "pointer", fontSize: 13, color, display: "flex", alignItems: "center", justifyContent: "center" });
