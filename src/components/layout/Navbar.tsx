"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

export function Navbar() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 30);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_8px_40px_-12px_rgba(45,226,230,0.25)]" : "border border-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2 pl-2">
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet font-display text-sm font-bold text-ink">
              HA
            </span>
            <span className="hidden font-display text-sm font-semibold text-white sm:block">
              {profile.firstName}
              <span className="text-cyan">.ai</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative isolate block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === l.id ? "text-ink" : "text-soft hover:text-white"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={openPalette}
              className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition hover:border-cyan/50 hover:text-white sm:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" /> K
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-lime sm:block"
            >
              Résumé
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-white md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-2 px-8 md:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl font-bold text-white"
              >
                <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-8 self-start rounded-full bg-lime px-6 py-3 font-medium text-ink"
            >
              Download résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
