"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/icons";
import { projects, profile, type Project, type ProjectCategory } from "@/data/portfolio";

const filters: ("All" | ProjectCategory)[] = ["All", "LLM & RAG", "Voice AI", "Computer Vision"];

function Pipeline({ steps, hue, large = false }: { steps: string[]; hue: number; large?: boolean }) {
  return (
    <div className="relative">
      <div className={`absolute right-[6%] left-[6%] h-px bg-white/15 ${large ? "top-[13px]" : "top-[9px]"}`} />
      <motion.div
        className={`absolute h-2 w-10 rounded-full blur-[2px] ${large ? "top-[10px]" : "top-[6px]"}`}
        style={{ background: `linear-gradient(90deg, transparent, hsl(${hue} 95% 65%), white)` }}
        initial={{ left: "4%" }}
        animate={{ left: ["4%", "88%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
      />
      <div className="relative flex justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex w-0 flex-1 flex-col items-center">
            <motion.span
              className={`rounded-full border-2 bg-ink ${large ? "h-7 w-7" : "h-[18px] w-[18px]"}`}
              style={{ borderColor: `hsl(${hue} 90% 65%)` }}
              animate={{ boxShadow: [`0 0 0px hsl(${hue} 90% 65%)`, `0 0 14px hsl(${hue} 90% 65%)`, `0 0 0px hsl(${hue} 90% 65%)`] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.45 }}
            />
            <span className={`mt-2 text-center leading-tight text-muted ${large ? "text-xs" : "text-[9px] sm:text-[10px]"}`}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, wide, onOpen }: { project: Project; wide: boolean; onOpen: () => void }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={wide ? "lg:col-span-2" : ""}
      style={{ perspective: 1200 }}
    >
      <motion.button
        layoutId={`card-${project.slug}`}
        onClick={onOpen}
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 10);
          rx.set(-(py - 0.5) * 10);
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="spotlight group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line bg-panel text-left"
      >
        <div
          className="relative h-48 overflow-hidden sm:h-52"
          style={{
            background: `radial-gradient(120% 120% at 0% 0%, hsl(${project.hue} 90% 55% / 0.35), transparent 55%), radial-gradient(100% 100% at 100% 100%, hsl(${(project.hue + 60) % 360} 90% 60% / 0.25), transparent 60%)`,
          }}
        >
          <div className="grid-bg absolute inset-0 opacity-60" />
          <span className="text-outline absolute top-14 -right-2 font-display text-[5rem] leading-none font-bold whitespace-nowrap opacity-70 transition-transform duration-700 group-hover:-translate-x-6">
            {project.title}
          </span>
          <div className="absolute top-5 left-5 flex gap-2">
            <span className="rounded-full bg-ink/60 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-semibold text-ink">FEATURED</span>
            )}
          </div>
          <span className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-lime">
            <ArrowUpRight className="h-5 w-5" />
          </span>
          <div className="absolute inset-x-5 bottom-5">
            <Pipeline steps={project.pipeline} hue={project.hue} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs text-cyan">{project.kicker}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, wide ? 6 : 4).map((s) => (
                <span key={s} className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-soft">
                  {s}
                </span>
              ))}
            </div>
            <div className="shrink-0 text-right">
              <p className="font-display text-xl font-bold text-white">{project.metric.value}</p>
              <p className="text-[10px] text-muted">{project.metric.label}</p>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.slug}`}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-panel"
      >
        <div
          className="relative p-8 pb-10"
          style={{
            background: `radial-gradient(120% 140% at 0% 0%, hsl(${project.hue} 90% 55% / 0.35), transparent 60%)`,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-line bg-ink/50 text-white transition hover:bg-white hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
          <p className="font-mono text-xs text-cyan">
            {project.category} · {project.kicker}
          </p>
          <h3 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">{project.title}</h3>
          <div className="mt-10">
            <p className="mb-4 font-mono text-[10px] tracking-widest text-muted uppercase">System pipeline</p>
            <Pipeline steps={project.pipeline} hue={project.hue} large />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 pt-6"
        >
          <p className="leading-relaxed text-soft">{project.description}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 font-mono text-xs text-cyan">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line p-4 text-center">
              <p className="font-display text-3xl font-bold text-gradient">{project.metric.value}</p>
              <p className="mt-1 text-xs text-muted">{project.metric.label}</p>
            </div>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-lime"
          >
            <GithubIcon className="h-4 w-4" /> More on GitHub
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-16 md:py-20">
      <div className="pointer-events-none absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title="Systems I've"
          accent="architected."
          description="Production AI products across voice, language and vision. Click any card to see its pipeline and the full story."
        />

        <LayoutGroup>
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative isolate rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  filter === f ? "border-transparent text-ink" : "border-line text-soft hover:text-white"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
                <span className="ml-2 font-mono text-[10px] opacity-60">
                  {f === "All" ? projects.length : projects.filter((p) => p.category === f).length}
                </span>
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  wide={filter === "All" && i === 0}
                  onOpen={() => setSelected(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
