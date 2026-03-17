import { usePageBuilder } from "../../context/PageBuilderContext";
import { ELEMENTS } from "../../constants/elements";
import { SECTION_TEMPLATES } from "../../constants/sectionTemplates";

export default function LayerRow({ sec }) {
  const { selSectionId, selElInfo, setSelSectionId, setSelElInfo, deleteSection } = usePageBuilder();
  const isSel = selSectionId === sec.id;
  const tpl = SECTION_TEMPLATES[sec.sectionType];
  const isCustom = sec.sectionType === "custom";

  return (
    <div style={{ marginBottom: 4 }}>
      <div
        onClick={() => { setSelSectionId(sec.id); setSelElInfo(null); }}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 10px", borderRadius: 8,
          background: isSel ? "#ede9fe" : "#f8f8fb",
          border: `1.5px solid ${isSel ? "#6d28d9" : "transparent"}`,
          cursor: "pointer", userSelect: "none",
        }}
      >
        <span style={{ fontSize: 12, color: isSel ? "#6d28d9" : "#ccc" }}>⠿</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: isSel ? "#6d28d9" : "#444", flex: 1 }}>
          {tpl ? tpl.label : "Section"}
        </span>
        {!isCustom && (
          <span style={{ fontSize: 9, background: isSel ? "#6d28d9" : "#e8e8f0", color: isSel ? "#fff" : "#888", padding: "1px 5px", borderRadius: 8, fontWeight: 700 }}>
            {tpl?.icon}
          </span>
        )}
        {isCustom && (
          <span style={{ fontSize: 11, color: "#bbb" }}>{(sec.elements || []).length} el</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); deleteSection(sec.id); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#d0d0d0", padding: "1px 4px", borderRadius: 4 }}
        >
          ✕
        </button>
      </div>

      {/* Only custom sections show element children */}
      {isCustom && (sec.elements || []).map((el) => (
        <div key={el.id}
          onClick={(e) => { e.stopPropagation(); setSelElInfo({ elId: el.id, sectionId: sec.id, colIdx: null }); setSelSectionId(sec.id); }}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 10px 5px 24px", borderRadius: 7, cursor: "pointer",
            background: selElInfo?.elId === el.id ? "#f3f0ff" : "none",
            color: selElInfo?.elId === el.id ? "#6d28d9" : "#666",
            fontSize: 11,
          }}
        >
          <span>{ELEMENTS[el.type]?.icon}</span>
          <span style={{ fontWeight: 500 }}>{ELEMENTS[el.type]?.label}</span>
        </div>
      ))}
    </div>
  );
}
