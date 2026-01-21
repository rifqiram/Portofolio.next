"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ================= TRANSLATIONS ================= */
const translations = {
  id: {
    subtitle: "Di balik layar",
    title: "Tentang",
    me: "Saya",
    image: "/images/about-id.png",
    desc: (
      <div className="space-y-4 text-justify">
        <p>
          Saya adalah seorang{" "}
          <span className="font-medium text-white">Web Developer Pemula</span>{" "}
          yang sedang fokus mempelajari dan menguasai{" "}
          <span className="text-cyan-400">full stack web development</span>{" "}
          dengan teknologi utama{" "}
          <span className="text-cyan-400">Next.js</span> dan{" "}
          <span className="text-cyan-400">Laravel</span>.
        </p>
        <p>
          Dalam proses belajar, saya terbiasa mengerjakan proyek kecil hingga
          menengah untuk memahami alur aplikasi secara menyeluruh, mulai dari
          UI, pengelolaan data, hingga integrasi{" "}
          <span className="text-cyan-400">REST API</span>.
        </p>
        <p>
          Saya terus memperdalam database, autentikasi, keamanan dasar, serta
          struktur kode yang rapi dan mudah dipelihara.
        </p>
        <p>
          Dengan semangat belajar tinggi, saya berkomitmen berkembang menjadi
          web developer yang andal dan bernilai.
        </p>
      </div>
    ),
  },

  eng: {
    subtitle: "Behind the code",
    title: "About",
    me: "Me",
    image: "/images/about-eng.png",
    desc: (
      <div className="space-y-4 text-justify">
        <p>
          I am a{" "}
          <span className="font-medium text-white">beginner Web Developer</span>{" "}
          focused on mastering{" "}
          <span className="text-cyan-400">full stack web development</span>{" "}
          using <span className="text-cyan-400">Next.js</span> and{" "}
          <span className="text-cyan-400">Laravel</span>.
        </p>
        <p>
          I regularly work on small to medium projects to understand the full
          development lifecycle — from UI design to{" "}
          <span className="text-cyan-400">REST API</span> integration.
        </p>
        <p>
          I continuously improve database management, authentication, security,
          and maintainable code structure.
        </p>
        <p>
          With a strong learning mindset, I aim to become a reliable developer
          who delivers real value.
        </p>
      </div>
    ),
  },

  jpy: {
    subtitle: "コードの裏側",
    title: "私について",
    me: "紹介",
    image: "/images/about-jpy.png",
    desc: (
      <div className="space-y-4 text-justify">
        <p>
          私は{" "}
          <span className="font-medium text-white">
            初心者のウェブ開発者
          </span>{" "}
          として{" "}
          <span className="text-cyan-400">フルスタックWeb開発</span>{" "}
          を学んでいます。
        </p>
        <p>
          <span className="text-cyan-400">Next.js</span> と{" "}
          <span className="text-cyan-400">Laravel</span> を使い、UI設計から{" "}
          <span className="text-cyan-400">REST API</span> 統合まで理解しています。
        </p>
        <p>
          データベース、認証、セキュリティ、保守性の高いコードを
          継続的に学んでいます。
        </p>
        <p>
          技術を通じて価値を提供できる開発者を目指しています。
        </p>
      </div>
    ),
  },
};

type Language = "id" | "eng" | "jpy";

/* ================= COMPONENT ================= */
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lang, setLang] = useState<Language>("id");
  const [theme, setTheme] = useState("dark");
  const [isExpanding, setIsExpanding] = useState(false);

  const t = translations[lang];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* PARALLAX + FADE */
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.75, 0.9],
    [0, 1, 1, 0],
    { clamp: true }
  );
  
  const textOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.65, 0.8],
    [0, 1, 1, 0],
    { clamp: true }
  );

  /* EVENTS */
  useEffect(() => {
    const langHandler = (e: any) => setLang(e.detail);
    const themeHandler = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    };
    const expandHandler = () => setIsExpanding(true);

    window.addEventListener("langChanged", langHandler);
    window.addEventListener("themeChanged", themeHandler);
    window.addEventListener("expandingCircle", expandHandler);

    // Initial check
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");

    return () => {
      window.removeEventListener("langChanged", langHandler);
      window.removeEventListener("themeChanged", themeHandler);
      window.removeEventListener("expandingCircle", expandHandler);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full h-[150vh] overflow-hidden"
      style={{
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* EXPANDING CIRCLE - Native CSS Smooth Transition */}
      {isExpanding && (
        <div
          className="fixed z-30 rounded-full pointer-events-none"
          style={{
            width: "150px",
            height: "150px",
            top: "50%",
            left: "50%",
            background: theme === "dark" ? "#0a0a0a" : "#ffffff",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 1,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease",
          }}
          ref={(el) => {
            if (!el) return;
            // Gunakan requestAnimationFrame untuk memastikan animasi trigger setelah render
            requestAnimationFrame(() => {
              el.style.transform = "translate(-50%, -50%) scale(50)";
              el.style.opacity = "0";
            });
          }}
          onTransitionEnd={() => setIsExpanding(false)}
        />
      )}

      <div className="sticky top-0 h-screen">
        {/* PARALLAX IMAGE */}
        <motion.img
          src={t.image}
          alt="About Background"
          style={{ y: imageY, opacity: imageOpacity }}
          className={`fixed inset-0 w-full h-full object-contain pointer-events-none transition-all duration-1000 ${
            theme === "dark"
              ? "grayscale brightness-[0.25]"
              : "brightness-95"
          }`}
        />

        {/* OVERLAY */}
        <div
          className="fixed inset-0 transition-opacity duration-1000"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to bottom, #0a0a0a, transparent, #0a0a0a)"
                : "linear-gradient(to bottom, #ffffff, transparent, #ffffff)",
          }}
        />

        {/* CONTENT */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <span className="uppercase tracking-[0.4em] text-cyan-400 text-xs mb-4">
            {t.subtitle}
          </span>

          <h2 className={`text-6xl md:text-8xl font-black italic uppercase transition-colors duration-700 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}>
            {t.title}{" "}
            <span className="text-cyan-400">{t.me}</span>
          </h2>

          <div className={`mt-8 max-w-2xl text-lg md:text-xl transition-colors duration-700 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t.desc}
          </div>
        </motion.div>
      </div>
    </section>
  );
}