// src/components/portfolio/projects.tsx (homepage section — max 6, compact)
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import projectData from "@/lib/portfolio/projects-data";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

const HOME_LIMIT = 6;

export function Projects() {
  const featured = projectData.slice(0, HOME_LIMIT);

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
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="max-w-xl font-(family-name:--font-display) text-3xl font-medium leading-tight text-(--paper) sm:text-4xl">
              Things I&rsquo;ve shipped, end to end.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A few builds worth a closer look — {projectData.length} more live
              in the archive.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={0.08 + (i % 3) * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/all-projects"
              className="group inline-flex items-center gap-2 rounded-lg border border-(--line) px-5 py-3 font-mono text-sm text-(--paper) transition-colors hover:border-(--amber)/50 hover:text-(--amber)"
            >
              View All Projects
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
