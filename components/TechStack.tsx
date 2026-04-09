'use client';

import { motion } from 'motion/react';
import Reveal from './Reveal';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { ClaudeIcon, CursorIcon, FirebaseIcon, GeminiIcon, NextjsIcon, NodejsIcon, PythonIcon, ReactIcon, TailwindIcon, TypescriptIcon } from './icons/TechIcons';
import { portfolioData, type Skill } from '@/lib/data';

const iconMap: Record<string, any> = {
  'Next.js': NextjsIcon,
  'React': ReactIcon,
  'TypeScript': TypescriptIcon,
  'Tailwind CSS': TailwindIcon,
  'Node.js': NodejsIcon,
  'Python': PythonIcon,
  'Gemini AI': GeminiIcon,
  'Claude': ClaudeIcon,
  'Cursor': CursorIcon,
  'Firebase': FirebaseIcon,
};

const TechCard = ({ tool, index }: { tool: Skill, index: number }) => {
  const { language } = useLanguage();
  const Icon = iconMap[tool.name] || ReactIcon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, bounce: 0.4, delay: (index % 10) * 0.1 }}
      className="shrink-0 w-[280px] md:w-[320px] group cursor-default focus-within:ring-2 focus-within:ring-accent-blue focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
      role="group"
      tabIndex={0}
    >
      <InteractiveCard className="h-56 relative group transition-colors duration-500 w-full">
        
        {/* Background layer */}
        <div className="absolute inset-0 bg-surface/40 bg-gradient-to-t from-black/20 to-transparent rounded-3xl border border-white/10 overflow-hidden group-hover:border-white/20 transition-colors duration-500" />

        {/* Card Content - Reverted Glass Effect with 3D Pop */}
        <div 
          className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center z-10 pointer-events-none rounded-3xl"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 mb-4 flex items-center justify-center group-hover:scale-110 group-focus-within:scale-110 group-hover:bg-white/10 group-focus-within:bg-white/10 transition-all duration-500 shadow-lg border border-transparent group-hover:border-white/10">
            <Icon className="w-10 h-10 text-white/80 group-hover:text-white group-focus-within:text-white transition-colors duration-500" />
          </div>
          <span className="text-xl font-bold mb-1 text-white group-hover:text-white group-focus-within:text-white transition-colors duration-500 drop-shadow-md">{tool.name}</span>
          <span className="text-sm font-medium text-white/70 group-hover:text-white/90 group-focus-within:text-white/90 transition-colors duration-500">{tool.category[language]}</span>
          
          {/* Tooltip / Description with Logic of Evidence */}
          <div className="mt-3 overflow-hidden">
            <div className="text-xs text-white/90 group-hover:text-white group-focus-within:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 px-3 flex flex-col items-center w-full bg-white/10 py-3 rounded-xl border border-white/20 backdrop-blur-md shadow-inner space-y-2">
              <p className="drop-shadow-sm font-medium">{tool.description[language]}</p>
              {tool.relatedProjectIds.length > 0 ? (
                <div className="text-[10px] text-accent-green font-mono pt-2 border-t border-white/20 font-semibold tracking-wider w-full">
                  » {language === 'pt' ? 'Evidência' : 'Evidence'}: {tool.relatedProjectIds.length} {language === 'pt' ? 'projeto(s)' : 'project(s)'}
                </div>
              ) : (
                <div className="text-[10px] text-white/60 font-mono pt-2 border-t border-white/20 tracking-wider w-full">
                  — {language === 'pt' ? 'Estudo/Pesquisa' : 'Study/Research'}
                </div>
              )}
            </div>
          </div>
        </div>
      </InteractiveCard>
    </motion.div>
  );
};

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 w-full overflow-hidden" aria-label="Technologies and Tools">
      <div className="max-w-[1800px] mx-auto">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-accent-blue font-bold mb-4">{t('tech.stack.title')}</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase italic">
                {t('tech.stack.subtitle')}
              </h3>
            </div>
          </div>
        </Reveal>

        {/* Continuous Marquee Container - Added padding so 3D scale and tooltips don't get clipped */}
        <div className="relative w-full overflow-hidden py-16 -my-16" role="region" aria-roledescription="carousel">
          {/* Gradient masks for smooth fade at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <motion.div 
            className="flex w-max items-center"
            animate={{ 
              x: ["0%", "-50%"] 
            }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 40 // Adjust duration for speed (higher = slower)
            }}
          >
            {/* First Set */}
            <div className="flex gap-6 pr-6">
              {portfolioData.skills.map((tool, index) => (
                <TechCard key={`set1-${tool.name}-${index}`} tool={tool} index={index} />
              ))}
            </div>
            {/* Second Set (Duplicate for seamless loop) */}
            <div className="flex gap-6 pr-6">
              {portfolioData.skills.map((tool, index) => (
                <TechCard key={`set2-${tool.name}-${index}`} tool={tool} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
