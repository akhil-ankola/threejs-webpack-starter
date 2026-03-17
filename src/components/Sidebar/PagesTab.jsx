import { useState } from "react";
import { usePageBuilder } from "../../context/PageBuilderContext";
import { inp } from "../../styles/common";

export default function PagesTab() {
  const {
    pages,
    selPageId,
    showNewPage,
    newPageInput, newSlugInput, slugError,
    saveStatus,
    setShowNewPage,
    handleNewPageNameChange, handleNewSlugChange,
    selectPage, addPage, removePageById,
    downloadCurrent, saveCurrentPage,
    resetNewPageForm,
  } = usePageBuilder();

  const [hoveredId, setHoveredId]       = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async (e, pageId) => {
    e.stopPropagation();
    if (confirmDeleteId === pageId) {
      await removePageById(pageId);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(pageId);
      setTimeout(() => setConfirmDeleteId((c) => c === pageId ? null : c), 3000);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 14px 4px", fontSize: 10, fontWeight: 700, color: "#c0c0c0", letterSpacing: 1.2, textTransform: "uppercase" }}>
        All Pages
      </div>

      {pages.map((p) => {
        const isSelected = selPageId === p.id;
        const isHovered  = hoveredId === p.id;
        const isConfirm  = confirmDeleteId === p.id;
        const isSaving   = isSelected && saveStatus === "saving";
        const isSaved    = isSelected && saveStatus === "saved";

        return (
          <div
            key={p.id}
            onClick={() => { setConfirmDeleteId(null); selectPage(p.id); }}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 12px", cursor: "pointer", fontSize: 13, userSelect: "none",
              ...(isSelected
                ? { background: "#ede9fe", color: "#6d28d9", fontWeight: 700 }
                : isHovered ? { background: "#f8f8fb", color: "#333" }
                : { color: "#333" }),
            }}
          >
            <span style={{ fontSize: 13, flexShrink: 0 }}>📄</span>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {p.name}
              </div>
              {/* Slug chip */}
              {p.slug && (
                <div style={{ fontSize: 10, color: isSelected ? "#8b5cf6" : "#bbb", marginTop: 1, fontFamily: "monospace" }}>
                  /{p.slug}
                </div>
              )}
            </div>

            {/* Save status dot */}
            {isSelected && (
              <span
                title={isSaving ? "Saving…" : isSaved ? "Saved" : "Auto-saved"}
                style={{
                  width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                  background: isSaving ? "#f59e0b" : isSaved ? "#22c55e" : "#6d28d9",
                  transition: "background 0.3s",
                }}
              />
            )}

            {/* Action buttons on hover */}
            {isSelected && isHovered && (
              <div style={{ display: "flex", gap: 3, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.stopPropagation(); saveCurrentPage(); }} title="Save" style={rowBtn("#f3f0ff", "#6d28d9")}>💾</button>
                <button onClick={(e) => { e.stopPropagation(); downloadCurrent(); }} title="Download JSON" style={rowBtn("#f0fdf4", "#16a34a")}>↓</button>
                <button onClick={(e) => handleDelete(e, p.id)} title={isConfirm ? "Confirm delete" : "Delete"} style={rowBtn(isConfirm ? "#fee2e2" : "#fff0f0", isConfirm ? "#991b1b" : "#e55")}>
                  {isConfirm ? "!" : "✕"}
                </button>
              </div>
            )}
          </div>
        );
      })}

      {confirmDeleteId && (
        <div style={{ margin: "0 10px 6px", padding: "7px 10px", background: "#fee2e2", borderRadius: 8, fontSize: 11, color: "#991b1b", fontWeight: 600, lineHeight: 1.5 }}>
          Click ✕ again to confirm. This cannot be undone.
        </div>
      )}

      {/* ── New Page Form ── */}
      {showNewPage ? (
        <div style={{ padding: "10px 12px", borderTop: "1px solid #f0f0f0" }}>
          {/* Page name */}
          <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>
            Page Name
          </div>
          <input
            autoFocus
            style={{ ...inp, marginBottom: 8 }}
            placeholder="e.g. About Us"
            value={newPageInput}
            onChange={(e) => handleNewPageNameChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPage()}
          />

          {/* URL slug */}
          <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>
            URL Slug
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#aaa", paddingRight: 3, flexShrink: 0 }}>/</span>
            <input
              style={{ ...inp, fontFamily: "monospace", flex: 1, ...(slugError ? { borderColor: "#ef4444" } : {}) }}
              placeholder="about-us"
              value={newSlugInput}
              onChange={(e) => handleNewSlugChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPage()}
            />
          </div>
          {slugError && (
            <div style={{ fontSize: 10, color: "#ef4444", marginBottom: 6, lineHeight: 1.4 }}>
              {slugError}
            </div>
          )}
          {newSlugInput && !slugError && (
            <div style={{ fontSize: 10, color: "#22c55e", marginBottom: 6 }}>
              ✓ /{newSlugInput} is available
            </div>
          )}

          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <button onClick={addPage}
              style={{ flex: 1, padding: "7px 0", background: "#6d28d9", color: "#fff", border: "none", borderRadius: 7, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              Create
            </button>
            <button onClick={resetNewPageForm}
              style={{ flex: 1, padding: "7px 0", background: "#f3f3f5", color: "#555", border: "none", borderRadius: 7, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNewPage(true)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            width: "100%", padding: "11px 14px",
            background: "none", border: "none",
            borderTop: "1px solid #f0f0f0",
            marginTop: "auto", cursor: "pointer",
            fontSize: 13, color: "#6d28d9", fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 18 }}>+</span> New Page
        </button>
      )}
    </div>
  );
}

const rowBtn = (bg, color) => ({
  background: bg, border: "none", borderRadius: 5,
  width: 22, height: 22, cursor: "pointer", fontSize: 11,
  color, display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0, fontWeight: 700,
});
