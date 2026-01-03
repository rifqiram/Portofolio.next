"use client";

import { useEffect, useRef, useState } from "react";

const project = [
    {
        title: "Sistem Login & CRUD",
        desc: "Aplikasi web sederhana menggunakan PHP dan MySQl.",
    },
    {
        title: "Website Toko Online",
        desc: "Website e-commerce sederhana dengan fitur produk.",
    },
    {
        title: "Portofolio Website",
        desc: "Website portofolio modern menggunakan Next.js & Tailwind.",
    }
];

export default function ProjectsSection() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) setShow(true);
            },
            {threshold: 0.3}
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section 
        id="projects"
        ref={ref}
        className={`min-h-screen flex flex-col item-center justify-center bg-gray-50 transition-all duration-1000
            ${show ? "opacity-100 traslate-y-0" : "opacity-0 translate-y-24"}`}>
                
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Project</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-6">
                    {project.map((project, index) => (
                        <div
                        key={project.title}
                        style={{transitionDelay: `${index * 100}ms`}}
                        className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl
                            transform transition duration-500 ease-out hover:-translate-y-3
                            ${show ? "opacity-100" : "opacity-0"}`}>

                                <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                                <p className="text-gray-700">{project.desc}</p>
                        </div>
                    ))}
                </div>
        </section>
    );
}