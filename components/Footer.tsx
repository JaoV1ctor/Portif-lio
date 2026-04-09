'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/lib/data';

export default function Footer() {
  const { t } = useLanguage();



  return (
    <footer className="w-full py-16 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between flex-wrap gap-12">
        
        {/* Left Side: Brand & Description */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <div className="text-3xl font-bold tracking-tighter text-white font-mono">
            JV<span className="text-accent-blue">.</span>
          </div>
          <p className="text-text-secondary text-sm max-w-sm text-center md:text-left leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        {/* Right Side: Clean Text Social Links */}
        <div className="flex flex-col items-center md:items-end gap-6 flex-1 justify-center">
          <div className="flex gap-8 flex-wrap justify-center font-mono">
            {portfolioData.socials.map((social, i) => (
              <motion.a 
                key={i}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3 }}
                className="text-text-secondary hover:text-white transition-all text-xs uppercase tracking-[0.2em] relative group"
              >
                {social.platform}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent-blue transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="w-full flex items-center justify-between pt-10 mt-4 border-t border-white/5 flex-col md:flex-row gap-6">
          <p className="text-text-secondary/70 text-[10px] uppercase tracking-[0.3em] font-mono">
            {t('footer.copy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
