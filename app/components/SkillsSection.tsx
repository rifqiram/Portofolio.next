"use client";

import { useEffect, useRef, useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaDatabase, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

// 1. OBJEK TRANSLASI
const translations = {
  id: {
    subtitle: "Keahlian Saya",
    title1: "Teknologi &",
    title2: "Peralatan",
  },
  eng: {
    subtitle: "My Skills",
    title1: "Tools &",
    title2: "Technology",
  },
  jpy: {
    subtitle: "スキル",
    title1: "ツール &",
    title2: "テクノロジー",
  },
};

type Language = "id" | "eng" | "jpy";
type Skill = { name: string; icon: React.ReactNode };

const skills: Skill[] = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "PHP", icon: <FaPhp /> },
  { name: "MySQL", icon: <FaDatabase /> },
  { name: "Node.js", icon: <FaNodeJs /> },
];

function Keycap({ skill, theme }: { skill: Skill; theme: string }) {
  const iconColor = (() => {
    switch (skill.name) {
      case "HTML": return "text-orange-500";
      case "CSS": return "text-blue-500";
      case "JavaScript": return "text-yellow-400";
      case "React": return "text-cyan-400";
      case "Next.js": return theme === "dark" ? "text-white" : "text-black";
      case "Tailwind": return "text-cyan-300";
      case "TypeScript": return "text-blue-400";
      case "PHP": return "text-indigo-400";
      case "MySQL": return "text-blue-500";
      case "Node.js": return "text-green-500";
      default: return "text-white";
    }
  })();

  return (
    <div className="group mx-4">
      <div className={`flex items-center gap-4 px-8 py-5 rounded-2xl transition-all duration-700 backdrop-blur-sm active:translate-y-[4px]
        ${theme === "dark"
          ? "bg-[#111]/80 border-white/5 shadow-[0_8px_0_#000] hover:bg-[#161616]"
          : "bg-white/50 border-black/10 shadow-[0_8px_0_#ccc] hover:bg-white/80"}
        hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] group-hover:-translate-y-1`}
      >
        <span className={`text-4xl group-hover:scale-125 transition-all duration-700 ease-out ${iconColor}`}>
          {skill.icon}
        </span>
        <span className={`font-black tracking-widest uppercase text-sm transition-colors duration-700 ${theme === "dark" ? "text-white" : "text-black"}`}>
          {skill.name}
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isExpanding, setIsExpanding] = useState(false);
  const [lang, setLang] = useState<Language>("id");
  const mouse = useRef({ x: 0, y: 0 });

  const t = translations[lang];

  useEffect(() => {
    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener("langChanged", handleLangChange);
    return () => window.removeEventListener("langChanged", handleLangChange);
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };
    window.addEventListener("themeChanged", handleThemeChange);
    handleThemeChange();
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  useEffect(() => {
    const handleExpandingCircle = () => setIsExpanding(true);
    window.addEventListener("expandingCircle", handleExpandingCircle);
    return () => window.removeEventListener("expandingCircle", handleExpandingCircle);
  }, []);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = sectionRef.current?.offsetHeight || 800;
    };

    class Particle {
      x: number; y: number; size: number; speedY: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.opacity = Math.random() * 0.4;
      }
      update() {
        this.y += this.speedY;
        const dx = (mouse.current.x - window.innerWidth / 2) * 0.002;
        this.x += dx;
        if (this.y < 0) { this.y = canvas!.height; this.x = Math.random() * canvas!.width; }
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
      }
      draw() {
        ctx.fillStyle = theme === "dark" ? `rgba(6,182,212,${this.opacity})` : `rgba(14,165,233,${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const init = () => { particles = []; for (let i = 0; i < 60; i++) particles.push(new Particle()); };
    const animate = () => { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p => { p.update(); p.draw(); }); animationFrameId = requestAnimationFrame(animate); };
    const handleMouseMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize(); init(); animate();

    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setShow(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [theme]);

  const repeated = [...skills, ...skills, ...skills, ...skills];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Circle Layer - Sync with Home & About */}
      {isExpanding && (
        <div
          className="fixed z-10 rounded-full pointer-events-none"
          style={{
            width: "150px", height: "150px", top: "50%", left: "50%",
            background: theme === "dark" ? "#0a0a0a" : "#ffffff",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 1,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease",
          }}
          ref={(el) => {
            if (el) requestAnimationFrame(() => {
              el.style.transform = "translate(-50%, -50%) scale(50)";
              el.style.opacity = "0";
            });
          }}
          onTransitionEnd={() => setIsExpanding(false)}
        />
      )}

      {/* HEADER */}
      <div className={`relative z-20 mb-24 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`h-[1px] w-8 transition-colors duration-700 ${theme === "dark" ? "bg-cyan-500/50" : "bg-blue-500/50"}`} />
          <span className={`text-xs font-bold tracking-[0.4em] uppercase transition-colors duration-700 ${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}>
            {t.subtitle}
          </span>
          <div className={`h-[1px] w-8 transition-colors duration-700 ${theme === "dark" ? "bg-cyan-500/50" : "bg-blue-500/50"}`} />
        </div>
        <h2 className={`text-6xl md:text-8xl font-black text-center tracking-tighter uppercase italic transition-colors duration-700 ${theme === "dark" ? "text-white" : "text-black"}`}>
          {t.title1} <span className={`transition-colors duration-700 ${theme === "dark" ? "text-cyan-400" : "text-blue-500"}`}>{t.title2}</span>
        </h2>
      </div>

      {/* MARQUEE */}
      <div className="relative w-full z-20 space-y-10 marquee-masking">
        <div className="flex overflow-hidden group">
          <div className="flex min-w-max animate-marquee py-4 group-hover:pause">
            {repeated.map((skill, i) => <Keycap key={`left-${i}`} skill={skill} theme={theme} />)}
          </div>
        </div>
        <div className="flex overflow-hidden group">
          <div className="flex min-w-max animate-marquee-reverse py-4 group-hover:pause">
            {repeated.map((skill, i) => <Keycap key={`right-${i}`} skill={skill} theme={theme} />)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-masking {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 50s linear infinite; }
        .pause { animation-play-state: paused; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </section>
  );
}