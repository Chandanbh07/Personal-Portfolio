import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Hls from "hls.js";
import { profile } from "../data";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      ".name-reveal",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    ).fromTo(
      ".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
      0.3
    );
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
            scrolled ? "shadow-md shadow-black/10" : ""
          }`}
        >
          <a
            href="#home"
            className="group relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            <span className="absolute inset-0 rounded-full accent-gradient group-hover:[background-image:linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)]" />
            <span className="absolute inset-[1.5px] rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary">
                {profile.initials}
              </span>
            </span>
          </a>

          <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          <div className="w-px h-5 bg-stroke mx-1" />

          <Link
            to="/terminal"
            className="group relative text-xs sm:text-sm rounded-full"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center gap-1 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-surface backdrop-blur-md text-muted group-hover:text-text-primary transition-colors duration-200">
              Terminal <span aria-hidden>_</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        
        <h1 className="name-reveal text-5xl md:text-7xl lg:text-8xl font-display italic leading-[0.95] tracking-tight text-text-primary mb-6">
          {profile.name}
        </h1>
        <p className="blur-in text-sm md:text-base text-muted mb-2">
          A{" "}
          <span className="font-display italic text-text-primary">
            {profile.role}
          </span>{" "}
          based in {profile.location}.
        </p>
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          {profile.tagline}
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#work"
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center rounded-full px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300">
              See Work
            </span>
          </a>
          <a
            href="/resume.pdf"
            download
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300" />
            <span className="relative flex items-center rounded-full px-7 py-3.5 border-2 border-stroke group-hover:border-transparent bg-bg text-text-primary transition-colors duration-300">
              Download Resume
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute left-0 top-0 w-px h-4 bg-text-primary/70 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
