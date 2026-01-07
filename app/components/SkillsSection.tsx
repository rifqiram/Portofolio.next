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
      <div className="flex items-center gap-4 px-8 py-4 rounded-xl bg-[#111] border border-white/10 shadow-[0_6px_0_#000] active:translate-y-[4px] active:shadow-[0_2px_0_#000] transition-all duration-150 hover:border-cyan-500/50">
        <span className="text-3xl group-hover:scale-110 transition-transform">
          {skill.icon}
        </span>
        <span className="text-white font-bold tracking-widest uppercase">
          {skill.name}
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const repeated = [...skills, ...skills, ...skills];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-28 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* TITLE */}
      <div
        className={`mb-16 transition-all duration-1000 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          Tech <span className="text-cyan-400">Keyboard</span>
        </h2>
        <p className="text-gray-400 text-center mt-4">
          Skills I’m currently learning & practicing
        </p>
      </div>

      {/* MARQUEE LEFT */}
      <div className="relative w-full overflow-hidden mb-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <div className="flex min-w-max animate-marquee hover:[animation-play-state:paused]">
          {repeated.map((skill, i) => (
            <Keycap key={`left-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      {/* MARQUEE RIGHT */}
      <div className="relative w-full overflow-hidden">
        <div className="flex min-w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {repeated.map((skill, i) => (
            <Keycap key={`right-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
