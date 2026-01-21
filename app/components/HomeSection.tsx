"use client";

import { useEffect, useRef, useState } from "react";
import TypingRandom from "./TypingRandom";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const translations = {
  id: { hello: "Halo,", iam: "Saya", role: "Pengembang Web", desc: "Seorang pengembang web yang senang membangun produk digital yang berdampak. Berfokus pada kode yang bersih, interaksi yang mulus, dan pengalaman pengguna yang bermakna.", download: "Unduh CV", talk: "Mari Bicara" },
  eng: { hello: "Hello,", iam: "I am", role: "Web Developer", desc: "A web developer who enjoys building impactful digital products. Focusing on clean code, smooth interactions, and meaningful user experiences.", download: "Download CV", talk: "Let's Talk" },
  jpy: { hello: "こんにちは、", iam: "私は", role: "ウェブ開発者", desc: "インパクトのあるデジタル製品を作るのが好きなウェブ開発者です。クリーンなコード、スムーズなインタラクション、意味のあるユーザーエクスペリエンスに焦点を当てています。", download: "履歴書をダウンロード", talk: "話しましょう" },
};

type Language = "id" | "eng" | "jpy";

export default function HomeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState<Language>("id");
  const t = translations[lang];

  useEffect(() => {
    setMounted(true);
    const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener("langChanged", handleLangChange);
    return () => window.removeEventListener("langChanged", handleLangChange);
  }, []);

  // THEME LISTENER
  useEffect(() => {
    const handleThemeChange = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
      
      if (circleRef.current) {
        const themeBtn = document.querySelector('.theme-toggle-btn');
        const rect = themeBtn?.getBoundingClientRect();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

        circleRef.current.animate([
          { transform: `translate(-50%, -50%) scale(0)`, left: `${x}px`, top: `${y}px`, opacity: 1 },
          { transform: `translate(-50%, -50%) scale(50)`, left: `${x}px`, top: `${y}px`, opacity: 0 }
        ], {
          duration: 800,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)"
        });
      }
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  // INTERACTIVE PARTICLES SYSTEM
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    // Mouse Position Object
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150 // Jarak pengaruh kursor
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; directionX: number; directionY: number; size: number;
      
      constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = theme === "dark" ? "rgba(6, 182, 212, 0.8)" : "rgba(14, 165, 233, 0.8)";
        ctx.fill();
      }

      update() {
        // Boundary check
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse Interaction (Repel)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            // Menjauh dari mouse
            this.x -= directionX * force * 5;
            this.y -= directionY * force * 5;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas!.width * canvas!.height) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas!.width - size * 2) + size;
        let y = Math.random() * (canvas!.height - size * 2) + size;
        let directionX = (Math.random() * 0.8) - 0.4;
        let directionY = (Math.random() * 0.8) - 0.4;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    function connect() {
      if (!ctx) return;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
          if (distance < (canvas!.width / 8) * (canvas!.height / 8)) {
            let opacity = 1 - (distance / 25000);
            ctx.strokeStyle = theme === "dark" ? `rgba(6, 182, 212, ${opacity * 0.2})` : `rgba(14, 165, 233, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - particlesArray[a].x;
          let dy = mouse.y - particlesArray[a].y;
          let distSq = (dx * dx) + (dy * dy);
          if (distSq < 15000) {
            ctx.strokeStyle = theme === "dark" ? "rgba(6, 182, 212, 0.3)" : "rgba(14, 165, 233, 0.3)";
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particlesArray[a].x, particlesArray[a].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particlesArray.forEach(p => p.update());
      connect();
    }

    window.addEventListener("resize", () => { resize(); init(); });
    resize(); init(); animate();
    
    const observer = new IntersectionObserver(([entry]) => setShow(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-20 overflow-hidden"
      style={{ 
        background: theme === "dark" ? "#0a0a0a" : "#ffffff", 
        color: theme === "dark" ? "#ededed" : "#111111",
        transition: "background-color 0.8s ease" 
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div
        ref={circleRef}
        className="fixed z-10 rounded-full pointer-events-none opacity-0"
        style={{ width: "100px", height: "100px", background: theme === "dark" ? "#0a0a0a" : "#ffffff" }}
      />

      <div className={`relative z-20 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-all duration-1000 ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        
        {/* LEFT CONTENT */}
        <div className={`order-2 md:order-1 transition-all duration-1000 delay-300 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
          <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: theme === "dark" ? "#ccc" : "#111" }}>
            {t.hello} <span className="text-cyan-400">{t.iam}</span>
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tighter">
            <TypingRandom />
          </h1>
          <h2 className="text-cyan-400 text-lg md:text-xl font-bold mb-6 uppercase tracking-[0.3em]">{t.role}</h2>
          <p className="max-w-lg mb-8 leading-relaxed opacity-80">{t.desc}</p>

          <div className="flex gap-4 mb-10">
            {[{ icon: <FaFacebookF size={18} />, url: "https://www.facebook.com/share/15XQhTrVwP6/" },
              { icon: <FaGithub size={18} />, url: "https://github.com/rifqiram" },
              { icon: <FaInstagram size={18} />, url: "https://www.instagram.com/r.ramadhan._" },
              { icon: <FaLinkedinIn size={18} />, url: "https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/" }].map((social, i) => (
              <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-2 shadow-lg ${theme === "dark" ? "bg-white/5 border border-white/10 text-white hover:bg-cyan-500" : "bg-black/5 border border-black/10 text-black hover:bg-cyan-500 hover:text-white"}`}>
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="/cv/CV_Rifqi_Ramadhan.pdf" download className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-md shadow-lg hover:scale-105 transition-all active:scale-95">
              {t.download}
            </a>
            <a href="https://wa.me/6281357961978" target="_blank" className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 font-bold rounded-md hover:bg-cyan-500 hover:text-black transition-all hover:scale-105 active:scale-95">
              {t.talk}
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT (PROFILE) */}
        <div className={`order-1 md:order-2 flex justify-center transition-all duration-1000 delay-500 ${show ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-90"}`}>
          <div className="relative w-64 h-64 md:w-80 md:h-80" style={{ animation: "floating 6s ease-in-out infinite" }}>
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[60px] opacity-20" />
            <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full" style={{ animation: "spinCustom 10s linear infinite" }} />
            <div className={`absolute inset-8 rounded-full border-4 p-2 shadow-2xl overflow-hidden ${theme === "dark" ? "border-[#1a1a1a] bg-[#0a0a0a]" : "border-gray-100 bg-white"}`}>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/20">
                <img src="/images/tukik (1).png" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinCustom { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floating { 0%,100%{transform:translateY(0px);}50%{transform:translateY(-20px);} }
      `}</style>
    </section>
  );
}