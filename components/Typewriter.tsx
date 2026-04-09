'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterSegment {
  text: string;
  className?: string;
}

interface TypewriterProps {
  text?: string;
  segments?: TypewriterSegment[];
  delay?: number;
  startDelay?: number;
  onHover?: boolean;
  startOnMount?: boolean;
  className?: string;
  showCursor?: boolean;
}

export default function Typewriter({ 
  text,
  segments,
  delay = 50, 
  startDelay = 0,
  onHover = false, 
  startOnMount = true,
  className = '',
  showCursor = true
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Normalize input to segments
  const allSegments: TypewriterSegment[] = segments || (text ? [{ text }] : []);
  const fullText = allSegments.map(s => s.text).join('');

  useEffect(() => {
    if (startOnMount && !onHover) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(timer);
    }
  }, [startOnMount, onHover, startDelay]);

  useEffect(() => {
    if (onHover) {
      if (isHovered) {
        setHasStarted(true);
      } else {
        setHasStarted(false);
        setDisplayText('');
      }
    }
  }, [onHover, isHovered]);

  useEffect(() => {
    if (!hasStarted) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  }, [fullText, delay, hasStarted]);

  // Helper to render segments based on current display length
  const renderSegments = () => {
    let currentLen = 0;
    return allSegments.map((segment, idx) => {
      const segmentStart = currentLen;
      const segmentEnd = currentLen + segment.text.length;
      currentLen += segment.text.length;

      if (displayText.length <= segmentStart) return null;
      
      const visiblePart = segment.text.slice(0, displayText.length - segmentStart);
      
      return (
        <span key={idx} className={segment.className}>
          {visiblePart}
        </span>
      );
    });
  };

  return (
    <span 
      className={className}
      onMouseEnter={() => onHover && setIsHovered(true)}
      onMouseLeave={() => onHover && setIsHovered(false)}
    >
      {renderSegments()}
      {showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[2px] h-[1em] bg-accent-blue ml-1 align-middle"
        />
      )}
    </span>
  );
}
