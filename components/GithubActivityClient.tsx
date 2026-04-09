'use client';

import { Github, Star, GitFork, CircleDot } from 'lucide-react';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { useLanguage } from '@/context/LanguageContext';

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
};

type GithubProfile = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string;
};

interface Props {
  profile: GithubProfile;
  repos: Repo[];
}

export default function GithubActivityClient({ profile, repos }: Props) {
  const { language } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden" id="github">
      <div className="absolute inset-0 bg-surface/50 clip-diagonal pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="flex items-center gap-4 mb-16">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <Github className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              {language === 'pt' ? 'Atividade do ' : 'GitHub '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-400">
                {language === 'pt' ? 'GitHub' : 'Activity'}
              </span>
            </h2>
            <p className="text-text-secondary mt-2 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green"></span>
              </span>
              {language === 'pt' ? "Ao vivo do terminal de JaoV1ctor" : "Live from JaoV1ctor's terminal"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="md:col-span-1 flex flex-col">
            <InteractiveCard className="relative h-full w-full group">
              <div className="relative z-10 p-8 flex flex-col items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-md rounded-[32px] border border-white/10 text-center gap-4 group-hover:border-accent-blue/30 transition-colors duration-500 shadow-xl min-h-[320px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-blue/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full border-2 border-accent-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] mb-2 relative z-10"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">@JaoV1ctor</h3>
                  <p className="text-sm text-text-secondary mt-1">{profile.bio || (language === 'pt' ? "Engenheiro de Software" : "Software Engineer")}</p>
                </div>
                
                <div className="flex gap-6 mt-4 pt-4 border-t border-white/10 w-full justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-black text-white">{profile.public_repos}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">{language === 'pt' ? 'Repositórios' : 'Repos'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-white">{profile.followers}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">{language === 'pt' ? 'Seguidores' : 'Followers'}</p>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>

          {/* Recent Repos */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {repos.map(repo => (
              <InteractiveCard key={repo.id} className="relative h-full w-full group cursor-pointer">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="relative z-10 w-full h-full p-8 flex flex-col bg-[#0A0A0A]/80 backdrop-blur-md rounded-[32px] border border-white/10 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 min-h-[320px] text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-accent-blue/10 rounded-lg group-hover:bg-accent-blue/20 transition-colors">
                      <CircleDot className="w-4 h-4 text-accent-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-white truncate max-w-full group-hover:text-accent-blue transition-colors">{repo.name}</h3>
                  </div>
                  <p className="text-text-secondary text-sm flex-grow line-clamp-3 mb-6">
                    {repo.description || (language === 'pt' ? 'Nenhuma descrição fornecida.' : 'No description provided.')}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-blue/80 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 cursor-default text-xs text-text-secondary group-hover:text-white transition-colors">
                      <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 cursor-default text-xs text-text-secondary group-hover:text-white transition-colors">
                      <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </InteractiveCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
