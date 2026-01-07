"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(false);

  /* =============================
      SCROLL MASKING LOGIC
  ============================== */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Mulai saat atas section masuk bawah layar, selesai saat bawah section keluar atas layar
  });

  // Membuat gradient mask yang dinamis berdasarkan scroll
  // Saat start (0) dan end (1), masking akan lebih transparan
  const maskOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [
      "linear-gradient(to bottom, transparent 0%, transparent 100%)",
      "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      "linear-gradient(to bottom, transparent 0%, transparent 100%)"
    ]
  );

  /* =============================
      3D TILT MOTION
  ============================== */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  /* =============================
      INTERSECTION OBSERVER
  ============================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Experience", value: "Beginner" },
    { label: "Focus", value: "Next.js" },
    { label: "Mindset", value: "Learning" },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#0a0a0a] text-white px-6 md:px-20 py-32 overflow-hidden"
      // Efek Masking Fade In/Out otomatis saat scroll
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
      >
        {/* LEFT SIDE - 3D Card */}
        <div className="flex justify-center" style={{ perspective: "1200px" }}>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              background: "linear-gradient(135deg, rgba(34,211,238,0.12), transparent)"
            }}
            className="relative w-72 md:w-80 h-96 rounded-3xl border border-cyan-500/20 shadow-2xl"
          >
            <div
              className="absolute inset-4 rounded-2xl overflow-hidden bg-[#111] border border-white/10"
              style={{ transform: "translateZ(60px)" }}
            >
              <img
                src="/images/saya.png"
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                <p className="text-cyan-400 font-bold text-xl">Rifqi Ramadhan</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase">Junior Web Developer</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-cyan-500/30 animate-pulse" />
          </motion.div>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm text-cyan-400 uppercase tracking-[0.4em] mb-3 font-semibold">About Me</h3>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Junior <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
                Web Developer
              </span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
            I’m currently exploring modern web development with
            <span className="text-white font-semibold"> Next.js</span>. 
            I focus on creating smooth user experiences and high-performance interfaces.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-500/40 transition-all group"
              >
                <p className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stat.value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button className="group relative px-8 py-3 rounded-full font-bold bg-white text-black overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10">Read More</span>
              <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}