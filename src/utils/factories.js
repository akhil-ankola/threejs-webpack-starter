import { ELEMENTS } from "../constants/elements";
import { SECTION_TEMPLATES } from "../constants/sectionTemplates";

let _pid = 3;
let _sid = 20;
let _eid = 100;

export const mkEl = (type) => ({
  id: ++_eid,
  type,
  ...JSON.parse(JSON.stringify(ELEMENTS[type].defaults)),
});

export const mkSection = () => ({
  id: ++_sid,
  sectionType: "custom",
  props: {},
  config: {
    bg: "#ffffff",
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 32,
    paddingRight: 32,
    maxWidth: "900px",
  },
  elements: [],
});

export const mkSectionFromTemplate = (templateKey) => {
  if (templateKey === "custom") return mkSection();
  const tpl = SECTION_TEMPLATES[templateKey];
  if (!tpl) return mkSection();
  return {
    id: ++_sid,
    sectionType: templateKey,
    props: JSON.parse(JSON.stringify(tpl.defaultProps)),
    config: JSON.parse(JSON.stringify(tpl.defaultConfig)),
    elements: [],
  };
};

/**
 * Creates a new blank page.
 * slug is required — it drives the public URL (/about-us, /contact, etc.)
 * and the localStorage key (pb:page:{slug}).
 *
 * @param {string} name  Display name, e.g. "About Us"
 * @param {string} slug  URL slug, e.g. "about-us"
 */
export const mkPage = (name, slug) => ({
  id: ++_pid,
  name: name.trim(),
  slug: slug.trim(),
  sections: [],
});

export const initPages = [
  {
    id: 1,
    name: "Home",
    slug: "home",
    sections: [
      {
        id: 1,
        sectionType: "hero",
        props: {
          heading: "Build Beautiful Pages",
          subtext:
            "An Elementor-style builder — drag elements, edit content, arrange sections. Works seamlessly with WordPress and Shopify.",
          ctaText: "Get Started Free",
          ctaUrl: "/about",
          ctaSecondaryText: "See how it works",
          ctaSecondaryUrl: "#",
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80",
          imagePosition: "right",
          layout: "left",
        },
        config: {
          bg: "#0f172a",
          accentColor: "#6d28d9",
          headingColor: "#ffffff",
          textColor: "rgba(255,255,255,0.7)",
          paddingTop: 80,
          paddingBottom: 80,
          paddingLeft: 40,
          paddingRight: 40,
          maxWidth: "1100px",
        },
        elements: [],
      },
      {
        id: 2,
        sectionType: "usp",
        props: {
          heading: "Why Choose Our Builder",
          subheading:
            "Everything your agency needs to move faster and deliver better.",
          columns: 3,
          items: [
            {
              icon: "⚡",
              title: "Blazing Fast",
              text: "Built for performance at every level of scale.",
            },
            {
              icon: "🔒",
              title: "Secure by Default",
              text: "Enterprise-grade security baked in from day one.",
            },
            {
              icon: "🎯",
              title: "Conversion Focused",
              text: "Every layout decision backed by real-world data.",
            },
          ],
        },
        config: {
          bg: "#f8f7ff",
          accentColor: "#6d28d9",
          paddingTop: 72,
          paddingBottom: 72,
          paddingLeft: 40,
          paddingRight: 40,
          maxWidth: "1100px",
        },
        elements: [],
      },
    ],
  },
  {
    id: 2,
    name: "About",
    slug: "about",
    sections: [
      {
        id: 10,
        sectionType: "custom",
        props: {},
        config: {
          bg: "#fff",
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: 32,
          paddingRight: 32,
          maxWidth: "860px",
        },
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
            text: "We are a team of passionate creators building tools that help agencies deliver better websites, faster.",
            align: "left",
            color: "#555",
            fontSize: 15,
            lineHeight: 1.8,
          },
        ],
      },
    ],
  },
  { id: 3, name: "Contact", slug: "contact", sections: [] },
];
