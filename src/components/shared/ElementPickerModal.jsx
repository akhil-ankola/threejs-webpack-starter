import { ELEMENT_REGISTRY, ELEMENT_GROUPS } from "../../constants/elements";

export function ElementPickerModal({ onPick, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,20,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", background: "#fff", borderRadius: 16, padding: "24px 22px", width: 460, maxHeight: "80vh", overflowY: "auto", boxShadow: "0 40px 100px rgba(0,0,0,0.25)", zIndex: 1 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>Add Element</div>
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Pick a widget to insert</div>
          </div>
          <button onClick={onClose} style={{ background: "#f3f3f5", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 15, color: "#666", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {ELEMENT_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>{group.label}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {group.items.map((type) => {
                const def = ELEMENT_REGISTRY[type];
                return (
                  <button key={type} onClick={() => { onPick(type); onClose(); }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: "#f8f8fb", border: "1.5px solid #ebebeb", borderRadius: 10, cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6d28d9"; e.currentTarget.style.background = "#ede9fe"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ebebeb"; e.currentTarget.style.background = "#f8f8fb"; }}>
                    <span style={{ fontSize: 22 }}>{def.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#333" }}>{def.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
