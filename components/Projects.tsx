'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import { useLanguage } from '@/context/LanguageContext';
import type { UnifiedProject } from '@/app/page';

interface ProjectsProps {
  repos: UnifiedProject[];
}

export default function Projects({ repos }: ProjectsProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Professional');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Derive categories from github languages dynamically (only normal projects)
  const normalRepos = repos.filter(r => !r.isProfessional);
  const languagesSet = new Set(normalRepos.map(r => r.language).filter(Boolean) as string[]);
  // Sort alphabetically
  const uniqueLanguages = Array.from(languagesSet).sort();

  useEffect(() => {
    // Simulate initial data fetch/paint 
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [repos]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const categories = useMemo(() => [
    { id: 'Professional', label: 'Projetos Profissionais', isSpecial: true },
    { id: 'All', label: t('projects.all') || 'Todos', isSpecial: false },
    ...uniqueLanguages.map(lang => ({ id: lang, label: lang, isSpecial: false }))
  ], [t, uniqueLanguages]);

  const categoryCounts = useMemo(() => {
    const normalRepos = repos.filter(p => !p.isProfessional);
    const counts: Record<string, number> = { 
      All: normalRepos.length,
      Professional: repos.filter(p => p.isProfessional).length
    };
    normalRepos.forEach(p => {
      if (p.language) {
        counts[p.language] = (counts[p.language] || 0) + 1;
      }
    });
    return counts;
  }, [repos]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Professional') return repos.filter(p => p.isProfessional);
    
    const normalRepos = repos.filter(p => !p.isProfessional);
    if (activeCategory === 'All') return normalRepos;
    return normalRepos.filter(p => p.language === activeCategory);
  }, [activeCategory, repos]);

  const [itemsPerPage, setItemsPerPage] = useState(3);

  const filterRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (filterRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  useEffect(() => {
    const container = filterRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
      checkScroll();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollFilter = (direction: 'left' | 'right') => {
    if (filterRef.current) {
      const scrollAmount = 200;
      filterRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredProjects.length - itemsPerPage);

  const nextProject = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevProject = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const effectiveIndex = Math.min(currentIndex, maxIndex);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 w-full overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <Reveal width="100%">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-accent-blue font-bold mb-4">{t('projects.title')}</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase italic">
              {t('projects.subtitle')}
            </h3>
          </div>

          {/* Category Filter */}
          <div className="relative flex items-center max-w-full">
            {canScrollLeft && (
              <button 
                onClick={() => scrollFilter('left')} 
                className="absolute left-2 z-20 p-1.5 rounded-full bg-surface/90 backdrop-blur-md hover:bg-surface text-white border border-white/10 shadow-lg transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div 
              ref={filterRef}
              onScroll={checkScroll}
              className="relative flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-1 bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10 w-full scroll-smooth"
            >
              {categories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setIsLoading(true);
                      setActiveCategory(cat.id);
                      setCurrentIndex(0);
                    }}
                    className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 z-10 whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'text-white' 
                        : (cat.isSpecial ? 'text-amber-400 hover:text-white border border-amber-500/30 bg-amber-500/5' : 'text-text-secondary hover:text-white border border-transparent')
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className={`absolute inset-0 rounded-xl -z-10 shadow-lg ${cat.isSpecial ? 'bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-500/30' : 'bg-accent-blue shadow-accent-blue/30'}`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {cat.isSpecial && <Briefcase className="w-4 h-4" />}
                    <span className="relative">{cat.label}</span>
                    <span className={`relative text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : (cat.isSpecial ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-text-secondary')
                    }`}>
                      {categoryCounts[cat.id] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {canScrollRight && (
              <button 
                onClick={() => scrollFilter('right')} 
                className="absolute right-2 z-20 p-1.5 rounded-full bg-surface/90 backdrop-blur-md hover:bg-surface text-white border border-white/10 shadow-lg transition-all animate-pulse hover:animate-none"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Carousel Container */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button 
              onClick={prevProject}
              disabled={effectiveIndex === 0}
              className="p-3 rounded-full border border-border-subtle hover:border-white text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextProject}
              disabled={effectiveIndex >= maxIndex}
              className="p-3 rounded-full border border-border-subtle hover:border-white text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="h-[1px] flex-1 bg-border-subtle opacity-30" />
          <div className="text-sm font-mono text-text-secondary">
            {String(effectiveIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
          </div>
        </div>

        <div className="overflow-visible">
          <motion.div 
            className="flex gap-8"
            animate={{ 
              x: `calc(-${effectiveIndex} * (100% / ${itemsPerPage}) - ${effectiveIndex * 2}rem)` 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Skeleton Loaders
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0"
                  >
                    <div className="h-[380px] rounded-[32px] bg-surface/50 border border-white/5 animate-pulse flex flex-col p-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 mb-8" />
                      <div className="w-3/4 h-8 bg-white/5 rounded-lg mb-4" />
                      <div className="w-full h-20 bg-white/5 rounded-lg mb-6" />
                      <div className="mt-auto flex gap-2">
                        <div className="w-16 h-6 bg-white/5 rounded-lg" />
                        <div className="w-16 h-6 bg-white/5 rounded-lg" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
}
