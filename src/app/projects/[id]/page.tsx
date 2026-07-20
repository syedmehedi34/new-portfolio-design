// src/app/projects/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { ProjectDetail } from "@/components/portfolio/project-detail";
import projectData from "@/lib/portfolio/projects-data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return projectData.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectData.find((p) => p.id === id);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.bifDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const index = projectData.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = projectData[index];
  const prev =
    projectData[(index - 1 + projectData.length) % projectData.length];
  const next = projectData[(index + 1) % projectData.length];

  return (
    <>
      <Navbar />
      <main className="bg-(--ink)">
        <ProjectDetail project={project} prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
