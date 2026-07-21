import { useState } from "react";
import type { FormEvent, ChangeEvent, SVGProps } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { profile } from "../data";
import emailjs from "@emailjs/browser";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 6.003 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.922.43.37.814 1.096.814 2.21 0 1.596-.015 2.883-.015 3.276 0 .319.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactInfo = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
];

const socials = [
  { icon: GithubIcon, href: profile.github, label: "GitHub" },
  { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-16 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-white/20" />

          <span className="text-xs uppercase tracking-[0.3em] text-white/55">
            {eyebrow}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-body font-medium tracking-tight text-white mb-4">
          {title.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="font-display italic">
                {" "}
                {word}
              </span>
            ) : (
              word + " "
            )
          )}
        </h2>

        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setStatus("sending");

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,          // ✅ changed
        reply_to: form.email,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setStatus("sent");

    setForm({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  } catch (error) {
    console.error(error);
    setStatus("error");
  }
};

  return (
    <section
      id="contact"
      className="relative bg-bg py-20 md:py-28 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have a project in mind or just want to connect? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.2 },
                }}
                className="flex items-center gap-5"
              >
                <div className="w-12 h-12 rounded-full border border-stroke bg-surface flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-text-primary" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted">
                    {label}
                  </p>

                  {href ? (
                    <a
                      href={href}
                      className="text-text-primary hover:text-white transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-text-primary">
                      {value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="flex items-center gap-4 pt-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-stroke bg-surface flex items-center justify-center text-muted transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-text-primary hover:shadow-xl"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </motion.div>
                    {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              y: -6,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5 rounded-3xl border border-stroke bg-surface/80 backdrop-blur-sm p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-xl border border-stroke bg-bg px-4 py-3 text-text-primary placeholder:text-muted outline-none transition-all duration-300 hover:border-white/20 focus:border-white/40"
              />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-xl border border-stroke bg-bg px-4 py-3 text-text-primary placeholder:text-muted outline-none transition-all duration-300 hover:border-white/20 focus:border-white/40"
              />
            </div>

            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              className="rounded-xl border border-stroke bg-bg px-4 py-3 text-text-primary placeholder:text-muted outline-none resize-none transition-all duration-300 hover:border-white/20 focus:border-white/40"
            />

            <motion.button
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              disabled={status === "sending"}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl accent-gradient px-6 py-3 font-medium text-bg transition-all duration-300 disabled:opacity-50"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message
                  <Send size={17} />
                </>
              )}
            </motion.button>

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
