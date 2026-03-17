import RenderElement from "../elements/RenderElement";

/**
 * CanvasSection
 * Renders one section on the canvas with its background, padding, and elements.
 * Handles section-level drag-and-drop reordering and element-level interactions.
 */
export default function CanvasSection({
  section,
  isSelected,
  onSelectSection,
  onSelectEl,
  selElId,
  onAddEl,
  onDragEl,
  dragState,
  setDragOverElId,
  dragOverElId,
  onDragSection,
  sectionDragOver,
  setSectionDragOver,
  sectionDragRef,
}) {
  /**
   * Recursively renders a list of elements.
   * colIdx = null means top-level in section; number means inside a columns widget.
   */
  const renderElements = (elements, sectionId, colIdx = null) => (
    <div style={{ minHeight: 32 }}>
      {elements.map((el) => (
        <RenderElement
          key={el.id}
          el={el}
          sectionId={sectionId}
          colIdx={colIdx}
          renderChildren={renderElements}
          onSelectEl={onSelectEl}
          selElId={selElId}
          onDragEl={onDragEl}
          dragOverElId={dragOverElId}
          setDragOverElId={setDragOverElId}
          parentDragRef={dragState}
        />
      ))}

      {/* Drop zone indicator */}
      <div
        onDragEnter={() =>
          setDragOverElId(`drop-${sectionId}-${colIdx ?? "main"}`)
        }
        onDragOver={(e) => e.preventDefault()}
        style={{
          height: 28,
          borderRadius: 6,
          border: `2px dashed ${
            dragOverElId === `drop-${sectionId}-${colIdx ?? "main"}`
              ? "#a78bfa"
              : "transparent"
          }`,
          transition: "border 0.1s",
          marginTop: 4,
        }}
      />

      {/* Add element button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddEl(sectionId, colIdx);
        }}
        style={{
          width: "100%",
          padding: "6px 0",
          background: "none",
          border: "1.5px dashed #d8d8e8",
          borderRadius: 7,
          color: "#aaa",
          fontSize: 12,
          cursor: "pointer",
          marginTop: 4,
          transition: "all 0.13s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6d28d9";
          e.currentTarget.style.color = "#6d28d9";
          e.currentTarget.style.background = "#f3f0ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#d8d8e8";
          e.currentTarget.style.color = "#aaa";
          e.currentTarget.style.background = "none";
        }}
      >
        + Add Element
      </button>
    </div>
  );

  return (
    <div
      draggable
      onDragStart={(e) => {
        sectionDragRef.current = section.id;
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragEnter={() => setSectionDragOver(section.id)}
      onDragEnd={onDragSection}
      onDragOver={(e) => e.preventDefault()}
      onClick={(e) => {
        e.stopPropagation();
        onSelectSection(section.id);
      }}
      style={{
        position: "relative",
        outline: isSelected
          ? "2.5px solid #6d28d9"
          : sectionDragOver === section.id
          ? "2.5px dashed #a78bfa"
          : "2.5px solid transparent",
        transition: "outline 0.12s",
        cursor: "pointer",
      }}
    >
      {/* Section drag handle label */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}
      >
        <div
          style={{
            background: isSelected ? "#6d28d9" : "#94a3b8",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: "0 0 6px 0",
            letterSpacing: 0.5,
            cursor: "grab",
          }}
          title="Drag to reorder section"
        >
          ⠿ SECTION
        </div>
      </div>

      {/* Section body */}
      <div
        style={{
          background: section.bg,
          paddingTop: section.paddingTop,
          paddingBottom: section.paddingBottom,
          paddingLeft: section.paddingLeft,
          paddingRight: section.paddingRight,
        }}
      >
        <div style={{ maxWidth: section.maxWidth, margin: "0 auto" }}>
          {renderElements(section.elements, section.id)}
        </div>
      </div>
    </div>
  );
}
