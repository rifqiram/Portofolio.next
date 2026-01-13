"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Lanyard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTossed, setIsTossed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, pctX: 50, pctY: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTossed || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Posisi pixel untuk rotasi
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Posisi persentase untuk efek cahaya (shine)
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos({ x, y, pctX, pctY });
  };

  const handleToss = () => {
    if (isTossed) return;
    setIsTossed(true);
    setTimeout(() => {
      setIsTossed(false);
    }, 2000);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onClick={handleToss}
      className="relative flex flex-col items-center select-none py-20 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* Tali Lanyard */}
      <motion.div 
        animate={{ opacity: isTossed ? 0 : 1, y: isTossed ? -20 : 0 }}
        className="relative flex flex-col items-center"
      >
        <div className="w-[4px] h-32 bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
        <div className="w-6 h-6 rounded-full border-[3px] border-cyan-400 bg-[#0a0a0a] -mt-1 z-10 flex items-center justify-center shadow-[0_0_10px_#06b6d4]">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_#06b6d4]" />
        </div>
      </motion.div>

      {/* Card Body */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={isTossed 
          ? { 
              y: -600, 
              x: mousePos.x * 3, 
              rotateX: 720, 
              rotateZ: 45, 
              scale: 0.2, 
              opacity: 0 
            } 
          : { 
              y: 0, 
              x: mousePos.x / 25, 
              rotateX: -mousePos.y / 15, 
              rotateY: mousePos.x / 15,
              scale: 1,
              opacity: 1
            }
        }
        transition={isTossed 
          ? { duration: 0.7, ease: "easeOut" } 
          : { type: "spring", stiffness: 150, damping: 12 } 
        }
        className="relative w-56 h-80 mt-[-2px] bg-gradient-to-br from-gray-900 via-[#111] to-black border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
      >
        {/* Dynamic Shine Layer */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${mousePos.pctX}% ${mousePos.pctY}%, rgba(6, 182, 212, 0.15), transparent 70%)`
          }}
        />

        {/* Top Glow Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#06b6d4]" />

        {/* Content Container */}
        <div className="flex flex-col items-center justify-between h-full p-6 py-10 text-center" style={{ transform: "translateZ(50px)" }}>
          <div className="w-10 h-8 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 rounded-sm opacity-80 self-start shadow-lg" />
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-cyan-500/30 mb-4 p-1">
                <div className="w-full h-full rounded-full bg-cyan-500/10 animate-pulse flex items-center justify-center">
                   <span className="text-cyan-500/20 text-xs italic">Photo</span>
                </div>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase">
                Rifqi <span className="text-cyan-400">Ramadhan</span>
            </h3>
            <div className="h-[1px] w-12 bg-white/20 my-2" />
            <p className="text-[9px] tracking-[0.4em] text-gray-500 uppercase font-mono">Verified Developer</p>
          </div>

          <div className="mt-6 px-5 py-1.5 rounded-md bg-cyan-500 text-[#0a0a0a] font-black text-[10px] uppercase tracking-tighter shadow-[0_0_20px_rgba(6,182,212,0.4)]">
             Web Developer
          </div>
        </div>

        {/* Overlay Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </motion.div>

      {/* Helper Text */}
      {!isTossed && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="mt-8 text-white text-[9px] uppercase tracking-[0.3em] animate-bounce"
        >
          Tap to Launch
        </motion.p>
      )}
    </div>
  );
}