/**
 * PublicHeader
 * ─────────────────────────────────────────────────────────────
 * Dynamic site header. Reads the page index from storage and
 * renders a nav link for every saved page.
 *
 * Active link is highlighted via React Router's NavLink.
 *
 * Designed to be styled globally — brand name / logo, link colours,
 * and the "Edit in Dashboard" CTA are all easy to customise.
 */

import { NavLink, Link } from "react-router-dom";
import { usePublicNav } from "../../hooks/usePublicPages";

export default function PublicHeader() {
  const { navItems, loading } = usePublicNav();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 58,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Brand */}
        <Link
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            textDecoration: "none",
            marginRight: 16,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "#6d28d9",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            ✦
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: 15,
              color: "#111",
              letterSpacing: -0.3,
            }}
          >
            PageBuilder
          </span>
        </Link>

        {/* Dynamic nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {!loading &&
            navItems.map((item) => (
              <NavLink
                key={item.id}
                to={`/${item.slug}`}
                style={({ isActive }) => ({
                  padding: "6px 12px",
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#6d28d9" : "#444",
                  background: isActive ? "#ede9fe" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.12s",
                })}
              >
                {item.name}
              </NavLink>
            ))}
        </nav>

        {/* Edit in Dashboard CTA */}
        <Link
          to="/dashboard"
          style={{
            padding: "6px 14px",
            background: "#f3f0ff",
            color: "#6d28d9",
            border: "1.5px solid #c4b5fd",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 12,
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          ✦ Dashboard
        </Link>
      </div>
    </header>
  );
}
