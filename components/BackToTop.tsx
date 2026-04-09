'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BackToTop() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] p-1.5 bg-white/5 backdrop-blur-md text-white/50 border border-white/10 rounded-full shadow-2xl hover:bg-white/10 hover:text-white transition-all group overflow-hidden"
          aria-label={t('backtotop')}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative p-2 flex items-center justify-center">
            <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
