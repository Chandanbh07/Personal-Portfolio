import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  profile,
  about,
  skillGroups,
  experiences,
  projects,
  certifications,
  publication,
} from "../data";

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
}

interface HistoryEntry {
  command: string;
  output: string[];
}

const BOOT_LINES = [
  `Booting ${profile.name}OS v1.0...`,
  "Loading portfolio...",
  "Loading projects...",
  "Loading experience...",
  "Done.",
  "",
  "Type 'help' to begin.",
];

function buildOutput(rawCommand: string): string[] {
  const command = rawCommand.trim().toLowerCase();

  switch (command) {
    case "help":
      return [
        "",
        "Available Commands",
        "──────────────────────────────────────",
        "whoami",
        "about",
        "skills",
        "experience",
        "projects",
        "certifications",
        "contact",
        "resume",
        "",
        "github",
        "linkedin",
        "email",
        "",
        "clear",
      ];

    case "whoami":
      return [
        profile.name,
        profile.role,
        profile.location,
      ];

    case "about":
      return [
        about.heading,
        "",
        ...about.paragraphs,
      ];

    case "skills":
      return skillGroups.flatMap((group) => [
        `${group.label}`,
        `  ${group.items.join(", ")}`,
        "",
      ]);

    case "experience":
      return experiences.flatMap((exp) => [
        "──────────────────────────────────────",
        exp.title,
        `${exp.org} • ${exp.location}`,
        exp.period,
        "",
        exp.description,
        "",
        ...exp.points.map((p) => `• ${p}`),
        "",
      ]);

    case "projects":
      return projects.flatMap((project) => [
        "──────────────────────────────────────",
        project.title,
        project.description,
        "",
        `Stack : ${project.stack.join(", ")}`,
        `GitHub: ${project.github}`,
        "",
      ]);

    case "certifications":
      return [
        ...certifications.flatMap((cert) => [
          cert.title,
          cert.issuer,
          cert.href,
          "",
        ]),
        "",
        publication.title,
        publication.venue,
      ];

    case "contact":
      return [
        `Email    : ${profile.email}`,
        `Phone    : ${profile.phone}`,
        `GitHub   : ${profile.github}`,
        `LinkedIn : ${profile.linkedin}`,
      ];

    case "resume":
      return ["Opening resume..."];

    case "github":
      return ["Opening GitHub..."];

    case "linkedin":
      return ["Opening LinkedIn..."];

    case "email":
      return ["Opening mail client..."];

    case "":
      return [];

    default:
      return [
        `Command not found: ${command}`,
        "Type 'help' to see available commands.",
      ];
  }
}

export default function TerminalModal({
  open,
  onClose,
}: TerminalModalProps) {
  /* ======================================
     STATE
  ====================================== */

  const [booted, setBooted] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [input, setInput] = useState("");

  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [cmdPointer, setCmdPointer] =
    useState<number | null>(null);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const promptUser = profile.name
    .split(" ")[0]
    .toLowerCase();

  /* ======================================
     BOOT
  ====================================== */

  useEffect(() => {
    if (!open) return;

    setBooted([]);
    setBootDone(false);
    setHistory([]);
    setInput("");

    let index = 0;

    const timer = setInterval(() => {
      setBooted((prev) => [
        ...prev,
        BOOT_LINES[index],
      ]);

      index++;

      if (index >= BOOT_LINES.length) {
        clearInterval(timer);

        setTimeout(() => {
          setBootDone(true);
          inputRef.current?.focus();
        }, 250);
      }
    }, 220);

    return () => clearInterval(timer);
  }, [open]);

  /* ======================================
     AUTO SCROLL
  ====================================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, booted]);

  /* ======================================
     FOCUS
  ====================================== */

  useEffect(() => {
    if (bootDone) {
      inputRef.current?.focus();
    }
  }, [bootDone]);

  /* ======================================
     ESC CLOSE
  ====================================== */

  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [open, onClose]);

  /* ======================================
     OUTSIDE CLICK
  ====================================== */

  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(
          e.target as Node
        )
      ) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handler);

    return () =>
      window.removeEventListener(
        "mousedown",
        handler
      );
  }, [open, onClose]);

    /* ======================================
     TERMINAL ACTIONS
  ====================================== */

  const clearTerminal = () => {
    setHistory([]);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await modalRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ======================================
     RUN COMMAND
  ====================================== */

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();

    if (!command) return;

    // Save command history
    setCmdLog((prev) => [...prev, raw]);

    // Built-in actions
    switch (command) {
      case "clear":
        clearTerminal();
        return;

      case "resume":
        window.open("/resume.pdf", "_blank");
        break;

      case "github":
        window.open(profile.github, "_blank");
        break;

      case "linkedin":
        window.open(profile.linkedin, "_blank");
        break;

      case "email":
        window.location.href = `mailto:${profile.email}`;
        break;

      default:
        break;
    }

    const output = buildOutput(raw);

    setHistory((prev) => [
      ...prev,
      {
        command: raw,
        output,
      },
    ]);
  };

  /* ======================================
     SUBMIT
  ====================================== */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!input.trim()) return;

    runCommand(input);

    setInput("");
    setCmdPointer(null);
  };

  /* ======================================
     KEYBOARD
  ====================================== */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();

        if (cmdLog.length === 0) return;

        const next =
          cmdPointer === null
            ? cmdLog.length - 1
            : Math.max(0, cmdPointer - 1);

        setCmdPointer(next);
        setInput(cmdLog[next]);
        break;
      }

      case "ArrowDown": {
        e.preventDefault();

        if (cmdPointer === null) return;

        const next = cmdPointer + 1;

        if (next >= cmdLog.length) {
          setCmdPointer(null);
          setInput("");
        } else {
          setCmdPointer(next);
          setInput(cmdLog[next]);
        }

        break;
      }

      case "Tab": {
        e.preventDefault();

        const commands = [
          "help",
          "whoami",
          "about",
          "skills",
          "experience",
          "projects",
          "certifications",
          "contact",
          "resume",
          "github",
          "linkedin",
          "email",
          "clear",
        ];

        const matches = commands.filter((cmd) =>
          cmd.startsWith(input.toLowerCase())
        );

        if (matches.length === 1) {
          setInput(matches[0]);
        }

        break;
      }

      default:
        break;
    }
  };

  return (
  <AnimatePresence>
    {open && (
      <>
        {/* Background */}

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-sm"
/>

{/* Center Wrapper */}

<motion.div
  className="
    fixed
    inset-0
    z-[9999]
    flex
    items-center
    justify-center
    p-8
  "
>

  {/* Terminal */}

  <motion.div
    ref={modalRef}
    initial={{
      opacity: 0,
      scale: 0.88,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      scale: 0.88,
    }}
    transition={{
      type: "spring",
      stiffness: 320,
      damping: 28,
    }}
    className="
      w-full
      max-w-5xl
      h-[78vh]
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      bg-[#17191d]/95
      backdrop-blur-2xl
      shadow-[0_35px_100px_rgba(0,0,0,.55)]
    "
  >
          {/* ================= Header ================= */}

          <div className="flex items-center justify-between border-b border-white/10 bg-[#21262d]/90 px-5 py-3">

            {/* Traffic Lights */}

            <div className="flex items-center gap-2">

              {/* Close */}

              <button
                onClick={onClose}
                className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] transition hover:scale-110"
              />

              {/* Minimize */}

              <button
                onClick={clearTerminal}
                className="h-3.5 w-3.5 rounded-full bg-[#febc2e] transition hover:scale-110"
              />

              {/* Fullscreen */}

              <button
                onClick={toggleFullscreen}
                className="h-3.5 w-3.5 rounded-full bg-[#28c840] transition hover:scale-110"
              />

            </div>

            <span className="text-xs tracking-wide text-gray-400">
              {promptUser}@portfolio
            </span>

            <span className="text-xs text-gray-500">
              {isFullscreen ? "Fullscreen" : "Terminal"}
            </span>

          </div>

          {/* ================= Body ================= */}

          <div className="h-[calc(80vh-56px)] overflow-y-auto px-8 py-6 font-mono text-sm">

            {/* Boot */}

            {booted.map((line, index) => (
              <div
                key={index}
                className="leading-7 text-gray-400"
              >
                {line}
              </div>
            ))}

            {/* History */}

            {bootDone && (
              <>
                {history.map((entry, index) => (
                  <div key={index} className="mt-5">

                    {/* Prompt */}

                    <div className="flex items-center">

                      <span className="text-sky-400">
                        {promptUser}
                      </span>

                      <span className="mx-2 text-green-400">
                        %
                      </span>

                      <span className="text-white">
                        {entry.command}
                      </span>

                    </div>

                    {/* Output */}

                    <div className="mt-2 space-y-1">

                      {entry.output.map((line, i) => (
                        <div
                          key={i}
                          className="whitespace-pre-wrap text-gray-300"
                        >
                          {line}
                        </div>
                      ))}

                    </div>

                  </div>
                ))}

                {/* Prompt */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 flex items-center"
                >
                  <span className="text-sky-400">
                    {promptUser}
                  </span>

                  <span className="mx-2 text-green-400">
                    %
                  </span>

                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) =>
                      setInput(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    className="
                      flex-1
                      bg-transparent
                      outline-none
                      text-white
                      placeholder:text-gray-600
                      caret-sky-400
                    "
                    placeholder="type 'help'"
                  />
                </form>
              </>
                    )}

            <div ref={bottomRef} />

          </div>

        </motion.div> {/* Terminal */}

      </motion.div> {/* Center Wrapper */}

    </>
  )}
</AnimatePresence>
);
}