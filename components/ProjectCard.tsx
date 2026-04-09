'use client';

import { useState } from 'react';
import { Github, ArrowUpRight, Monitor, Bot, Palette, Code, Star, GitFork } from 'lucide-react';
import type { GithubRepo } from '@/app/page';
import { InteractiveCard } from '@/components/ui/interactive-card';

interface ProjectCardProps {
  project: GithubRepo;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Determine theme based on language/tags
  const getThemeVars = () => {
    const lang = project.language?.toLowerCase() || '';
    const name = project.name.toLowerCase();
    
    if (name.includes('ai') || name.includes('gpt') || name.includes('bot') || name.includes('llm')) {
      return { Icon: Bot, colorClass: 'text-accent-green', hoverClass: 'group-hover:text-accent-green', shadowRgb: '16,185,129', badgeColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
    } else if (name.includes('design') || name.includes('ui') || lang === 'css') {
      return { Icon: Palette, colorClass: 'text-purple-400', hoverClass: 'group-hover:text-purple-400', shadowRgb: '192,132,252', badgeColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400' };
    } else if (lang === 'typescript' || lang === 'javascript' || lang === 'html') {
      return { Icon: Monitor, colorClass: 'text-accent-blue', hoverClass: 'group-hover:text-accent-blue', shadowRgb: '59,130,246', badgeColor: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue' };
    }
    return { Icon: Code, colorClass: 'text-accent-blue', hoverClass: 'group-hover:text-accent-blue', shadowRgb: '59,130,246', badgeColor: 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue' };
  };

  const { Icon, colorClass, hoverClass, shadowRgb, badgeColor } = getThemeVars();
  const [isHovered, setIsHovered] = useState(false);

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
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-500 shadow-xl">
              <Icon className={`w-12 h-12 ${colorClass}`} />
            </div>
            
            <div className="flex gap-3 pointer-events-auto">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-accent-blue/20 hover:text-accent-blue text-white/70 rounded-full transition-colors flex items-center justify-center transform hover:scale-110 shadow-lg border border-white/5 hover:border-accent-blue/30" title="Ver Repositório">
                <Github className="w-6 h-6" />
              </a>
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="p-2 bg-accent-blue/10 hover:bg-accent-blue/20 rounded-full transition-colors flex items-center justify-center border border-accent-blue/20">
                  <ArrowUpRight className="w-6 h-6 text-accent-blue" />
                </a>
              )}
            </div>
          </div>

          <div className="flex-grow" style={{ transform: "translateZ(30px)" }}>
            <h3 className={`text-2xl font-bold text-white tracking-tight transition-colors duration-300 mb-3 drop-shadow-lg capitalize ${hoverClass}`}>
              {project.name.replace(/-/g, ' ')}
            </h3>

            {(project.stargazers_count > 0 || project.forks_count > 0) && (
              <div className="flex items-center gap-4 text-sm font-semibold text-text-secondary mb-4 drop-shadow-sm">
                 {project.stargazers_count > 0 && (
                   <span className="flex items-center gap-1.5 text-yellow-400/90">
                     <Star className="w-4 h-4 fill-current" />
                     {project.stargazers_count}
                   </span>
                 )}
                 {project.forks_count > 0 && (
                   <span className="flex items-center gap-1.5 text-white/70">
                     <GitFork className="w-4 h-4" />
                     {project.forks_count}
                   </span>
                 )}
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
