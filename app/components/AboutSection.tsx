"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// 1. OBJEK TRANSLASI
const translations = {
  id: {
    subtitle: "Di balik layar",
    title: "Tentang",
    me: "Saya",
    desc: (
      <>
        Saya adalah seorang <span className="font-medium text-white dark:text-white">Pengembang Web Pemula</span> yang sedang mendalami dunia frontend. Berfokus pada penguasaan <span className="text-cyan-400">Next.js dan Tailwind CSS</span> untuk membangun antarmuka yang modern. Saya percaya bahwa kode yang hebat dimulai dari pemahaman fundamental yang kuat dan keinginan untuk terus belajar setiap hari.
      </>
    )
  },
  eng: {
    subtitle: "Behind the code",
    title: "About",
    me: "Me",
    desc: (
      <>
        I am an aspiring <span className="font-medium text-black dark:text-white">Web Developer</span> currently exploring the vast world of frontend development. Focused on mastering <span className="text-blue-500 dark:text-cyan-400">Next.js and Tailwind CSS</span> to build modern interfaces. I believe great code starts with strong fundamentals and a passion for continuous learning every single day.
      </>
    )
  },
  jpy: {
    subtitle: "コードの裏側",
    title: "私について",
    me: "紹介",
    desc: (
      <>
        私は現在フロントエンド開発の世界を探求している<span className="font-medium text-black dark:text-white">初心者ウェブ開発者</span>です。<span className="text-blue-500 dark:text-cyan-400">Next.jsとTailwind CSS</span>をマスターして、モダンなインターフェースを構築することに注力しています。優れたコードは強力な基礎と、毎日学び続ける情熱から始まると信じています。
      </>
    )
  }
};

type Language = "id" | "eng" | "jpy";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState("dark");
  const [isExpanding, setIsExpanding] = useState(false);
  
  // 2. STATE BAHASA
  const [lang, setLang] = useState<Language>("id");
  const t = translations[lang];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  // 3. LISTEN PERUBAHAN BAHASA DARI NAVBAR
  useEffect(() => {
    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener("langChanged", handleLangChange);
    return () => window.removeEventListener("langChanged", handleLangChange);
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
            {t.subtitle}
          </motion.span>

          <div className="overflow-hidden">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className={`text-6xl md:text-8xl font-black tracking-tighter uppercase italic transition-colors duration-700 ${theme==="dark"?"text-white":"text-black"}`}
            >
              {t.title} <span className={`transition-colors duration-700 ${theme==="dark"?"text-cyan-400":"text-blue-500"}`}>{t.me}</span>
            </motion.h3>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed font-light transition-colors duration-700 ${theme==="dark"?"text-gray-400":"text-gray-700"}`}
          >
            {t.desc}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}