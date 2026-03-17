import { Link } from "react-router-dom";
import PublicHeader from "../components/frontend/PublicHeader";
import PublicFooter from "../components/frontend/PublicFooter";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter','Segoe UI',sans-serif",
      }}
    >
      <PublicHeader />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 8, lineHeight: 1 }}>404</div>
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: 28,
            fontWeight: 800,
            color: "#111",
          }}
        >
          This page doesn't exist
        </h1>
        <p
          style={{
            color: "#777",
            fontSize: 15,
            marginBottom: 28,
            maxWidth: 360,
            lineHeight: 1.6,
          }}
        >
          You may have followed a broken link or typed a URL that hasn't been
          created yet.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <Link
            to="/home"
            style={{
              padding: "10px 22px",
              background: "#6d28d9",
              color: "#fff",
              borderRadius: 9,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            ← Go Home
          </Link>
          <Link
            to="/dashboard"
            style={{
              padding: "10px 22px",
              background: "#f3f3f5",
              color: "#444",
              borderRadius: 9,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Open Dashboard
          </Link>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
