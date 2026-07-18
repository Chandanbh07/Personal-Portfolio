import { motion } from "framer-motion";
import { projects, type Project } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const ACCENTS: Record<Project["accent"], string> = {
  green: "#4ADE80",
  violet: "#A78BFA",
  blue: "#60A5FA",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const dotColor = ACCENTS[project.accent];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="rounded-3xl border border-stroke bg-surface overflow-hidden"
    >
      {/* Screenshot placeholder — swap the div below for your project's <img> */}
      <div className="relative aspect-[16/10] bg-bg border-b border-stroke overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 9h18" />
            <circle cx="6.5" cy="6.5" r="0.5" fill="currentColor" />
            <circle cx="9" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
          <span className="text-xs uppercase tracking-[0.2em]">
            Add screenshot
          </span>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: dotColor }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl font-display italic text-text-primary mb-3">
          {project.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 rounded-full bg-stroke/40 border border-stroke text-text-primary/90"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-primary hover:opacity-70 transition-opacity"
            >
              Live demo <span aria-hidden>↗</span>
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.39-5.26 5.67.42.36.78 1.08.78 2.17v3.22c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary mb-3">
            Featured <span className="font-display italic">projects</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md">
            A selection of things I've built, from ML experiments to
            full-stack products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
