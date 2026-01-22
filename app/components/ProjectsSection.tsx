"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import CircularGallery from "@/components/CircularGallery"; // Pastikan path benar

/* ================= TRANSLATION ================= */
const translations = {
  id: {
    sectionTitle: "PROYEK",
    sectionSubtitle: "UNGGULAN",
    viewCase: "LIHAT DETAIL",
    stats: [
      { label: "PROJECTS", value: 12 },
      { label: "YEARS EXPERIENCE", value: 3 },
      { label: "TECH STACKS", value: 20 },
    ],
    projects: [
      {
        title: "Sistem Login & CRUD",
        desc: "Aplikasi web manajemen data dengan autentikasi menggunakan PHP Native dan MySQL.",
        tags: ["PHP", "MySQL", "Bootstrap"],
        link: "#",
        image: "/images/login.png",
      },
      {
        title: "Website Toko Online",
        desc: "Platform E-commerce responsif dengan katalog produk dinamis.",
        tags: ["JavaScript", "Tailwind", "Firebase"],
        link: "#",
        image: "/images/CRUD.png",
      },
      {
        title: "Website Portofolio",
        desc: "Portofolio modern dengan animasi Framer Motion dan optimasi SEO.",
        tags: ["Next.js", "TypeScript", "Framer Motion"],
        link: "#",
        image: "https://picsum.photos/seed/project3/800/600",
      },
    ],
  },
  eng: {
    sectionTitle: "FEATURED",
    sectionSubtitle: "PROJECTS",
    viewCase: "VIEW CASE",
    stats: [
      { label: "PROJECTS", value: 12 },
      { label: "YEARS EXPERIENCE", value: 3 },
      { label: "TECH STACKS", value: 20 },
    ],
    projects: [
      {
        title: "Login & CRUD System",
        desc: "Integrated web app with authentication using PHP and MySQL.",
        tags: ["PHP", "MySQL", "Bootstrap"],
        link: "#",
        image: "/images/login.png",
      },
      {
        title: "E-Commerce Website",
        desc: "Responsive E-commerce platform with dynamic catalog.",
        tags: ["JavaScript", "Tailwind", "Firebase"],
        link: "#",
        image: "/images/CRUD.png",
      },
      {
        title: "Portfolio Website",
        desc: "Modern portfolio with smooth animation and SEO optimization.",
        tags: ["Next.js", "TypeScript", "Framer Motion"],
        link: "#",
        image: "https://picsum.photos/seed/project3/800/600",
      },
    ],
  },
  jpy: {
    sectionTitle: "主な",
    sectionSubtitle: "プロジェクト",
    viewCase: "詳細を見る",
    stats: [
      { label: "プロジェクト", value: 12 },
      { label: "経験年数", value: 3 },
      { label: "技術スタック", value: 20 },
    ],
    projects: [
      {
        title: "ログイン & CRUD",
        desc: "PHP と MySQL を使用した認証付き Web アプリ。",
        tags: ["PHP", "MySQL", "Bootstrap"],
        link: "#",
        image: "/images/login.png",
      },
      {
        title: "オンラインショップ",
        desc: "動的な商品管理が可能な EC サイト。",
        tags: ["JavaScript", "Tailwind", "Firebase"],
        link: "#",
        image: "/images/CRUD.png",
      },
      {
        title: "ポートフォリオサイト",
        desc: "Framer Motion を使ったモダンなポートフォリオ。",
        tags: ["Next.js", "TypeScript", "Framer Motion"],
        link: "#",
        image: "https://picsum.photos/seed/project3/800/600",
      },
    ],
  },
};

type Language = "id" | "eng" | "jpy";

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [showCounter, setShowCounter] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState<Language>("id");

  const t = translations[lang];

  // Mapping data projects ke format CircularGallery
  const galleryItems = t.projects.map((p) => ({
    image: p.image,
    text: p.title.toUpperCase(),
  }));

  /* ===== EFFECT: Intersection Observer ===== */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          setShowCounter(true);
          setTimeout(() => setShowCounter(false), 2800);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* ===== EFFECT: Theme ===== */
  useEffect(() => {
    const update = () => setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    window.addEventListener("themeChanged", update);
    update();
    return () => window.removeEventListener("themeChanged", update);
  }, []);

  /* ===== EFFECT: Language ===== */
  useEffect(() => {
    const handler = (e: any) => setLang(e.detail);
    window.addEventListener("langChanged", handler);
    return () => window.removeEventListener("langChanged", handler);
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className={`min-h-screen py-32 relative transition-colors duration-1000 overflow-hidden ${
        theme === "dark" ? "bg-[#070707] text-white" : "bg-[#fcfcfc] text-black"
      }`}
    >
      {/* Glow Ambient */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 h-full flex flex-col">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={show ? { width: 40 } : {}}
              className="h-1 bg-cyan-500 mb-4 rounded-full"
            />
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={show ? { opacity: 1, x: 0 } : {}}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-none"
            >
              {t.sectionTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic font-light lowercase">
                {t.sectionSubtitle}.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            className="flex items-center gap-6"
          >
            <div className="h-[1px] w-24 bg-current opacity-10 hidden lg:block" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">Drag to explore</p>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="flex-grow min-h-[600px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {showCounter ? (
              <motion.div
                key="counter"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: "blur(20px)", y: -40 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full"
              >
                {t.stats.map((s) => (
                  <div key={s.label} className="text-center group">
                    <h3 className="text-8xl md:text-9xl font-black text-cyan-500 tracking-tighter transition-transform duration-500 group-hover:scale-105">
                      <CountUp end={s.value} duration={2.5} />
                      <span className="text-white opacity-20">+</span>
                    </h3>
                    <p className="text-xs tracking-[0.4em] uppercase text-gray-500 mt-6 font-bold">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="circular"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-[600px]"
              >
                <CircularGallery
                  items={galleryItems}
                  bend={3}
                  textColor={theme === "dark" ? "#ffffff" : "#000000"}
                  borderRadius={0.08}
                  font="bold 30px Figtree"
                  dragOnly={true} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
