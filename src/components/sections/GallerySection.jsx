/**
 * GallerySection
 * CSS grid image gallery with optional heading and captions.
 */
export default function GallerySection({ section }) {
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
        {/* Header */}
        {(p.heading || p.subheading) && (
          <div style={{ textAlign: "center", marginBottom: 40 }}>
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
              <p style={{ margin: 0, color: "#777", fontSize: 15, lineHeight: 1.7 }}>
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
            gap: c.gap || 12,
          }}
        >
          {p.images.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                background: "#f0f0f0",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {p.showCaptions && img.caption && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "20px 12px 10px",
                  }}
                >
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
