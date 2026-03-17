// ─────────────────────────────────────────────────────────────
// SECTION TEMPLATES
// Defines every predefined section type: its label, icon, category,
// thumbnail descriptor (rendered as CSS in the picker), default props
// and default config.
//
// HOW TO ADD A NEW TEMPLATE
//   1. Add an entry here with unique key
//   2. Create a renderer in components/sections/
//   3. Create an editor  in components/section-editors/
//   4. Register both in their respective index.jsx maps
// ─────────────────────────────────────────────────────────────

export const SECTION_TEMPLATES = {
  // ── Predefined ──────────────────────────────────────────────

  hero: {
    label: "Hero",
    icon: "🚀",
    category: "Marketing",
    description: "Full-width headline, subtext, CTA button and optional image",
    thumbnail: "hero",
    defaultProps: {
      heading: "Build Something Remarkable",
      subtext:
        "We help ambitious brands design, build, and launch digital experiences that convert visitors into customers.",
      ctaText: "Get Started Free",
      ctaUrl: "#",
      ctaSecondaryText: "See how it works",
      ctaSecondaryUrl: "#",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80",
      imagePosition: "right",   // "right" | "none" | "background"
      layout: "left",           // "left" | "center"
    },
    defaultConfig: {
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
  },

  zigzag: {
    label: "Zig-Zag",
    icon: "⇄",
    category: "Content",
    description: "Alternating image + text rows — great for feature highlights",
    thumbnail: "zigzag",
    defaultProps: {
      rows: [
        {
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
          heading: "Design That Converts",
          text: "Our data-driven design approach ensures every pixel serves a purpose. We craft experiences that guide users naturally toward action.",
          ctaText: "Learn More",
          ctaUrl: "#",
          layout: "left", // image on left
        },
        {
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80",
          heading: "Built for Performance",
          text: "Speed is a feature. Every site we build achieves 90+ Lighthouse scores out of the box, keeping your visitors engaged and your SEO healthy.",
          ctaText: "See Results",
          ctaUrl: "#",
          layout: "right", // image on right
        },
      ],
    },
    defaultConfig: {
      bg: "#ffffff",
      accentColor: "#6d28d9",
      paddingTop: 72,
      paddingBottom: 72,
      paddingLeft: 40,
      paddingRight: 40,
      maxWidth: "1000px",
    },
  },

  usp: {
    label: "USP / Features",
    icon: "⚡",
    category: "Marketing",
    description: "Icon + title + text grid — highlight your key selling points",
    thumbnail: "usp",
    defaultProps: {
      heading: "Why Brands Choose Us",
      subheading:
        "Everything you need to launch faster and grow smarter.",
      items: [
        { icon: "⚡", title: "Lightning Fast", text: "Pages that load in under 2 seconds, keeping bounce rates low and conversions high." },
        { icon: "🔒", title: "Secure by Design", text: "Enterprise-grade security baked in from day one — no bolt-ons, no compromises." },
        { icon: "📈", title: "Built to Scale", text: "Architecture that grows with you, from 100 to 10 million visitors without a hiccup." },
        { icon: "🎯", title: "Conversion Focused", text: "Every layout decision is backed by UX research and real-world A/B testing data." },
        { icon: "🤝", title: "Dedicated Support", text: "A real team that picks up the phone. Average response time under 2 hours." },
        { icon: "🔄", title: "Easy Updates", text: "Update content, images, and copy without touching a line of code." },
      ],
      columns: 3,
    },
    defaultConfig: {
      bg: "#f8f7ff",
      accentColor: "#6d28d9",
      paddingTop: 72,
      paddingBottom: 72,
      paddingLeft: 40,
      paddingRight: 40,
      maxWidth: "1100px",
    },
  },

  faq: {
    label: "FAQ",
    icon: "❓",
    category: "Content",
    description: "Accordion-style frequently asked questions section",
    thumbnail: "faq",
    defaultProps: {
      heading: "Frequently Asked Questions",
      subheading: "Everything you need to know. Can't find your answer? Reach out to our team.",
      items: [
        { question: "How long does a typical project take?", answer: "Most projects are completed within 4–8 weeks depending on scope. We'll give you a detailed timeline during our kick-off call." },
        { question: "Do you offer ongoing support after launch?", answer: "Yes — all projects include a 30-day post-launch support window, and we offer monthly retainer packages for ongoing updates and improvements." },
        { question: "What platforms do you work with?", answer: "We specialise in WordPress, Shopify, and custom React applications. We also work with headless CMS solutions like Contentful and Sanity." },
        { question: "Can I update the content myself?", answer: "Absolutely. Every site we deliver includes a training session and documentation so your team can manage day-to-day content updates with confidence." },
        { question: "How does pricing work?", answer: "We offer fixed-price project quotes based on a detailed scoping session. No hourly billing surprises — you know the cost upfront." },
      ],
    },
    defaultConfig: {
      bg: "#ffffff",
      accentColor: "#6d28d9",
      paddingTop: 72,
      paddingBottom: 72,
      paddingLeft: 40,
      paddingRight: 40,
      maxWidth: "760px",
    },
  },

  gallery: {
    label: "Gallery",
    icon: "🖼",
    category: "Media",
    description: "Masonry-style image grid with optional captions",
    thumbnail: "gallery",
    defaultProps: {
      heading: "Our Work",
      subheading: "A selection of projects we're proud of.",
      images: [
        { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80", alt: "Project 1", caption: "Brand Redesign" },
        { src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&q=80", alt: "Project 2", caption: "E-Commerce Build" },
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", alt: "Project 3", caption: "Portrait Campaign" },
        { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", alt: "Project 4", caption: "SaaS Dashboard" },
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", alt: "Project 5", caption: "Analytics Platform" },
        { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", alt: "Project 6", caption: "Team Portal" },
      ],
      columns: 3,
      showCaptions: true,
    },
    defaultConfig: {
      bg: "#ffffff",
      gap: 12,
      paddingTop: 64,
      paddingBottom: 64,
      paddingLeft: 40,
      paddingRight: 40,
      maxWidth: "1100px",
    },
  },

  testimonials: {
    label: "Testimonials",
    icon: "❝",
    category: "Social Proof",
    description: "Customer quote cards in grid or list layout",
    thumbnail: "testimonials",
    defaultProps: {
      heading: "Loved by Growing Teams",
      subheading: "Don't take our word for it — here's what our clients say.",
      layout: "grid", // "grid" | "list"
      items: [
        { quote: "Working with this team transformed our online presence completely. Our conversion rate doubled within 60 days of launch.", name: "Sarah Mitchell", role: "Head of Marketing, Luminary Co.", avatarInitials: "SM" },
        { quote: "The attention to detail is extraordinary. They didn't just build a website — they built a growth engine for our business.", name: "James Okonkwo", role: "CEO, Apex Digital", avatarInitials: "JO" },
        { quote: "I've worked with agencies across three continents. This team is in a different league when it comes to communication and delivery.", name: "Priya Sharma", role: "Founder, Veldt Studio", avatarInitials: "PS" },
      ],
    },
    defaultConfig: {
      bg: "#f8f7ff",
      accentColor: "#6d28d9",
      paddingTop: 72,
      paddingBottom: 72,
      paddingLeft: 40,
      paddingRight: 40,
      maxWidth: "1100px",
    },
  },

  // ── Custom ───────────────────────────────────────────────────
  custom: {
    label: "Custom Section",
    icon: "✦",
    category: "Custom",
    description: "Start from scratch — add any elements you need",
    thumbnail: "custom",
    defaultProps: {},
    defaultConfig: {
      bg: "#ffffff",
      paddingTop: 48,
      paddingBottom: 48,
      paddingLeft: 32,
      paddingRight: 32,
      maxWidth: "900px",
    },
  },
};

// Ordered list for the section picker UI
export const SECTION_TEMPLATE_GROUPS = [
  {
    label: "Marketing",
    items: ["hero", "usp"],
  },
  {
    label: "Content",
    items: ["zigzag", "faq"],
  },
  {
    label: "Media & Social",
    items: ["gallery", "testimonials"],
  },
  {
    label: "From Scratch",
    items: ["custom"],
  },
];
