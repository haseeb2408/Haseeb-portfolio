"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-lime"
      style={{ scaleX }}
    />
  );
}
