"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, CornerDownLeft, Database, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/portfolio";

// A tiny keyword "retriever" over resume facts. It runs entirely in the
// browser, but walks through the same steps a RAG pipeline would.
// Ties go to the earlier entry, so specific topics come before broad ones.
const knowledge: { keys: string[]; source: string; answer: string }[] = [
  {
    keys: ["voice", "call", "syntalk", "twilio", "realtime", "phone", "elevenlabs"],
    source: "projects/syntalk.md",
    answer:
      "SynTalk is his autonomous voice-agent platform. It answers inbound and outbound business calls, walks customers through bookings, qualifies leads and syncs them to CRMs. The real-time pipeline runs on FastAPI + Twilio + OpenAI Realtime API + ElevenLabs, with MongoDB for multi-tenant agent configs, and responds in under a second.",
  },
  {
    keys: ["rag", "retrieval", "chatbot", "langchain", "vector", "chroma", "synchat", "knowledge"],
    source: "skills/rag.md",
    answer:
      "RAG is his bread and butter. He's built SynChat (businesses upload docs and get a grounded, embeddable support bot), a multilingual Arabic tutor using HuggingFace embeddings + ChromaDB, and RAG chatbots at Alright Tech. Typical stack: LangChain, OpenAI or Llama, ChromaDB, FastAPI.",
  },
  {
    keys: ["vision", "cv", "yolo", "opencv", "image", "detection", "face", "segmentation", "cardnest"],
    source: "skills/computer-vision.md",
    answer:
      "On the vision side he's trained and optimised YOLO and Mask R-CNN models for object detection and segmentation, built a real-time face-recognition attendance system, a CNN that diagnoses potato leaf disease, and an AI card-scanning feature for CardNest's fraud-detection platform.",
  },
  {
    keys: ["education", "degree", "study", "university", "masters", "cgpa", "gpa", "umt"],
    source: "education.md",
    answer:
      "He's currently pursuing a Master's in Artificial Intelligence at the University of Management and Technology, Lahore (CGPA 3.88). He holds a Bachelor's in Computer Science from PMAS Arid Agriculture University, Rawalpindi (2020 to 2024).",
  },
  {
    keys: ["certif", "course", "ibm", "deeplearning"],
    source: "certificates.md",
    answer:
      "7 certifications, including IBM's Professional Certificate in Data Science, DeepLearning.AI's Generative AI with LLMs, CNNs in TensorFlow, Deep Learning with Keras, and IBM's Computer Vision & Image Processing.",
  },
  {
    keys: ["hire", "contact", "email", "reach", "available", "freelance", "remote"],
    source: "contact.md",
    answer: `Yes, he's open to new opportunities, remote or on-site. The fastest way to reach him is ${profile.email}, or connect on LinkedIn. Scroll down to the contact section to send a message directly.`,
  },
  {
    keys: ["experience", "work", "job", "company", "career", "neurovise", "years"],
    source: "experience.md",
    answer:
      "Haseeb has 3+ years of hands-on AI experience. He's currently an AI Engineer at Neurovise (Apr 2025 to present), building LLM apps like MoodMap and a multilingual Arabic tutor with LangChain, OpenAI and RAG, deployed on Docker and AWS. Before that he was a Generative AI Developer at Alright Tech, building RAG chatbots, and a Computer Vision Engineer at Softwise Sol working with YOLO and Mask R-CNN.",
  },
  {
    keys: ["skill", "stack", "tech", "tools", "language", "python", "know"],
    source: "skills.md",
    answer:
      "Core stack: Python, SQL, LangChain, OpenAI, HuggingFace, LLMs, RAG and prompt engineering; TensorFlow, Scikit-learn, OpenCV and YOLO for ML/CV; FastAPI and Flask for APIs; ChromaDB, PostgreSQL, MongoDB and Firebase for data; Docker and AWS for deployment. He also writes Java and C++.",
  },
  {
    keys: ["who", "yourself", "haseeb", "introduce", "hello", "hi"],
    source: "about.md",
    answer:
      "Haseeb Ahmed is an AI Engineer based in Lahore who builds production AI: real-time voice agents, RAG systems and computer vision pipelines. He cares most about the stage after the prototype, making models fast, grounded and reliable for real users.",
  },
];

const suggestions = [
  "Tell me about his experience",
  "What voice AI has he built?",
  "Is he good at RAG?",
  "Computer vision work?",
  "Is he available to hire?",
];

type Msg = { role: "user" | "ai"; text: string; source?: string; score?: number };

function retrieve(q: string) {
  const tokens = q.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  // short keys must match a whole word so "his" doesn't hit "hi"
  const hit = (k: string) => tokens.some((t) => (k.length <= 3 ? t === k : t.startsWith(k)));
  let best = { score: 0, item: knowledge[knowledge.length - 1] };
  for (const item of knowledge) {
    const score = item.keys.reduce((s, k) => s + (hit(k) ? 1 : 0), 0);
    if (score > best.score) best = { score, item };
  }
  if (best.score === 0) {
    return {
      source: "fallback",
      score: 0.42,
      answer:
        "I couldn't find a confident match for that in my context window. Try asking about his experience, voice AI, RAG, computer vision, skills, education or availability.",
    };
  }
  return { source: best.item.source, score: Math.min(0.98, 0.78 + best.score * 0.07), answer: best.item.answer };
}

export function AskAI() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi! I'm Haseeb's portfolio assistant, indexed on his résumé. Ask me anything about his work.",
      source: "system",
    },
  ]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "retrieving" | "streaming">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, phase]);

  const ask = (q: string) => {
    if (!q.trim() || phase !== "idle") return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setPhase("retrieving");
    const { answer, source, score } = retrieve(q);

    setTimeout(() => {
      setPhase("streaming");
      setMessages((m) => [...m, { role: "ai", text: "", source, score }]);
      const words = answer.split(" ");
      let i = 0;
      const id = setInterval(() => {
        i++;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: words.slice(0, i).join(" ") };
          return copy;
        });
        if (i >= words.length) {
          clearInterval(id);
          setPhase("idle");
        }
      }, 28);
    }, 900);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <section id="ask" className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
      <SectionHeading
        index="05"
        eyebrow="Interactive"
        title="Don't read. Just"
        accent="ask."
        description="A miniature retrieval-augmented assistant over my résumé. It retrieves the most relevant chunk, then streams an answer, just like the production bots I build."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4">
          {[
            { Icon: User, t: "1 · Query", d: "Your question is parsed into keywords." },
            { Icon: Database, t: "2 · Retrieve", d: "The closest résumé chunk is scored and pulled in." },
            { Icon: Sparkles, t: "3 · Generate", d: "A grounded answer is streamed token by token." },
          ].map(({ Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`glass flex gap-4 rounded-2xl p-5 transition-colors duration-300 ${
                (phase === "retrieving" && i === 1) || (phase === "streaming" && i === 2) ? "border-cyan/60" : ""
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold text-white">{t}</p>
                <p className="text-sm text-muted">{d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-cyan/40 via-violet/20 to-lime/30 opacity-50 blur-lg" />
          <div className="relative flex h-[560px] flex-col overflow-hidden rounded-3xl border border-line bg-panel">
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet text-ink">
                <Bot className="h-5 w-5" />
                <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-panel bg-lime" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">haseeb-assistant</p>
                <p className="font-mono text-[10px] text-muted">
                  {phase === "idle" ? "online · rag-v1" : phase === "retrieving" ? "searching vector store…" : "generating…"}
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-sm bg-cyan text-ink"
                          : "rounded-bl-sm border border-line bg-white/[0.03] text-soft"
                      }`}
                    >
                      {m.text}
                      {m.role === "ai" && m.source && m.source !== "system" && m.text && (
                        <p className="mt-2 border-t border-line pt-2 font-mono text-[10px] text-muted">
                          ↳ source: <span className="text-cyan">{m.source}</span> · sim{" "}
                          <span className="text-lime">{m.score?.toFixed(2)}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {phase === "retrieving" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-muted">
                  <span className="text-cyan">⟳</span> embedding query → top_k=3 →{" "}
                  <span className="inline-flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="inline-block h-1.5 w-1.5 rounded-full bg-cyan"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}
            </div>

            <div className="border-t border-line p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    disabled={phase !== "idle"}
                    className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs whitespace-nowrap text-soft transition hover:border-cyan hover:text-cyan disabled:opacity-40"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form onSubmit={submit} className="flex items-center gap-2 rounded-2xl border border-line bg-ink px-4 focus-within:border-cyan/60">
                <span className="font-mono text-cyan">&gt;</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, availability…"
                  className="h-12 flex-1 bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={phase !== "idle" || !input.trim()}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-cyan text-ink transition disabled:opacity-30"
                  aria-label="Send"
                >
                  <CornerDownLeft className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
