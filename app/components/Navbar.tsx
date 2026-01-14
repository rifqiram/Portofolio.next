"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const navItems = [
    { id:"home", label:"Home" },
    { id:"about", label:"About" },
    { id:"skills", label:"Skills" },
    { id:"projects", label:"Projects" },
    { id:"certificates", label:"Certificates" },
    { id:"contact", label:"Contact" },
  ];

  const updateIconStatus = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme!=="light");
  };

  useEffect(()=>{
    updateIconStatus();
    const handleThemeChange = ()=>updateIconStatus();
    window.addEventListener("themeChanged", handleThemeChange);
    return ()=>window.removeEventListener("themeChanged", handleThemeChange);
  },[]);

  const toggleTheme = ()=>{
    const currentTheme = document.documentElement.getAttribute("data-theme")||"dark";
    const nextTheme = currentTheme==="dark"?"light":"dark";

    // Memicu expanding circle
    window.dispatchEvent(new Event("expandingCircle"));

    // Ganti theme langsung, circle tetap animasi
    document.documentElement.setAttribute("data-theme", nextTheme);
    updateIconStatus();
    window.dispatchEvent(new Event("themeChanged"));
  };

  useEffect(()=>{
    const handleScroll = ()=>{
      setScrolled(window.scrollY>50);
      const scrollPosition = window.scrollY+100;
      navItems.forEach(item=>{
        const el = document.getElementById(item.id);
        if(el){
          const {offsetTop, offsetHeight} = el;
          if(scrollPosition>=offsetTop && scrollPosition<offsetTop+offsetHeight){
            setActive(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll",handleScroll);
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[navItems]);

  return (
    <nav style={{zIndex:50}} className="fixed top-6 left-0 w-full flex justify-center px-4 transition-colors duration-500">
      <div className={`flex items-center gap-1 md:gap-2 px-4 md:px-6 py-2.5 rounded-full border transition-all duration-500
        ${scrolled
          ? "bg-white/90 dark:bg-black/40 backdrop-blur-xl border-gray-300 dark:border-cyan-500/30 shadow-lg dark:shadow-[0_8px_32px_0_rgba(6,182,212,0.2)]"
          : "bg-white/80 dark:bg-transparent border-gray-300 dark:border-white/10"
        }`}>
        {navItems.map(item=>(
          <a key={item.id} href={`#${item.id}`} onClick={e=>{
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({behavior:"smooth"});
            setActive(item.id);
          }} className={`relative px-2 md:px-3 py-1 text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300
            ${active===item.id
              ? "text-cyan-500 dark:text-cyan-400"
              : isDark
                ? "text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white"
                : "text-black hover:text-cyan-500"
            }`}>
            {item.label}
            {active===item.id && <span style={{height:"2px", boxShadow:"0 0 15px #06b6d4"}} className="absolute -bottom-1 left-0 w-full bg-cyan-500 dark:bg-cyan-400 rounded-full"/>}
          </a>
        ))}

        <div className="w-[1px] h-4 bg-gray-300 dark:bg-white/20 mx-1 md:mx-2"/>

        <button onClick={toggleTheme} className={`ml-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all
          ${isDark ? "text-white dark:text-cyan-400" : "text-black"}`}>
          {isDark ? <FaSun size={14}/> : <FaMoon size={14}/>}
        </button>
      </div>
    </nav>
  );
}
