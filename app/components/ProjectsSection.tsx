"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import ChromaGrid from '@/app/components/ChromaGrid/ChromaGrid';

/* ================= TRANSLATION ================= */
const translations = {
  id: {
    sectionTitle: "PROYEK",
    sectionSubtitle: "SAYA",
    viewCase: "LIHAT DETAIL",
    stats: [
      { label: "PROJECTS", value: 12 },
      { label: "YEARS EXPERIENCE", value: 3 },
      { label: "TECH STACKS", value: 20 },
    ],
    projects: [
      {
        title: "Sistem Toko & Manajemen Data",
        desc: "Aplikasi berbasis web dengan fitur CRUD lengkap untuk pengelolaan produk dan data transaksi. Dilengkapi sistem autentikasi Login Admin dan User, validasi data, serta manajemen database terstruktur menggunakan MySQL. Dibangun dengan HTML, CSS, JavaScript, dan PHP Native untuk performa yang ringan dan stabil.",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        link: "#",
        image: "/images/StoreSistem.png",
      },
      {
        title: "Website Portofolio Interaktif",
        desc: "Website portofolio personal yang menampilkan identitas, skill, dan proyek secara visual dan interaktif. Menggunakan animasi modern berbasis React Bits, GSAP, dan Framer Motion untuk menciptakan pengalaman pengguna yang smooth, dinamis, dan responsif. Dibangun dengan Next.js untuk performa optimal dan SEO yang baik.",
        tags: ["Next.js", "GSAP", "Framer Motion", "React"],
        link: "https://rifqiram.vercel.app/",
        image: "/images/Portofolio.png",
      },
      {
        title: "Sistem Manajemen Internal",
        desc: "Aplikasi manajemen internal berbasis Laravel dengan fitur CRUD, autentikasi Login Admin dan Staff, serta sistem role-based access control. Setiap role memiliki tampilan dan hak akses berbeda. Menggunakan Laravel, PHP, JavaScript, dan Bootstrap untuk pengelolaan data yang aman, terstruktur, dan mudah dikembangkan.",
        tags: ["Laravel", "PHP", "JavaScript", "Bootstrap", "MySQL"],
        link: "#",
        image: "/images/ManajemenSistem.png",
      },
    ],
  },
  eng: {
    sectionTitle: "MY",
    sectionSubtitle: "PROJECTS",
    viewCase: "VIEW CASE",
    stats: [
      { label: "PROJECTS", value: 12 },
      { label: "YEARS EXPERIENCE", value: 3 },
      { label: "TECH STACKS", value: 20 },
    ],
    projects: [
      {
        title: "Store & Data Management System",
        desc: "A web-based application featuring full CRUD functionality for managing products and transactions. Includes Admin and User authentication, data validation, and a structured MySQL database. Built using HTML, CSS, JavaScript, and native PHP for a lightweight and reliable system.",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        link: "#",
        image: "/images/StoreSistem.png",
      },
      {
        title: "Interactive Portfolio Website",
        desc: "A personal portfolio website showcasing identity, skills, and projects through interactive visuals. Powered by modern animations using React Bits, GSAP, and Framer Motion. Built with Next.js to ensure smooth performance, responsiveness, and SEO optimization.",
        tags: ["Next.js", "GSAP", "Framer Motion", "React"],
        link: "https://rifqiram.vercel.app/",
        image: "/images/Portofolio.png",
      },
      {
        title: "Internal Management System",
        desc: "An internal management application built with Laravel featuring CRUD operations, Admin and Staff authentication, and role-based layouts. Each role has different access levels and interfaces, ensuring secure and structured data management.",
        tags: ["Laravel", "PHP", "JavaScript", "Bootstrap", "MySQL"],
        link: "#",
        image: "/images/ManajemenSistem.png",
      },
    ],
  },
  jpy: {
    sectionTitle: "私",
    sectionSubtitle: "プロジェクト",
    viewCase: "詳細を見る",
    stats: [
      { label: "プロジェクト", value: 12 },
      { label: "経験年数", value: 3 },
      { label: "技術スタック", value: 20 },
    ],
    projects: [
      {
        title: "店舗管理 & CRUD システム",
        desc: "商品や取引データを管理するための CRUD 機能を備えた Web アプリケーション。管理者とユーザーのログイン機能、データ検証、MySQL による構造化されたデータ管理を実装しています。",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        link: "#",
        image: "/images/StoreSistem.png",
      },
      {
        title: "インタラクティブ ポートフォリオ",
        desc: "React、GSAP、Framer Motion を活用したアニメーション重視のポートフォリオサイト。Next.js により高速表示と SEO 最適化を実現しています。",
        tags: ["Next.js", "GSAP", "Framer Motion", "React"],
        link: "https://rifqiram.vercel.app/",
        image: "/images/Portofolio.png",
      },
      {
        title: "社内管理システム",
        desc: "Laravel を使用した社内向け管理システム。CRUD 機能、管理者・スタッフのログイン、ロール別レイアウトを備え、安全で拡張性の高い構成になっています。",
        tags: ["Laravel", "PHP", "JavaScript", "Bootstrap", "MySQL"],
        link: "#",
        image: "/images/ManajemenSistem.png",
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

  const gridItems = t.projects.map((p) => ({
    image: p.image,
    title: p.title.toUpperCase(),
    subtitle: p.desc,
    handle: p.tags.join(", "),
    borderColor: theme === "dark" ? "#06b6d4" : "#3b82f6",
    gradient: theme === "dark"
      ? "linear-gradient(145deg, #06b6d4, #000)"
      : "linear-gradient(145deg, #3b82f6, #fff)",
    url: p.link,
  }));

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
  
  useEffect(() => {
    const update = () => setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    window.addEventListener("themeChanged", update);
    update();
    return () => window.removeEventListener("themeChanged", update);
  }, []);

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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 h-full flex flex-col">
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
                key="chroma"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-[600px] relative"
              >
                <ChromaGrid
                  items={gridItems}
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
