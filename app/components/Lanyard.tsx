"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard from "./Lanyard";
import { motion } from "framer-motion";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* EXPANDING / PULSING CIRCLES */}
      <motion.div
        animate={show ? { scale: [0.5, 1, 0.5], opacity: [0, 0.15, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={show ? { scale: [0.6, 1, 0.6], opacity: [0, 0.1, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={show ? { scale: [0.4, 1, 0.4], opacity: [0, 0.08, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
      />

      {/* CONTENT */}
      <div className="relative flex flex-col md:flex-row items-center gap-16 z-10">
        {/* LANYARD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Lanyard />
        </motion.div>

        {/* CONTACT DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center md:text-left max-w-md"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
