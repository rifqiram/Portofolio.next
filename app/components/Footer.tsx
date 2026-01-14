"use client";

import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialsLinks = [
    { icon: <FaFacebookF size={18} />, url: "https://www.facebook.com/share/15XQhTrVwP6/" },
    { icon: <FaGithub size={18} />, url: "https://github.com/rifqiram" },
    { icon: <FaInstagram size={18} />, url: "https://www.instagram.com/r.ramadhan._" },
    { icon: <FaLinkedinIn size={18} />, url: "https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/" },
  ];

  // Teks untuk running text
  const marqueeText = "© 2026 RIFQI RAMADHAN • ALL RIGHTS RESERVED • ";

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Efek Garis Glow di Atas Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          
          {/* SISI KIRI: Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white tracking-tighter mb-2 uppercase italic">
              Rifqi<span className="text-cyan-400"> Ramadhan</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed font-light">
              Building impactful digital products with clean code and smooth interactions.
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
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all duration-300 hover:-translate-y-2 shadow-lg"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* SISI KANAN: Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-500 font-bold text-xs uppercase tracking-widest rounded-md hover:bg-cyan-500 hover:text-black transition-all duration-300 active:scale-95 shadow-lg shadow-cyan-500/10"
          >
            Back to top
            <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* RUNNING TEXT COPYRIGHT (SISI KIRI) */}
          <div className="relative flex overflow-hidden w-full md:w-1/2 group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 15, repeat: Infinity }}
              className="flex whitespace-nowrap"
            >
              <span className="text-gray-600 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium pr-4">
                {marqueeText.repeat(4)}
              </span>
              {/* Duplikasi teks untuk loop tanpa putus */}
              <span className="text-gray-600 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium pr-4">
                {marqueeText.repeat(4)}
              </span>
            </motion.div>
            
            {/* Overlay Gradient halus agar teks masuk/keluar terlihat pudar */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
          </div>
          
          <div className="flex gap-6 text-gray-600 text-[10px] uppercase tracking-widest font-bold items-center shrink-0">
            <span className="hover:text-cyan-400 transition-colors cursor-default">Frontend Developer</span>
            <span className="text-cyan-500/50 hidden md:inline">|</span>
            
            <a 
              href="https://www.google.com/maps/search/Kab.+Madiun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-white transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse group-hover:bg-white" />
              Kab. Madiun, Indonesia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}