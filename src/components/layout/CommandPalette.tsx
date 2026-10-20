"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Copy,
  FileText,
  FolderGit2,
  Layers,
  Mail,
  Search,
  User,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

type Item = {
  label: string;
  group: string;
  icon: ComponentType<{ className?: string }>;
  run: () => void;
};

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      { label: "About me", group: "Navigate", icon: User, run: () => go("about") },
      { label: "Tech stack", group: "Navigate", icon: Layers, run: () => go("skills") },
      { label: "Experience", group: "Navigate", icon: Briefcase, run: () => go("experience") },
      { label: "Projects", group: "Navigate", icon: FolderGit2, run: () => go("projects") },
      { label: "Ask my AI assistant", group: "Navigate", icon: Bot, run: () => go("ask") },
      { label: "Contact", group: "Navigate", icon: Mail, run: () => go("contact") },
      {
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setToast("Email copied to clipboard");
        },
      },
      { label: "Download résumé", group: "Actions", icon: FileText, run: () => window.open(profile.resume, "_blank") },
      { label: "Open GitHub", group: "Links", icon: GithubIcon, run: () => window.open(profile.github, "_blank") },
      { label: "Open LinkedIn", group: "Links", icon: LinkedinIcon, run: () => window.open(profile.linkedin, "_blank") },
    ],
    [],
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const select = (item: Item) => {
    close();
    item.run();
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-start justify-center bg-ink/70 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_80px_-20px_rgba(45,226,230,0.3)]"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="h-4 w-4 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setIndex((i) => Math.min(filtered.length - 1, i + 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setIndex((i) => Math.max(0, i - 1));
                    } else if (e.key === "Enter" && filtered[index]) {
                      select(filtered[index]);
                    }
                  }}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-white placeholder:text-muted focus:outline-none"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results.</li>}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      {showGroup && (
                        <p className="px-3 pt-3 pb-1 font-mono text-[10px] tracking-widest text-muted uppercase">
                          {item.group}
                        </p>
                      )}
                      <button
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => select(item)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          i === index ? "bg-cyan/10 text-white" : "text-soft"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${i === index ? "text-cyan" : "text-muted"}`} />
                        <span className="flex-1">{item.label}</span>
                        {i === index && <ArrowRight className="h-4 w-4 text-cyan" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[160] -translate-x-1/2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-ink"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
