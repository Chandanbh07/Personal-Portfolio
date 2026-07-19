import { motion } from "framer-motion";
import { certifications, publication } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Certifications
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-medium tracking-tight text-text-primary mb-3">
            Credentials & <span className="font-display italic">research</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 mb-4">
          {certifications.map((cert) => (
            <motion.a
              href={cert.href}
              target="_blank"
              rel="noreferrer"
              key={cert.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="flex items-center gap-6 p-4 sm:p-5 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-300"
            >
              <span className="w-11 h-11 rounded-full accent-gradient shrink-0 flex items-center justify-center text-bg text-sm font-medium">
                {cert.issuer.charAt(0)}
              </span>
              <span className="text-base md:text-lg text-text-primary flex-1">
                {cert.title}
              </span>
              <span className="hidden sm:block text-sm text-muted">
                {cert.issuer}
              </span>
              <span className="text-sm text-muted pr-4" aria-hidden>
                ↗
              </span>
            </motion.a>
          ))}
        </div>

        <motion.a
          href={publication.href}
          target="_blank"
          rel="noreferrer"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="group block rounded-3xl border border-stroke bg-surface p-6 md:p-8 hover:border-white/20 transition-colors duration-300"
        >
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Published Paper
          </span>
          <h3 className="text-xl md:text-2xl font-display italic text-text-primary mt-3 mb-3">
            {publication.title}
          </h3>
          <p className="text-sm text-muted mb-4">{publication.venue}</p>
          <span className="text-sm text-text-primary group-hover:opacity-70 transition-opacity">
            Read paper ↗
          </span>
        </motion.a>
      </div>
    </section>
  );
}
