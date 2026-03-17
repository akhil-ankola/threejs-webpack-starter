import { usePageBuilder } from "../../context/PageBuilderContext";
import LayerRow from "./LayerRow";

/**
 * LayersTab
 * Shows the section/element tree for the currently selected page.
 */
export default function LayersTab() {
  const { selPage, addSection } = usePageBuilder();

  if (!selPage) return null;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          padding: "8px 12px 4px",
          fontSize: 10,
          fontWeight: 700,
          color: "#c0c0c0",
          letterSpacing: 1.2,
          textTransform: "uppercase",
        }}
      >
        {selPage.name} · {selPage.sections.length} section
        {selPage.sections.length !== 1 ? "s" : ""}
      </div>

      {/* Section list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 10px" }}>
        {selPage.sections.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#ccc",
              fontSize: 12,
              padding: "24px 10px",
              lineHeight: 1.7,
            }}
          >
            No sections yet.
            <br />
            Click <strong style={{ color: "#6d28d9" }}>+ Add Section</strong> below.
          </div>
        ) : (
          selPage.sections.map((s) => <LayerRow key={s.id} sec={s} />)
        )}
      </div>

      {/* Add section button */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid #f0f0f0" }}>
        <button
          onClick={addSection}
          style={{
            width: "100%",
            padding: "10px 0",
            background: "#6d28d9",
            color: "#fff",
            border: "none",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            boxShadow: "0 3px 12px rgba(109,40,217,0.3)",
          }}
        >
          <span style={{ fontSize: 18 }}>+</span> Add Section
        </button>
      </div>
    </div>
  );
}
