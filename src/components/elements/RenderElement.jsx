import { ELEMENTS } from "../../constants/elements";
import { ELEMENT_COMPONENTS, ElColumns } from "./index.jsx";

/**
 * RenderElement
 * Wraps any element with selection highlight, drag handles, and click selection.
 * Delegates actual rendering to the specific El* component.
 */
export default function RenderElement({
  el,
  sectionId,
  colIdx,
  renderChildren,
  onSelectEl,
  selElId,
  onDragEl,
  dragOverElId,
  setDragOverElId,
  parentDragRef,
}) {
  const isSel = selElId === el.id;
  const isOver = dragOverElId === el.id;
  const Comp = ELEMENT_COMPONENTS[el.type];

  return (
    <div
      draggable
      onDragStart={(e) => {
        parentDragRef.current = { elId: el.id, sectionId, colIdx };
        e.dataTransfer.effectAllowed = "move";
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        setDragOverElId(el.id);
        e.stopPropagation();
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={() => onDragEl()}
      onClick={(e) => {
        e.stopPropagation();
        onSelectEl(el.id, sectionId, colIdx);
      }}
      style={{
        position: "relative",
        outline: isSel
          ? "2px solid #6d28d9"
          : isOver
          ? "2px dashed #a78bfa"
          : "2px solid transparent",
        borderRadius: 6,
        cursor: "pointer",
        transition: "outline 0.1s",
        marginBottom: 2,
      }}
    >
      {/* Selection label badge */}
      {isSel && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 20,
            background: "#6d28d9",
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: "0 4px 0 6px",
            letterSpacing: 0.5,
            pointerEvents: "none",
          }}
        >
          {ELEMENTS[el.type]?.label}
        </div>
      )}

      {/* Render the correct element type */}
      {el.type === "columns" ? (
        <ElColumns
          el={el}
          renderChildren={renderChildren}
          sectionId={sectionId}
        />
      ) : Comp ? (
        <Comp el={el} />
      ) : null}
    </div>
  );
}
