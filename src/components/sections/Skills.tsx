"use client";

import { motion } from "framer-motion";
import { Boxes, Brain, Cloud, Cpu, Database, ScanEye } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spotlightHandler } from "@/components/ui/spotlight";
import { skillGroups } from "@/data/portfolio";

const icons = [Brain, ScanEye, Cpu, Boxes, Database, Cloud];

const rings = [
  { size: 46, duration: 22, items: ["RAG", "LLMs", "Python", "FastAPI"] },
  { size: 72, duration: 34, items: ["LangChain", "OpenAI", "YOLO", "ChromaDB", "Docker", "Twilio"] },
  { size: 98, duration: 48, items: ["TensorFlow", "OpenCV", "HuggingFace", "MongoDB", "AWS", "ElevenLabs", "Groq", "PostgreSQL"] },
];

function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(45,226,230,0.12),transparent_60%)]" />
      {rings.map((ring, ri) => (
        <div
          key={ri}
          className="absolute top-1/2 left-1/2 rounded-full border border-dashed border-white/10"
          style={{
            width: `${ring.size}%`,
            height: `${ring.size}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ animation: `orbit-spin ${ring.duration}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
          >
            {ring.items.map((item, i) => {
              const angle = (i / ring.items.length) * Math.PI * 2;
              return (
                <div
                  key={item}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos(angle) * 50}%`,
                    top: `${50 + Math.sin(angle) * 50}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div style={{ animation: `orbit-spin ${ring.duration}s linear infinite ${ri % 2 ? "" : "reverse"}` }}>
                    <span
                      data-cursor="hover"
                      className="block rounded-full border border-line bg-panel/90 px-3 py-1.5 font-mono text-[10px] whitespace-nowrap text-soft shadow-[0_0_20px_-6px_rgba(45,226,230,0.5)] transition hover:border-cyan hover:text-cyan sm:text-xs"
                    >
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet font-display text-2xl font-bold text-ink shadow-[0_0_80px_rgba(45,226,230,0.6)]"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-cyan" />
        AI
      </motion.div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute top-1/2 left-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-violet/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Tech Stack"
          title="The toolkit behind"
          accent="the models."
          description="From fine-grained vision pipelines to multi-tenant LLM backends. These are the tools I reach for to take an idea from notebook to production."
        />

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Orbit />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, gi) => {
              const Icon = icons[gi];
              return (
                <Reveal
                  key={group.title}
                  delay={gi * 0.06}
                  onPointerMove={spotlightHandler}
                  className="spotlight glass group rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-white">{group.title}</h3>
                      <p className="text-xs text-muted">{group.blurb}</p>
                    </div>
                  </div>
                  <motion.ul
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } } }}
                    className="mt-4 flex flex-wrap gap-1.5"
                  >
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                        className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-soft transition-colors hover:border-cyan/40 hover:text-white"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
