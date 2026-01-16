"use client";

import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon, FaGlobe } from "react-icons/fa";

// Tambahkan translasi untuk label menu navigasi
const navTranslations = {
  id: { home: "Beranda", about: "Tentang", skills: "Keahlian", projects: "Proyek", certificates: "Sertifikat", contact: "Kontak" },
  eng: { home: "Home", about: "About", skills: "Skills", projects: "Projects", certificates: "Certificates", contact: "Contact" },
  jpy: { home: "ホーム", about: "紹介", skills: "スキル", projects: "プロジェクト", certificates: "証明書", contact: "連絡先" },
};

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  const [lang, setLang] = useState("id");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ambil label menu berdasarkan bahasa yang dipilih
  const tNav = navTranslations[lang as keyof typeof navTranslations];

  const navItems = [
    { id: "home", label: tNav.home },
    { id: "about", label: tNav.about },
    { id: "skills", label: tNav.skills },
    { id: "projects", label: tNav.projects },
    { id: "certificates", label: tNav.certificates },
    { id: "contact", label: tNav.contact },
  ];

  const languages = [
    { code: "id", name: "Indonesia" },
    { code: "eng", name: "English" },
    { code: "jpy", name: "Japanese" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateIconStatus = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme !== "light");
  };

  useEffect(() => {
    updateIconStatus();
    const handleThemeChange = () => updateIconStatus();
    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    window.dispatchEvent(new Event("expandingCircle"));
    document.documentElement.setAttribute("data-theme", nextTheme);
    updateIconStatus();
    window.dispatchEvent(new Event("themeChanged"));
  };

  // FUNGSI UTAMA UNTUK TRIGGER GLOBAL
  const changeLanguage = (code: string) => {
    setLang(code);
    setShowLangDropdown(false);
    
    // Broadcast ke komponen lain (seperti HomeSection)
    const event = new CustomEvent("langChanged", { detail: code });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <nav 
      style={{ zIndex: 100 }} 
      className="fixed top-4 md:top-6 left-0 w-full flex justify-center px-4 transition-all duration-500"
    >
      <div 
        className={`flex items-center rounded-full border transition-all duration-500 shadow-2xl
        ${scrolled
            ? "bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-gray-300 dark:border-cyan-500/30 shadow-cyan-500/10"
            : "bg-white/80 dark:bg-black/20 backdrop-blur-md border-gray-300 dark:border-white/10"
        }`}
      >
        <div className="flex items-center pl-4 pr-2 py-2 overflow-x-auto no-scrollbar max-w-[50vw] md:max-w-none">
          <div className="flex items-center gap-1 md:gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  setActive(item.id);
                }}
                className={`relative whitespace-nowrap px-2 md:px-1 py-1 text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300
                ${active === item.id
                    ? "text-cyan-500 dark:text-cyan-400"
                    : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-black"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyan-500 dark:bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="w-[1px] h-5 bg-gray-300 dark:bg-white/10 mx-2 flex-shrink-0" />

        {/* DROPDOWN BAHASA */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className={`flex items-center gap-1 px-2 py-1 text-[10px] md:text-xs font-bold transition-all
            ${isDark ? "text-gray-400 hover:text-cyan-400" : "text-gray-500 hover:text-cyan-500"}`}
          >
            <FaGlobe className={showLangDropdown ? "text-cyan-400 animate-spin-slow" : ""} />
            <span className="uppercase">{lang}</span>
          </button>

          {showLangDropdown && (
            <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-32 rounded-2xl border shadow-2xl p-2 transition-all animate-in fade-in zoom-in duration-200
              ${isDark ? "bg-[#0a0a0a] border-cyan-500/30 text-white" : "bg-white border-gray-200 text-black"}`}>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`w-full text-left px-4 py-2 text-[10px] md:text-xs font-bold rounded-xl transition-all mb-1 last:mb-0
                    ${lang === l.code 
                      ? "bg-cyan-500 text-black" 
                      : isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-[1px] h-5 bg-gray-300 dark:bg-white/10 mx-2 flex-shrink-0" />

        <div className="pr-4 pl-2 flex items-center justify-center">
          <button 
            onClick={toggleTheme} 
            className={`relative flex items-center w-10 md:w-12 h-6 rounded-full p-1 transition-all duration-500 border
            ${isDark 
              ? "bg-cyan-500/10 border-cyan-500/30" 
              : "bg-gray-100 border-gray-300"}`}
          >
            <div className={`flex items-center justify-center w-4 h-4 rounded-full shadow-md transition-all duration-500 transform
              ${isDark ? "translate-x-4 md:translate-x-6 bg-cyan-400" : "translate-x-0 bg-white"}`}
            >
              {isDark 
                ? <FaSun size={10} className="text-[#0a0a0a]" /> 
                : <FaMoon size={10} className="text-gray-600" />}
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </nav>
  );
}