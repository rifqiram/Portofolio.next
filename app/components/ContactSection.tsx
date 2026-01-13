"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard from "./Lanyard";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative min-h-screen bg-gray-900 flex items-center justify-center
        transition-all duration-1000
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
    >
      <div className="relative flex flex-col md:flex-row items-center gap-16">
        {/* LANYARD */}
        <div
          className={`transition-all duration-1000
            ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
        >
          <Lanyard />
        </div>

        {/* CONTACT CONTENT */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-white mb-6">
            Contact Me
          </h2>

          <div className="space-y-4 text-lg text-gray-300">
            <p>
              Email:{" "}
              <a
                href="mailto:rifqiram6140@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                rifqiram6140@gmail.com
              </a>
            </p>

            <p>
              GitHub:{" "}
              <a
                href="https://github.com/rifqiram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                github.com/rifqiram
              </a>
            </p>

            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/rifqi-ramadhan-2a356b391/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                linkedin.com/in/rifqiramadhan
              </a>
            </p>
          </div>

          <a
            href="mailto:rifqiram6140@gmail.com"
            className="inline-block mt-8 px-8 py-3
              bg-cyan-500 hover:bg-cyan-600
              text-white rounded-full font-semibold
              shadow-lg transition-all"
          >
            Send Email
          </a>
        </div>
      </div>
    </section>
  );
}
