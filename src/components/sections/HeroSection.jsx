/**
 * HeroSection
 * Renders a hero section with headline, subtext, CTA buttons and optional image.
 * Supports layout: "center" (text centered, no image) | "left" (text+image split)
 * imagePosition: "right" | "none" | "background"
 */
export default function HeroSection({ section }) {
  const { props: p, config: c } = section;
  const isCenter = p.layout === "center";
  const hasSplitImage = p.imagePosition === "right" && !isCenter;
  const hasBgImage = p.imagePosition === "background";

  const wrapStyle = {
    background: hasBgImage
      ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${p.image}) center/cover no-repeat`
      : c.bg,
    paddingTop: c.paddingTop,
    paddingBottom: c.paddingBottom,
    paddingLeft: c.paddingLeft,
    paddingRight: c.paddingRight,
  };

  const inner = (
    <div
      style={{
        maxWidth: c.maxWidth,
        margin: "0 auto",
        display: "flex",
        flexDirection: hasSplitImage ? "row" : "column",
        alignItems: "center",
        gap: hasSplitImage ? 56 : 0,
        textAlign: isCenter ? "center" : "left",
      }}
    >
      {/* Text block */}
      <div style={{ flex: hasSplitImage ? "1 1 50%" : undefined }}>
        <h1
          style={{
            margin: "0 0 18px",
            color: c.headingColor,
            fontSize: isCenter ? 52 : 44,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: -0.5,
          }}
        >
          {p.heading}
        </h1>
        <p
          style={{
            margin: "0 0 32px",
            color: c.textColor,
            fontSize: 17,
            lineHeight: 1.75,
            maxWidth: isCenter ? 560 : undefined,
            ...(isCenter ? { marginLeft: "auto", marginRight: "auto" } : {}),
          }}
        >
          {p.subtext}
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: isCenter ? "center" : "flex-start",
            flexWrap: "wrap",
          }}
        >
          {p.ctaText && (
            <a
              href={p.ctaUrl}
              style={{
                padding: "13px 28px",
                background: c.accentColor,
                color: "#fff",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {p.ctaText}
            </a>
          )}
          {p.ctaSecondaryText && (
            <a
              href={p.ctaSecondaryUrl}
              style={{
                padding: "13px 28px",
                background: "transparent",
                color: c.headingColor,
                border: `1.5px solid ${c.headingColor}44`,
                borderRadius: 9,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {p.ctaSecondaryText} →
            </a>
          )}
        </div>
      </div>

      {/* Image block (split layout only) */}
      {hasSplitImage && p.image && (
        <div style={{ flex: "1 1 50%" }}>
          <img
            src={p.image}
            alt=""
            style={{
              width: "100%",
              borderRadius: 16,
              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              display: "block",
            }}
          />
        </div>
      )}
    </div>
  );

  return <div style={wrapStyle}>{inner}</div>;
}
