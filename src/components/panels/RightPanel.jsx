import { usePageBuilder } from "../../context/PageBuilderContext";
import { ELEMENTS } from "../../constants/elements";
import { SECTION_TEMPLATES } from "../../constants/sectionTemplates";
import { EDITORS } from "../editors/index.jsx";
import { SECTION_EDITORS } from "../section-editors/index.jsx";
import SectionSettings from "./SectionSettings";

export default function RightPanel() {
  const {
    selEl, selSection, selElInfo,
    updateEl, updateSection,
    deleteEl, setSelElInfo, setSelSectionId,
  } = usePageBuilder();

  if (!selEl && !selSection) return null;

  const isCustomSection = selSection?.sectionType === "custom";
  const SectionEditorComp = selSection && !isCustomSection
    ? SECTION_EDITORS[selSection.sectionType]
    : null;
  const ElementEditorComp = selEl ? EDITORS[selEl.type] : null;

  const title = selEl
    ? ELEMENTS[selEl.type]?.label
    : selSection
    ? (SECTION_TEMPLATES[selSection.sectionType]?.label || "Section") + " Settings"
    : "";

  const subtitle = selEl
    ? "Edit element"
    : isCustomSection
    ? "Layout & style"
    : "Edit content & style";

  const handleClose = () => { setSelElInfo(null); setSelSectionId(null); };

  return (
    <div style={{ width: 280, background: "#fff", borderLeft: "1px solid #e6e6e6", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{title}</div>
          <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {selEl && (
            <button onClick={deleteEl} title="Delete element"
              style={{ background: "#fff0f0", border: "none", borderRadius: 7, width: 26, height: 26, cursor: "pointer", fontSize: 13, color: "#e55", display: "flex", alignItems: "center", justifyContent: "center" }}>
              🗑
            </button>
          )}
          <button onClick={handleClose}
            style={{ background: "#f3f3f5", border: "none", borderRadius: 7, width: 26, height: 26, cursor: "pointer", fontSize: 13, color: "#777", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>
      </div>

      {/* Section type badge (for predefined sections) */}
      {selSection && !isCustomSection && (
        <div style={{ padding: "8px 14px", borderBottom: "1px solid #f7f7f7", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>{SECTION_TEMPLATES[selSection.sectionType]?.icon}</span>
          <span style={{ fontSize: 11, color: "#6d28d9", fontWeight: 600 }}>Predefined Section</span>
          <span style={{ marginLeft: "auto", fontSize: 10, background: "#ede9fe", color: "#6d28d9", padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>
            {SECTION_TEMPLATES[selSection.sectionType]?.category}
          </span>
        </div>
      )}

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {selEl && ElementEditorComp ? (
          <ElementEditorComp el={selEl} oc={updateEl} />
        ) : selSection && SectionEditorComp ? (
          <SectionEditorComp section={selSection} onChange={updateSection} />
        ) : selSection && isCustomSection ? (
          <SectionSettings section={selSection} onChange={updateSection} />
        ) : null}
      </div>
    </div>
  );
}
