"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

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
        {/* AREA MENU: Scrollable on Mobile */}
        <div className="flex items-center pl-4 pr-2 py-2 overflow-x-auto no-scrollbar max-w-[65vw] md:max-w-none">
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

        {/* SEPARATOR */}
        <div className="w-[1px] h-5 bg-gray-300 dark:bg-white/10 mx-2 flex-shrink-0" />

        {/* TOGGLE THEME: Rapi & Center */}
        <div className="pr-4 pl-2 flex items-center justify-center">
          <button 
            onClick={toggleTheme} 
            className={`relative flex items-center w-12 h-6 rounded-full p-1 transition-all duration-500 border
            ${isDark 
              ? "bg-cyan-500/10 border-cyan-500/30" 
              : "bg-gray-100 border-gray-300"}`}
          >
            {/* Knob/Lingkaran Switch */}
            <div className={`flex items-center justify-center w-4 h-4 rounded-full shadow-md transition-all duration-500 transform
              ${isDark ? "translate-x-6 bg-cyan-400" : "translate-x-0 bg-white"}`}
            >
              {isDark 
                ? <FaSun size={10} className="text-[#0a0a0a]" /> 
                : <FaMoon size={10} className="text-gray-600" />}
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}