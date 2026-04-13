export type SocialLink = {
  platform: 'Github' | 'Linkedin' | 'Twitter' | 'Mail';
  url: string;
};

export type Skill = {
  name: string;
  category: string;
  relatedProjectIds: string[];
};

export type ProfessionalProject = {
  id: string;
  date: string;
  title: string;
  resultMetric: string;
  technologies: string[];
  description: string;
  liveUrl?: string;
  isProfessional: true; // discriminator
};

export type PortfolioData = {
  socials: SocialLink[];
  skills: Skill[];
  professionalProjects: ProfessionalProject[];
};

export const portfolioData: PortfolioData = {
  socials: [
    { platform: 'Github', url: 'https://github.com/JaoV1ctor' }
  ],
  skills: [
    { name: 'TypeScript', category: 'Frontend', relatedProjectIds: ['proj-1'] }
  ],
  professionalProjects: [
    {
      id: 'gu-cortes',
      date: '2026-04-05',
      title: 'Gu Cortes - Atendimento IA',
      resultMetric: 'Automação de 100% dos agendamentos via WhatsApp',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Gemini AI', 'Meta API'],
      description: 'Bot inteligente para barbearia integrado diretamente ao WhatsApp. O sistema utiliza a inteligência da API do Google Gemini para interpretar linguagem natural, tirar dúvidas e realizar agendamentos integrados a um banco de dados (Supabase) de forma totalmente automatizada, escalável e dentro do Meta Cloud API.',
      liveUrl: 'https://gucortes.vercel.app',
      isProfessional: true
    }
  ]
};
