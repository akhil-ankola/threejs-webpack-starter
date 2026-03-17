/**
 * TestimonialsSection
 * Renders testimonial cards in grid or list layout.
 */
export default function TestimonialsSection({ section }) {
  const { props: p, config: c } = section;
  const isGrid = p.layout === "grid";

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
                  margin: "0 0 12px",
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
              <p style={{ margin: 0, color: "#666", fontSize: 15, lineHeight: 1.7 }}>
                {p.subheading}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        <div
          style={
            isGrid
              ? {
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(p.items.length, 3)}, 1fr)`,
                  gap: 24,
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  maxWidth: 680,
                  margin: "0 auto",
                }
          }
        >
          {p.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "28px 24px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                border: `1.5px solid ${c.accentColor}18`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontSize: 28,
                  color: c.accentColor,
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                }}
              >
                ❝
              </div>

              {/* Quote text */}
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: 14,
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  flex: 1,
                }}
              >
                {item.quote}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: c.accentColor,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  {item.avatarInitials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#111", fontSize: 13 }}>
                    {item.name}
                  </div>
                  <div style={{ color: "#999", fontSize: 11, marginTop: 1 }}>
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
