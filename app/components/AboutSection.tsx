"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const containerRef = useRef(null);
  
  // Mengambil progress scroll khusus untuk section ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Efek Parallax: Gambar akan membesar/geser dikit saat discroll
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative w-full h-[200vh] bg-[#0a0a0a]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* FOTO BACKGROUND DENGAN PARALLAX */}
        <motion.div 
          style={{ y: yImage, scale: scaleImage }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/about.jpeg" 
            alt="About Background"
            className="w-full h-full object-cover grayscale brightness-[0.25] contrast-125"
          />
          {/* Overlay gradient yang lebih dalam */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-90" />
        </motion.div>

        {/* KONTEN TEKS */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {/* Subtitle kecil */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-cyan-400 uppercase text-xs md:text-sm font-medium mb-4 block"
          >
            Behind the code
          </motion.span>

          {/* Judul Besar dengan animasi slide up */}
          <div className="overflow-hidden">
            <motion.h3 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter"
            >
              ABOUT ME
            </motion.h3>
          </div>

          {/* Deskripsi dengan delay halus */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 mt-6 max-w-2xl text-lg md:text-xl leading-relaxed font-light"
          >
            I am a <span className="text-white font-medium">Frontend Developer</span> who bridges the gap between 
            design and functionality. Focused on crafting <span className="text-cyan-400">clean code</span> and 
            creating digital solutions that feel natural to use.
          </motion.p>

          {/* Aksen garis dekoratif */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-cyan-500/50 mt-10"
          />
        </motion.div>
      </div>
    </section>
  );
}