"use client";

import { useEffect, useRef, useState } from "react";
import TypingRandom from "./TypingRandom";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function HomeSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);
    
    // State untuk posisi mouse
    const mouse = useRef({ x: 0, y: 0, radius: 150 });

    const socialsLinks = [
        { icon: <FaFacebookF size={18} />, url:"https://www.facebook.com/share/15XQhTrVwP6/"},
        { icon: <FaGithub size={18} />, url:"https://github.com/rifqiram"},
        { icon: <FaInstagram size={18} />, url:"https://www.instagram.com/r.ramadhan._" },
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

        let particles: any[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            baseX: number;
            baseY: number;
            density: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                // Pergerakan dasar
                this.x += this.speedX;
                this.y += this.speedY;

                // Memantul jika kena dinding
                if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas!.height || this.y < 0) this.speedY *= -1;

                // Interaksi Mouse (Push effect)
                let dx = mouse.current.x - this.x;
                let dy = mouse.current.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.current.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.current.radius - distance) / mouse.current.radius;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Fungsi gambar garis antar partikel
        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        let opacity = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const init = () => {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 15000; // Density dinamis
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.x;
            mouse.current.y = e.y;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        
        resize();
        init();
        animate();

        const observer = new IntersectionObserver (
            ([entry]) => setShow(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6 md:px-20 overflow-hidden"
        >
            {/* CANVAS SEKARANG BISA INTERAKSI */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0 pointer-events-none" 
            />
            
            <style jsx>{`
                .floating-photo { animation: floatCustom 5s ease-in-out infinite; }
                @keyframes floatCustom {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-30px); }
                }
                @keyframes spinCustom {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <div className={`relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center transition-all duration-1000 ease-out ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                
                {/* INFO CONTENT */}
                <div className={`order-2 md:order-1 transition-all duration-1000 delay-300 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-300">
                        Hello, <span className="text-cyan-400">I am</span>
                    </h3>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tighter">
                        <TypingRandom />
                    </h1>
                    <h2 className="text-cyan-400 text-lg md:text-xl font-bold mb-6 uppercase tracking-[0.3em]">Web Developer</h2>
                    <p className="text-gray-400 max-w-lg mb-8 leading-relaxed">
                        A web developer who enjoys building impactful digital products. 
                        Focusing on clean code, smooth interactions, and meaningful user experiences.
                    </p>

                    <div className="flex gap-4 mb-10">
                        {socialsLinks.map((social, i) => (
                            <a key={i} href={social.url} target="_blank" rel="noopener noreferrer"
                               className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all hover:-translate-y-2 shadow-lg">
                                 {social.icon}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a href="/cv/CV_Rifqi_Ramadhan.pdf" download className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-md shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all active:scale-95">Download CV</a>
                        <a href="https://wa.me/6281357961978" target="_blank" className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 font-bold rounded-md hover:bg-cyan-500 hover:text-black transition-all hover:scale-105 active:scale-95">Let's Talk</a>
                    </div>
                </div>

                {/* PROFILE PHOTO */}
                <div className={`order-1 md:order-2 flex justify-center transition-all duration-1000 delay-500 ${show ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-90"}`}>
                    <div className="relative w-72 h-72 md:w-88 md:h-88 floating-photo">
                        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[60px] opacity-20"/>
                        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full" style={{ animation: "spinCustom 10s linear infinite"}}></div>
                        <div className="absolute inset-10 rounded-full border-4 border-[#1a1a1a] p-2 bg-[#0a0a0a] shadow-2xl overflow-hidden">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-500/20">
                                <img src="/images/tukik (1).png" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}