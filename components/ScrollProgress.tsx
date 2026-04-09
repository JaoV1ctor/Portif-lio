'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-blue origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Circular Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-[90] hidden md:block">
        <svg className="w-12 h-12 transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-border-subtle"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray="125.6"
            style={{
              pathLength: scrollYProgress,
            }}
            className="text-accent-blue"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-text-secondary">
          {percentage}%
        </span>
      </div>
    </>
  );
}
