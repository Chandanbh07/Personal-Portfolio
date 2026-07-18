import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  profile,
  about,
  skillGroups,
  experience,
  projects,
  certifications,
  publication,
} from "../data";

interface HistoryEntry {
  command: string;
  output: string[];
}

const BOOT_LINES = [
  `Booting ${profile.name.split(" ")[0]}OS v1.0...`,
  "Loading résumé.json ... done",
  "Type 'help' to see available commands.",
];

function buildOutput(rawCommand: string): string[] {
  const command = rawCommand.trim().toLowerCase();

  switch (command) {
    case "help":
      return [
        "Available commands:",
        "  whoami         — who am I",
        "  about          — short bio",
        "  skills         — tech stack, grouped",
        "  experience     — where I've worked",
        "  projects       — things I've built",
        "  certifications — certs & publications",
        "  contact        — how to reach me",
        "  resume         — download résumé PDF",
        "  clear          — clear the screen",
      ];

    case "whoami":
      return [profile.name, profile.role, profile.location];

    case "about":
      return [about.heading, "", ...about.paragraphs];

    case "skills":
      return skillGroups.flatMap((g) => [
        `${g.label}:`,
        `  ${g.items.join(", ")}`,
        "",
      ]);

    case "experience":
      return [
        `${experience.title}`,
        `${experience.org} · ${experience.location} (${experience.period})`,
        "",
        experience.description,
        "",
        ...experience.points.map((p) => `  - ${p}`),
      ];

    case "projects":
      return projects.flatMap((p) => [
        `${p.title}  [${p.category}]`,
        `  ${p.description}`,
        `  stack: ${p.stack.join(", ")}`,
        `  repo: ${p.github}`,
        "",
      ]);

    case "certifications":
      return [
        ...certifications.flatMap((c) => [`${c.title} — ${c.issuer}`, `  ${c.href}`]),
        "",
        "Publication:",
        `  ${publication.title}`,
        `  ${publication.venue}`,
        `  ${publication.href}`,
      ];

    case "contact":
      return [
        `Email:    ${profile.email}`,
        `Phone:    ${profile.phone}`,
        `GitHub:   ${profile.github}`,
        `LinkedIn: ${profile.linkedin}`,
      ];

    case "resume":
      return ["Opening resume.pdf in a new tab..."];

    case "":
      return [];

    default:
      return [`command not found: ${command}`, "type 'help' for a list of commands"];
  }
}

export default function Terminal() {
  const [booted, setBooted] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [cmdPointer, setCmdPointer] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      setBooted((prev) => [...prev, BOOT_LINES[i]]);
      i += 1;
      if (i >= BOOT_LINES.length) {
        window.clearInterval(id);
        window.setTimeout(() => setBootDone(true), 200);
      }
    }, 350);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, booted]);

  const runCommand = (raw: string) => {
    const output = buildOutput(raw);
    setHistory((h) => [...h, { command: raw, output }]);
    if (raw.trim().toLowerCase() === "clear") {
      setHistory([]);
    }
    if (raw.trim().toLowerCase() === "resume") {
      window.open("/resume.pdf", "_blank");
    }
    if (raw.trim() !== "") {
      setCmdLog((log) => [...log, raw]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
    setCmdPointer(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const nextPointer =
        cmdPointer === null ? cmdLog.length - 1 : Math.max(0, cmdPointer - 1);
      setCmdPointer(nextPointer);
      setInput(cmdLog[nextPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdPointer === null) return;
      const nextPointer = cmdPointer + 1;
      if (nextPointer >= cmdLog.length) {
        setCmdPointer(null);
        setInput("");
      } else {
        setCmdPointer(nextPointer);
        setInput(cmdLog[nextPointer]);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-bg text-text-primary font-mono flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <header className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-stroke shrink-0">
        <Link
          to="/"
          className="text-xs text-muted hover:text-text-primary transition-colors"
        >
          ← back to site
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="text-xs text-muted">
          {profile.name.toLowerCase().replace(" ", "-")}@portfolio
        </span>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto px-5 md:px-8 py-8 text-[13px] md:text-sm leading-7">
        {booted.map((line, i) => (
          <p key={i} className="text-muted">
            {line}
          </p>
        ))}

        {bootDone && (
          <>
            {history.map((entry, i) => (
              <div key={i} className="mt-4">
                <div>
                  <span style={{ color: "#89AACC" }}>➜</span>{" "}
                  <span className="text-text-primary">{entry.command}</span>
                </div>
                {entry.output.map((line, j) => (
                  <p key={j} className="text-muted whitespace-pre-wrap pl-4">
                    {line}
                  </p>
                ))}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
              <span style={{ color: "#89AACC" }}>➜</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-muted/60"
                placeholder="type a command — try 'help'"
              />
              <span className="w-2 h-4 bg-text-primary/80 animate-blink" />
            </form>
          </>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
