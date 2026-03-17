import { usePageBuilder } from "../../context/PageBuilderContext";
import { ELEMENTS } from "../../constants/elements";
import { EDITORS } from "../editors/index.jsx";
import SectionSettings from "./SectionSettings";

/**
 * RightPanel
 * Shows element or section settings when something is selected.
 * Hidden when nothing is selected.
 */
export default function RightPanel() {
  const {
    selEl,
    selSection,
    selElInfo,
    updateEl,
    updateSection,
    deleteEl,
    setSelElInfo,
    setSelSectionId,
  } = usePageBuilder();

  // Panel is only visible when something is selected
  if (!selEl && !selSection) return null;

  const handleClose = () => {
    setSelElInfo(null);
    setSelSectionId(null);
  };

  const title = selEl
    ? ELEMENTS[selEl.type]?.label
    : "Section Settings";

  const EditorComponent = selEl ? EDITORS[selEl.type] : null;

  return (
    <div
      style={{
        width: 280,
        background: "#fff",
        borderLeft: "1px solid #e6e6e6",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
            {title}
          </div>
          <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>
            Edit properties
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {selEl && (
            <button
              onClick={deleteEl}
              title="Delete element"
              style={{
                background: "#fff0f0",
                border: "none",
                borderRadius: 7,
                width: 26,
                height: 26,
                cursor: "pointer",
                fontSize: 13,
                color: "#e55",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🗑
            </button>
          )}
          <button
            onClick={handleClose}
            style={{
              background: "#f3f3f5",
              border: "none",
              borderRadius: 7,
              width: 26,
              height: 26,
              cursor: "pointer",
              fontSize: 13,
              color: "#777",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {selEl && EditorComponent ? (
          <EditorComponent el={selEl} oc={updateEl} />
        ) : selSection ? (
          <SectionSettings section={selSection} onChange={updateSection} />
        ) : null}
      </div>
    </div>
  );
}
