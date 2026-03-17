import { usePageBuilder } from "../../context/PageBuilderContext";
import CanvasSection from "./CanvasSection";

/**
 * Canvas
 * The central editing area. Renders all sections of the selected page.
 * Clicking the canvas background deselects any selection.
 */
export default function Canvas() {
  const {
    selPage,
    selSectionId,
    selElInfo,
    dragOverElId,
    secDragOver,
    elDragRef,
    secDragRef,
    setSelSectionId,
    setSelElInfo,
    setDragOverElId,
    setSecDragOver,
    addSection,
    handleAddEl,
    handleDragEl,
    handleDragSection,
  } = usePageBuilder();

  const handleSelectSection = (id) => {
    setSelSectionId(id);
    setSelElInfo(null);
  };

  const handleSelectEl = (elId, sectionId, colIdx) => {
    setSelElInfo({ elId, sectionId, colIdx });
    setSelSectionId(sectionId);
  };

  // ── Empty states ──
  if (!selPage) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#bbb",
          background: "#e8e8ee",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 14 }}>📄</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#555", marginBottom: 7 }}>
          Select a page to edit
        </div>
        <div style={{ fontSize: 13 }}>Choose from the Pages tab</div>
      </div>
    );
  }

  if (selPage.sections.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#bbb",
          background: "#e8e8ee",
          overflowY: "auto",
        }}
        onClick={() => {
          setSelSectionId(null);
          setSelElInfo(null);
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 14 }}>✦</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#555", marginBottom: 7 }}>
          "{selPage.name}" is empty
        </div>
        <div style={{ fontSize: 13, marginBottom: 22 }}>
          Add a section to start building
        </div>
        <button
          onClick={addSection}
          style={{
            padding: "11px 26px",
            background: "#6d28d9",
            color: "#fff",
            border: "none",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + Add Section
        </button>
      </div>
    );
  }

  return (
    <div
      id="pb-canvas"
      style={{ flex: 1, overflowY: "auto", background: "#e8e8ee" }}
      onClick={() => {
        setSelSectionId(null);
        setSelElInfo(null);
      }}
    >
      {/* Sticky page breadcrumb */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #eaeaea",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>
          {selPage.name}
        </span>
        <span style={{ color: "#e0e0e0" }}>·</span>
        <span style={{ fontSize: 12, color: "#bbb" }}>
          {selPage.sections.length} section
          {selPage.sections.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Sections */}
      {selPage.sections.map((sec) => (
        <CanvasSection
          key={sec.id}
          section={sec}
          isSelected={selSectionId === sec.id}
          onSelectSection={handleSelectSection}
          onSelectEl={handleSelectEl}
          selElId={selElInfo?.elId}
          onAddEl={handleAddEl}
          onDragEl={handleDragEl}
          dragState={elDragRef}
          dragOverElId={dragOverElId}
          setDragOverElId={setDragOverElId}
          onDragSection={handleDragSection}
          sectionDragOver={secDragOver}
          setSectionDragOver={setSecDragOver}
          sectionDragRef={secDragRef}
        />
      ))}

      {/* Bottom add section button */}
      <div style={{ padding: 24, textAlign: "center" }}>
        <button
          onClick={addSection}
          style={{
            padding: "9px 22px",
            background: "#fff",
            border: "1.5px dashed #c4b5fd",
            borderRadius: 9,
            color: "#6d28d9",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + Add Section
        </button>
      </div>
    </div>
  );
}
