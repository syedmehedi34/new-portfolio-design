"use client";

import { motion } from "framer-motion";
import { Download, Mail, ArrowDown } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

import Image from "next/image";
import { PROFILE, RESUME_URL, SOCIALS } from "@/lib/portfolio/data";
import { Reveal } from "./reveal";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  email: Mail,
} as const;

// nodes for the background constellation — the stack this developer builds with
const NODES = [
  { id: "react", label: "React", x: 90, y: 90 },
  { id: "next", label: "Next.js", x: 260, y: 40 },
  { id: "node", label: "Node.js", x: 430, y: 110 },
  { id: "express", label: "Express", x: 380, y: 240 },
  { id: "mongo", label: "MongoDB", x: 150, y: 260 },
  { id: "postgres", label: "PostgreSQL", x: 40, y: 190 },
];

const EDGES: [string, string][] = [
  ["react", "next"],
  ["next", "node"],
  ["node", "express"],
  ["express", "mongo"],
  ["mongo", "postgres"],
  ["postgres", "react"],
  ["next", "postgres"],
];

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function Constellation() {
  return (
    <svg
      viewBox="0 0 470 320"
      className="absolute -right-6 top-1/2 hidden w-130 -translate-y-1/2 opacity-70 lg:block"
      aria-hidden
    >
      {EDGES.map(([a, b], i) => {
        const na = nodeById(a);
        const nb = nodeById(b);
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="var(--line-bright)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.4 + i * 0.12,
              ease: "easeInOut",
            }}
          />
        );
      })}
      {NODES.map((n, i) => (
        <g key={n.id}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={5}
            fill="var(--ink)"
            stroke="var(--amber)"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={5}
            fill="var(--amber)"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.2, 1] }}
            transition={{
              duration: 2.6,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.text
            x={n.x}
            y={n.y - 12}
            textAnchor="middle"
            className="fill-muted"
            style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.1 }}
          >
            {n.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden bg-(--ink) pt-28 pb-16"
    >
      {/* backdrop grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[56px_56px] opacity-30" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-(--amber)/10 blur-[120px]" />
      <Constellation />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left: identity */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-(--line) bg-(--ink-2)/70 px-3 py-1 font-mono text-xs text-(--amber)">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--amber)" />
              Available for new projects
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 font-(family-name:--font-display) text-4xl font-medium leading-[1.05] text-(--paper) sm:text-5xl lg:text-6xl">
              {PROFILE.name}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-(--teal) sm:text-base">
              {PROFILE.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-3">
                  {i > 0 && <span className="text-(--line-bright)">/</span>}
                  {role}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-lg text-balance text-[15px] leading-relaxed text-muted sm:text-base">
              {PROFILE.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={RESUME_URL}
                // download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-(--amber) px-5 py-3 text-sm font-medium text-(--ink) transition-transform hover:-translate-y-0.5"
              >
                <Download
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-y-0.5"
                />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-(--line) px-5 py-3 text-sm font-medium text-(--paper) transition-colors hover:border-(--amber)/50 hover:text-(--amber)"
              >
                Let&rsquo;s talk
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--line) text-muted transition-all hover:-translate-y-0.5 hover:border-(--amber)/50 hover:text-(--amber)"
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* right: photo card */}
        <Reveal
          delay={0.2}
          className="relative mx-auto w-full max-w-xs lg:mx-0 lg:justify-self-end"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-[28px] border border-(--line)" />
            <div className="absolute -left-3 -top-3 h-6 w-6 rounded-tl-[28px] border-l-2 border-t-2 border-(--amber)" />
            <div className="absolute -bottom-3 -right-3 h-6 w-6 rounded-br-[28px] border-b-2 border-r-2 border-(--amber)" />
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-(--ink-2) ring-1 ring-(--line)">
              <Image
                src={PROFILE.avatar}
                alt={PROFILE.name}
                fill
                sizes="320px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-(--line) bg-(--ink)/80 px-3 py-2 font-mono text-[11px] text-muted backdrop-blur">
              <span>status</span>
              <span className="flex items-center gap-1.5 text-(--teal)">
                <span className="h-1.5 w-1.5 rounded-full bg-(--teal)" /> online
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[11px] tracking-widest">SCROLL</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
