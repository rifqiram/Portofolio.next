"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Sistem Login & CRUD",
    desc: "Aplikasi web manajemen data terintegrasi dengan keamanan autentikasi menggunakan PHP Native dan MySQL Database.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    link: "#",
  },
  {
    title: "Website Toko Online",
    desc: "Platform E-commerce responsif dengan katalog produk dinamis, sistem keranjang, dan manajemen inventaris.",
    tags: ["JavaScript", "Tailwind", "Firebase"],
    link: "#",
  },
  {
    title: "Portofolio Website",
    desc: "Website portofolio modern dengan animasi Framer Motion, performa tinggi, dan optimasi SEO menggunakan Next.js.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    link: "#",
  }
];

// Komponen Card Terpisah untuk Efek Tilt (Miring)
function ProjectCard({ item, index, isVisible }: { item: any, index: number, isVisible: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden cursor-default"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        {/* Card Number */}
        <span className="absolute -right-10 -top-12 text-9xl font-black text-white/[0.02] italic pointer-events-none group-hover:text-cyan-500/[0.06] transition-colors duration-500">
          0{index + 1}
        </span>

        {/* Tags */}
        <div className="flex gap-2 mb-6">
          {item.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed mb-8 text-sm group-hover:text-gray-300 transition-colors">
          {item.desc}
        </p>

        <div className="flex items-center gap-6 mt-auto">
          <a href={item.link} className="text-white hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm font-bold tracking-tighter">
            VIEW CASE <FaExternalLinkAlt size={12} />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* Hover Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShow(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="min-h-screen py-24 bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Glow Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            FEATURED <span className="text-cyan-400">PROJECTS</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={show ? { width: 100 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-cyan-500 mt-4 rounded-full shadow-[0_0_15px_#06b6d4]" 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((item, index) => (
            <ProjectCard key={item.title} item={item} index={index} isVisible={show} />
          ))}
        </div>
      </div>
    </section>
  );
}