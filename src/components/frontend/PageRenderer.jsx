/**
 * PageRenderer
 * ─────────────────────────────────────────────────────────────
 * The heart of the frontend renderer.
 *
 * Receives a full page object and renders every section in order.
 * For predefined sections  → delegates to SECTION_RENDERERS
 * For custom sections      → delegates to FrontendCustomSection
 *
 * This is intentionally the ONLY place that knows the mapping rules.
 * Adding a new section type: register it in constants/sectionTemplates.js,
 * build the renderer in components/sections/, add to SECTION_RENDERERS —
 * PageRenderer picks it up automatically.
 */

import { SECTION_RENDERERS } from "../sections/index.jsx";
import FrontendCustomSection from "./FrontendCustomSection";

/** Render a single section, dispatching by sectionType */
function SectionRenderer({ section }) {
  if (section.sectionType === "custom") {
    return <FrontendCustomSection section={section} />;
  }

  const Renderer = SECTION_RENDERERS[section.sectionType];

  if (!Renderer) {
    // Graceful fallback: unknown future section type — render nothing in prod
    if (import.meta.env.DEV) {
      return (
        <div
          style={{
            padding: "24px 32px",
            background: "#fff3cd",
            borderLeft: "4px solid #f59e0b",
            fontSize: 13,
            color: "#92400e",
          }}
        >
          <strong>Unknown section type:</strong> "{section.sectionType}" — add a
          renderer in components/sections/ and register it in SECTION_RENDERERS.
        </div>
      );
    }
    return null;
  }

  return <Renderer section={section} />;
}

/**
 * PageRenderer
 * @param {{ page: Object }} props
 */
export default function PageRenderer({ page }) {
  if (!page || !Array.isArray(page.sections)) return null;

  return (
    <main>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
