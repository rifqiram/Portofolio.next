"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCheckCircle } from "react-icons/fa";

export default function ThemeSection() {
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const sync = () => {
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      setCurrentTheme(theme);
    };

    sync();
    window.addEventListener("themeChanged", sync);
    return () => window.removeEventListener("themeChanged", sync);
  }, []);

  const changeTheme = (newTheme: string) => {
    if (newTheme === currentTheme) return;

    const performChange = () => {
      document.documentElement.setAttribute("data-theme", newTheme);
      setCurrentTheme(newTheme);
      window.dispatchEvent(new Event("themeChanged"));
    };

    if (!document.startViewTransition) {
      performChange();
      return;
    }
    document.startViewTransition(performChange);
  };

  return (
    <section id="appearance" className="py-24 bg-[var(--background)] transition-colors duration-500 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-[var(--foreground)]">
          Appearance <span className="text-cyan-500">Settings</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Card Dark */}
          <div 
            onClick={() => changeTheme("dark")}
            className={`p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer 
              ${currentTheme === "dark" ? "border-cyan-500 bg-cyan-500/5 shadow-lg" : "border-gray-200 dark:border-white/5 opacity-50 hover:opacity-100"}`}
          >
            <FaMoon size={40} className={`mx-auto mb-4 ${currentTheme === "dark" ? "text-cyan-500" : "text-gray-400"}`} />
            <h3 className="text-xl font-bold text-[var(--foreground)]">Dark Mode</h3>
            {currentTheme === "dark" && <FaCheckCircle className="text-cyan-500 mx-auto mt-4" size={24} />}
          </div>

          {/* Card Light */}
          <div 
            onClick={() => changeTheme("light")}
            className={`p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer 
              ${currentTheme === "light" ? "border-cyan-500 bg-cyan-500/5 shadow-lg" : "border-gray-200 dark:border-white/5 opacity-50 hover:opacity-100"}`}
          >
            <FaSun size={40} className={`mx-auto mb-4 ${currentTheme === "light" ? "text-cyan-500" : "text-gray-400"}`} />
            <h3 className="text-xl font-bold text-[var(--foreground)]">Light Mode</h3>
            {currentTheme === "light" && <FaCheckCircle className="text-cyan-500 mx-auto mt-4" size={24} />}
          </div>
        </div>
      </div>
    </section>
  );
}