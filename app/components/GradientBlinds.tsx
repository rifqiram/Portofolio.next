"use client";

import React, { useRef, useEffect } from 'react';

interface GradientBlindsProps {
  gradientColors?: string[];
  blindCount?: number;
  spotlightOpacity?: number;
  angle?: number;
}

const GradientBlinds: React.FC<GradientBlindsProps> = ({
  gradientColors = ['#1e1b4b', '#312e81', '#050505'], // Indigo-Deep
  blindCount = 16,
  spotlightOpacity = 0.8,
  angle = 25,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const extraWidth = Math.tan((angle * Math.PI) / 180) * canvas.height;
      const totalWidth = canvas.width + Math.abs(extraWidth);
      const blindWidth = totalWidth / blindCount;
      
      for (let i = 0; i < blindCount; i++) {
        const startX = (i * blindWidth) - (Math.abs(extraWidth) / 2);
        const centerX = startX + blindWidth / 2 + (extraWidth / 2);
        const dx = mouseRef.current.x - centerX;
        const dy = mouseRef.current.y - (canvas.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const intensity = Math.max(0, 1 - distance / (canvas.width * 0.5));
        
        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.lineTo(startX + (blindWidth * 0.85), 0);
        ctx.lineTo(startX + (blindWidth * 0.85) + extraWidth, canvas.height);
        ctx.lineTo(startX + extraWidth, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(startX, 0, startX + extraWidth, canvas.height);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(0.5, gradientColors[1]);
        gradient.addColorStop(1, gradientColors[2]);

        ctx.globalAlpha = (0.1 + (intensity * 0.9)) * spotlightOpacity;
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gradientColors, blindCount, spotlightOpacity, angle]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default GradientBlinds;