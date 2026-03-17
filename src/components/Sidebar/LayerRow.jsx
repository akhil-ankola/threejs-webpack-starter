import { usePageBuilder } from "../../context/PageBuilderContext";
import { ELEMENTS } from "../../constants/elements";

/**
 * LayerRow
 * Displays one section and its child elements in the Layers sidebar.
 * Supports click-to-select and delete.
 */
export default function LayerRow({ sec }) {
  const {
    selSectionId,
    selElInfo,
    setSelSectionId,
    setSelElInfo,
    deleteSection,
  } = usePageBuilder();

  const isSel = selSectionId === sec.id;

  const handleSelectSection = () => {
    setSelSectionId(sec.id);
    setSelElInfo(null);
  };

  const handleSelectEl = (e, elId) => {
    e.stopPropagation();
    setSelElInfo({ elId, sectionId: sec.id, colIdx: null });
    setSelSectionId(sec.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteSection(sec.id);
  };

  return (
    <div style={{ marginBottom: 4 }}>
      {/* Section row */}
      <div
        onClick={handleSelectSection}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 10px",
          borderRadius: 8,
          background: isSel ? "#ede9fe" : "#f8f8fb",
          border: `1.5px solid ${isSel ? "#6d28d9" : "transparent"}`,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 12, color: "#ccc" }}>⠿</span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: isSel ? "#6d28d9" : "#444",
            flex: 1,
          }}
        >
          Section
        </span>
        <span style={{ fontSize: 11, color: "#bbb" }}>
          {sec.elements.length} el
        </span>
        <button
          onClick={handleDelete}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "#d0d0d0",
            padding: "1px 4px",
            borderRadius: 4,
          }}
        >
          ✕
        </button>
      </div>

      {/* Element rows */}
      {sec.elements.map((el) => (
        <div
          key={el.id}
          onClick={(e) => handleSelectEl(e, el.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px 5px 24px",
            borderRadius: 7,
            cursor: "pointer",
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
