import Hero from '@/components/Hero';
import { InteractiveBackground } from '@/components/ui/InteractiveBackground';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import About from '@/components/About';
import DigitalGarden from '@/components/DigitalGarden';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

export const revalidate = 3600;

export type GithubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  topics: string[];
};

async function getLiveProjects(): Promise<GithubRepo[]> {
  try {
    const res = await fetch('https://api.github.com/users/JaoV1ctor/repos?sort=created&per_page=30', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    
    const repos: GithubRepo[] = await res.json();
    return repos.filter(repo => !(repo as any).fork).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error('Error fetching github data:', error);
    return [];
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
