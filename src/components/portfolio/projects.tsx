"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import projectData from "@/lib/portfolio/projects-data";
import { Reveal } from "./reveal";

const TECH_LIMIT = 4;

export function Projects() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projectData.map((p) => p.category)))],
    [],
  );
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? projectData
      : projectData.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative bg-(--ink) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(--line)" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs text-(--amber)">
            <span className="h-px w-8 bg-(--amber)" />
            projects.list
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-(family-name:--font-display) text-3xl font-medium leading-tight text-(--paper) sm:text-4xl">
              Things I&rsquo;ve shipped, end to end.
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors ${
                    active === cat
                      ? "border-[var(--amber)]/50 bg-(--amber)/10 text-(--amber)"
                      : "border-(--line) text-muted hover:text-(--paper)"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={0.08 + (i % 2) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--line) bg-(--ink-2)/50 transition-colors hover:border-[var(--amber)]/30">
                {/* image + hover overlay */}
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-[16/10] overflow-hidden bg-(--ink)"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-(--ink)/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-(--ink)/70 group-hover:opacity-100 group-hover:backdrop-blur-sm">
                    <span className="flex items-center gap-2 rounded-lg border border-[var(--amber)]/50 bg-(--ink)/80 px-4 py-2 font-mono text-xs text-(--amber)">
                      {project.overlayText}
                      <ExternalLink size={13} />
                    </span>
                  </div>
                  <span className="absolute left-3 top-3 rounded-md border border-(--line) bg-(--ink)/80 px-2.5 py-1 font-mono text-[10px] text-[var(--teal)] backdrop-blur">
                    {project.category}
                  </span>
                </a>

                {/* body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-(family-name:--font-display) text-lg leading-snug text-(--paper)">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {project.bifDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technology.slice(0, TECH_LIMIT).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-(--line) px-2 py-1 font-mono text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technology.length > TECH_LIMIT && (
                      <span className="rounded-md border border-(--line) px-2 py-1 font-mono text-[10px] text-muted">
                        +{project.technology.length - TECH_LIMIT}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-3 pt-1">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-(--paper) transition-colors hover:text-(--amber)"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                    {project.clientRepo && (
                      <a
                        href={project.clientRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-(--amber)"
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
