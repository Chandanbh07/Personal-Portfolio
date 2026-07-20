import { motion } from "framer-motion";
import { projects, type Project } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
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
      whileHover={{
        y: -8,
        scale: 1.015,
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true }}
      variants={fadeUp}
      className="rounded-3xl border border-stroke bg-surface overflow-hidden h-full flex flex-col"
    >
      {/* Screenshot */}
      {project.image && (
        <div className="relative h-72 overflow-hidden border-b border-stroke group">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-7 flex flex-col flex-1">
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

        <div className="mt-auto flex items-center gap-5">
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
  const featuredProjects = projects.filter((project) => project.image);
  const otherProjects = projects.filter((project) => !project.image);

  return (
    <section id="work" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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
            A selection of things I've built, from ML experiments to full-stack
            products.
          </p>
        </motion.div>

        {/* Featured Projects (with images) */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Other Projects (without images) */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={featuredProjects.length + index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
