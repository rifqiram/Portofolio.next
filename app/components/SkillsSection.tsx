"use client";

import { useEffect, useRef, useState} from "react";

const skills = ["HTML", "CSS", "JavaScript", "React", "Next.js", "PHP", "MySQL"];

export default function SkillsSection() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver (
            ([entry]) => {
                if (entry.isIntersecting) setShow(true);
            },
            {threshold : 0.3}
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
        id="skills"
        ref={ref}
        className={`min-h-screen flex flex-col items-center justify-center bg-gray-900 transition-all duration-1000
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>

                <h2 className="text-3xl font-bold mb-8 text-white">Skills</h2>

                <div className="flex flex-wrap gap-6 justify-center max-w-4xl">
                    {skills.map((skill, index) => (
                    <div key={skill} style={{ transitionDelay: `${index * 100}ms` }} // Stagger animation
                        className={`bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold
                        transform transition duration-500 ease-out hover:-translate-y-2 hover:scale-105
                        ${show ? "opacity-100" : "opacity-0"}`}>{skill}</div>
                    ))}
                </div>
        </section>
    );
}