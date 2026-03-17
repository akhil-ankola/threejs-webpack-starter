// ─────────────────────────────────────────────────────────────
// ELEMENT DEFINITIONS
// Defines all available widget types, their icons, and default props.
// Add new element types here to extend the builder.
// ─────────────────────────────────────────────────────────────

export const ELEMENTS = {
  heading: {
    label: "Heading",
    icon: "H",
    defaults: {
      text: "Your Heading Here",
      tag: "h2",
      align: "left",
      color: "#111111",
      fontSize: 32,
      fontWeight: 700,
    },
  },
  text: {
    label: "Text",
    icon: "¶",
    defaults: {
      text: "Write your paragraph content here. You can describe your services, tell your story, or share information with visitors.",
      align: "left",
      color: "#555555",
      fontSize: 15,
      lineHeight: 1.75,
    },
  },
  image: {
    label: "Image",
    icon: "🖼",
    defaults: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      alt: "Image",
      width: 100,
      align: "center",
      borderRadius: 8,
    },
  },
  button: {
    label: "Button",
    icon: "▶",
    defaults: {
      text: "Click Me",
      url: "#",
      align: "left",
      bgColor: "#6d28d9",
      textColor: "#ffffff",
      borderRadius: 8,
      fontSize: 14,
      paddingX: 24,
      paddingY: 11,
    },
  },
  divider: {
    label: "Divider",
    icon: "—",
    defaults: {
      color: "#e5e7eb",
      thickness: 1,
      width: 100,
      style: "solid",
      marginY: 16,
    },
  },
  spacer: {
    label: "Spacer",
    icon: "↕",
    defaults: { height: 40 },
  },
  video: {
    label: "Video Embed",
    icon: "▷",
    defaults: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      aspectRatio: "16/9",
    },
  },
  columns: {
    label: "2 Columns",
    icon: "⊞",
    defaults: {
      gap: 24,
      split: "50/50",
      children: [[], []], // each child is an array of elements
    },
  },
  slider: {
    label: "Image Slider",
    icon: "◫",
    defaults: {
      slides: [
        {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
          caption: "Slide One",
        },
        {
          src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80",
          caption: "Slide Two",
        },
        {
          src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
          caption: "Slide Three",
        },
      ],
      showCaptions: true,
      borderRadius: 10,
    },
  },
  testimonial: {
    label: "Testimonial",
    icon: "❝",
    defaults: {
      quote:
        "This product changed everything for us. Absolutely incredible experience.",
      name: "Jane Doe",
      role: "CEO, Acme Inc.",
      avatarInitials: "JD",
      accentColor: "#6d28d9",
    },
  },
  iconbox: {
    label: "Icon Box",
    icon: "⬡",
    defaults: {
      icon: "⚡",
      title: "Feature Title",
      text: "A short description of this amazing feature or benefit.",
      align: "center",
      accentColor: "#6d28d9",
    },
  },
};

// Groups used in the Element Picker modal
export const ELEMENT_GROUPS = [
  { label: "Basic", items: ["heading", "text", "image", "button", "divider", "spacer"] },
  { label: "Media", items: ["video", "slider"] },
  { label: "Layout", items: ["columns"] },
  { label: "Content", items: ["testimonial", "iconbox"] },
];
