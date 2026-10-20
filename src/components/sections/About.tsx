"use client";

import { animate, motion, useInView } from "framer-motion";
import { Clock, Eye, GraduationCap, Mic, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spotlightHandler } from "@/components/ui/spotlight";
import { education, profile, stats } from "@/data/portfolio";

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = v.toFixed(decimals) + suffix),
    });
    return () => c.stop();
  }, [inView, to, decimals, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

const tile = "spotlight glass rounded-3xl p-6 md:p-8";

// Photo framed like a detector output: bounding box, label and a scan line.
function Portrait() {
  const [missing, setMissing] = useState(false);

  return (
    <div data-cursor="hover" className="group relative aspect-[4/5] h-full w-full overflow-hidden rounded-3xl border border-line bg-panel md:aspect-auto md:min-h-[380px]">
      {missing ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-cyan/20 via-panel to-violet/20">
          <div className="text-center">
            <span className="font-display text-7xl font-bold text-gradient">HA</span>
            <p className="mt-3 font-mono text-[10px] text-muted">add public/profile.jpg</p>
          </div>
        </div>
      ) : (
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          onError={() => setMissing(true)}
          className="object-cover grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 1.25 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-[16%] top-[12%] bottom-[30%]"
      >
        {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "right-0 bottom-0 border-r-2 border-b-2"].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-lime ${c}`} />
        ))}
        <span className="absolute -top-6 left-0 rounded-sm bg-lime px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink">
          person: haseeb 0.99
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan/25 to-transparent"
        animate={{ top: ["-10%", "100%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
          <p className="font-mono text-[11px] text-cyan">{profile.role}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] text-lime backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> live
        </span>
      </div>
    </div>
  );
}

const journey = [
  { year: "2023", label: "Computer Vision", Icon: Eye },
  { year: "2025", label: "Generative AI", Icon: Sparkles },
  { year: "Now", label: "Voice & LLM Systems", Icon: Mic },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Engineering intelligence that"
        accent="actually ships."
      />

      <div className="grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-2">
          <Portrait />
        </Reveal>

        <Reveal delay={0.1} className={`${tile} md:col-span-4`} onPointerMove={spotlightHandler}>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">{"// whoami"}</p>
          <p className="mt-5 font-display text-2xl leading-snug text-white md:text-[1.75rem]">
            I&apos;m an AI Engineer who loves the part after the prototype: making models{" "}
            <span className="text-gradient">fast, grounded and reliable</span> enough for real users.
          </p>
          <p className="mt-5 leading-relaxed text-muted">
            I started out training YOLO and Mask R-CNN models on messy real-world imagery, moved into
            building RAG chatbots, and today I architect LLM products end to end at Neurovise, from
            vector search and FastAPI services to Docker and AWS deployments. My recent work includes
            a voice agent that answers business calls in under a second and a multilingual tutor that
            teaches Arabic in three languages. Alongside work, I&apos;m pursuing a Master&apos;s in
            Artificial Intelligence.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:col-span-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i} className={tile} onPointerMove={spotlightHandler}>
              <p className="font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className={`${tile} flex flex-col justify-between md:col-span-2`} onPointerMove={spotlightHandler}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Local time</p>
            <Clock className="h-4 w-4 text-cyan" />
          </div>
          <div>
            <p className="mt-6 font-display text-5xl font-bold text-white">
              <LocalTime />
            </p>
            <p className="mt-2 text-sm text-muted">{profile.location} · PKT (UTC+5)</p>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-full bg-lime/10 px-3 py-2 text-xs text-lime">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
            Open to remote and on-site roles
          </div>
        </Reveal>

        <Reveal delay={0.1} className={`${tile} md:col-span-4`} onPointerMove={spotlightHandler}>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">Evolution</p>
          <div className="relative mt-8 flex justify-between">
            <div className="absolute top-6 right-8 left-8 h-px bg-line" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute top-6 right-8 left-8 h-px origin-left bg-gradient-to-r from-cyan via-violet to-lime"
            />
            {journey.map(({ year, label, Icon }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.4 }}
                className="relative flex w-24 flex-col items-center text-center"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-panel text-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-3 font-mono text-xs text-lime">{year}</span>
                <span className="mt-1 text-xs text-soft">{label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className={`${tile} md:col-span-6`} onPointerMove={spotlightHandler}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs tracking-widest text-muted uppercase">Education</p>
            <GraduationCap className="h-4 w-4 text-cyan" />
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-10">
            {education.map((e) => (
              <div key={e.school} className="flex items-start justify-between gap-4 border-b border-line pb-5 last:border-0 last:pb-0 md:border-0 md:pb-0">
                <div>
                  <p className="font-display font-semibold text-white">{e.degree}</p>
                  <p className="mt-1 text-sm text-muted">
                    {e.school} · {e.place}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-xs text-cyan">{e.score}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{e.period}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
