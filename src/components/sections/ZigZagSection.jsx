/**
 * ZigZagSection
 * Renders alternating image/text rows. Each row's layout can be "left" (image
 * left, text right) or "right" (text left, image right).
 */
export default function ZigZagSection({ section }) {
  const { props: p, config: c } = section;

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
      <div
        style={{
          maxWidth: c.maxWidth,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 72,
        }}
      >
        {p.rows.map((row, i) => {
          const imageLeft = row.layout === "left";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: imageLeft ? "row" : "row-reverse",
                alignItems: "center",
                gap: 56,
              }}
            >
              {/* Image */}
              <div style={{ flex: "1 1 45%" }}>
                <img
                  src={row.image}
                  alt={row.heading}
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                    display: "block",
                    objectFit: "cover",
                    maxHeight: 340,
                  }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: "1 1 50%" }}>
                <div
                  style={{
                    width: 40,
                    height: 4,
                    background: c.accentColor,
                    borderRadius: 4,
                    marginBottom: 18,
                  }}
                />
                <h2
                  style={{
                    margin: "0 0 14px",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1.25,
                  }}
                >
                  {row.heading}
                </h2>
                <p
                  style={{
                    margin: "0 0 24px",
                    color: "#555",
                    fontSize: 15,
                    lineHeight: 1.75,
                  }}
                >
                  {row.text}
                </p>
                {row.ctaText && (
                  <a
                    href={row.ctaUrl}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: c.accentColor,
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {row.ctaText} →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
