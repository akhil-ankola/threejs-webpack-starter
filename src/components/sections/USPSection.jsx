/**
 * USPSection
 * Renders a "unique selling points" grid: heading + subheading + icon cards.
 * Columns count is controlled by props.columns (2 | 3 | 4).
 */
export default function USPSection({ section }) {
  const { props: p, config: c } = section;
  const cols = p.columns || 3;

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
        {/* Section header */}
        {(p.heading || p.subheading) && (
          <div style={{ textAlign: "center", marginBottom: 52 }}>
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
                  maxWidth: 520,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {p.subheading}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 24,
          }}
        >
          {p.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "28px 24px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: `${c.accentColor}15`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#666",
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
