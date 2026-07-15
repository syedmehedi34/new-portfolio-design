/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, RESUME_URL } from "@/lib/portfolio/data";
import Logo from "../ui/logo";
// import { Logo } from "./logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // near the bottom of the page: the last section can't reach the
      // observer's center band because there's no more room to scroll,
      // so force it active manually.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(NAV_LINKS[NAV_LINKS.length - 1].href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter((el): el is Element => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <div
          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-(--line) bg-(--ink-2)/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* logo mark */}
          <Logo variant="dark" />

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 font-mono text-[13px] text-muted transition-colors hover:text-(--paper)"
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-(--ink) ring-1 ring-(--line)"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {active === link.href && (
                    <span className="text-(--amber)">// </span>
                  )}
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              // download
              className="hidden items-center gap-2 rounded-lg bg-(--amber) px-4 py-2 text-[13px] font-medium text-(--ink) transition-transform hover:-translate-y-0.5 active:translate-y-0 md:inline-flex"
            >
              <Download size={14} strokeWidth={2.5} />
              Resume
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--line) text-(--paper) md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-6 mt-2 flex flex-col gap-1 rounded-2xl border border-(--line) bg-(--ink-2)/95 p-3 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-mono text-sm text-(--paper) hover:bg-(--ink)"
              >
                {link.label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              // download
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-(--amber) px-4 py-2.5 text-sm font-medium text-(--ink)"
            >
              <Download size={14} strokeWidth={2.5} />
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
