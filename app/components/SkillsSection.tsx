"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPhp,
  FaDatabase,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: React.ReactNode;
};

const skills: Skill[] = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "PHP", icon: <FaPhp className="text-indigo-400" /> },
  { name: "MySQL", icon: <FaDatabase className="text-blue-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
];

function Keycap({ skill }: { skill: Skill }) {
  return (
    <div className="group mx-3">
      <div className="flex items-center gap-4 px-8 py-4 rounded-xl bg-[#111] border border-white/10 shadow-[0_6px_0_#000] active:translate-y-[4px] active:shadow-[0_2px_0_#000] transition-all duration-150 hover:border-cyan-500/50 hover:shadow-[0_6px_20px_rgba(6,182,212,0.1)]">
        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
          {skill.icon}
        </span>
        <span className="text-white font-bold tracking-widest uppercase text-sm">
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
  const mouse = useRef({ x: 0, y: 0 });

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
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.2); // Melayang ke atas
        this.opacity = Math.random() * 0.5;
      }
      update() {
        this.y += this.speedY;
        // Interaksi mouse halus (mengikuti gerakan sedikit)
        this.x += (mouse.current.x - canvas!.width / 2) * 0.005;

        if (this.y < 0) {
          this.y = canvas!.height;
          this.x = Math.random() * canvas!.width;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize(); init(); animate();

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const repeated = [...skills, ...skills, ...skills];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      {/* BACKGROUND PARTICLES */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

      <div
        className={`relative z-10 mb-20 transition-all duration-1000 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-6xl font-black text-white text-center tracking-tighter">
          MY <span className="text-cyan-400">SKILLS</span>
        </h2>
        <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_#06b6d4]" />
        <p className="text-gray-500 text-center mt-6 tracking-[0.2em] uppercase text-xs">
          Professional Stack & Tools
        </p>
      </div>

      {/* MARQUEE LEFT */}
      <div className="relative w-full overflow-hidden mb-12 z-10">
        {/* Shadow Overlay untuk efek menghilang di pinggir */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20" />

        <div className="flex min-w-max animate-marquee py-4">
          {repeated.map((skill, i) => (
            <Keycap key={`left-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* MARQUEE RIGHT */}
      <div className="relative w-full overflow-hidden z-10">
        <div className="flex min-w-max animate-marquee-reverse py-4">
          {repeated.map((skill, i) => (
            <Keycap key={`right-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* CSS Animasi Marquee (Jika belum ada di global.css) */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}