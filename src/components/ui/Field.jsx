// Fld — labelled form field wrapper used in all editor panels
export default function Field({ label, half, children }) {
  return (
    <div style={{ marginBottom: half ? 0 : 13, flex: half ? 1 : undefined }}>
      <label
        style={{
          display: "block",
          fontSize: 10,
          fontWeight: 700,
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: 0.9,
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
