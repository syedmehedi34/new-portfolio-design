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
    href: "https://facebook.com/syedmehedi34",
    icon: "facebook",
  },
  { label: "WhatsApp", href: "https://wa.me/8801731771438", icon: "whatsapp" },
  { label: "Email", href: "mailto:hello@mehedihasan.dev", icon: "email" },
] as const;

export const RESUME_URL = "/resume.pdf";

export const PROFILE = {
  name: "Syed Mehedi Hasan",
  roles: ["Full-Stack Developer", "MERN Specialist", "Next.js Engineer"],
  location: "Dhaka, Bangladesh",
  tagline:
    "I design and ship reliable web applications end to end — from a normalized Postgres schema to a pixel-tight React interface.",
  avatar: "/avatar.jpg",
};

export const ABOUT_STATS = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 27, suffix: "+" },
  { label: "Cups of Coffee", value: 900, suffix: "+" },
];

export const ABOUT_FACTS = [
  { label: "Based in", value: "Dhaka, Bangladesh" },
  { label: "Focus", value: "MERN + Next.js + PostgreSQL" },
  { label: "Experience", value: "3+ years, freelance & product teams" },
  { label: "Currently", value: "Open to full-time & contract roles" },
];

export type SkillItem = { name: string; icon: string; level: number };
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
      { name: "React", icon: "react", level: 95 },
      { name: "Next.js", icon: "nextjs", level: 92 },
      { name: "TypeScript", icon: "typescript", level: 88 },
      { name: "Redux Toolkit", icon: "redux", level: 80 },
      { name: "Tailwind CSS", icon: "tailwind", level: 93 },
    ],
  },
  {
    title: "Backend",
    description: "APIs and services built for correctness under load.",
    items: [
      { name: "Node.js", icon: "node", level: 90 },
      { name: "Express.js", icon: "express", level: 88 },
      { name: "REST & GraphQL", icon: "graphql", level: 82 },
      { name: "JWT / OAuth", icon: "auth", level: 85 },
    ],
  },
  {
    title: "Database & DevOps",
    description: "Schemas, queries, and pipelines that don't fall over.",
    items: [
      { name: "PostgreSQL", icon: "postgresql", level: 87 },
      { name: "MongoDB", icon: "mongodb", level: 90 },
      { name: "Prisma", icon: "prisma", level: 84 },
      { name: "Docker", icon: "docker", level: 75 },
      { name: "Git & CI/CD", icon: "git", level: 89 },
    ],
  },
];
