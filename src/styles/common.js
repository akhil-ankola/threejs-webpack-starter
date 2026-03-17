// ─────────────────────────────────────────────────────────────
// SHARED STYLE TOKENS
// Centralised inline-style objects used by editor form fields.
// Keep all form-level styling here so component files stay lean.
// ─────────────────────────────────────────────────────────────

export const inp = {
  width: "100%",
  padding: "7px 9px",
  border: "1.5px solid #e5e7eb",
  borderRadius: 7,
  fontSize: 12,
  color: "#111",
  background: "#fff",
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "inherit",
};

export const ta = {
  ...inp,
  minHeight: 72,
  resize: "vertical",
};

export const row = {
  display: "flex",
  gap: 8,
  marginBottom: 13,
};
