'use client';

import { useEffect, useState } from "react";

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background overflow-hidden">
      {/* Animated Holographic Grid */}
      <div 
        className="absolute inset-x-0 inset-y-[-100%] w-full h-[300%] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[grid_50s_linear_infinite]"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, #000 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, #000 10%, transparent 100%)'
        }}
      />

      {/* Luz rastreadora extremamente suave (imperceptível mas charmosa) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14,165,233,0.04), transparent 70%)`,
        }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }
      `}} />
    </div>
  );
}
