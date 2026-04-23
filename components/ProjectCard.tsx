'use client';

import { useState } from 'react';
import { Github, ArrowUpRight, Monitor, Bot, Palette, Code, Star, GitFork, ShieldCheck, Trophy } from 'lucide-react';
import type { UnifiedProject } from '@/app/page';
import { InteractiveCard } from '@/components/ui/interactive-card';

interface ProjectCardProps {
  project: UnifiedProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Determine theme based on language/tags/type
  const getThemeVars = () => {
    if (project.isProfessional) {
      return { 
        Icon: ShieldCheck, 
        colorClass: 'text-amber-400', 
        hoverClass: 'group-hover:text-amber-400', 
        shadowRgb: '251,191,36', 
        badgeColor: 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
      };
    }

    const lang = project.language?.toLowerCase() || '';
    const name = project.name.toLowerCase();
    
    if (lang === 'css') {
      return { Icon: Palette, colorClass: 'text-purple-400', hoverClass: 'group-hover:text-purple-400', shadowRgb: '192,132,252', badgeColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400' };
    } else if (lang === 'typescript') {
      return { Icon: Monitor, colorClass: 'text-blue-400', hoverClass: 'group-hover:text-blue-400', shadowRgb: '96,165,250', badgeColor: 'bg-blue-500/10 border-blue-500/20 text-blue-400' };
    } else if (lang === 'javascript') {
      return { Icon: Monitor, colorClass: 'text-yellow-400', hoverClass: 'group-hover:text-yellow-400', shadowRgb: '250,204,21', badgeColor: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' };
    } else if (lang === 'html') {
      return { Icon: Monitor, colorClass: 'text-orange-400', hoverClass: 'group-hover:text-orange-400', shadowRgb: '251,146,60', badgeColor: 'bg-orange-500/10 border-orange-500/20 text-orange-400' };
    } else if (lang === 'python') {
      return { Icon: Code, colorClass: 'text-teal-400', hoverClass: 'group-hover:text-teal-400', shadowRgb: '45,212,191', badgeColor: 'bg-teal-500/10 border-teal-500/20 text-teal-400' };
    } else if (lang === 'java') {
      return { Icon: Code, colorClass: 'text-red-400', hoverClass: 'group-hover:text-red-400', shadowRgb: '248,113,113', badgeColor: 'bg-red-500/10 border-red-500/20 text-red-400' };
    } else if (lang === 'php') {
      return { Icon: Code, colorClass: 'text-indigo-400', hoverClass: 'group-hover:text-indigo-400', shadowRgb: '129,140,248', badgeColor: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' };
    } else if (name.includes('ai') || name.includes('gpt') || name.includes('bot') || name.includes('llm')) {
      return { Icon: Bot, colorClass: 'text-accent-green', hoverClass: 'group-hover:text-accent-green', shadowRgb: '16,185,129', badgeColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
    } else if (name.includes('design') || name.includes('ui')) {
      return { Icon: Palette, colorClass: 'text-purple-400', hoverClass: 'group-hover:text-purple-400', shadowRgb: '192,132,252', badgeColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400' };
    }
    
    return { Icon: Code, colorClass: 'text-slate-400', hoverClass: 'group-hover:text-slate-400', shadowRgb: '148,163,184', badgeColor: 'bg-slate-500/10 border-slate-500/20 text-slate-400' };
  };

  const { Icon, colorClass, hoverClass, shadowRgb, badgeColor } = getThemeVars();
  const [isHovered, setIsHovered] = useState(false);

  const starCount = project.stargazers_count ?? 0;
  const forkCount = project.forks_count ?? 0;

  return (
    <InteractiveCard 
      className="relative group w-full h-full cursor-default min-h-[380px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div 
        className="absolute inset-0 flex flex-col bg-gradient-to-b from-white/[0.04] to-surface/40 bg-surface/40 overflow-hidden rounded-[32px] border border-white/10 transition-all duration-500" 
        style={{ 
          transform: "translateZ(-10px)",
          boxShadow: isHovered ? `0 24px 48px -12px rgba(${shadowRgb}, 0.45)` : 'none',
        }}
      />
      
      {/* Content Section with nested 3D pop */}
      <div 
        className="p-6 relative z-10 flex flex-col h-full pointer-events-none"
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
      >
          
          {/* Top Section: Icon and Links */}
          <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(40px)" }}>
            <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${project.isProfessional ? 'group-hover:bg-amber-500/10 group-hover:border-amber-500/30' : 'group-hover:bg-white/10'} transition-colors duration-500 shadow-xl`}>
              <Icon className={`w-12 h-12 ${colorClass}`} />
            </div>
            
            <div className="flex gap-3 pointer-events-auto items-center">
              {project.isProfessional && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                  <span>Client Work</span>
                </div>
              )}
              {project.html_url && !project.isProfessional && (
                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-accent-blue/20 hover:text-accent-blue text-white/70 rounded-full transition-colors flex items-center justify-center transform hover:scale-110 shadow-lg border border-white/5 hover:border-accent-blue/30" title="Ver Repositório">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors flex items-center justify-center border ${project.isProfessional ? 'bg-amber-500/10 hover:bg-amber-500/20 hover:text-white border-amber-500/30 text-amber-400' : 'bg-accent-blue/10 hover:bg-accent-blue/20 border-accent-blue/20 text-accent-blue'}`} title="Ver Site">
                  <ArrowUpRight className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          <div className="flex-grow" style={{ transform: "translateZ(30px)" }}>
            <h3 className={`text-2xl font-bold text-white tracking-tight transition-colors duration-300 mb-3 drop-shadow-lg capitalize ${hoverClass}`}>
              {project.name.replace(/-/g, ' ')}
            </h3>

            {(starCount > 0 || forkCount > 0) && !project.isProfessional && (
              <div className="flex items-center gap-4 text-sm font-semibold text-text-secondary mb-4 drop-shadow-sm">
                 {starCount > 0 && (
                   <span className="flex items-center gap-1.5 text-yellow-400/90">
                     <Star className="w-4 h-4 fill-current" />
                     {starCount}
                   </span>
                 )}
                 {forkCount > 0 && (
                   <span className="flex items-center gap-1.5 text-white/70">
                     <GitFork className="w-4 h-4" />
                     {forkCount}
                   </span>
                 )}
              </div>
            )}

            {project.isProfessional && project.resultMetric && (
              <div className="flex items-start gap-2 text-sm font-semibold text-text-secondary mb-4 drop-shadow-sm bg-surface p-3 rounded-xl border border-white/5">
                <Trophy className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-amber-500/90">{project.resultMetric}</span>
              </div>
            )}

            <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium drop-shadow-sm line-clamp-4">
              {project.description || "Nenhuma descrição fornecida no repositório."}
            </p>
          </div>

          {/* Tools & Languages */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border-subtle/50" style={{ transform: "translateZ(15px)" }}>
            {project.language && (
              <span className={`text-[10px] uppercase font-bold tracking-widest border px-3 py-1.5 rounded-lg ${badgeColor}`}>
                {project.language}
              </span>
            )}
            {project.topics && project.topics.map(tech => (
              <span key={tech} className="text-[10px] uppercase font-bold tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-text-secondary group-hover:text-white group-hover:border-white/20 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>
    </InteractiveCard>
  );
}
