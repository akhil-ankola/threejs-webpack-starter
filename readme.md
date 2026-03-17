# PageBuilder — React Admin Panel

A scalable, agency-grade page builder for WordPress & Shopify projects.
Built in React with a clean separation of concerns and industry-standard folder structure.

---

## Folder Structure

```
src/
├── App.jsx                        # Root component, wraps context provider
├── index.js                       # ReactDOM entry point
│
├── constants/
│   └── elements.js                # All element type definitions & groups
│
├── context/
│   └── PageBuilderContext.jsx     # Global state + all actions (Context API)
│
├── hooks/
│   └── usePagePersistence.js      # Auto-save / load from localStorage
│
├── services/
│   └── pageService.js             # API abstraction (swap for real API)
│
├── styles/
│   └── common.js                  # Shared inline-style tokens
│
├── utils/
│   └── factories.js               # mkEl / mkSection / mkPage factories + seed data
│
├── components/
│   ├── ui/                        # Primitive reusable form inputs
│   │   ├── Field.jsx              # Labelled field wrapper
│   │   ├── SelectInput.jsx        # <select> styled input
│   │   ├── NumberInput.jsx        # <input type="number">
│   │   └── ColorInput.jsx         # <input type="color">
│   │
│   ├── elements/                  # Pure element renderers (canvas view)
│   │   ├── index.jsx              # ElHeading, ElText, ElImage … + ELEMENT_COMPONENTS map
│   │   └── RenderElement.jsx      # Drag/select wrapper that delegates to El* components
│   │
│   ├── editors/
│   │   └── index.jsx              # EdHeading, EdText … + EDITORS map
│   │
│   ├── canvas/
│   │   ├── Canvas.jsx             # Main editing area, renders sections
│   │   └── CanvasSection.jsx      # One section with drag, elements, add button
│   │
│   ├── sidebar/
│   │   ├── Sidebar.jsx            # Left panel + tab navigation
│   │   ├── PagesTab.jsx           # Page list + create form
│   │   ├── LayersTab.jsx          # Section/element tree
│   │   └── LayerRow.jsx           # Single section row in layers
│   │
│   ├── panels/
│   │   ├── RightPanel.jsx         # Properties panel (element or section)
│   │   ├── SectionSettings.jsx    # Section bg/padding/width editor
│   │   └── Topbar.jsx             # Top nav bar with brand + export
│   │
│   └── modals/
│       └── ElementPicker.jsx      # Widget selection modal
│
└── pages/
    └── PageBuilderPage.jsx        # Top-level layout composing all panels
```

---

## Getting Started

```bash
npm install
npm start
```

---

## State Management

This project uses **React Context API** (`PageBuilderContext.jsx`).

**Why Context over Zustand/Redux?**

| Factor            | Context API              | Zustand               |
|-------------------|--------------------------|-----------------------|
| Bundle size       | Zero (built-in)          | +3KB                  |
| Boilerplate       | Minimal                  | Minimal               |
| DevTools          | React DevTools           | Dedicated plugin      |
| Re-render control | Manual with `useMemo`    | Automatic slice-based |
| Upgrade path      | Easy → Zustand           | —                     |

For this scale, Context is ideal. If the app grows to 10+ pages with complex
optimistic updates, migrate to **Zustand** by replacing `PageBuilderContext.jsx`
with a Zustand store — the component API stays identical.

---

## Data Shape

Each page stores its structure as JSON:

```json
{
  "id": 1,
  "name": "Home",
  "sections": [
    {
      "id": 1,
      "bg": "#ffffff",
      "paddingTop": 48,
      "paddingBottom": 48,
      "paddingLeft": 32,
      "paddingRight": 32,
      "maxWidth": "900px",
      "elements": [
        {
          "id": 101,
          "type": "heading",
          "text": "Hello World",
          "tag": "h1",
          "align": "center",
          "color": "#111",
          "fontSize": 40,
          "fontWeight": 700
        }
      ]
    }
  ]
}
```

This JSON is framework-agnostic and can be consumed by:
- **WordPress** — Custom REST endpoint or ACF JSON field
- **Shopify** — Metafields or custom liquid template parser
- **Headless CMS** — Contentful, Sanity, Storyblok rich-text/block fields

---

## Adding a New Element Type

1. **Register it** in `src/constants/elements.js`:
   ```js
   myWidget: {
     label: "My Widget",
     icon: "🧩",
     defaults: { title: "Hello", color: "#333" },
   }
   ```

2. **Add it to a group** in `ELEMENT_GROUPS` (same file).

3. **Create the renderer** in `src/components/elements/index.jsx`:
   ```jsx
   export function ElMyWidget({ el }) {
     return <div style={{ color: el.color }}>{el.title}</div>;
   }
   ```
   Then add it to `ELEMENT_COMPONENTS`.

4. **Create the editor** in `src/components/editors/index.jsx`:
   ```jsx
   export function EdMyWidget({ el, oc }) {
     return (
       <Field label="Title">
         <input value={el.title} onChange={e => oc({ ...el, title: e.target.value })} />
       </Field>
     );
   }
   ```
   Then add it to `EDITORS`.

That's it — the element is now fully integrated.

---

## Connecting to an API

Edit `src/services/pageService.js`. Each function has a comment
showing the equivalent REST endpoint. Example for WordPress:

```js
export async function fetchPages() {
  const res = await fetch("/wp-json/pb/v1/pages", {
    headers: { "X-WP-Nonce": window.pbNonce },
  });
  return res.json();
}
```

Enable auto-save by using the `usePagePersistence` hook inside
`PageBuilderContext.jsx`.

---

## Roadmap / Future Features

- [ ] Undo / Redo (useReducer + history stack)
- [ ] Page preview mode (read-only render)
- [ ] Global styles panel (brand colors, fonts)
- [ ] Reusable block library
- [ ] Multi-language / i18n support
- [ ] Role-based access (editor vs admin)
- [ ] Real-time collaboration (WebSockets)
