import { ELEMENTS } from "../constants/elements";

// ─────────────────────────────────────────────────────────────
// ID COUNTERS  (module-scoped so they persist across calls)
// ─────────────────────────────────────────────────────────────
let _pid = 3;
let _sid = 20;
let _eid = 100;

// ─────────────────────────────────────────────────────────────
// FACTORIES
// ─────────────────────────────────────────────────────────────

/**
 * Creates a new element of the given type with deep-cloned defaults.
 * @param {string} type - Key from ELEMENTS constant
 */
export const mkEl = (type) => ({
  id: ++_eid,
  type,
  ...JSON.parse(JSON.stringify(ELEMENTS[type].defaults)),
});

/**
 * Creates a new blank section with default styling.
 */
export const mkSection = () => ({
  id: ++_sid,
  bg: "#ffffff",
  paddingTop: 48,
  paddingBottom: 48,
  paddingLeft: 32,
  paddingRight: 32,
  maxWidth: "900px",
  elements: [],
});

/**
 * Creates a new blank page.
 * @param {string} name - Page name
 */
export const mkPage = (name) => ({
  id: ++_pid,
  name: name.trim(),
  sections: [],
});

// ─────────────────────────────────────────────────────────────
// SEED DATA  (shown on first load)
// ─────────────────────────────────────────────────────────────
export const initPages = [
  {
    id: 1,
    name: "Home",
    sections: [
      {
        id: 1,
        bg: "#0f172a",
        paddingTop: 72,
        paddingBottom: 72,
        paddingLeft: 40,
        paddingRight: 40,
        maxWidth: "860px",
        elements: [
          {
            id: 1,
            type: "heading",
            text: "Build Beautiful Pages",
            tag: "h1",
            align: "center",
            color: "#ffffff",
            fontSize: 44,
            fontWeight: 800,
          },
          {
            id: 2,
            type: "text",
            text: "An Elementor-style builder — drag elements, edit content, arrange sections.",
            align: "center",
            color: "rgba(255,255,255,0.65)",
            fontSize: 16,
            lineHeight: 1.8,
          },
          {
            id: 3,
            type: "button",
            text: "Get Started Free",
            url: "#",
            align: "center",
            bgColor: "#6d28d9",
            textColor: "#fff",
            borderRadius: 9,
            fontSize: 15,
            paddingX: 28,
            paddingY: 13,
          },
        ],
      },
      {
        id: 2,
        bg: "#f8f7ff",
        paddingTop: 56,
        paddingBottom: 56,
        paddingLeft: 40,
        paddingRight: 40,
        maxWidth: "900px",
        elements: [
          {
            id: 4,
            type: "heading",
            text: "Why Choose Us",
            tag: "h2",
            align: "center",
            color: "#111",
            fontSize: 30,
            fontWeight: 700,
          },
          {
            id: 5,
            type: "columns",
            gap: 24,
            split: "50/50",
            children: [
              [
                {
                  id: 6,
                  type: "iconbox",
                  icon: "⚡",
                  title: "Blazing Fast",
                  text: "Built for performance at every level of scale.",
                  align: "center",
                  accentColor: "#6d28d9",
                },
              ],
              [
                {
                  id: 7,
                  type: "iconbox",
                  icon: "🔒",
                  title: "Secure by Default",
                  text: "Enterprise-grade security baked in from day one.",
                  align: "center",
                  accentColor: "#6d28d9",
                },
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "About",
    sections: [
      {
        id: 10,
        bg: "#fff",
        paddingTop: 48,
        paddingBottom: 48,
        paddingLeft: 32,
        paddingRight: 32,
        maxWidth: "860px",
        elements: [
          {
            id: 11,
            type: "heading",
            text: "About Us",
            tag: "h1",
            align: "left",
            color: "#111",
            fontSize: 36,
            fontWeight: 800,
          },
          {
            id: 12,
            type: "text",
            text: "We are a team of passionate creators.",
            align: "left",
            color: "#555",
            fontSize: 15,
            lineHeight: 1.8,
          },
        ],
      },
    ],
  },
  { id: 3, name: "Contact", sections: [] },
];
