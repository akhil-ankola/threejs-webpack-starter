// Col — styled color picker for editor panels
export default function ColorInput({ value, onChange }) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        height: 30,
        width: "100%",
        borderRadius: 6,
        border: "1.5px solid #e5e7eb",
        cursor: "pointer",
        padding: 2,
      }}
    />
  );
}
