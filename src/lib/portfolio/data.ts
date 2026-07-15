export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/syedmehedi34", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/syedmehedi34",
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/syedmehedi0313",
    icon: "facebook",
  },
  { label: "WhatsApp", href: "https://wa.me/8801731771438", icon: "whatsapp" },
  { label: "Email", href: "mailto:syedmehedi34@gmail.com", icon: "email" },
] as const;

export const RESUME_URL =
  "https://drive.google.com/file/d/1meZg3OXn1xQqPW-P0qVRqGAy3iXXO5tl/view?usp=drive_link";

export const PROFILE = {
  name: "Syed Mehedi Hasan",
  roles: ["Full-Stack Developer", "MERN Specialist", "Next.js Engineer"],
  location: "Dhaka, Bangladesh",
  tagline:
    "I design and ship reliable web applications end to end — from a normalized Postgres schema to a pixel-tight React interface.",
  avatar: "/portfolio/my-photo.jpeg",
};

export const ABOUT_STATS = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Shipped", value: 42, suffix: "" },
  { label: "Happy Clients", value: 27, suffix: "+" },
  { label: "Cups of Coffee", value: 900, suffix: "+" },
];

export const ABOUT_FACTS = [
  { label: "Based in", value: "Dhaka, Bangladesh" },
  { label: "Focus", value: "MERN + Next.js + PostgreSQL" },
  { label: "Experience", value: "3+ years, freelance & product teams" },
  { label: "Currently", value: "Open to full-time & contract roles" },
];

export const CONTACT_INFO = [
  {
    label: "Email",
    value: "syedmehedi34@gmail.com",
    href: "mailto:syedmehedi34@gmail.com",
  },
  { label: "Phone", value: "+880 1731-771438", href: "tel:+8801731771438" },
  { label: "Location", value: "Dhaka, Bangladesh", href: "" },
];

export type SkillItem = { name: string; icon: string };
export type SkillGroup = {
  title: string;
  description: string;
  items: SkillItem[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces that feel fast and stay maintainable.",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Redux Toolkit", icon: "redux" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend",
    description: "APIs and services built for correctness under load.",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "REST & GraphQL", icon: "graphql" },
      { name: "JWT / OAuth", icon: "auth" },
    ],
  },
  {
    title: "Database & DevOps",
    description: "Schemas, queries, and pipelines that don't fall over.",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Prisma", icon: "prisma" },
      { name: "Docker", icon: "docker" },
      { name: "Git & CI/CD", icon: "git" },
    ],
  },
];
