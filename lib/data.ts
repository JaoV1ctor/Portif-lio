export type SocialLink = {
  platform: 'Github' | 'Instagram' | 'Mail' | 'WhatsApp';
  url: string;
};

export type Skill = {
  name: string;
  category: { pt: string; en: string };
  description: { pt: string; en: string };
  color: string;
  relatedProjectIds: string[];
};

export type Project = {
  id: string;
  date: string; // YYYY-MM-DD for sorting (Recency Priority)
  title: { pt: string; en: string }; // The Hook
  resultMetric: { pt: string; en: string }; // The Result
  technologies: string[]; // The Tools
  description: { pt: string; en: string };
  repoUrl?: string;
  liveUrl?: string;
  category: string;
};

export type TILNote = {
  id: string;
  date: string;
  topic: string;
  title: { pt: string; en: string };
  snippet: string;
  language: string;
};

export type PortfolioData = {
  socials: SocialLink[];
  skills: Skill[];
  projects: Project[];
  tilNotes: TILNote[];
};

export const portfolioData: PortfolioData = {
  socials: [
    { platform: 'Github', url: 'https://github.com/JaoV1ctor' },
    { platform: 'Instagram', url: 'https://ig.me/m/jao.cfxz?text=Olá%20João!%20Vim%20pelo%20seu%20portfólio.' },
    { platform: 'Mail', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=jaions2003@gmail.com&su=Contato%20via%20Portfólio&body=Olá%20João!%20Vim%20pelo%20seu%20portfólio.' },
    { platform: 'WhatsApp', url: 'https://wa.me/5513991377983?text=Olá%20João!%20Vim%20pelo%20seu%20portfólio.' }
  ],
  projects: [
    {
      id: 'proj-fms',
      date: '2024-03-01',
      title: { pt: 'Freelancer Management System', en: 'Freelancer Management System' },
      description: { 
        pt: 'Uma plataforma completa para gestão de projetos, faturamento e CRM focada em freelancers de alta performance.',
        en: 'A complete platform for project management, invoicing, and CRM focused on high-performance freelancers.'
      },
      resultMetric: { pt: 'Aumentou a retenção de clientes em 40%', en: 'Increased client retention by 40%' },
      technologies: ['Next.js', 'Firebase', 'Tailwind'],
      category: 'Web App',
      repoUrl: '#',
      liveUrl: '#'
    },
    {
      id: 'proj-ace',
      date: '2024-01-15',
      title: { pt: 'AI Content Engine', en: 'AI Content Engine' },
      description: { 
        pt: 'Automação de geração de conteúdo multimodal usando processamento de linguagem natural.',
        en: 'Multimodal content generation automation using natural language processing.'
      },
      resultMetric: { pt: 'Redução de 80% no tempo de criação de artigos', en: '80% reduction in article creation time' },
      technologies: ['Python', 'Gemini API', 'FastAPI'],
      category: 'AI Tool',
      repoUrl: '#',
      liveUrl: '#'
    },
    {
      id: 'proj-vibe',
      date: '2023-11-20',
      title: { pt: 'Vibe UI Kit', en: 'Vibe UI Kit' },
      description: { 
        pt: 'Um sistema de design minimalista focado em acessibilidade e contraste extremo para aplicações web.',
        en: 'A minimalist design system focused on accessibility and extreme contrast for web applications.'
      },
      resultMetric: { pt: 'Adotado por +500 desenvolvedores', en: 'Adopted by +500 developers' },
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      category: 'Design',
      repoUrl: '#',
      liveUrl: '#'
    },
    {
      id: 'proj-pd',
      date: '2023-08-10',
      title: { pt: 'Productivity Dashboard', en: 'Productivity Dashboard' },
      description: { 
        pt: 'Dashboard analítico para freelancers monitorarem produtividade e tempo de foco com integração de IA.',
        en: 'Analytical dashboard for freelancers to monitor productivity and focus time with AI integration.'
      },
      resultMetric: { pt: 'Mais de 10.000 horas de foco rastreadas', en: 'More than 10,000 focus hours tracked' },
      technologies: ['Next.js', 'D3.js', 'PostgreSQL'],
      category: 'Web App',
      repoUrl: '#',
      liveUrl: '#'
    },
    {
      id: 'proj-sta',
      date: '2023-05-05',
      title: { pt: 'Smart Task Automator', en: 'Smart Task Automator' },
      description: { 
        pt: 'Ferramenta que automatiza tarefas repetitivas do dia a dia de desenvolvedores usando agentes de IA.',
        en: 'Tool that automates repetitive daily tasks for developers using AI agents.'
      },
      resultMetric: { pt: 'Economia de 15h semanais por equipe', en: 'Savings of 15h per week per team' },
      technologies: ['Node.js', 'OpenAI', 'Redis'],
      category: 'AI Tool',
      repoUrl: '#',
      liveUrl: '#'
    }
  ],
  skills: [
    { name: 'Next.js', category: { pt: 'Framework', en: 'Framework' }, description: { pt: 'Framework React para produção', en: 'React framework for production' }, color: 'blue', relatedProjectIds: ['proj-fms', 'proj-pd'] },
    { name: 'React', category: { pt: 'Biblioteca', en: 'Library' }, description: { pt: 'Biblioteca de componentes UI', en: 'UI component library' }, color: 'blue', relatedProjectIds: ['proj-vibe'] },
    { name: 'TypeScript', category: { pt: 'Linguagem', en: 'Language' }, description: { pt: 'JavaScript tipado estaticamente', en: 'Statically typed JavaScript' }, color: 'blue', relatedProjectIds: ['proj-fms', 'proj-pd', 'proj-vibe'] },
    { name: 'Tailwind CSS', category: { pt: 'Estilização', en: 'Styling' }, description: { pt: 'Framework CSS utilitário', en: 'Utility-first CSS framework' }, color: 'blue', relatedProjectIds: ['proj-fms', 'proj-vibe'] },
    { name: 'Node.js', category: { pt: 'Runtime', en: 'Runtime' }, description: { pt: 'Ambiente de execução JavaScript', en: 'JavaScript runtime' }, color: 'green', relatedProjectIds: ['proj-sta'] },
    { name: 'Python', category: { pt: 'Linguagem', en: 'Language' }, description: { pt: 'Linguagem de propósito geral', en: 'General-purpose programming' }, color: 'blue', relatedProjectIds: ['proj-ace'] },
    { name: 'Gemini AI', category: { pt: 'Inteligência', en: 'Intelligence' }, description: { pt: 'Modelos avançados de IA', en: 'Advanced AI models' }, color: 'purple', relatedProjectIds: ['proj-ace'] },
    { name: 'Claude', category: { pt: 'Inteligência', en: 'Intelligence' }, description: { pt: 'Assistente de IA da Anthropic', en: 'Anthropic AI assistant' }, color: 'orange', relatedProjectIds: ['proj-sta'] },
    { name: 'Cursor', category: { pt: 'IDE', en: 'IDE' }, description: { pt: 'Editor de código com IA', en: 'AI-powered code editor' }, color: 'blue', relatedProjectIds: ['proj-fms', 'proj-ace'] },
    { name: 'Firebase', category: { pt: 'Backend', en: 'Backend' }, description: { pt: 'Plataforma de desenvolvimento', en: 'App development platform' }, color: 'orange', relatedProjectIds: ['proj-fms'] }
  ],
  tilNotes: [
    {
      id: 'til-1',
      date: '2024-04-01',
      topic: 'React Server Components',
      title: { pt: 'Cache avançado com Next.js', en: 'Advanced caching with Next.js' },
      language: 'typescript',
      snippet: `export const revalidate = 3600;

export default async function Page() {
  const data = await fetch('https://api.github.com/users/JaoV1ctor', {
    next: { revalidate: 3600 }
  }).then(res => res.json());

  return <Profile data={data} />;
}`
    },
    {
      id: 'til-2',
      date: '2024-03-28',
      topic: 'UI/UX',
      title: { pt: 'Efeito Tilt em 3D', en: '3D Tilt Effect' },
      language: 'css',
      snippet: `.card {
  transform: perspective(1000px) 
             rotateX(calc(var(--mouse-y) * 10deg)) 
             rotateY(calc(var(--mouse-x) * 10deg));
  transition: transform 0.1s;
}`
    },
    {
      id: 'til-3',
      date: '2024-03-20',
      topic: 'TypeScript',
      title: { pt: 'Tipagem de Genéricos Avançada', en: 'Advanced Generic Typing' },
      language: 'typescript',
      snippet: `function extractValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const obj = { id: 1, name: 'AI Portfolio' };
// Typado automaticamente como 'string'
const val = extractValue(obj, 'name');`
    },
    {
      id: 'til-4',
      date: '2024-03-15',
      topic: 'Tailwind CSS',
      title: { pt: 'Animações Complexas (Arbitrary Values)', en: 'Complex Animations (Arbitrary Values)' },
      language: 'html',
      snippet: `<div className="
  animate-[spin_3s_linear_infinite]
  hover:animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]
">
  <!-- CSS puramente utilitário -->
</div>`
    },
    {
      id: 'til-5',
      date: '2024-03-10',
      topic: 'Node.js',
      title: { pt: 'Tratamento de Erros Global Seguro', en: 'Safe Global Error Handling' },
      language: 'javascript',
      snippet: `process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Logar estruturadamente ajuda ferramentas como Sentry e Datadog
  gracefulShutdown();
});`
    },
    {
      id: 'til-6',
      date: '2024-03-05',
      topic: 'Python | AI',
      title: { pt: 'Stream de Resposta de LLM (Gemini)', en: 'LLM Response Streaming (Gemini)' },
      language: 'python',
      snippet: `response = model.generate_content("Escreva uma história.", stream=True)
for chunk in response:
    print(chunk.text, end="", flush=True)
# Retorna em chunks melhorando a UX no frontend`
    }
  ]
};
