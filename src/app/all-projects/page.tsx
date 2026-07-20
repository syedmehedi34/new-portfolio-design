// src/app/all-projects/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { Reveal } from "@/components/portfolio/reveal";
import { ProjectCard } from "@/components/portfolio/project-card";
import projectData from "@/lib/portfolio/projects-data";

export default function AllProjectsPage() {
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
    <>
      <Navbar />
      <main className="relative min-h-svh bg-(--ink) pb-24 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-(--line)" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-(--amber)/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-(--amber)"
            >
              <ArrowLeft size={13} />
              Back home
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-(--amber)">
              <span className="h-px w-8 bg-(--amber)" />
              archive.json · {projectData.length} projects
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 max-w-2xl font-(family-name:--font-display) text-4xl font-medium leading-tight text-(--paper) sm:text-5xl">
              Everything I&rsquo;ve built, end to end.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              A running log of client work and side projects — full-stack apps
              built, shipped, and still running in production.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-2">
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
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <Reveal key={project.id} delay={0.05 + (i % 3) * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
