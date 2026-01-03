"use client";

import { useEffect, useRef, useState } from "react";
import TypingRandom from "./TypingRandom";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function HomeSection() {
    const ref = useRef<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);

    const socialsLinks = [
        { icon: <FaFacebookF size={18} />, url:"https://www.facebook.com/share/15XQhTrVwP6/?mibextid=wwXIfr"},
        { icon: <FaGithub size={18} />, url:"https://github.com/rifqiram"},
        { icon: <FaInstagram size={18} />, url:"https://www.instagram.com/r.ramadhan._?igsh=MTJmd3Q5cjd1M3U0bA%3D%3D&utm_source=qr" },
        { icon: <FaLinkedinIn size={18} />, url:"https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setShow(true);
            },
            { threshold: 0.3}
        );
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [mounted]);

    if (!mounted) return null;

    return (
        <section
        id="home"
        ref={ref}
        className="min-h-screen flex item-center justify-center bg-[#0a0a0a] text-white px-6 md:px-20 overflow-hidden">
            <style jsx>{`
            @keyframes floatCustom {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-30px); }
            }

            @keyframes spinCustom {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            `}</style>

            <div className={`max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div className="order-2 md:order-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        Hello, <span className="text-cyan-400">I am</span>
                    </h3>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
                        <TypingRandom />
                    </h1>

                    <h2 className="text-cyan-400 text-lg md:text-xl font-bold mb-4 uppercase tracking-[0.2em]">
                        Web Developer 
                    </h2>

                    <p className="text-gray-400 max-w-lg mb-8">
                        I create exceptional digital experiences through innovative web development.
                    </p>

                    <div className="flex gap-4 mb-8">
                        {socialsLinks.map((social, i) =>
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-cyan-500 hover:text-white transition-all hover:-translate-y-1 shadow-lg shadow-white/5">
                                {social.icon}
                                </a>)}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a href="/cv/CV_Rifqi_Ramadhan.pdf" download className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-md shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all active:scale-95 text-center"> Download CV</a>
                        <a href="https://wa.me/6281357961978?text=Halo%20Rifqi,%20saya%20tertarik%20dengan%20portfolio%20Anda!"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{minWidth:'160px'}}
                            className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 font-bold rounded-md hover:bg-cyan-500 hover:text-black transition-all hover:scale-105 active:scale-95 text-center"> Let's Talk </a>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 flex justify-center">
                    
                    <div style={{width: "300px", height: "300px", animation: "floatCustom 4s ease-in-out infinite", position: "relative"}}>
                        
                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[60px] opacity-20"/>
                        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full" style={{ animation: "spinCustom 10s linear infinite"}}></div>
                        <div className="absolute inset-4 border border-cyan-400/20 rounded-full" style={{ animation: "spinCustom 15s linear infinite reverse"}}></div>

                        <div className="absolute inset-8 rounded-full border-4 border-cyan-500 p-3 shadow-[0_0_50px_rgba(6,182,212,0.5)] bg-[#0a0a0a]">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/30">
                                <img 
                                    src="/images/image.jpg" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}