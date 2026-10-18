/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Edit ONLY this file to change any text on the site.
 *  Everything the pages render comes from here.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Ahmed Anter",
  nameAr: "أحمد عنتر",
  // terminal-style typed headline (hero)
  typedHeadline: "> Data Analyst | Software Developer | Turning raw data into decisions_",

  role: "Data Analyst",
  goal: "Data Analyst / Data Engineer role in Egypt & the Gulf",
  location: "Egypt 🇪🇬",
  languages: ["Arabic (native)", "English"],

  openToWork: true,

  about: [
    "I'm Ahmed — a Data Analyst and developer who turns messy, real-world retail and inventory data into dashboards people actually act on.",
    "Today I'm building Al-Basira (لوحة البصيرة), a multi-tenant Arabic BI platform where every number is computed in pandas and every dashboard is right-to-left native.",
    "My focus: sales & inventory analytics, BI dashboards, and ETL pipelines — with a habit of catching the bad data row before anyone else does.",
  ],

  funFact: "I'd rather spot a bad data row than a good meme 😄",

  stats: [
    { label: "Years analyzing data", value: 3, suffix: "+" },
    { label: "Projects shipped", value: 12, suffix: "+" },
    { label: "Datasets analyzed", value: 40, suffix: "+" },
    { label: "Lines of code", value: 25, suffix: "k+" },
  ],

  experience: [
    {
      period: "2024 — Present",
      role: "Data Analyst & Builder — Al-Basira (لوحة البصيرة)",
      org: "Independent / Private",
      kind: "Data & BI",
      bullets: [
        "Designing a multi-tenant Arabic BI platform: upload an Excel/ERP export → instant RTL dashboards.",
        "Built data-quality scoring, leak detection, and an Arabic Q&A assistant over the warehouse.",
        "Every metric is computed in pandas for a single trustworthy source of numbers.",
      ],
      stack: ["Python", "Flask", "pandas", "SQLite"],
    },
    {
      period: "2024",
      role: "Inventory & Sales Analyst — Luxe Inventory Management",
      org: "Project",
      kind: "Analytics",
      bullets: [
        "Modelled stock movement to cut losses from disorganized warehouses.",
        "Built KPI, trend and slow-moving-item reports for real retail data.",
        "Surfaced cashier / discount anomalies for audit review.",
      ],
      stack: ["PHP", "MySQL", "Power BI"],
    },
    {
      period: "Ongoing",
      role: "BSc Information Systems",
      org: "Sadat City University",
      kind: "Education",
      bullets: [
        "Foundation in databases, systems analysis, and software engineering.",
        "Self-tracking: Advanced SQL · Data modeling · Data engineering.",
      ],
      stack: ["SQL", "Data Modeling", "ETL"],
    },
  ],

  skills: {
    groups: [
      { label: "Languages & Databases", items: ["Python", "SQL", "MySQL", "SQLite", "PHP", "JavaScript"] },
      { label: "Analysis & Visualization", items: ["Pandas", "NumPy", "Power BI", "Tableau", "Excel", "ECharts"] },
      { label: "Web & Automation", items: ["Flask", "Laravel", "Playwright"] },
      { label: "Tools", items: ["Git", "GitHub", "Jupyter", "VS Code"] },
    ],
    // nodes for the force-directed graph; links by index
    graph: [
      { id: "Python", group: 0 },
      { id: "SQL", group: 0 },
      { id: "pandas", group: 1 },
      { id: "NumPy", group: 1 },
      { id: "Power BI", group: 1 },
      { id: "Tableau", group: 1 },
      { id: "Flask", group: 2 },
      { id: "MySQL", group: 0 },
      { id: "ETL", group: 3 },
      { id: "Git", group: 3 },
      { id: "JavaScript", group: 2 },
      { id: "ECharts", group: 1 },
    ],
    edges: [
      [0, 2], [0, 3], [2, 4], [1, 7], [1, 8], [7, 8], [0, 6], [6, 2],
      [4, 5], [10, 11], [0, 10], [9, 1], [2, 8], [3, 2],
    ],
    bars: [
      { label: "SQL & Databases", pct: 90 },
      { label: "Python / pandas", pct: 88 },
      { label: "Power BI / Tableau", pct: 82 },
      { label: "ETL & Data modeling", pct: 76 },
      { label: "Web (Flask/Laravel)", pct: 70 },
      { label: "Automation (Playwright)", pct: 64 },
    ],
  },

  projects: [
    {
      title: "Al-Basira BI Platform",
      tagline: "Multi-tenant Arabic BI: upload an Excel/ERP export, get RTL dashboards, data-quality scoring, leak detection and an Arabic Q&A assistant.",
      metric: "Every number computed in pandas",
      stack: ["Python", "Flask", "pandas", "SQLite"],
      status: "Private · Now building",
      href: null,
    },
    {
      title: "Sales & Inventory Analysis",
      tagline: "Analysis of real retail sales and stock data: KPIs, trends, slow-moving items and cashier/discount anomalies.",
      metric: "KPIs · anomalies · trends",
      stack: ["Python", "Pandas", "Power BI"],
      status: "Case study",
      href: null,
    },
    {
      title: "Luxe Inventory Management",
      tagline: "Inventory management system to track stock and reduce losses from disorganized warehouses.",
      metric: "Reduced stock losses",
      stack: ["PHP", "MySQL", "CSS"],
      status: "Shipped",
      href: "https://github.com/anter-vip/luxe-inventory-management-system",
    },
    {
      title: "CipherQuest",
      tagline: "Interactive cryptography lab: visualize, break and play Caesar & Playfair ciphers with a live attacker mode.",
      metric: "Learn · Break · Play",
      stack: ["TypeScript", "Next.js"],
      status: "Shipped",
      href: "https://github.com/anter-vip/cipherquest",
    },
  ],

  certifications: [
    { title: "BSc Information Systems", org: "Sadat City University", note: "Databases · Systems analysis · Software" },
    { title: "Advanced SQL & Data Modeling", org: "Self-directed", note: "In progress" },
    { title: "Data Engineering fundamentals", org: "Self-directed", note: "In progress" },
  ],

  recommendations: [
    { quote: "Ahmed found a discount anomaly our reports completely missed — that alone paid for itself.", who: "Retail Ops Lead" },
    { quote: "The first BI dashboard that actually spoke Arabic properly, RTL and all.", who: "Project stakeholder" },
    { quote: "Turns a raw Excel dump into decisions the same day. Rare.", who: "Colleague" },
  ],

  activity: [
    { time: "2026-10", text: "building cipherquest — pushed the attacker mode" },
    { time: "2026-10", text: "bi-platform · 3 commits on the pandas metrics layer" },
    { time: "2026-09", text: "shipped lux-inventory-management-system public" },
    { time: "ongoing", text: "learning: advanced SQL · data modeling · ETL" },
  ],

  links: {
    github: "https://github.com/anter-vip",
    linkedin: "https://www.linkedin.com/in/ahmed-anter",
    email: "ahmed.anter@example.com", // ← replace with your real email
  },

  featuredNote:
    "Data Analyst & Software Developer — building Al-Basira, an Arabic BI platform for retail chains.",
};

export type Profile = typeof profile;
