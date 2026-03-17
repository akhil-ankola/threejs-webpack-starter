/**
 * PublicFooter
 * Simple footer for the public site. Easily customised or replaced.
 */
import { Link } from "react-router-dom";
import { usePublicNav } from "../../hooks/usePublicPages";

export default function PublicFooter() {
  const { navItems } = usePublicNav();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0f172a",
        color: "rgba(255,255,255,0.6)",
        padding: "40px 24px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                background: "#6d28d9",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "#fff",
              }}
            >
              ✦
            </div>
            <span
              style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}
            >
              PageBuilder
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, maxWidth: 220 }}>
            Build beautiful pages for WordPress & Shopify — without the complexity.
          </p>
        </div>

        {/* Nav links */}
        {navItems.length > 0 && (
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "rgba(255,255,255,0.35)",
                marginBottom: 10,
              }}
            >
              Pages
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.slug}`}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: 13,
                    transition: "color 0.1s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.55)")
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard link */}
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 10,
            }}
          >
            Admin
          </div>
          <Link
            to="/dashboard"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            ✦ Open Dashboard →
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: 1100,
          margin: "28px auto 0",
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: 11,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        © {year} PageBuilder. Built with React + Vite.
      </div>
    </footer>
  );
}
