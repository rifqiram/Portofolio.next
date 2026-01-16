"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const translations = {
  id: {
    desc: "Membangun produk digital berdampak dengan kode yang bersih dan interaksi yang halus.",
    backTop: "KEMBALI KE ATAS",
    rights: "HAK CIPTA DILINDUNGI",
    location: "Kab. Madiun, Indonesia",
  },
  eng: {
    desc: "Building impactful digital products with clean code and smooth interactions.",
    backTop: "BACK TO TOP",
    rights: "ALL RIGHTS RESERVED",
    location: "Madiun Regency, Indonesia",
  },
  jpy: {
    desc: "クリーンなコードとスムーズなインタラクションで、インパクトのあるデジタル製品を構築します。",
    backTop: "トップに戻る",
    rights: "全著作権所有",
    location: "インドネシア、マディウン",
  }
};

type Language = "id" | "eng" | "jpy";

export default function Footer() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState<Language>("id");
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Listeners untuk Tema dan Bahasa
  useEffect(() => {
    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener("langChanged", handleLangChange);
    
    const handleThemeChange = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };
    window.addEventListener("themeChanged", handleThemeChange);
    handleThemeChange();

    return () => {
      window.removeEventListener("langChanged", handleLangChange);
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  const socialsLinks = [
    { icon: <FaFacebookF size={18} />, url: "https://www.facebook.com/share/15XQhTrVwP6/" },
    { icon: <FaGithub size={18} />, url: "https://github.com/rifqiram" },
    { icon: <FaInstagram size={18} />, url: "https://www.instagram.com/r.ramadhan._" },
    { icon: <FaLinkedinIn size={18} />, url: "https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/" },
  ];

  const marqueeText = `© 2026 RIFQI RAMADHAN • ${t.rights} • `;

  return (
    <footer className={`relative border-t transition-colors duration-1000 pt-16 pb-8 overflow-hidden
      ${theme === "dark" ? "bg-[#0a0a0a] border-white/5" : "bg-white border-black/5"}`}>
      
      {/* Efek Garis Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent`} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          
          {/* SISI KIRI: Branding */}
          <div className="text-center md:text-left">
            <h2 className={`text-2xl font-black tracking-tighter mb-2 uppercase italic transition-colors
              ${theme === "dark" ? "text-white" : "text-black"}`}>
              Rifqi<span className="text-cyan-400"> Ramadhan</span>
            </h2>
            <p className={`text-sm max-w-xs leading-relaxed font-light transition-colors
              ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
              {t.desc}
            </p>
          </div>

          {/* SISI TENGAH: Social Icons */}
          <div className="flex gap-4">
            {socialsLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-2 shadow-lg
                  ${theme === "dark" 
                    ? "bg-white/5 border-white/10 text-white hover:bg-cyan-500 hover:text-black" 
                    : "bg-black/5 border-black/10 text-black hover:bg-blue-600 hover:text-white"}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* SISI KANAN: Back to Top */}
          <button
            onClick={scrollToTop}
            className={`group flex items-center gap-3 px-8 py-3 bg-transparent border-2 font-bold text-xs uppercase tracking-widest rounded-md transition-all duration-300 active:scale-95 shadow-lg
              ${theme === "dark" 
                ? "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black shadow-cyan-500/10" 
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-blue-600/10"}`}
          >
            {t.backTop}
            <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* BOTTOM SECTION */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 
          ${theme === "dark" ? "border-white/5" : "border-black/5"}`}>
          
          {/* RUNNING TEXT COPYRIGHT */}
          <div className="relative flex overflow-hidden w-full md:w-1/2 group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 15, repeat: Infinity }}
              className="flex whitespace-nowrap"
            >
              <span className={`text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium pr-4 
                ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                {marqueeText.repeat(8)}
              </span>
            </motion.div>
            
            <div className={`absolute inset-y-0 left-0 w-8 z-10 
              ${theme === "dark" ? "bg-gradient-to-r from-[#0a0a0a]" : "bg-gradient-to-r from-white"}`} />
            <div className={`absolute inset-y-0 right-0 w-8 z-10 
              ${theme === "dark" ? "bg-gradient-to-l from-[#0a0a0a]" : "bg-gradient-to-l from-white"}`} />
          </div>
          
          <div className={`flex gap-6 text-[10px] uppercase tracking-widest font-bold items-center shrink-0
            ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Frontend Developer</span>
            <span className="text-cyan-500/50 hidden md:inline">|</span>
            
            <a 
              href="https://maps.google.com/?q=Madiun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              {t.location}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}