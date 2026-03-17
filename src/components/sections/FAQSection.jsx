import { useState } from "react";

/**
 * FAQSection
 * Accordion-style FAQ. Each item expands/collapses on click.
 */
export default function FAQSection({ section }) {
  const { props: p, config: c } = section;
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <div
      style={{
        background: c.bg,
        paddingTop: c.paddingTop,
        paddingBottom: c.paddingBottom,
        paddingLeft: c.paddingLeft,
        paddingRight: c.paddingRight,
      }}
    >
      <div style={{ maxWidth: c.maxWidth, margin: "0 auto" }}>
        {/* Header */}
        {(p.heading || p.subheading) && (
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            {p.heading && (
              <h2
                style={{
                  margin: "0 0 14px",
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#111",
                  letterSpacing: -0.3,
                }}
              >
                {p.heading}
              </h2>
            )}
            {p.subheading && (
              <p
                style={{
                  margin: 0,
                  color: "#666",
                  fontSize: 16,
                  lineHeight: 1.7,
                }}
              >
                {p.subheading}
              </p>
            )}
          </div>
        )}

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {p.items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{
                  border: `1.5px solid ${isOpen ? c.accentColor + "44" : "#eaeaea"}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    background: isOpen ? `${c.accentColor}08` : "#fff",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 12,
                    transition: "background 0.15s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: isOpen ? c.accentColor : "#222",
                      flex: 1,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      color: isOpen ? c.accentColor : "#bbb",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s, color 0.2s",
                      display: "inline-block",
                      fontWeight: 300,
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0 22px 20px",
                      background: `${c.accentColor}08`,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#555",
                        fontSize: 14,
                        lineHeight: 1.8,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
