// src/components/portfolio/about.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ABOUT_FACTS, ABOUT_STATS } from "@/lib/portfolio/data";
import { Reveal } from "./reveal";
// import { Reveal } from "../reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="font-(family-name:--font-display) text-3xl text-(--paper) sm:text-4xl"
    >
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-(--ink) py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs text-(--amber)">
            <span className="h-px w-8 bg-(--amber)" />
            about.md
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: facts card */}
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-(--line) bg-(--ink-2)/60 p-6">
              <p className="font-mono text-xs text-muted">quick_facts.json</p>
              <dl className="mt-5 space-y-4">
                {ABOUT_FACTS.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-4 border-b border-(--line) pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="text-right text-sm font-medium text-(--paper)">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* right: narrative + stats */}
          <div>
            <Reveal>
              <h2 className="font-(family-name:--font-display) text-3xl font-medium leading-tight text-(--paper) sm:text-4xl">
                Turning ideas into products people can rely on.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                I&rsquo;m a full-stack developer working across the MERN stack
                and Next.js, with a strong focus on database design in
                PostgreSQL. I care about the parts users never see: clean data
                models, predictable APIs, and code that a teammate can read six
                months from now. Outside of client work, I&rsquo;m usually
                refining a side project or reading through a database internals
                paper.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {ABOUT_STATS.map((s) => (
                  <div key={s.label}>
                    <Counter value={s.value} suffix={s.suffix} />
                    <p className="mt-1 text-xs text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
