import Hero from '@/components/Hero';
// Forçando re-renderização para limpar o cache local
import { InteractiveBackground } from '@/components/ui/InteractiveBackground';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import About from '@/components/About';
import DigitalGarden from '@/components/DigitalGarden';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

// Cache removido para atualização em tempo real

export type UnifiedProject = {
  id: string | number;
  name: string;
  description: string;
  html_url?: string;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  language?: string;
  created_at: string;
  updated_at?: string;
  topics?: string[];
  isProfessional?: boolean;
  resultMetric?: string;
};

// Mapeia o tipo original do Github para facilitar tipagem interna caso precise
export type GithubRepo = UnifiedProject;

import { portfolioData } from '@/data/portfolio';

async function getLiveProjects(): Promise<UnifiedProject[]> {
  try {
    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch('https://api.github.com/users/JaoV1ctor/repos?sort=created&per_page=30', {
      headers,
      next: { revalidate: 3600 }
    });
    
    let ghRepos: UnifiedProject[] = [];
    if (res.ok) {
      const repos = await res.json();
      ghRepos = repos
        .filter((repo: any) => !repo.fork)
        .map((repo: any) => ({
          ...repo,
          isProfessional: false
        }));
    }
    
    const professionalProjects: UnifiedProject[] = portfolioData.professionalProjects.map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      homepage: p.liveUrl,
      language: p.technologies[0] || 'Web',
      topics: p.technologies,
      created_at: p.date,
      isProfessional: true,
      resultMetric: p.resultMetric
    }));

    // Combina e ordena por data (mais recentes primeiro)
    const allProjects = [...professionalProjects, ...ghRepos].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return allProjects;
  } catch (error) {
    console.error('Error fetching github data:', error);
    
    // Fallback: retorna apenas os projetos profissionais locais em caso de erro
    return portfolioData.professionalProjects.map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      homepage: p.liveUrl,
      language: p.technologies[0] || 'Web',
      topics: p.technologies,
      created_at: p.date,
      isProfessional: true,
      resultMetric: p.resultMetric
    }));
  }
}

export default async function Home() {
  const repos = await getLiveProjects();

  return (
    <main className="min-h-screen relative">
      <InteractiveBackground />
      <ScrollProgress />
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <Hero />
      </div>
      <div className="relative z-10 bg-background shadow-[0_-30px_60px_rgba(0,0,0,0.8)] border-t border-white/5 rounded-t-[3rem] pb-8">
        <TechStack />
        <Projects repos={repos} />
        <DigitalGarden />
        <About />
        <Contact />
        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}
