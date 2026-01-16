"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// 1. DATA PROJECT DENGAN MULTI-LANGUAGE
const translations = {
  id: {
    sectionTitle: "PROYEK",
    sectionSubtitle: "UNGGULAN",
    viewCase: "LIHAT DETAIL",
    projects: [
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
        title: "Website Portofolio",
        desc: "Website portofolio modern dengan animasi Framer Motion, performa tinggi, dan optimasi SEO menggunakan Next.js.",
        tags: ["Next.js", "TypeScript", "Framer Motion"],
        link: "#",
      }
    ]
  },
  eng: {
    sectionTitle: "FEATURED",
    sectionSubtitle: "PROJECTS",
    viewCase: "VIEW CASE",
    projects: [
      {
        title: "Login & CRUD System",
        desc: "Integrated data management web application with authentication security using Native PHP and MySQL Database.",
        tags: ["PHP", "MySQL", "Bootstrap"],
        link: "#",
      },
      {
        title: "E-Commerce Website",
        desc: "Responsive E-commerce platform with dynamic product catalogs, cart systems, and inventory management.",
        tags: ["JavaScript", "Tailwind", "Firebase"],
        link: "#",
      },
      {
        title: "Portfolio Website",
        desc: "Modern portfolio website with Framer Motion animations, high performance, and SEO optimization using Next.js.",
        tags: ["Next.js", "TypeScript", "Framer Motion"],
        link: "#",
      }
    ]
  },
  jpy: {
    sectionTitle: "主な",
    sectionSubtitle: "プロジェクト",
    viewCase: "詳細を見る",
    projects: [
      {
        title: "ログイン & CRUD システム",
        desc: "PHP Native と MySQL データベースを使用した、認証セキュリティを備えた統合データ管理 Web アプリケーション。",
        tags: ["PHP", "MySQL", "Bootstrap"],
        link: "#",
      },
      {
        title: "オンラインショップ",
        desc: "動的な商品カタログ、カートシステム、在庫管理を備えたレスポンシブな E コマースプラットフォーム。",
        tags: ["JavaScript", "Tailwind", "Firebase"],
        link: "#",
      },
      {
        title: "ポートフォリオサイト",
        desc: "Framer Motion アニメーション、高性能、Next.js を使用した SEO 最適化を備えたモダンなポートフォリオサイト。",
        tags: ["Next.js", "TypeScript", "Framer Motion"],
        link: "#",
      }
    ]
  }
};

type Language = "id" | "eng" | "jpy";

function ProjectCard({ item, index, isVisible, theme, viewCaseText }: { item: any, index: number, isVisible: boolean, theme: string, viewCaseText: string }) {
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

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative border rounded-2xl p-8 overflow-hidden cursor-default transition-colors duration-500
        ${theme==="dark" ? "bg-[#111] border-white/5" : "bg-white border-black/10"}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <span className="absolute -right-10 -top-12 text-9xl font-black text-white/[0.02] italic pointer-events-none group-hover:text-cyan-500/[0.06] transition-colors duration-500">
          0{index + 1}
        </span>

        <div className="flex gap-2 mb-6">
          {item.tags.map((tag: string) => (
            <span key={tag} className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border transition-colors duration-500
              ${theme==="dark" 
                ? "bg-white/5 text-gray-400 border-white/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400"
                : "bg-black/5 text-gray-700 border-black/10 group-hover:border-blue-400 group-hover:text-blue-500"}`}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${theme==="dark" ? "text-white group-hover:text-cyan-400" : "text-black group-hover:text-blue-500"}`}>
          {item.title}
        </h3>

        <p className={`text-sm leading-relaxed mb-8 transition-colors duration-500 ${theme==="dark" ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-800"}`}>
          {item.desc}
        </p>

        <div className="flex items-center gap-6 mt-auto">
          <a href={item.link} className={`flex items-center gap-2 font-bold text-sm tracking-tighter transition-colors duration-500 ${theme==="dark" ? "text-white group-hover:text-cyan-400" : "text-black group-hover:text-blue-500"}`}>
            {viewCaseText} <FaExternalLinkAlt size={12} />
          </a>
          <a href="#" className={`transition-colors duration-500 ${theme==="dark" ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-black"}`}>
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isExpanding, setIsExpanding] = useState(false);
  
  // 2. STATE BAHASA
  const [lang, setLang] = useState<Language>("id");
  const t = translations[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShow(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 3. LISTEN PERUBAHAN BAHASA
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

  return (
    <section ref={ref} id="projects" className={`min-h-screen py-24 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-700 ${theme==="dark"?"bg-[#0a0a0a]":"bg-white"}`}>
      
      {isExpanding && (
        <div
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width:"250vw", height:"250vw", top:"50%", left:"50%",
            background: theme==="dark"?"#ffffff":"#0a0a0a",
            transform:"translate(-50%,-50%) scale(0)",
            transition:"transform 1.2s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease",
            opacity:1,
          }}
          ref={(el)=>{ if(el) requestAnimationFrame(()=>{ el.style.transform="translate(-50%,-50%) scale(1)"; el.style.opacity="0"; }); }}
          onTransitionEnd={()=>setIsExpanding(false)}
        />
      )}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2 className={`text-5xl md:text-7xl font-black tracking-tighter transition-colors duration-500 ${theme==="dark"?"text-white":"text-black"}`}>
            {t.sectionTitle} <span className={`text-cyan-400`}>{t.sectionSubtitle}</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={show ? { width: 100 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-cyan-500 mt-4 rounded-full shadow-[0_0_15px_#06b6d4]" 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {/* Loop menggunakan data dari objek translasi */}
          {t.projects.map((item, index) => (
            <ProjectCard 
              key={item.title} 
              item={item} 
              index={index} 
              isVisible={show} 
              theme={theme} 
              viewCaseText={t.viewCase} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}