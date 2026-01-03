"use client"; 

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver (
            ([entry]) => {
                if (entry.isIntersecting) setShow(true);
            },
            { threshold: 0.3}
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section 
        id="contact"
        ref={ref}
        className={`min-h-screen flex flex-col item-center justify-center bg-gray-900 transition-all duration-1000
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>

                <h2 className="text-3xl font-bold mb-8 text-white">Contact Me</h2>

                <div className="flex flex-col gap-4 text-white text-lg text-center">
                    <p>Email: <a href="mailto:rifqiram6140@gmail.com" className="text-cyan-400 hover:underline">rifqiram6140@gmail.com</a></p>
                    <p>Github: <a href="https://github.com/rifqiram" target="_blank" className="text-cyan-400 hover:underline">github.com/rifqiram</a></p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/" target="_blank" className="text-cyan-400 hover:underline">linkedin.com/in/rifqiramadhan</a></p>
                </div>

                <a href="mailto:rifqiram6140@gmail.com"
                className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-semibold shadow-lg transition-all">Send Email</a>
            </section>
    );
}