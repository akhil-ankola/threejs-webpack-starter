import { RENDERERS } from "./ElementRenderers";
import { ELEMENT_REGISTRY } from "../../constants/elements";

export function CanvasElement({ el, sectionId, colIdx, isSelected, isDragOver, onSelect, onAddEl, dragRef, onDragEnd, setDragOverElId }) {
  const Renderer = RENDERERS[el.type];

  const renderChild = (child) => (
    <CanvasElement key={child.id} el={child} sectionId={sectionId} colIdx={colIdx} isSelected={isSelected && false} isDragOver={false} onSelect={onSelect} onAddEl={onAddEl} dragRef={dragRef} onDragEnd={onDragEnd} setDragOverElId={setDragOverElId} />
  );

  return (
    <div
      draggable
      onDragStart={(e) => { dragRef.current = { elId: el.id, sectionId, colIdx }; e.dataTransfer.effectAllowed = "move"; e.stopPropagation(); }}
      onDragEnter={(e) => { setDragOverElId(el.id); e.stopPropagation(); }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
      onClick={(e) => { e.stopPropagation(); onSelect(el.id, sectionId, colIdx); }}
      style={{ position: "relative", outline: isSelected ? "2px solid #6d28d9" : isDragOver ? "2px dashed #a78bfa" : "2px solid transparent", borderRadius: 6, cursor: "pointer", transition: "outline 0.1s", marginBottom: 4 }}
    >
      {isSelected && (
        <div style={{ position: "absolute", top: 0, right: 0, zIndex: 20, background: "#6d28d9", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: "0 4px 0 6px", pointerEvents: "none" }}>
          {ELEMENT_REGISTRY[el.type]?.label}
        </div>
      )}
      {el.type === "columns" ? (
        <ColumnsCanvas el={el} sectionId={sectionId} onAddEl={onAddEl} renderChild={renderChild} />
      ) : Renderer ? <Renderer el={el} /> : null}
    </div>
  );
}

function ColumnsCanvas({ el, sectionId, onAddEl, renderChild }) {
  const split = el.split === "30/70" ? ["30%","70%"] : el.split === "70/30" ? ["70%","30%"] : ["50%","50%"];
  return (
    <div style={{ display: "flex", gap: el.gap }}>
      {(el.children || [[], []]).map((col, ci) => (
        <div key={ci} style={{ width: split[ci], minWidth: 0 }}>
          {col.map(renderChild)}
          <button onClick={(e) => { e.stopPropagation(); onAddEl(sectionId, ci); }}
            style={{ width: "100%", padding: "5px 0", background: "none", border: "1.5px dashed #d8d8e8", borderRadius: 7, color: "#aaa", fontSize: 11, cursor: "pointer", marginTop: 4 }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6d28d9"; e.currentTarget.style.color = "#6d28d9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#d8d8e8"; e.currentTarget.style.color = "#aaa"; }}>
            + Add
          </button>
        </div>
      ))}
    </div>
  );
}
