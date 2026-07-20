// src/components/portfolio/project-detail.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import type { Project } from "@/lib/portfolio/projects-data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(--line)" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-(--amber)/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
          >
            <Link
              href="/all-projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-(--amber)"
            >
              <ArrowLeft size={13} />
              All projects
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.06}
            variants={fadeUp}
            className="mt-6 flex items-center gap-3 font-mono text-xs text-(--amber)"
          >
            <span className="h-px w-8 bg-(--amber)" />
            {project.category}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.12}
            variants={fadeUp}
            className="mt-4 max-w-3xl font-(family-name:--font-display) text-4xl font-medium leading-[1.08] text-(--paper) sm:text-5xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.18}
            variants={fadeUp}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {project.bifDescription}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.24}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-(--amber) px-5 py-3 text-sm font-medium text-(--ink) transition-transform hover:-translate-y-0.5"
            >
              <ExternalLink size={15} strokeWidth={2.5} />
              Live Demo
            </a>
            {project.clientRepo && (
              <a
                href={project.clientRepo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-(--line) px-5 py-3 text-sm font-medium text-(--paper) transition-colors hover:border-(--amber)/50 hover:text-(--amber)"
              >
                <FaGithub size={15} />
                View Code
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* hero image — window chrome */}
      <section className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-(--line) bg-(--ink-2)/50"
        >
          <div className="flex items-center justify-between border-b border-(--line) bg-(--ink)/60 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-(--line-bright)" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--line-bright)" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--amber)/70" />
            </div>
            <span className="font-mono text-[11px] text-muted">
              ~/projects/{project.id}/preview.png
            </span>
          </div>
          <div className="relative aspect-video bg-(--ink)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* overview + features + stack */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-xs text-(--amber)">overview.md</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                {project.description}
              </p>
            </motion.div>

            {project.features?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mt-10"
              >
                <p className="font-mono text-xs text-(--amber)">features.ts</p>
                <ul className="mt-4 space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-(--teal)"
                      />
                      <span className="text-sm leading-relaxed text-muted">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-fit rounded-2xl border border-(--line) bg-(--ink-2)/50 p-6"
          >
            <p className="font-mono text-xs text-muted">stack.json</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technology.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-(--line) px-2.5 py-1 font-mono text-[11px] text-(--paper)"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* screenshots */}
        {project.screenshots?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <p className="font-mono text-xs text-(--amber)">screenshots.zip</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.screenshots.map((src, i) => (
                <div
                  key={src + i}
                  className="group overflow-hidden rounded-xl border border-(--line) bg-(--ink-2)/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* prev / next nav */}
      <section className="border-t border-(--line)">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-(--line) sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <Link
            href={`/projects/${prev.id}`}
            className="group flex items-center gap-3 px-6 py-8 transition-colors hover:bg-(--ink-2)/40"
          >
            <ArrowLeft
              size={16}
              className="shrink-0 text-muted transition-colors group-hover:text-(--amber)"
            />
            <div>
              <p className="font-mono text-[11px] text-muted">Previous</p>
              <p className="mt-1 text-sm font-medium text-(--paper) transition-colors group-hover:text-(--amber)">
                {prev.title}
              </p>
            </div>
          </Link>
          <Link
            href={`/projects/${next.id}`}
            className="group flex items-center justify-between gap-3 px-6 py-8 transition-colors hover:bg-(--ink-2)/40 sm:flex-row-reverse sm:text-right"
          >
            <ArrowRight
              size={16}
              className="shrink-0 text-muted transition-colors group-hover:text-(--amber)"
            />
            <div>
              <p className="font-mono text-[11px] text-muted">Next</p>
              <p className="mt-1 text-sm font-medium text-(--paper) transition-colors group-hover:text-(--amber)">
                {next.title}
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
