import { motion } from "framer-motion";
import { about } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="grid md:grid-cols-12 gap-10 md:gap-16 items-start"
        >
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {about.eyebrow}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary mb-8">
              {about.heading.split(" ").map((word, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="font-display italic">
                    {word}
                  </span>
                ) : (
                  `${word} `
                )
              )}
            </h2>
            <div className="flex flex-col gap-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-sm md:text-base text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-4 md:gap-5">
            {about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl border border-stroke bg-surface p-6 text-center"
              >
                <span className="block text-3xl md:text-4xl font-display italic text-text-primary">
                  {stat.value}
                </span>
                <span className="block text-xs text-muted uppercase tracking-wide mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
