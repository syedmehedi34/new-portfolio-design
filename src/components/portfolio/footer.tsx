"use client";

import { Mail, MessageCircle, ArrowUp } from "lucide-react";
import { NAV_LINKS, PROFILE, SOCIALS } from "@/lib/portfolio/data";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Logo from "../ui/logo";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: MessageCircle,
  email: Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-(--line) bg-(--ink) pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Building end-to-end web applications with the MERN stack, Next.js,
              and PostgreSQL.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-(--amber)"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Say hello
            </p>
            <a
              href="mailto:hello@mehedihasan.dev"
              className="mt-4 inline-block text-sm text-(--paper) transition-colors hover:text-(--amber)"
            >
              hello@mehedihasan.dev
            </a>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--line) text-muted transition-all hover:-translate-y-0.5 hover:border-(--amber)/50 hover:text-(--amber)"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-(--line) py-6 sm:flex-row">
          <p className="font-mono text-xs text-muted">
            &copy; {year} {PROFILE.name}. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--line) text-muted transition-colors hover:border-(--amber)/50 hover:text-(--amber)"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
