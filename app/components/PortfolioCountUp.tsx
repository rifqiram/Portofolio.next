"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface PortfolioCountUpProps {
  end: number;               // Angka akhir
  label: string;             // Label teks
  duration?: number;         // Durasi animasi (default 2 detik)
  color?: string;            // Warna angka (default cyan)
  className?: string;        // Tambahan class
}

export default function PortfolioCountUp({
  end,
  label,
  duration = 2,
  color = "text-cyan-400",
  className = "",
}: PortfolioCountUpProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <h3 className={`text-5xl md:text-6xl font-bold ${color}`}>
        {inView ? <CountUp end={end} duration={duration} /> : 0}+
      </h3>
      <p className="text-gray-400 mt-2 text-sm md:text-base uppercase tracking-wider">{label}</p>
    </div>
  );
}
