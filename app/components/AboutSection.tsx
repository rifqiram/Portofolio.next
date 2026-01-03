"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function AboutSection() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);
    const [isThrown, setIsThrown] = useState(false);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setShow(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const stats = [
        { label: "Experience", value: "1+ Years" },
        { label: "Projects", value: "3+ Completed" },
        { label: "Focus", value: "React/Next" },
    ];

    return (
        <section id="about" ref={ref} className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6 md:px-20 overflow-hidden py-20">
            <div className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                
                <div className="relative flex justify-center items-center h-[400px]">
                    {!isThrown ? (
                        <motion.div
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
                            style={{ x, rotate, opacity }}
                            onDragEnd={(e, info) => {
                                if (Math.abs(info.velocity.x) > 500) {
                                    setIsThrown(true);
                                    setTimeout(() => setIsThrown(false), 2000); 
                                }
                            }}
                            whileTap={{ scale: 1.05, cursor: "grabbing" }}
                            className="relative w-72 h-96 bg-[#111] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-grab p-4 z-50"
                        >
                            <img src="/images/image.jpg" alt="Profile" className="w-full h-2/3 object-cover rounded-xl mb-4 pointer-events-none" />
                            <div className="text-center">
                                <h4 className="text-xl font-bold text-cyan-400">Rifqi Ramadhan</h4>
                                <p className="text-gray-500 text-sm">Begginer Web Developer</p>
                                <p className="text-[10px] mt-4 text-cyan-500/50 animate-pulse font-mono uppercase italic tracking-tighter">Tahan & Lempar Saya!</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.button 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            onClick={() => setIsThrown(false)}
                            className="px-6 py-2 border border-cyan-500 text-cyan-500 rounded-full text-sm hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            Panggil Card Lagi
                        </motion.button>
                    )}
                    
                    <div className="absolute w-64 h-80 border-2 border-white/5 rounded-2xl -rotate-6"></div>
                </div>

                <div>
                    <h3 className="text-cyan-400 font-bold tracking-[0.3em] uppercase mb-2 text-sm">About Me</h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Experience</span>
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Saya senang membangun antarmuka yang tidak hanya diam, tapi bisa berinteraksi dengan pengguna. 
                        Seperti card di samping, saya percaya user experience yang menyenangkan akan membuat website lebih berkesan.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 transition-colors">
                                <h4 className="text-xl font-bold text-white mb-1">{stat.value}</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}