import { motion } from "framer-motion";
import { experiences } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Experience
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary mb-3">
            Where I've <span className="font-display italic">worked</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-lg">
            My professional, research, and development journey.
          </p>
        </motion.div>

        <div className="relative pl-8 sm:pl-10 md:pl-12">
          {/* Timeline */}
          <span className="absolute left-[14px] sm:left-[18px] md:left-[22px] top-0 bottom-0 w-px bg-stroke" />

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <div key={experience.title} className="relative">
                {/* Timeline Dot */}
                <span className="absolute -left-[30px] sm:-left-[34px] md:-left-[38px] top-5 w-3 h-3 rounded-full accent-gradient ring-4 ring-bg" />

                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -4,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  className="rounded-3xl border border-stroke bg-surface p-5 sm:p-6 md:p-8 transition-all duration-300 hover:border-white/20"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-body font-medium text-text-primary">
                        {experience.title}
                      </h3>

                      <span
  className={`font-semibold ${
    experience.location.includes("Sweden")
      ? "text-[#89AACC]"
      : "text-text-primary"
  }`}
>
  {experience.location}
</span>
                    </div>

                    <span className="self-start whitespace-nowrap rounded-full border border-stroke bg-stroke/40 px-3 py-1.5 text-xs text-text-primary">
                      {experience.period}
                    </span>
                  </div>

                  <p className="mb-6 text-sm md:text-base leading-relaxed text-muted">
                    {experience.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {experience.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm md:text-base text-muted"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full accent-gradient shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-stroke bg-stroke/40 px-3 py-1.5 text-xs sm:text-sm text-text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}