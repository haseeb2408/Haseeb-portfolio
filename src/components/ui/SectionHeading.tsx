"use client";

import { motion, type Variants } from "framer-motion";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
};

// The words start clipped out of view, so the observer has to sit on the
// heading itself; a clipped child would never register as intersecting.
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function SectionHeading({ index, eyebrow, title, accent, description }: Props) {
  return (
    <div className="mb-10 md:mb-14">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-cyan uppercase"
      >
        <span className="text-muted">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px w-12 origin-left bg-gradient-to-r from-cyan to-violet"
        />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        {title.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
        <span className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span className="text-gradient inline-block" variants={word}>
            {accent}
          </motion.span>
        </span>
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
