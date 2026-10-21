"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/portfolio";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copy = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // no backend: hand the message to the visitor's mail client
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-line bg-ink/60 px-4 py-3.5 text-sm text-white placeholder:text-muted transition focus:border-cyan/60 focus:outline-none focus:ring-4 focus:ring-cyan/10";

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-20">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-cyan/25 via-violet/25 to-lime/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-cyan uppercase">06 — Contact</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] font-bold tracking-tighter text-white">
            Let&apos;s build something <span className="text-gradient">intelligent</span>
            <span className="text-lime">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted md:text-lg">
            Have an AI product in mind, a role to fill, or a model that needs to reach production? My
            inbox is always open.
          </p>
          <div className="mt-10 flex justify-center">
            <Magnetic>
              <button
                onClick={copy}
                className="group flex items-center gap-3 rounded-full border border-line bg-panel/80 py-2 pr-2 pl-6 font-mono text-sm text-white backdrop-blur transition hover:border-cyan/50 sm:text-base"
              >
                {profile.email}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan text-ink">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "y" : "n"}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-3">
            {[
              { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
              { Icon: LinkedinIcon, label: "LinkedIn", value: "haseeb-ahmed", href: profile.linkedin },
              { Icon: GithubIcon, label: "GitHub", value: "haseeb2408", href: profile.github },
              { Icon: MapPin, label: "Based in", value: profile.location },
            ].map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] tracking-widest text-muted uppercase">{label}</span>
                    <span className="block truncate text-white">{value}</span>
                  </span>
                  {href && (
                    <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:rotate-45 group-hover:text-cyan" />
                  )}
                </>
              );
              const cls = "glass group flex items-center gap-4 rounded-2xl p-4 transition hover:border-cyan/40";
              return href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8">
              <p className="font-display text-xl font-semibold text-white">Send a message</p>
              <p className="mt-1 text-sm text-muted">Opens your mail app with everything filled in.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Tell me about the project or role…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} mt-4 resize-none`}
              />
              <button
                type="submit"
                className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white py-4 font-medium text-ink"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-lime transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">Send message</span>
                <Send className="relative h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
