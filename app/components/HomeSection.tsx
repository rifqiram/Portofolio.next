"use client";

import { useEffect, useRef, useState } from "react";
import TypingRandom from "./TypingRandom";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface IParticle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    update: () => void;
    draw: () => void;
}

export default function HomeSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);

    const socialsLinks = [
        { icon: <FaFacebookF size={18} />, url:"https://www.facebook.com/share/15XQhTrVwP6/?mibextid=wwXIfr"},
        { icon: <FaGithub size={18} />, url:"https://github.com/rifqiram"},
        { icon: <FaInstagram size={18} />, url:"https://www.instagram.com/r.ramadhan._?igsh=MTJmd3Q5cjd1M3U0bA%3D%3D&utm_source=qr" },
        { icon: <FaLinkedinIn size={18} />, url:"https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/" },
    ];

    useEffect (() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: IParticle[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle implements IParticle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor () {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.6 + 0.4;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas!.width) this.x = 0;
                else if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                else if (this.y < 0) this.y = canvas!.height;
            }

            draw () {
                if (!ctx) return;
                ctx.shadowBlur = 8;
                ctx.shadowColor = "rgba(6, 182, 212, 0.8)";

                ctx.fillStyle = `rgba(6, 182,212, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 80; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        init();
        animate();

        const observer = new IntersectionObserver (
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                } else {
                    setShow(false);
                }
            },
            {threshold: 0.1}
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <section
        id="home"
        ref={sectionRef}
        className="relative min-h-screen flex item-center justify-center bg-[#0a0a0a] text-white px-6 md:px-20 overflow-hidden">

            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{opacity: 0.6}}/>
            
            <style jsx>{`
            .floating-photo {
              animation: floatCustom 5s ease-in-out infinite;
            }

            @keyframes floatCustom {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-30px); }
            }

            @keyframes spinCustom {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            
            `}</style>

            <div className={`relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-all duration-700 ease-out ${show ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}`}>
                <div
                  className={`
                    order-2 md:order-1
                    transition-all duration-700 ease-out delay-100
                    ${show 
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10"}
                `}>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-300">
                        Hello, <span className="text-cyan-400">I am</span>
                    </h3>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tighter">
                        <TypingRandom />
                    </h1>

                    <h2 className="text-cyan-400 text-lg md:text-xl font-bold mb-6 uppercase tracking-[0.3em]">
                        Web Developer 
                    </h2>

                    <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
                         A web developer who enjoys building impactful digital products.
                        I focus on writing clean code, creating smooth interactions,
                        and delivering meaningful user experiences.
                    </p>

                    <div className="flex gap-4 mb-10">
                        {socialsLinks.map((social, i) => (
                          <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all hover:-translate-y-2 shadow-lg">
                            {social.icon}
                          </a>
                        ))}
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

                    <div
                      className={`
                        order-1 md:order-2 flex justify-center
                        transition-all duration-700 ease-out delay-200
                        ${show 
                          ? "opacity-100 translate-x-0 scale-100"
                          : "opacity-0 translate-x-10 scale-95"}
                      `}>
                    
                        <div className="relative w-72 h-72 md:w-88 md:h-88 floating-photo">

                        
                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[60px] opacity-20"/>
                        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full" style={{ animation: "spinCustom 10s linear infinite"}}></div>
                        <div className="absolute inset-4 border border-cyan-400/20 rounded-full" style={{ animation: "spinCustom 15s linear infinite reverse"}}></div>

                        <div className="absolute inset-10 rounded-full border-4 border-[#1a1a1a] p-2 bg-[#0a0a0a] shadow-2xl overflow-hidden">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/20">
                                <img 
                                    src="/images/tukik (1).png" 
                                    alt="Profile" 
                                    className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-1000"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}