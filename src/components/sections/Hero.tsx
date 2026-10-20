"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeuralCanvas } from "@/components/effects/NeuralCanvas";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { marquee, profile } from "@/data/portfolio";

const ease = [0.16, 1, 0.3, 1] as const;

function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!deleting && text === word) return setDeleting(true);
        if (deleting && text === "") {
          setDeleting(false);
          return setI((n) => n + 1);
        }
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      !deleting && text === word ? pause : deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

function ModelCard() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  const lines: [string, string, string?][] = [
    ["model", '"haseeb-ahmed-v3"'],
    ["role", '"AI Engineer @ Neurovise"'],
    ["training", '"MS Artificial Intelligence, UMT"'],
    ["specialisation", '["LLMs", "RAG", "Voice AI", "CV"]'],
    ["latency", '"sub-second"', "c"],
    ["deploy", '["Docker", "AWS", "FastAPI"]'],
    ["status", '"open_to_opportunities"', "l"],
  ];

  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="relative"
      data-cursor="hover"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan/50 via-violet/30 to-transparent opacity-60 blur-xl" />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-panel/90 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose/80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="h-3 w-3 rounded-full bg-lime/80" />
          <span className="ml-3 font-mono text-xs text-muted">model_card.py</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-lime">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> running
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13px]">
          <motion.code
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 2 } } }}
            className="block"
          >
            <motion.span variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="block">
              <span className="text-violet">from</span> <span className="text-white">engineer</span>{" "}
              <span className="text-violet">import</span> <span className="text-cyan">Haseeb</span>
            </motion.span>
            <span className="block h-3" />
            <motion.span variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="block">
              <span className="text-white">me</span> <span className="text-muted">=</span>{" "}
              <span className="text-cyan">Haseeb</span>
              <span className="text-muted">(</span>
            </motion.span>
            {lines.map(([k, v, tone]) => (
              <motion.span
                key={k}
                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                className="block pl-5"
              >
                <span className="text-[#ffb86c]">{k}</span>
                <span className="text-muted">=</span>
                <span className={tone === "l" ? "text-lime" : tone === "c" ? "text-cyan" : "text-[#9ef0b0]"}>{v}</span>
                <span className="text-muted">,</span>
              </motion.span>
            ))}
            <motion.span variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="block">
              <span className="text-muted">)</span>
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="block">
              <span className="text-white">me</span>
              <span className="text-muted">.</span>
              <span className="text-cyan">build</span>
              <span className="text-muted">(</span>
              <span className="text-[#9ef0b0]">&quot;your next AI product&quot;</span>
              <span className="text-muted">)</span>
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyan" />
            </motion.span>
          </motion.code>
        </pre>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.2, type: "spring" }}
        className="absolute -bottom-16 left-8 z-10 hidden sm:block"
      >
        <div className="glass animate-float rounded-xl bg-panel/95 px-4 py-3">
          <p className="font-mono text-[10px] text-muted uppercase">Inference</p>
          <p className="font-display text-xl font-bold text-white">
            &lt;1s <span className="text-xs font-normal text-lime">voice latency</span>
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.4, type: "spring" }}
        className="absolute -top-16 right-8 z-10 hidden sm:block"
      >
        <div className="glass animate-float rounded-xl bg-panel/95 px-4 py-3 [animation-delay:1.5s]">
          <p className="font-mono text-[10px] text-muted uppercase">Shipped</p>
          <p className="font-display text-xl font-bold text-white">
            9 <span className="text-xs font-normal text-cyan">AI products</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const role = useTypewriter(profile.roles);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="absolute inset-0">
        <NeuralCanvas />
      </div>
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-16 px-5 pt-32 pb-16 sm:px-8 lg:grid-cols-[1.15fr_1fr]"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-xs"
          >
            <span className="relative flex items-center gap-2 rounded-full bg-lime/15 px-2.5 py-1 font-medium text-lime">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Available
            </span>
            <span className="flex items-center gap-1 text-muted">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.9] font-bold tracking-tighter text-white">
            {["Haseeb", "Ahmed"].map((word, wi) => (
              <span key={word} className="block overflow-hidden">
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className={`inline-block ${wi === 1 ? "text-gradient" : ""}`}
                    initial={{ y: "110%", rotate: 8 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ delay: 1.5 + wi * 0.15 + ci * 0.04, duration: 0.9, ease }}
                  >
                    {ch}
                  </motion.span>
                ))}
                {wi === 1 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.2, type: "spring" }}
                    className="inline-block text-lime"
                  >
                    .
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
            className="mt-6 flex h-9 items-center gap-3 font-mono text-lg text-soft sm:text-2xl"
          >
            <span className="text-cyan">&gt;</span>
            <span className="text-white">{role}</span>
            <span className="-ml-2 inline-block h-6 w-[3px] animate-blink bg-lime" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-cyan px-7 py-4 font-medium text-ink"
              >
                <span className="absolute inset-0 translate-y-full bg-lime transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">Explore my work</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-line px-7 py-4 font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Magnetic>
            <div className="flex items-center gap-2">
              {[
                { href: profile.github, Icon: GithubIcon, label: "GitHub" },
                { href: profile.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-line text-soft transition hover:border-cyan hover:text-cyan"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 1, ease }}
          className="hidden md:block"
        >
          <ModelCard />
        </motion.div>
      </motion.div>

      <div className="relative z-10 border-y border-line bg-ink/60 py-5 backdrop-blur">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-lg whitespace-nowrap text-muted">
                {t}
                <span className="text-cyan">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
