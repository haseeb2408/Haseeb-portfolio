"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-2xl font-bold text-white">
              {profile.name}
              <span className="text-lime">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              AI Engineer crafting voice agents, RAG systems and vision models.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-muted transition hover:text-cyan">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#top"
            className="group grid h-14 w-14 place-items-center self-start rounded-full border border-line text-white transition hover:border-cyan hover:bg-cyan hover:text-ink"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
          </a>
        </div>

        <motion.p
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-outline mt-12 text-center font-display text-[clamp(4rem,17vw,15rem)] leading-[0.8] font-bold tracking-tighter select-none"
        >
          HASEEB
        </motion.p>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-line py-6 font-mono text-xs text-muted sm:flex-row">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p>
            Built with <span className="text-cyan">Next.js</span> · <span className="text-violet">Framer Motion</span> ·{" "}
            <span className="text-lime">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
