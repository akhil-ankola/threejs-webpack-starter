import { buildSavePayload } from "../utils/serializer";

const now = new Date().toISOString();

const homePage = {
  id: 1, name: "Home", slug: "home",
  sections: [
    {
      id: 101, bg: "#0f172a", paddingTop: 80, paddingBottom: 80, paddingLeft: 40, paddingRight: 40, maxWidth: "860px",
      elements: [
        { id: 1001, type: "heading", text: "Build Beautiful Pages", tag: "h1", align: "center", color: "#ffffff", fontSize: 44, fontWeight: 800 },
        { id: 1002, type: "text", text: "An Elementor-style builder — drag elements, edit content, arrange sections. Save generates real JSON stored in your database.", align: "center", color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8 },
        { id: 1003, type: "button", text: "Get Started Free", url: "#", align: "center", bgColor: "#6d28d9", textColor: "#fff", borderRadius: 9, fontSize: 15, paddingX: 28, paddingY: 13 },
      ],
    },
    {
      id: 102, bg: "#f8f7ff", paddingTop: 56, paddingBottom: 56, paddingLeft: 40, paddingRight: 40, maxWidth: "900px",
      elements: [
        { id: 1004, type: "heading", text: "Why Choose Us", tag: "h2", align: "center", color: "#111", fontSize: 30, fontWeight: 700 },
        {
          id: 1005, type: "columns", gap: 24, split: "50/50",
          children: [
            [{ id: 1006, type: "iconbox", icon: "⚡", title: "Blazing Fast", text: "Built for performance at every level of scale.", align: "center", accentColor: "#6d28d9" }],
            [{ id: 1007, type: "iconbox", icon: "🔒", title: "Secure by Default", text: "Enterprise-grade security baked in from day one.", align: "center", accentColor: "#6d28d9" }],
          ],
        },
      ],
    },
    {
      id: 103, bg: "#ffffff", paddingTop: 56, paddingBottom: 56, paddingLeft: 40, paddingRight: 40, maxWidth: "860px",
      elements: [
        { id: 1008, type: "heading", text: "What Our Users Say", tag: "h2", align: "center", color: "#111", fontSize: 28, fontWeight: 700 },
        { id: 1009, type: "testimonial", quote: "This page builder saved us weeks of development time. Absolutely love it.", name: "Sarah M.", role: "CEO, TechCorp", avatarInitials: "SM", accentColor: "#6d28d9" },
      ],
    },
  ],
};

const aboutPage = {
  id: 2, name: "About", slug: "about",
  sections: [
    {
      id: 201, bg: "#ffffff", paddingTop: 64, paddingBottom: 64, paddingLeft: 40, paddingRight: 40, maxWidth: "860px",
      elements: [
        { id: 2001, type: "heading", text: "About Us", tag: "h1", align: "left", color: "#111", fontSize: 40, fontWeight: 800 },
        { id: 2002, type: "text", text: "We are a passionate team of builders who believe great tools should be accessible to everyone. Our page builder gives you the power of a full CMS without the complexity.", align: "left", color: "#555", fontSize: 16, lineHeight: 1.85 },
        { id: 2003, type: "divider", color: "#e5e7eb", thickness: 1, width: 100, style: "solid", marginY: 24 },
        { id: 2004, type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80", alt: "Our team", width: 100, align: "center", borderRadius: 12 },
      ],
    },
  ],
};

// Serialize as if they were saved via the builder
export const SEED_DB_PAGES = [homePage, aboutPage].map((page) => ({
  ...buildSavePayload(page).page,
  meta: { savedAt: now, version: "1.0.0", builderVersion: "page-builder@2.0.0" },
  _savedAt: now,
}));
