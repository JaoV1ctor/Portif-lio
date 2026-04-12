'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'hero.greeting': 'Olá, eu sou',
    'hero.name': 'João Victor',
    'hero.description': 'Desenvolvedor focado em criar soluções inteligentes com IA e interfaces fluidas através do vibe code.',
    'hero.status': 'Disponível para Projetos',
    'hero.cta.projects': 'Ver Projetos',
    'hero.cta.contact': 'Entrar em Contato',
    'about.title': 'Sobre Mim',
    'about.subtitle': 'Olá, eu sou João Victor!',
    'about.p1': "Sou um arquiteto de soluções digitais apaixonado por fundir a potência da Inteligência Artificial com a elegância do 'vibe code'. Não apenas escrevo código; eu orquestro sinfonias tecnológicas onde agentes de IA e interfaces fluidas trabalham em harmonia.",
    'about.p2': "Especialista em criar Agentes de IA autônomos e ecossistemas inteligentes. Minha missão é transformar a complexidade em simplicidade, utilizando ferramentas de ponta como Antigravity, Claude e Gemini para construir o futuro do trabalho.",
    'about.p3': "Acredito que a tecnologia deve ser invisível e mágica. Atualmente, estou expandindo meus horizontes globais e refinando minha arte para conectar ideias brasileiras com o cenário mundial. Vamos criar algo que mude o jogo?",
    'projects.title': 'Projetos Selecionados',
    'projects.subtitle': 'Soluções Digitais de Alta Performance.',
    'projects.all': 'Todos',
    'projects.webapp': 'Web App',
    'projects.aitool': 'AI Tool',
    'projects.design': 'Design',
    'contact.category': 'Contato',
    'contact.title': 'Vamos construir algo lendário?',
    'contact.description': 'Estou sempre aberto a novos projetos, colaborações em IA ou apenas para trocar uma ideia sobre o futuro da tecnologia.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.message': 'Sua mensagem',
    'contact.form.send': 'Enviar Mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.form.retry': 'Tentar Novamente',
    'contact.form.success.title': 'Mensagem Enviada!',
    'contact.form.success.desc': 'Obrigado pelo contato. Responderei o mais breve possível.',
    'contact.form.success.btn': 'Enviar outra mensagem',
    'contact.form.error': 'Ocorreu um erro ao enviar. Por favor, tente novamente.',
    'contact.form.error.name': 'Nome é obrigatório',
    'contact.form.error.email': 'Email é obrigatório',
    'contact.form.error.email.invalid': 'Email inválido',
    'contact.form.error.message': 'Mensagem é obrigatória',
    'terminal.welcome': 'Bem-vindo ao terminal do João Victor. Digite "help" para começar.',
    'terminal.help': 'Comandos: help, about, skills, projects, contact, ls, date, whoami, clear, resume.pdf, exit',
    'terminal.notfound': 'Comando não encontrado: {cmd}. Digite "help" para ver a lista.',
    'terminal.about': 'Eu sou João Victor, entusiasta de tecnologia focado em IA e vibe code.',
    'terminal.projects': 'Confira meus projetos na seção de Projetos abaixo!',
    'terminal.contact': 'Listagem de contatos acessada. (Links abaixo)',
    'terminal.skills': 'Minhas principais habilidades: Next.js, React, TypeScript, Python e IA.',
    'terminal.sudo': 'Permissão negada. Você não é o administrador do sistema (por enquanto).',
    'terminal.whoami': 'uid=1000(guest) gid=1000(guest) groups=1000(guest),27(sudo)\nlocation=brasil node=matrix',
    'terminal.exit': 'Terminal encerrado. Recarregue a página para abrir novamente.',
    'terminal.ls': 'about/  skills/  projects/  contact/  resume.pdf',
    'terminal.resume': 'Iniciando o download do currículo...',
    'footer.copy': '© 2026 João Victor. Construído com Next.js e Gemini AI.',
    'backtotop': 'Voltar ao topo',
    'tech.stack.title': 'Tech Stack & Ferramentas',
    'tech.stack.subtitle': 'Tecnologias & Ferramentas',
    'projects.view': 'Ver Projeto',
    'digitalgarden.title': 'Jardim Digital',
    'digitalgarden.subtitle': 'Today I Learned (TIL) & Notas de Engenharia'
  },
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'João Victor',
    'hero.description': 'Developer focused on creating intelligent solutions with AI and fluid interfaces through vibe code.',
    'hero.status': 'Available for Projects',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Get in Touch',
    'about.title': 'About Me',
    'about.subtitle': "Hi, I'm João Victor!",
    'about.p1': "I am a digital solutions architect passionate about merging the power of Artificial Intelligence with the elegance of 'vibe code'. I don't just write code; I orchestrate technological symphonies where AI agents and fluid interfaces work in harmony.",
    'about.p2': "Specialist in creating autonomous AI Agents and intelligent ecosystems. My mission is to transform complexity into simplicity, using cutting-edge tools like Antigravity, Claude, and Gemini to build the future of work.",
    'about.p3': "I believe technology should be invisible and magical. Currently, I'm expanding my global horizons and refining my craft to connect Brazilian ideas with the world stage. Let's create something game-changing?",
    'projects.title': 'Selected Projects',
    'projects.subtitle': 'High-Performance Digital Solutions.',
    'projects.all': 'All',
    'projects.webapp': 'Web App',
    'projects.aitool': 'AI Tool',
    'projects.design': 'Design',
    'contact.category': 'Contact',
    'contact.title': "Let's build something legendary?",
    'contact.description': "I'm always open to new projects, AI collaborations, or just chatting about the future of technology.",
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Your message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.retry': 'Try Again',
    'contact.form.success.title': 'Message Sent!',
    'contact.form.success.desc': 'Thanks for reaching out. I will respond as soon as possible.',
    'contact.form.success.btn': 'Send another message',
    'contact.form.error': 'An error occurred while sending. Please try again.',
    'contact.form.error.name': 'Name is required',
    'contact.form.error.email': 'Email is required',
    'contact.form.error.email.invalid': 'Invalid email',
    'contact.form.error.message': 'Message is required',
    'terminal.welcome': 'Welcome to João Victor\'s terminal. Type "help" to get started.',
    'terminal.help': 'Commands: help, about, skills, projects, contact, ls, date, whoami, clear, resume.pdf, exit',
    'terminal.notfound': 'Command not found: {cmd}. Type "help" to see the list.',
    'terminal.about': 'I am João Victor, a technology enthusiast focused on AI and vibe code.',
    'terminal.projects': 'Check out my projects in the Projects section below!',
    'terminal.contact': 'Contact listing accessed. (Links below)',
    'terminal.skills': 'Core skills: Next.js, React, TypeScript, Python and AI.',
    'terminal.sudo': 'Permission denied. You are not the system administrator (for now).',
    'terminal.whoami': 'uid=1000(guest) gid=1000(guest) groups=1000(guest),27(sudo)\nlocation=brazil node=matrix',
    'terminal.exit': 'Terminal closed. Reload the page to reopen.',
    'terminal.ls': 'about/  skills/  projects/  contact/  resume.pdf',
    'terminal.resume': 'Starting resume download...',
    'footer.copy': '© 2026 João Victor. Built with Next.js and Gemini AI.',
    'backtotop': 'Back to top',
    'tech.stack.title': 'Tech Stack & Tools',
    'tech.stack.subtitle': 'Tools & Technologies',
    'projects.view': 'View Project',
    'digitalgarden.title': 'Digital Garden',
    'digitalgarden.subtitle': 'Today I Learned (TIL) & Engineering Notes'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
        return savedLang;
      }
    }
    return 'pt';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
