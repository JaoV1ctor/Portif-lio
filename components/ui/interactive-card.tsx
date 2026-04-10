"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function InteractiveCard({ 
  className, 
  children, 
  onMouseMove: externalOnMouseMove,
  onMouseLeave: externalOnMouseLeave,
  onMouseEnter: externalOnMouseEnter,
  ...props 
}: InteractiveCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Check if device is touch based. If so, don't run hover 3D effect to save performance
    if (window.innerWidth < 768) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -12; 
    const rotateY = ((x - width / 2) / (width / 2)) * 12;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.transition = "transform 0.1s ease-out";

    externalOnMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";

    externalOnMouseLeave?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    externalOnMouseEnter?.(e);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("w-full h-full relative group", className)}
      {...props}
    >
      {children}
    </div>
  );
}
