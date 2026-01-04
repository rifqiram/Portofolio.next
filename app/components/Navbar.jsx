"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      style={{ zIndex: 100 }} 
      className="fixed top-6 left-0 w-full flex justify-center px-4">
      <div className={`
        flex items-center gap-2 md:gap-6 px-5 py-2.5 rounded-full border transition-all duration-500
        ${scrolled 
          ? "bg-black/40 backdrop-blur-xl border-cyan-500/30 shadow-[0_8px_32px_0_rgba(6,182,212,0.2)]" 
          : "bg-transparent border-white/10"}
      `}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              setActive(item.id);
            }}
            className={`
              relative px-3 py-1 text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300
              ${active === item.id ? "text-cyan-400" : "text-gray-400 hover:text-white"}
            `}
          >
            {item.label}
            {active === item.id && (
              <span 
                style={{ 
                    height: "2px", 
                    boxShadow: "0 0 15px #06b6d4" 
                }}
                className="absolute -bottom-1 left-0 w-full bg-cyan-400 rounded-full" />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}