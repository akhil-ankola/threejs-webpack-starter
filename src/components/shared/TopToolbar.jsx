/**
 * TopToolbar.jsx
 * Top navigation bar showing current URL, save controls, and navigation.
 */
export function TopToolbar({ pageName, saveState, lastSavedAt, onSave, onViewJson, onPreview, onBackToList, currentUrl }) {

  const urlDisplay = window.location.href;

  return (
    <div style={{ height: 48, background: "#1e1b4b", display: "flex", alignItems: "center", padding: "0 14px", gap: 10, flexShrink: 0, zIndex: 100 }}>

      {/* Back */}
      <button onClick={onBackToList}
        style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: 18, padding: "0 2px", display: "flex", alignItems: "center", lineHeight: 1 }}
        title="All Pages">
        ←
      </button>

      {/* Brand */}
      <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>⚡ PageBuilder</span>

      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

      {/* Current URL — clickable, selectable */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, padding: "4px 10px", minWidth: 0, flex: 1, maxWidth: 420, overflow: "hidden" }}>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, flexShrink: 0 }}>🔗</span>
        <span
          style={{ color: "#c4b5fd", fontSize: 11, fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "text", userSelect: "all" }}
          title={urlDisplay}
        >
          {urlDisplay}
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Last saved */}
      {lastSavedAt && (
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, whiteSpace: "nowrap" }}>
          Saved {lastSavedAt}
        </span>
      )}

      {/* JSON button */}
      <NavBtn onClick={onViewJson} disabled={!pageName} label="{ } JSON" />

      {/* Preview button — navigates to /#/preview/:slug */}
      <NavBtn onClick={onPreview} disabled={!pageName} label="▷ Preview" />

      {/* Save */}
      <button onClick={onSave} disabled={!pageName || saveState === "saving"}
        style={{
          padding: "7px 16px",
          background: !pageName ? "#3b3660" : saveState === "saved" ? "#059669" : saveState === "error" ? "#dc2626" : "#6d28d9",
          color: !pageName ? "rgba(255,255,255,0.25)" : "#fff",
          border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700,
          cursor: !pageName ? "default" : "pointer",
          boxShadow: pageName ? "0 2px 8px rgba(109,40,217,0.35)" : "none",
          transition: "background 0.2s", whiteSpace: "nowrap", minWidth: 100,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
        {saveState === "saving" ? "⏳ Saving…"
          : saveState === "saved"  ? "✓ Saved!"
          : saveState === "error"  ? "✗ Error"
          : "💾 Save Page"}
      </button>
    </div>
  );
}

function NavBtn({ onClick, disabled, label, active }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: "6px 12px", background: active ? "rgba(109,40,217,0.3)" : "rgba(255,255,255,0.07)", color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.75)", border: `1px solid ${active ? "#6d28d9" : "rgba(255,255,255,0.1)"}`, borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: disabled ? "default" : "pointer", whiteSpace: "nowrap" }}>
      {label}
    </button>
  );
}
