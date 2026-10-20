"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { spotlightHandler } from "@/components/ui/spotlight";
import { certificates } from "@/data/portfolio";

export function Certificates() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 sm:px-8 md:pb-40">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-cyan uppercase">Credentials</p>
          <h3 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            Always <span className="text-gradient">fine-tuning.</span>
          </h3>
        </div>
        <p className="hidden font-mono text-sm text-muted md:block">{certificates.length} certifications</p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {certificates.map((c, i) => (
          <motion.div
            key={c.title}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: -30 },
              show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6 } },
            }}
            onPointerMove={spotlightHandler}
            className={`spotlight glass group flex flex-col justify-between rounded-2xl p-5 ${i === 0 ? "lg:col-span-2" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet/15 text-violet transition-transform duration-500 group-hover:rotate-[360deg]">
                <Award className="h-4 w-4" />
              </span>
              <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
            </div>
            <div className="mt-6">
              <p className="font-display leading-snug font-semibold text-white">{c.title}</p>
              <p className="mt-2 font-mono text-xs text-cyan">{c.issuer}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
