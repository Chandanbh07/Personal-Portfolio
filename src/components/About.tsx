import { motion } from "framer-motion";
import { about } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="grid md:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left Content */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
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

            <div className="space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base text-muted leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 md:gap-5">
            {about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="rounded-3xl border border-stroke bg-surface/80 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-white/20 hover:shadow-2xl cursor-default"
              >
                <span className="block text-3xl md:text-4xl font-display italic text-text-primary">
                  {stat.value}
                </span>

                <span className="block mt-3 text-xs uppercase tracking-wider text-muted">
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