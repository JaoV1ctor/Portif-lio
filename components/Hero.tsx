'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Mouse, Sparkles } from 'lucide-react';
import Typewriter from './Typewriter';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveRobotSpline } from './InteractiveRobotSpline';

export default function Hero() {
  const { t, language } = useLanguage();
  const { scrollY } = useScroll();

  const [showHeavyEffects, setShowHeavyEffects] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);
  const userManuallyToggled = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      // Verify device capability
      const checkPerformance = () => {
        const isMobile = window.innerWidth < 768;
        setIsMobileDevice(isMobile);

        if (isMobile) {
          // Never show heavy spline on mobile
          setShowHeavyEffects(false);
        } else if (!userManuallyToggled.current) {
          // For PCs, base requirement is 8 logical cores
          const logicalCores = navigator.hardwareConcurrency || 4;
          if (logicalCores >= 8) {
            setShowHeavyEffects(true);
          } else {
            setShowHeavyEffects(false);
          }
        }
      };

      checkPerformance();
      window.addEventListener('resize', checkPerformance);
      return () => window.removeEventListener('resize', checkPerformance);
    }
  }, []);
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 500], [0, 30]);
  const fgY = useTransform(scrollY, [0, 500], [0, -30]);
  
  // Scroll Indicator Parallax Fade
  const indicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const indicatorY = useTransform(scrollY, [0, 150], [0, 80]);

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center items-start overflow-hidden w-full">
      
      {/* Background Parallax Layer - Blur Blobs */}
      {showHeavyEffects && (
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 -z-20 opacity-20 w-full h-full pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 md:w-[600px] md:h-[600px] bg-accent-blue/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 md:w-[600px] md:h-[600px] bg-accent-green/30 rounded-full blur-[150px]" />
        </motion.div>
      )}

      {/* Interactive Robot - Absolute Background */}
      {showHeavyEffects && (
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <InteractiveRobotSpline 
            scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* Fallback Lightweight Elegant Background */}
      {!showHeavyEffects && (
        <div className="absolute inset-0 -z-20 opacity-40 mix-blend-screen pointer-events-none overflow-hidden">
          {/* Subtle slow moving grid */}
          <div className="absolute inset-x-0 inset-y-[-50%] w-full h-[200%] bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:4rem_4rem] animate-[grid_60s_linear_infinite]"
               style={{
                  maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)'
               }}
          />
          {/* Parallax Blobs for color */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-blue/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-green/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite] delay-[4000ms]" />
        </div>
      )}

      {/* Foreground Content - Pointer Events None, so mouse passes to robot, except on the box */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pointer-events-none flex flex-col justify-center items-start min-h-screen">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100, damping: 20 }}
          style={{ y: fgY }}
          className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto mt-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 150, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-mono uppercase tracking-widest bg-accent-blue/10 border border-accent-blue/30 rounded-full text-accent-blue"
          >
            <motion.span 
              animate={{ 
                scale: [1, 1.4, 1], 
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  "0 0 0px rgba(34,197,94,0)",
                  "0 0 12px rgba(34,197,94,0.6)",
                  "0 0 0px rgba(34,197,94,0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-2 h-2 bg-accent-green rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"
            />
            <span className="relative flex items-center gap-1 font-semibold">
              <span className="opacity-70">Status:</span> {t('hero.status')}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 120, damping: 15 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6 drop-shadow-xl text-white"
          >
            <Typewriter key={`greeting-${language}`} text={t('hero.greeting')} delay={40} showCursor={false} /> <br />
            <span className="text-accent-blue bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-cyan-300">
              <Typewriter key={`name-${language}`} text={t('hero.name')} delay={60} startDelay={600} />
            </span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed drop-shadow-md"
          >
            <Typewriter 
              key={`desc-${language}`}
              segments={language === 'pt' ? [
                { text: "Desenvolvedor focado em criar soluções inteligentes com IA e interfaces fluidas através do " },
                { text: "vibe code", className: "text-accent-green italic font-bold drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]" },
                { text: "." }
              ] : [
                { text: "Developer focused on creating intelligent solutions with AI and fluid interfaces through " },
                { text: "vibe code", className: "text-accent-green italic font-bold drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]" },
                { text: "." }
              ]}
              delay={25} 
              startDelay={1500}
              showCursor={false}
            />
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 150, damping: 15 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-blue hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all group shadow-[0_0_20px_rgba(0,112,243,0.3)]"
            >
              {t('hero.cta.projects')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-full font-bold transition-all bg-white/5 hover:bg-white/10 backdrop-blur-md"
            >
              {t('hero.cta.contact')}
            </motion.a>
            
            {!isMobileDevice && (
              <motion.button 
                onClick={() => {
                  userManuallyToggled.current = true;
                  setShowHeavyEffects(!showHeavyEffects);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/10 hover:border-accent-blue/50 text-white hover:text-accent-blue px-6 py-4 rounded-full font-bold transition-all bg-white/5 hover:bg-accent-blue/10 backdrop-blur-md flex items-center gap-3"
              >
                <Sparkles className={`w-5 h-5 ${showHeavyEffects ? 'text-accent-green' : 'text-text-secondary'}`} />
                {showHeavyEffects ? "Desativar Visual 3D" : "Ativar Visual 3D"}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Parallax Indicator */}
      <motion.div 
        style={{ opacity: indicatorOpacity, y: indicatorY }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-mono text-white/40">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-accent-blue overflow-hidden relative">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
        </div>
      </motion.div>

    </section>
  );
}
