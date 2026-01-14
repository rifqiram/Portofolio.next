"use client";

import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaEnvelope, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-24 px-6 transition-colors duration-1000 min-h-screen flex items-center justify-center overflow-hidden
        ${theme === "dark" ? "bg-[#050505]" : "bg-[#f8fafc]"}`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 
          ${theme === "dark" ? "bg-cyan-500" : "bg-blue-400"}`} />
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* KOLOM KIRI: Informasi */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          className="space-y-10"
        >
          <div>
            <div className={`inline-block px-4 py-1 rounded-full border mb-6 text-xs font-bold tracking-widest uppercase
              ${theme === "dark" ? "border-cyan-500/30 text-cyan-400 bg-cyan-500/5" : "border-blue-500/30 text-blue-600 bg-blue-500/5"}`}>
              Get In Touch
            </div>
            <h2 className={`text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-8
              ${theme === "dark" ? "text-white" : "text-black"}`}>
              Let’s <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === "dark" ? "from-cyan-400 to-blue-500" : "from-blue-600 to-indigo-600"}`}>
                Connect
              </span>
            </h2>
            <p className={`text-lg max-w-sm leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Ready to start your next digital experience? Reach out for collaborations or just a friendly hello.
            </p>
          </div>

          <div className="space-y-6">
            <a href="mailto:rifqiram6140@gmail.com" className="flex items-center gap-5 group w-fit">
              <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${theme === "dark" ? "bg-white/5 text-cyan-400" : "bg-black/5 text-blue-600"}`}>
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Email Me</p>
                <p className={`text-lg font-bold transition-colors ${theme === "dark" ? "text-white group-hover:text-cyan-400" : "text-black group-hover:text-blue-600"}`}>rifqiram6140@gmail.com</p>
              </div>
            </a>
            
            <a href="https://github.com/rifqiram" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group w-fit">
              <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${theme === "dark" ? "bg-white/5 text-cyan-400" : "bg-black/5 text-blue-600"}`}>
                <FaGithub className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Github</p>
                <p className={`text-lg font-bold transition-colors ${theme === "dark" ? "text-white group-hover:text-cyan-400" : "text-black group-hover:text-blue-600"}`}>@rifqiram</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* KOLOM KANAN: Form (Tanpa Placeholder) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          className="relative p-[1px] rounded-[2.5rem] overflow-hidden group"
        >
          {/* Beam Border Effect */}
          <div className={`absolute inset-0 z-0 opacity-20 group-hover:opacity-100 transition-opacity duration-700
            ${theme === "dark" ? "bg-gradient-to-r from-transparent via-cyan-500 to-transparent" : "bg-gradient-to-r from-transparent via-blue-500 to-transparent"}`}
            style={{ animation: 'rotate 6s linear infinite', width: '200%', left: '-50%' }}
          />

          <div className={`relative z-10 p-8 md:p-14 rounded-[2.4rem] backdrop-blur-3xl 
            ${theme === "dark" ? "bg-[#0c0c0c]/95 border border-white/5 shadow-2xl" : "bg-white/95 border border-black/5 shadow-xl"}`}>
            
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <input type="text" id="name" required 
                    className={`peer w-full bg-transparent border-b-2 py-3 outline-none transition-all
                    ${theme === "dark" ? "border-white/10 text-white focus:border-cyan-400" : "border-black/10 text-black focus:border-blue-600"}`} />
                  <label htmlFor="name" className={`absolute left-0 top-3 text-sm font-medium transition-all pointer-events-none uppercase tracking-widest
                    peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold
                    peer-valid:-top-6 peer-valid:text-[10px] peer-valid:font-bold
                    ${theme === "dark" ? "text-gray-500 peer-focus:text-cyan-400" : "text-gray-400 peer-focus:text-blue-600"}`}>
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input type="email" id="email" required 
                    className={`peer w-full bg-transparent border-b-2 py-3 outline-none transition-all
                    ${theme === "dark" ? "border-white/10 text-white focus:border-cyan-400" : "border-black/10 text-black focus:border-blue-600"}`} />
                  <label htmlFor="email" className={`absolute left-0 top-3 text-sm font-medium transition-all pointer-events-none uppercase tracking-widest
                    peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold
                    peer-valid:-top-6 peer-valid:text-[10px] peer-valid:font-bold
                    ${theme === "dark" ? "text-gray-500 peer-focus:text-cyan-400" : "text-gray-400 peer-focus:text-blue-600"}`}>
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative">
                <input type="text" id="subject" required 
                  className={`peer w-full bg-transparent border-b-2 py-3 outline-none transition-all
                  ${theme === "dark" ? "border-white/10 text-white focus:border-cyan-400" : "border-black/10 text-black focus:border-blue-600"}`} />
                <label htmlFor="subject" className={`absolute left-0 top-3 text-sm font-medium transition-all pointer-events-none uppercase tracking-widest
                  peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold
                  peer-valid:-top-6 peer-valid:text-[10px] peer-valid:font-bold
                  ${theme === "dark" ? "text-gray-500 peer-focus:text-cyan-400" : "text-gray-400 peer-focus:text-blue-600"}`}>
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea id="msg" required rows={3} 
                  className={`peer w-full bg-transparent border-b-2 py-3 outline-none transition-all resize-none
                  ${theme === "dark" ? "border-white/10 text-white focus:border-cyan-400" : "border-black/10 text-black focus:border-blue-600"}`} />
                <label htmlFor="msg" className={`absolute left-0 top-3 text-sm font-medium transition-all pointer-events-none uppercase tracking-widest
                  peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold
                  peer-valid:-top-6 peer-valid:text-[10px] peer-valid:font-bold
                  ${theme === "dark" ? "text-gray-500 peer-focus:text-cyan-400" : "text-gray-400 peer-focus:text-blue-600"}`}>
                  Your Message
                </label>
              </div>

              <button className={`group relative w-full py-6 rounded-2xl font-black uppercase tracking-[0.5em] text-xs transition-all active:scale-[0.97] overflow-hidden
                ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}>
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Send Message <FaPaperPlane className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </span>
                <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out
                  ${theme === "dark" ? "bg-cyan-400" : "bg-blue-600"}`} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes rotate {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}