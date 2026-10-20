"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "loading tokenizer",
  "initialising neural weights",
  "warming up inference",
  "compiling portfolio graph",
];

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 4);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
  }, [done]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length))];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-[min(420px,85vw)] font-mono">
            <div className="mb-6 flex items-end justify-between">
              <span className="font-display text-5xl font-bold text-white">
                HA<span className="text-gradient">.</span>
              </span>
              <span className="text-4xl text-white tabular-nums">{Math.floor(progress)}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan via-violet to-lime"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-xs text-muted">
              <span className="text-cyan">&gt;</span> {step}
              <span className="animate-blink">_</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
