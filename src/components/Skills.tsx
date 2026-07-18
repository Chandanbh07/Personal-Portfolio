import { motion } from "framer-motion";
import { skillGroups } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="bg-bg py-16 md:py-24">
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
              Skills
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary">
            Tools & <span className="font-display italic">technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="rounded-2xl border border-stroke bg-surface p-6"
            >
              <span className="text-xs text-muted uppercase tracking-[0.2em]">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2 mt-4">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-stroke/40 border border-stroke text-text-primary/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
