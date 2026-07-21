import { motion } from "framer-motion";
import { skillGroups } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.06,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-bg py-16 md:py-24 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
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
              Skills
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary">
            Tools &{" "}
            <span className="font-display italic">
              technologies
            </span>
          </h2>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              whileHover={{
                y: -4,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
              className="
                rounded-2xl
                border
                border-stroke
                bg-surface
                p-6
                transition-all
                duration-300
                hover:border-white/20
              "
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                {group.label}
              </span>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      y: -2,
                      scale: 1.03,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className="
                      cursor-default
                      rounded-full
                      border
                      border-stroke
                      bg-stroke/40
                      px-3
                      py-1.5
                      text-xs
                      text-text-primary/90
                    "
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}