const base = { width: "100%", padding: "7px 9px", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 12, color: "#111", background: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "inherit" };
export const inputStyle    = base;
export const textareaStyle = { ...base, minHeight: 72, resize: "vertical" };

export function Field({ label, half, children }) {
  return (
    <div style={{ marginBottom: half ? 0 : 13, flex: half ? 1 : undefined }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 0.9, marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
export function FieldRow({ children }) {
  return <div style={{ display: "flex", gap: 8, marginBottom: 13 }}>{children}</div>;
}
export function TextInput({ value, onChange, placeholder }) {
  return <input style={base} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}
export function Textarea({ value, onChange, minHeight = 72 }) {
  return <textarea style={{ ...base, minHeight, resize: "vertical" }} value={value} onChange={(e) => onChange(e.target.value)} />;
}
export function NumberInput({ value, onChange, min = 0, max = 9999, step = 1 }) {
  return <input type="number" value={value} min={min} max={max} step={step} style={base} onChange={(e) => onChange(Number(e.target.value))} />;
}
export function ColorInput({ value, onChange }) {
  return <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ height: 30, width: "100%", borderRadius: 6, border: "1.5px solid #e5e7eb", cursor: "pointer", padding: 2 }} />;
}
export function Select({ value, onChange, options }) {
  return <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...base, cursor: "pointer" }}>{options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>;
}
