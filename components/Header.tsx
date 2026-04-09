'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[110] px-6 md:px-12 py-6 pointer-events-none"
    >
      <div className="w-full flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter pointer-events-auto"
        >
          JV<span className="text-accent-blue">.</span>
        </motion.div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#projects" className="hover:text-white transition-colors">{t('nav.projects')}</a>
            <a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a>
          </nav>

          <div className="flex items-center gap-2 bg-surface/50 backdrop-blur-md border border-border-subtle p-1 rounded-xl">
            <button
              onClick={() => setLanguage('pt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'pt' 
                ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' 
                : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'en' 
                ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' 
                : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
