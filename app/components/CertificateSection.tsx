"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaTimes, FaEye, FaLock } from "react-icons/fa";

// 1. OBJEK TRANSLASI
const translations = {
  id: {
    badge: "Pencapaian",
    title1: "Sertifikat",
    title2: "Saya",
    close: "TUTUP TAMPILAN",
    comingSoon: "Segera Hadir",
    certificates: [
      {
        title: "Pengantar Literasi Keuangan",
        issuer: "Nama Penerbit", 
        date: "2025",
        pdfUrl: "/cert/Sertifikat Introduction to Financial Literacy.pdf",
        isEmpty: false,
      },
      { title: "Pencapaian Berikutnya", issuer: "Segera Hadir", date: "-", pdfUrl: "", isEmpty: true },
      { title: "Pencapaian Berikutnya", issuer: "Segera Hadir", date: "-", pdfUrl: "", isEmpty: true },
      { title: "Pencapaian Berikutnya", issuer: "Segera Hadir", date: "-", pdfUrl: "", isEmpty: true },
    ]
  },
  eng: {
    badge: "Achievements",
    title1: "My",
    title2: "Certificates",
    close: "CLOSE VIEW",
    comingSoon: "Coming Soon",
    certificates: [
      {
        title: "Introduction to Financial Literacy",
        issuer: "Issuer Name", 
        date: "2025",
        pdfUrl: "/cert/Sertifikat Introduction to Financial Literacy.pdf",
        isEmpty: false,
      },
      { title: "Next Achievement", issuer: "Coming Soon", date: "-", pdfUrl: "", isEmpty: true },
      { title: "Next Achievement", issuer: "Coming Soon", date: "-", pdfUrl: "", isEmpty: true },
      { title: "Next Achievement", issuer: "Coming Soon", date: "-", pdfUrl: "", isEmpty: true },
    ]
  },
  jpy: {
    badge: "実績",
    title1: "私の",
    title2: "証明書",
    close: "ビューを閉じる",
    comingSoon: "近日公開",
    certificates: [
      {
        title: "金融リテラシー入門",
        issuer: "発行者名", 
        date: "2025年",
        pdfUrl: "/cert/Sertifikat Introduction to Financial Literacy.pdf",
        isEmpty: false,
      },
      { title: "次の成果", issuer: "近日公開", date: "-", pdfUrl: "", isEmpty: true },
      { title: "次の成果", issuer: "近日公開", date: "-", pdfUrl: "", isEmpty: true },
      { title: "次の成果", issuer: "近日公開", date: "-", pdfUrl: "", isEmpty: true },
    ]
  }
};

type Language = "id" | "eng" | "jpy";

export default function CertificateSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [theme, setTheme] = useState("dark");
  const [isExpanding, setIsExpanding] = useState(false);
  
  // 2. STATE BAHASA
  const [lang, setLang] = useState<Language>("id");
  const t = translations[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
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
    <section
      id="certificates"
      ref={sectionRef}
      className={`min-h-screen py-24 flex flex-col items-center relative overflow-hidden transition-colors duration-700
        ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}
    >

      {/* Expanding Circle - Menyesuaikan Warna Sebaliknya */}
      {isExpanding && (
        <div
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width:"250vw", height:"250vw", top:"50%", left:"50%",
            // Jika tema sekarang dark, berarti transisi sebelumnya dari light (putih)
            background: theme === "dark" ? "#0a0a0a" : "#ffffff",
            transform:"translate(-50%,-50%) scale(0)",
            transition:"transform 1.0s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
            opacity:1,
          }}
          ref={(el)=>{ if(el) requestAnimationFrame(()=>{ el.style.transform="translate(-50%,-50%) scale(1)"; el.style.opacity="0"; }); }}
          onTransitionEnd={()=>setIsExpanding(false)}
        />
      )}

      <div className="max-w-6xl w-full px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaAward className="text-cyan-400 text-2xl" />
            <span className="text-cyan-400 tracking-[0.3em] font-bold text-sm uppercase">{t.badge}</span>
          </div>
          <h2 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase transition-colors duration-500
            ${theme === "dark" ? "text-white" : "text-black"}`}>
            {t.title1} <span className="text-cyan-400">{t.title2}</span>
          </h2>
        </motion.div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !cert.isEmpty && setSelectedPdf(cert.pdfUrl)}
              className={`group relative border rounded-xl p-6 transition-all duration-500 shadow-lg
                ${cert.isEmpty 
                  ? "border-white/5 bg-transparent opacity-40 cursor-not-allowed"
                  : theme === "dark" 
                    ? "bg-[#111] border-white/10 hover:border-cyan-500/50 cursor-pointer shadow-xl"
                    : "bg-white border-black/10 hover:border-blue-400 cursor-pointer shadow-md hover:shadow-lg"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className={`text-lg font-bold uppercase italic transition-colors
                    ${cert.isEmpty ? "text-gray-600" : theme === "dark" ? "text-white group-hover:text-cyan-400" : "text-black group-hover:text-blue-500"}`}>
                    {cert.title}
                  </h3>
                  <p className={`text-sm font-mono ${theme==="dark"?"text-gray-500":"text-gray-700"}`}>
                    {cert.issuer} {cert.date !== "-" && `• ${cert.date}`}
                  </p>
                </div>
                <div className={`p-3 rounded-full transition-all
                  ${cert.isEmpty 
                    ? "bg-white/5 text-gray-700" 
                    : theme==="dark" 
                      ? "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  }`}>
                  {cert.isEmpty ? <FaLock /> : <FaEye />}
                </div>
              </div>

              {!cert.isEmpty && (
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-500 group-hover:w-full transition-all duration-700" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL VIEW */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <div className="relative w-full h-full max-w-6xl flex flex-col items-center">
              <button 
                onClick={() => setSelectedPdf(null)}
                className="self-end mb-4 text-white flex items-center gap-2 font-bold tracking-widest hover:text-cyan-400 transition-colors uppercase"
              >
                {t.close} <FaTimes />
              </button>
              <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={`${selectedPdf}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-none"
                  title="Sertifikat Viewer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}