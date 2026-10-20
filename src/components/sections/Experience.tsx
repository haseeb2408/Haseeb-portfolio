"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spotlightHandler } from "@/components/ui/spotlight";
import { experience } from "@/data/portfolio";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative mx-auto overflow-x-clip max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've been"
        accent="training."
        description="Three roles, one trajectory: from pixels to language to real-time voice."
      />

      <div ref={ref} className="relative">
        <div className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-cyan via-violet to-lime shadow-[0_0_12px_rgba(45,226,230,0.8)] md:left-1/2"
        />

        <div className="space-y-16 md:space-y-24">
          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <div key={job.company} className="relative grid md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="absolute top-8 left-4 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-2 border-cyan bg-ink md:left-1/2"
                >
                  <span className={`h-2 w-2 rounded-full ${job.current ? "animate-pulse bg-lime" : "bg-cyan"}`} />
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`pl-12 md:pl-0 ${left ? "md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"}`}
                >
                  <p className="font-mono text-xs tracking-widest text-cyan uppercase">{job.period}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white">{job.role}</h3>
                  <p className="mt-1 text-lg text-gradient font-semibold inline-block">@ {job.company}</p>
                  {job.current && (
                    <span className="ml-3 inline-block rounded-full bg-lime/15 px-2 py-0.5 align-middle font-mono text-[10px] text-lime">
                      CURRENT
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onPointerMove={spotlightHandler}
                  className={`spotlight glass mt-6 ml-12 rounded-2xl p-6 md:mt-0 md:ml-0 ${
                    left ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1"
                  }`}
                >
                  <p className="text-soft">{job.summary}</p>
                  <ul className="mt-5 space-y-3">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span key={s} className="rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 font-mono text-[11px] text-cyan">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
