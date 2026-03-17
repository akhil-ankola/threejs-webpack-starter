/**
 * PageRenderer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads the saved JSON from the database and renders it as a live page.
 *
 * This is the "output" side of the builder. The flow is:
 *   1. Fetch page record from DB by slug
 *   2. deserializePage() converts DB schema → flat builder element shape
 *   3. This component walks the section/element tree and renders using
 *      the same RENDERERS map the builder canvas uses
 *
 * Result: the exact same visual output as the builder preview, from pure JSON.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { RENDERERS } from "../Canvas/ElementRenderers";

/**
 * Render a single element. Handles the "columns" type recursively.
 */
function RenderElement({ el }) {
  if (el.type === "columns") {
    return <RenderColumns el={el} />;
  }
  const Renderer = RENDERERS[el.type];
  if (!Renderer) return null;
  return <Renderer el={el} />;
}

function RenderColumns({ el }) {
  const split =
    el.split === "30/70" ? ["30%", "70%"] :
    el.split === "70/30" ? ["70%", "30%"] :
    ["50%", "50%"];
  return (
    <div style={{ display: "flex", gap: el.gap }}>
      {(el.children || [[], []]).map((col, ci) => (
        <div key={ci} style={{ width: split[ci], minWidth: 0 }}>
          {col.map((child) => (
            <div key={child.id} style={{ marginBottom: 4 }}>
              <RenderElement el={child} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Render a section from the deserialized page.
 */
function RenderSection({ section }) {
  return (
    <div
      style={{
        background:    section.bg,
        paddingTop:    section.paddingTop,
        paddingBottom: section.paddingBottom,
        paddingLeft:   section.paddingLeft,
        paddingRight:  section.paddingRight,
      }}
    >
      <div style={{ maxWidth: section.maxWidth, margin: "0 auto" }}>
        {section.elements.map((el) => (
          <div key={el.id} style={{ marginBottom: 4 }}>
            <RenderElement el={el} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PageRenderer — top-level component.
 * Accepts a `page` prop in the deserialized builder shape.
 */
export function PageRenderer({ page }) {
  if (!page) return null;
  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {page.sections.map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </div>
  );
}
