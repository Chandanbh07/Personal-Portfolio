import { motion } from "framer-motion";
import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary mb-3">
            Where I've <span className="font-display italic">worked</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md">
            My academic and project journey so far.
          </p>
        </motion.div>

        <div className="relative pl-9 md:pl-12">
          <span className="absolute left-3 md:left-4 top-3 w-3 h-3 rounded-full accent-gradient ring-4 ring-bg" />
          <span className="absolute left-[18px] md:left-[22px] top-6 bottom-0 w-px bg-stroke" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl border border-stroke bg-surface p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-body font-medium text-text-primary">
                {experience.title}
              </h3>
              <span className="shrink-0 text-xs text-text-primary bg-stroke/40 border border-stroke rounded-full px-3 py-1.5">
                {experience.period}
              </span>
            </div>
            <p className="text-sm text-muted mb-5">
              <span className="text-text-primary">{experience.org}</span>{" "}
              &middot; {experience.location}
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-5">
              {experience.description}
            </p>
            <ul className="flex flex-col gap-2.5 mb-6">
              {experience.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full accent-gradient shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-full bg-stroke/40 border border-stroke text-text-primary/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
