import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  profile,
  about,
  skillGroups,
  experiences,
  projects,
  certifications,
  publication,
} from "../data";

interface HistoryEntry {
  command: string;
  output: string[];
}

const BOOT_LINES = [
  `Booting ${profile.name}OS v1.0...`,
  "Initializing terminal...",
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
        "────────────────────────────────────────────",
        "whoami          Show profile",
        "about           About me",
        "skills          Technical skills",
        "experience      Professional experience",
        "projects        View projects",
        "certifications  Certificates & publication",
        "contact         Contact information",
        "resume          Open resume",
        "",
        "github          Open GitHub",
        "linkedin        Open LinkedIn",
        "email           Send email",
        "",
        "ls              List sections",
        "pwd             Current directory",
        "date            Current date",
        "neofetch        Portfolio information",
        "clear           Clear terminal",
        "",
      ];

    case "whoami":
      return [
        profile.name,
        profile.role,
        profile.location,
        "",
        "Passionate Full Stack Developer focused on scalable web applications, backend systems, blockchain, and AI.",
      ];

    case "about":
      return [
        about.heading,
        "",
        ...about.paragraphs,
      ];

    case "skills":
      return skillGroups.flatMap((group) => [
        `📂 ${group.label}`,
        `   ${group.items.join(", ")}`,
        "",
      ]);

    case "experience":
      return experiences.flatMap((exp) => [
        "────────────────────────────────────────────",
        exp.title,
        `${exp.org}`,
        `${exp.location}`,
        `${exp.period}`,
        "",
        exp.description,
        "",
        ...exp.points.map((point) => `• ${point}`),
        "",
        `Stack: ${exp.stack.join(", ")}`,
        "",
      ]);

    case "projects":
      return projects.flatMap((project) => [
        "────────────────────────────────────────────",
        project.title,
        `Category : ${project.category}`,
        "",
        project.description,
        "",
        `Stack    : ${project.stack.join(", ")}`,
        `GitHub   : ${project.github}`,
        "",
      ]);

    case "certifications":
      return [
        "CERTIFICATIONS",
        "────────────────────────────────────────────",
        ...certifications.flatMap((cert) => [
          cert.title,
          cert.issuer,
          cert.href,
          "",
        ]),
        "",
        "PUBLICATION",
        "────────────────────────────────────────────",
        publication.title,
        publication.venue,
        publication.href,
      ];

    case "contact":
      return [
        `Email     : ${profile.email}`,
        `Phone     : ${profile.phone}`,
        `GitHub    : ${profile.github}`,
        `LinkedIn  : ${profile.linkedin}`,
      ];

    case "resume":
      return [
        "Opening resume.pdf...",
      ];

    case "github":
      return [
        "Opening GitHub...",
      ];

    case "linkedin":
      return [
        "Opening LinkedIn...",
      ];

    case "email":
      return [
        `Opening mail client for ${profile.email}`,
      ];

    case "ls":
      return [
        "about",
        "skills",
        "experience",
        "projects",
        "certifications",
        "contact",
        "resume.pdf",
      ];

    case "pwd":
      return [
        "/Users/chandan/portfolio",
      ];

    case "date":
      return [
        new Date().toLocaleString(),
      ];

    case "neofetch":
      return [
        "                 ███████╗",
        "                ██╔════╝",
        "                █████╗",
        "                ██╔══╝",
        "                ██║",
        "                ╚═╝",
        "",
        profile.name,
        "────────────────────────────────────────────",
        `Role        : ${profile.role}`,
        `Location    : ${profile.location}`,
        `Projects    : ${projects.length}`,
        `Experience  : ${experiences.length}`,
        `Skill Groups: ${skillGroups.length}`,
      ];

    case "":
      return [];

    default:
      return [
        `Command not found: ${command}`,
        "Type 'help' to view available commands.",
      ];
  }
}


export default function Terminal() {
  /* ==============================
     STATE
  ============================== */

  const [booted, setBooted] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [input, setInput] = useState("");

  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [cmdPointer, setCmdPointer] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const promptUser = profile.name
    .split(" ")[0]
    .toLowerCase();

  const terminalTitle = `${promptUser}@portfolio`;

  /* ==============================
     BOOT ANIMATION
  ============================== */

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setBooted((prev) => [...prev, BOOT_LINES[index]]);
      index++;

      if (index >= BOOT_LINES.length) {
        clearInterval(timer);

        setTimeout(() => {
          setBootDone(true);
          inputRef.current?.focus();
        }, 250);
      }
    }, 250);

    return () => clearInterval(timer);
  }, []);

  /* ==============================
     AUTO SCROLL
  ============================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, booted]);

  /* ==============================
     KEEP INPUT FOCUSED
  ============================== */

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  /* ==============================
     FULLSCREEN LISTENER
  ============================== */

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener(
      "fullscreenchange",
      onFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        onFullscreenChange
      );
    };
  }, []);

    /* ==============================
     TERMINAL ACTIONS
  ============================== */

  const clearTerminal = () => {
    setHistory([]);
  };

  const closeTerminal = () => {
    window.history.back();
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ==============================
     RUN COMMAND
  ============================== */

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();

    if (!command) return;

    // Save command history
    setCmdLog((prev) => [...prev, raw]);

    // Built-in commands
    if (command === "clear") {
      clearTerminal();
      return;
    }

    if (command === "resume") {
      window.open("/resume.pdf", "_blank");
    }

    if (command === "github") {
      window.open(profile.github, "_blank");
    }

    if (command === "linkedin") {
      window.open(profile.linkedin, "_blank");
    }

    if (command === "email") {
      window.location.href = `mailto:${profile.email}`;
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

  /* ==============================
     FORM SUBMIT
  ============================== */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!input.trim()) return;

    runCommand(input);

    setInput("");
    setCmdPointer(null);
  };

  /* ==============================
     KEYBOARD SHORTCUTS
  ============================== */

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
          "ls",
          "pwd",
          "date",
          "neofetch",
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

      case "Escape": {
        setInput("");
        setCmdPointer(null);
        break;
      }

      default:
        break;
    }
  };

    return (
    <div
      className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6 font-mono text-gray-200"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#161b22]">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#21262d]">

          {/* Traffic Lights */}

          <div className="flex items-center gap-2">

            {/* Close */}

            <button
              onClick={closeTerminal}
              title="Back"
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:scale-110 transition"
            />

            {/* Clear */}

            <button
              onClick={clearTerminal}
              title="Clear"
              className="w-3.5 h-3.5 rounded-full bg-[#febc2e] hover:scale-110 transition"
            />

            {/* Fullscreen */}

            <button
              onClick={toggleFullscreen}
              title="Fullscreen"
              className="w-3.5 h-3.5 rounded-full bg-[#28c840] hover:scale-110 transition"
            />

          </div>

          <span className="text-xs text-gray-400">
            {terminalTitle}
          </span>

          <span className="text-xs text-gray-500">
            {isFullscreen ? "Fullscreen" : "Terminal"}
          </span>

        </div>

        {/* ================= BODY ================= */}

        <div className="h-[calc(85vh-52px)] overflow-y-auto px-8 py-6">

          {/* Boot */}

          {booted.map((line, index) => (
            <div
              key={index}
              className="text-gray-400 leading-7"
            >
              {line}
            </div>
          ))}

          {/* History */}

          {bootDone && (
            <>
              {history.map((entry, index) => (
                <div key={index} className="mt-5">

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
                  placeholder="type 'help'"
                  className="flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-600 caret-sky-400"
                />

              </form>
            </>
          )}

          <div ref={bottomRef} />

        </div>

      </div>
    </div>
  );
}