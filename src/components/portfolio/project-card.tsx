// src/components/portfolio/project-card.tsx
"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/lib/portfolio/projects-data";

const TECH_LIMIT = 3;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-(--line) bg-(--ink-2)/50 transition-colors duration-300 hover:border-(--amber)/40">
      {/* full-card click target -> detail page */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={`View ${project.title} details`}
        className="absolute inset-0 z-10"
      />

      {/* window chrome — signature motif */}
      <div className="flex items-center justify-between border-b border-(--line) bg-(--ink)/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-(--line-bright)" />
          <span className="h-2 w-2 rounded-full bg-(--line-bright)" />
          <span className="h-2 w-2 rounded-full bg-(--amber)/70" />
        </div>

        <span className="font-mono text-[10px] text-muted">
          {project.id}.tsx
        </span>
      </div>

      {/* image */}
      <div className="relative aspect-16/10 overflow-hidden bg-(--ink)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-(--ink)/0 opacity-0 transition-all duration-300 group-hover:bg-(--ink)/70 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
          <span className="flex translate-y-2 items-center gap-1.5 rounded-md border border-(--amber)/50 bg-(--ink)/80 px-3 py-1.5 font-mono text-[11px] text-(--amber) transition-transform duration-300 group-hover:translate-y-0">
            View Details
          </span>
        </div>

        <span className="absolute left-2.5 top-2.5 rounded-md border border-(--line) bg-(--ink)/80 px-2 py-0.5 font-mono text-[10px] text-(--teal) backdrop-blur">
          {project.category}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-(family-name:--font-display) text-[15px] leading-snug text-(--paper)">
          {project.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {project.bifDescription}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technology.slice(0, TECH_LIMIT).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-(--line) px-1.5 py-0.5 font-mono text-[9px] text-muted"
            >
              {tech}
            </span>
          ))}

          {project.technology.length > TECH_LIMIT && (
            <span className="rounded-md border border-(--line) px-1.5 py-0.5 font-mono text-[9px] text-muted">
              +{project.technology.length - TECH_LIMIT}
            </span>
          )}
        </div>

        {/* z-20 so these stay clickable above the full-card overlay link */}
        <div className="relative z-20 mt-4 flex items-center gap-4 border-t border-(--line) pt-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-(--paper) transition-colors hover:text-(--amber)"
          >
            <ExternalLink size={12} />
            Live
          </a>

          {project.clientRepo && (
            <a
              href={project.clientRepo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-(--amber)"
            >
              <FaGithub size={12} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
