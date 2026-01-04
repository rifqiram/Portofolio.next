"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AboutSection() {
    const ref = useRef<HTMLElement | null>(null);
    const [show, setShow] = useState(false);

    // Animasi Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setShow(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const stats = [
        { label: "Experience", value: "2+ Years" },
        { label: "Projects", value: "10+" },
        { label: "Focus", value: "Fullstack" },
    ];

    return (
        <section
            id="about"
            ref={ref}
            className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6 md:px-20 overflow-hidden py-20"
        >
            <div className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                
                {/* SISI KIRI: 3D CARD */}
                <div className="flex justify-center" style={{ perspective: "1000px" }}>
                    <motion.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ 
                            rotateX, 
                            rotateY, 
                            transformStyle: "preserve-3d",
                            height: "450px",
                            background: "linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), transparent)" 
                        }}
                        className="relative w-72 md:w-80 border border-cyan-500/30 rounded-3xl p-5 shadow-2xl"
                    >
                        <div 
                            style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                            className="w-full h-full bg-[#111] rounded-2xl overflow-hidden border border-white/10 relative group"
                        >
                            <img 
                                src="/images/image.jpg" 
                                alt="Rifqi" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div 
                                style={{ 
                                    background: "linear-gradient(to top, black, transparent)",
                                }}
                                className="absolute bottom-0 left-0 w-full p-6"
                            >
                                <p className="text-cyan-400 font-bold text-xl">Rifqi Ramadhan</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Web Developer</p>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-cyan-500/20 rounded-full animate-pulse" />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-sm mb-2">Discovery</h3>
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Transforming Ideas Into <br />
                            <span 
                                style={{ 
                                    backgroundImage: "linear-gradient(to right, #22d3ee, #2563eb)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}
                                className="font-bold"
                            >
                                Digital Reality
                            </span>
                        </h2>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        Saya adalah pengembang web yang berfokus pada ekosistem <span className="text-white font-semibold">Modern JavaScript</span>. Saya menciptakan solusi digital yang responsif.
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl group hover:border-cyan-500/50 transition-all">
                                <p className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{stat.value}</p>
                                <p className="text-[10px] text-gray-500 uppercase">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-500 hover:text-white transition-all">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}