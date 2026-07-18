import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hls from "hls.js";
import { profile } from "../data";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const SOCIALS = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
];

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | undefined;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }

    return () => {
      hls?.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden py-10 md:py-16 border-y border-white/10">
          <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-display italic text-text-primary/80 px-4"
              >
                Let's build something •
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-14 md:pt-20 pb-10 text-center">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6 block">
            Let's talk
          </span>
          <h2 className="text-4xl md:text-6xl font-display italic text-text-primary mb-10">
            Got a project in mind?
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex rounded-full text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 rounded-full px-8 py-4 bg-text-primary text-bg">
              {profile.email}
            </span>
          </a>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-colors duration-200"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
