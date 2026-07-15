"use client";

import { useState, type FormEvent } from "react";
import {
  //   Github,
  //   Linkedin,
  //   Facebook,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

import { CONTACT_INFO, SOCIALS } from "@/lib/portfolio/data";
import { Reveal } from "./reveal";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: MessageCircle,
  email: Mail,
} as const;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry from ${form.name || "your site"}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:hello@mehedihasan.dev?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative bg-(--ink) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(--line)" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-(--amber)/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs text-(--amber)">
            <span className="h-px w-8 bg-(--amber)" />
            contact.request
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 max-w-xl font-(family-name:--font-display) text-3xl font-medium leading-tight text-(--paper) sm:text-4xl">
            Let&rsquo;s build something reliable.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            Have a project in mind, or just want to talk through an idea? My
            inbox is open — I usually reply within a day.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: info */}
          <Reveal delay={0.14}>
            <div className="space-y-3">
              {CONTACT_INFO.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-(--line) bg-(--ink-2)/50 px-5 py-4"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1 block text-sm text-(--paper) transition-colors hover:text-(--amber)"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-(--paper)">{c.value}</p>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-3 pt-2">
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
                      <Icon size={16} strokeWidth={1.8} />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* right: form */}
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-(--line) bg-(--ink-2)/50 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="name"
                    className="font-mono text-xs text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="mt-2 w-full rounded-lg border border-(--line) bg-(--ink) px-3.5 py-2.5 text-sm text-(--paper) outline-none transition-colors placeholder:text-muted focus:border-(--amber)/50"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="font-mono text-xs text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-lg border border-(--line) bg-(--ink) px-3.5 py-2.5 text-sm text-(--paper) outline-none transition-colors placeholder:text-muted focus:border-(--amber)/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="font-mono text-xs text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell me a bit about the project..."
                    className="mt-2 w-full resize-none rounded-lg border border-(--line) bg-(--ink) px-3.5 py-2.5 text-sm text-(--paper) outline-none transition-colors placeholder:text-muted focus:border-(--amber)/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-(--amber) px-5 py-3 text-sm font-medium text-(--ink) transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                <Send size={15} strokeWidth={2.5} />
                Send Message
              </button>
              {sent && (
                <p className="mt-3 font-mono text-xs text-(--teal)">
                  Opening your email client — send it off to reach me.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
