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
      id: 'atlas-containers',
      date: '2026-04-22',
      title: 'Atlas Containers Platform',
      resultMetric: 'Evolução de MVP para Plataforma B2B de Alta Conversão',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WhatsApp API'],
      description: 'Desenvolvimento e refinamento de uma plataforma B2B profissional. O projeto transformou um MVP inicial em um sistema pronto para produção, com foco em consistência UI/UX premium e integração de comunicação direta para otimizar o funil de contato com o cliente.',
      liveUrl: 'https://mvp-containers.vercel.app/', 
      isProfessional: true
    },
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
