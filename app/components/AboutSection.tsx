"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState("dark");
  const [isExpanding, setIsExpanding] = useState(false);

  // Progress scroll khusus untuk container ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animasi teks agar menghilang pelan saat discroll menjauh
  const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  // Sync theme dari global
  useEffect(() => {
    const handleThemeChange = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };
    window.addEventListener("themeChanged", handleThemeChange);
    handleThemeChange();
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  // Expanding circle
  useEffect(() => {
    const handleExpandingCircle = () => setIsExpanding(true);
    window.addEventListener("expandingCircle", handleExpandingCircle);
    return () => window.removeEventListener("expandingCircle", handleExpandingCircle);
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className={`relative w-full h-[150vh] transition-colors duration-700 ${theme==="dark"?"bg-[#0a0a0a]":"bg-white"}`}
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Expanding Circle */}
      {isExpanding && (
        <div
          className="absolute z-10 rounded-full pointer-events-none"
          style={{
            width:"250vw", height:"250vw", top:"50%", left:"50%",
            background: theme==="dark"?"#ffffff":"#0a0a0a",
            transform:"translate(-50%,-50%) scale(0)",
            transition:"transform 1.2s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease",
            opacity:1,
          }}
          ref={(el)=>{ if(el) requestAnimationFrame(()=>{ el.style.transform="translate(-50%,-50%) scale(1)"; el.style.opacity="0"; }); }}
          onTransitionEnd={()=>setIsExpanding(false)}
        />
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about.jpeg" 
            alt="About Background"
            className={`w-full h-full object-cover fixed top-0 left-0 transition-all duration-700 ${theme==="dark"?"grayscale brightness-[0.2] contrast-125":"brightness-95 contrast-100"}`}
            style={{ width: '100vw', height: '100vh' }}
          />
          <div 
            className="absolute inset-0 fixed top-0 left-0 transition-colors duration-700"
            style={{
              background: theme==="dark" 
                ? "linear-gradient(to bottom, #0a0a0a 0%, transparent 50%, #0a0a0a 100%)"
                : "linear-gradient(to bottom, #ffffff 0%, transparent 50%, #ffffff 100%)",
              opacity: 0.9
            }}
          />
        </div>

        {/* KONTEN TEKS */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1 }}
            className={`uppercase text-[10px] md:text-sm font-medium mb-4 block transition-colors duration-700 ${theme==="dark"?"text-cyan-400":"text-blue-600"}`}
          >
            Behind the code
          </motion.span>

          <div className="overflow-hidden">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className={`text-6xl md:text-8xl font-black tracking-tighter uppercase italic transition-colors duration-700 ${theme==="dark"?"text-white":"text-black"}`}
            >
              About <span className={`transition-colors duration-700 ${theme==="dark"?"text-cyan-400":"text-blue-500"}`}>Me</span>
            </motion.h3>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed font-light transition-colors duration-700 ${theme==="dark"?"text-gray-400":"text-gray-700"}`}
          >
            I am a <span className={`font-medium transition-colors duration-700 ${theme==="dark"?"text-white":"text-black"}`}>Frontend Developer</span> who bridges the gap between 
            design and functionality. Focused on crafting <span className={`transition-colors duration-700 ${theme==="dark"?"text-cyan-400":"text-blue-500"}`}>clean code</span> and 
            creating digital solutions that feel natural to use.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
