import { useState } from "react";
import { SECTION_TEMPLATES, SECTION_TEMPLATE_GROUPS } from "../../constants/sectionTemplates";
import { usePageBuilder } from "../../context/PageBuilderContext";

// ── Thumbnail previews (CSS-only, no images needed) ──────────
function Thumbnail({ type }) {
  const thumbs = {
    hero: (
      <div style={{ background: "#0f172a", height: "100%", padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "#fff", height: 8, borderRadius: 3, marginBottom: 5, width: "80%" }} />
          <div style={{ background: "rgba(255,255,255,0.4)", height: 4, borderRadius: 2, marginBottom: 4, width: "90%" }} />
          <div style={{ background: "rgba(255,255,255,0.4)", height: 4, borderRadius: 2, marginBottom: 8, width: "70%" }} />
          <div style={{ background: "#6d28d9", height: 12, borderRadius: 4, width: 48, display: "inline-block" }} />
        </div>
        <div style={{ width: 44, height: 36, background: "rgba(255,255,255,0.1)", borderRadius: 5, flexShrink: 0 }} />
      </div>
    ),
    zigzag: (
      <div style={{ background: "#fff", height: "100%", padding: "6px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
            <div style={{ width: 28, height: 20, background: "#e8e8f0", borderRadius: 3, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ background: "#222", height: 4, borderRadius: 2, marginBottom: 3, width: "70%" }} />
              <div style={{ background: "#ddd", height: 3, borderRadius: 2, width: "90%" }} />
            </div>
          </div>
        ))}
      </div>
    ),
    usp: (
      <div style={{ background: "#f8f7ff", height: "100%", padding: "8px 10px" }}>
        <div style={{ background: "#222", height: 5, borderRadius: 2, width: "50%", margin: "0 auto 8px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 4, padding: 4 }}>
              <div style={{ width: 10, height: 10, background: "#ede9fe", borderRadius: 3, marginBottom: 3 }} />
              <div style={{ background: "#333", height: 3, borderRadius: 1, marginBottom: 2, width: "80%" }} />
              <div style={{ background: "#ddd", height: 2, borderRadius: 1, width: "90%" }} />
            </div>
          ))}
        </div>
      </div>
    ),
    faq: (
      <div style={{ background: "#fff", height: "100%", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ background: "#222", height: 5, borderRadius: 2, width: "60%", margin: "0 auto 4px" }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 4, padding: "4px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ background: "#555", height: 3, borderRadius: 1, width: "65%" }} />
            <div style={{ color: "#6d28d9", fontSize: 10, fontWeight: 700 }}>+</div>
          </div>
        ))}
      </div>
    ),
    gallery: (
      <div style={{ background: "#fff", height: "100%", padding: "6px 10px" }}>
        <div style={{ background: "#222", height: 4, borderRadius: 2, width: "40%", margin: "0 auto 6px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: 18, background: "#e8e8f0", borderRadius: 3 }} />
          ))}
        </div>
      </div>
    ),
    testimonials: (
      <div style={{ background: "#f8f7ff", height: "100%", padding: "8px 10px" }}>
        <div style={{ background: "#222", height: 4, borderRadius: 2, width: "55%", margin: "0 auto 7px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 4, padding: 5, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ color: "#6d28d9", fontSize: 9, marginBottom: 2 }}>❝</div>
              <div style={{ background: "#ddd", height: 2, borderRadius: 1, marginBottom: 2 }} />
              <div style={{ background: "#ddd", height: 2, borderRadius: 1, width: "70%" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6d28d9" }} />
                <div style={{ background: "#bbb", height: 2, borderRadius: 1, flex: 1 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    custom: (
      <div style={{ background: "#fff", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <div style={{ fontSize: 22, color: "#c4b5fd" }}>✦</div>
        <div style={{ background: "#e5e7eb", height: 3, borderRadius: 2, width: 40 }} />
        <div style={{ border: "1.5px dashed #c4b5fd", borderRadius: 5, padding: "3px 10px" }}>
          <div style={{ background: "#c4b5fd", height: 3, borderRadius: 1, width: 24 }} />
        </div>
      </div>
    ),
  };

  return (
    <div style={{ height: 80, borderRadius: "8px 8px 0 0", overflow: "hidden", background: "#f5f5f8" }}>
      {thumbs[type] || <div style={{ height: "100%", background: "#f0f0f5" }} />}
    </div>
  );
}

// ── Main Modal ───────────────────────────────────────────────
export default function SectionPicker() {
  const { showSectionPicker, setShowSectionPicker, addSectionFromTemplate } = usePageBuilder();
  const [hoveredKey, setHoveredKey] = useState(null);

  if (!showSectionPicker) return null;

  const handlePick = (templateKey) => {
    addSectionFromTemplate(templateKey);
    setShowSectionPicker(false);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={() => setShowSectionPicker(false)}
    >
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,20,0.55)", backdropFilter: "blur(4px)" }} />

      {/* Modal */}
      <div
        style={{
          position: "relative", zIndex: 1,
          background: "#fff", borderRadius: 18,
          width: 680, maxHeight: "85vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#111", letterSpacing: -0.3 }}>Add Section</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>
                Choose a predefined template or start from scratch
              </div>
            </div>
            <button
              onClick={() => setShowSectionPicker(false)}
              style={{ background: "#f3f3f5", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 15, color: "#666", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 24px" }}>
          {SECTION_TEMPLATE_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: 28 }}>
              {/* Group label */}
              <div style={{ fontSize: 10, fontWeight: 700, color: "#bbb", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 12 }}>
                {group.label}
              </div>

              {/* Cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: group.label === "From Scratch" ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
                {group.items.map((key) => {
                  const tpl = SECTION_TEMPLATES[key];
                  const isHovered = hoveredKey === key;
                  const isCustom = key === "custom";

                  return (
                    <button
                      key={key}
                      onClick={() => handlePick(key)}
                      onMouseEnter={() => setHoveredKey(key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      style={{
                        background: "#fff",
                        border: `2px solid ${isHovered ? "#6d28d9" : "#eaeaea"}`,
                        borderRadius: 10,
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0,
                        overflow: "hidden",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                        boxShadow: isHovered ? "0 4px 20px rgba(109,40,217,0.15)" : "0 1px 4px rgba(0,0,0,0.06)",
                        ...(isCustom ? { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" } : {}),
                      }}
                    >
                      {isCustom ? (
                        <>
                          <div style={{ width: 40, height: 40, background: "#f3f0ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                            {tpl.icon}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: isHovered ? "#6d28d9" : "#111", marginBottom: 3 }}>{tpl.label}</div>
                            <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>{tpl.description}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Thumbnail type={key} />
                          <div style={{ padding: "10px 12px 12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                              <span style={{ fontSize: 14 }}>{tpl.icon}</span>
                              <span style={{ fontWeight: 700, fontSize: 13, color: isHovered ? "#6d28d9" : "#111" }}>{tpl.label}</span>
                            </div>
                            <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>{tpl.description}</div>
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
