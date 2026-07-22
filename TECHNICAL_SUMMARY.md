# Resumo Técnico - AI Studio Applet

**Projeto**: Portfolio Minimalista Focado em IA e Desenvolvimento  
**Versão**: 0.1.0  
**Framework**: Next.js 15.4.9  
**Linguagem**: TypeScript 5.9.3  
**Ambiente**: Node.js + React 19

---

## Visão Geral

Aplicação web de portfolio moderno que integra dados locais com dados dinâmicos da API GitHub. Exibe projetos profissionais e repositórios públicos, com foco em UX interativa e performance.

---

## Stack Técnico

### Frontend
- **React 19.2.1** - Framework UI com suporte a Server Components
- **Next.js 15.4.9** - Framework fullstack com renderização híbrida (SSR/SSG)
- **TypeScript 5.9.3** - Type-safety em tempo de desenvolvimento
- **Tailwind CSS 4.1.11** - Utilitários CSS com JIT compiler
- **PostCSS 8.5.6** - Processamento CSS avançado

### Animações & Interatividade
- **Motion 12.23.24** - Biblioteca de animações (transpiled via webpack)
- **Spline React 4.1.0** - Renderização 3D integrada
- **Lucide React 0.553.0** - Ícones SVG otimizados

### Formulários & Validação
- **React Hook Form 5.2.1** - Gerenciamento de estado em formulários
- **@hookform/resolvers 5.2.1** - Validação com Zod/Yup

### IA & APIs
- **Google Genai 1.17.0** - Integração com Google Generative AI
- **GitHub API** - Fetch dinâmico de repositórios públicos (com token env)

### Utilidades
- **clsx 2.1.1** - Construtor condicional de classes
- **tailwind-merge 3.3.1** - Merge seguro de classes Tailwind
- **class-variance-authority 0.7.1** - Pattern de variantes de componentes

### Dev Tools
- **ESLint 9.39.1** - Linting com config Next.js
- **Firebase Tools 15.0.0** - Deploy e gerenciamento local

---

## Arquitetura

```
📦 Projeto
├── 📂 app/
│   ├── layout.tsx           # Root layout com context providers
│   ├── page.tsx             # Home page (servidor)
│   └── globals.css          # Estilos globais
│
├── 📂 components/
│   ├── Hero.tsx             # Seção hero com 3D
│   ├── TechStack.tsx        # Grid de tecnologias
│   ├── Projects.tsx         # Container de projetos
│   ├── ProjectCard.tsx      # Card individual (com dynamic colors)
│   ├── DigitalGarden.tsx    # Seção de learning
│   ├── About.tsx            # Biografia
│   ├── Contact.tsx          # Formulário de contato
│   ├── GithubActivity.tsx   # Activity do GitHub
│   ├── Terminal.tsx         # Terminal interativo
│   ├── ScrollProgress.tsx   # Indicador de scroll
│   ├── Header.tsx           # Navbar com language switcher
│   ├── Footer.tsx           # Footer
│   │
│   ├── 📂 ui/
│   │   ├── InteractiveBackground.tsx  # Canvas/WebGL backdrop
│   │   ├── interactive-card.tsx       # Card wrapper
│   │   └── spotlight-card.tsx         # Spotlight effect
│   │
│   └── 📂 icons/
│       └── TechIcons.tsx    # Mapa de ícones por tech
│
├── 📂 lib/
│   └── utils.ts             # Utilidades (cn helper)
│
├── 📂 hooks/
│   └── use-mobile.ts        # Detector de viewport mobile
│
├── 📂 context/
│   └── LanguageContext.tsx  # Suporte multi-idioma (i18n)
│
├── 📂 data/
│   └── portfolio.ts         # Portfolio local (skills, projects, socials)
│
├── 📂 styles/
│   └── globals.css          # Tailwind directives + custom properties
│
├── 📄 next.config.ts        # Config Next.js com webpack customizado
├── 📄 tsconfig.json         # TypeScript config com path aliases (@/*)
├── 📄 tailwind.config.js    # Tailwind theming
├── 📄 postcss.config.js     # PostCSS plugins
└── 📄 package.json          # Dependências

```

---

## Fluxos de Dados

### 1. **Fetch de Projetos** (app/page.tsx)
```
GitHub API
    ↓
getLiveProjects()  [Server Action]
    ↓
Filter (não-fork) + Map → UnifiedProject[]
    ↓
Merge com portfolioData.professionalProjects
    ↓
Sort por data (desc) → Render
```

**Revalidação**: 3600s (ISR)  
**Fallback**: Projetos locais em caso de erro de rede

### 2. **Renderização de Página**
```
Home (async)
  → InteractiveBackground (WebGL)
  → Hero (Spline 3D)
  → TechStack (Icons)
  → Projects (com repos do GitHub)
  → DigitalGarden
  → About
  → Contact
  → Footer
```

### 3. **Internationalization (i18n)**
```
LanguageContext (React Context)
    ↓
useLanguage() hook em componentes
    ↓
Localização dinâmica de strings
```

---

## Configurações Críticas

### Next.js (next.config.ts)
- **React Strict Mode**: Ativo para detecção de efeitos colaterais
- **TypeScript Errors**: Não ignorar em build
- **ESLint**: Ignorar durante build (linting separado)
- **Remote Images**: Permitir `picsum.photos` (placeholder)
- **Output**: `standalone` (deploy otimizado)
- **HMR**: Pode ser desabilitado via `DISABLE_HMR=true`
- **Transpile Packages**: `motion` (requer transpilação)

### TypeScript (tsconfig.json)
- **Target**: ES2017
- **Strict Mode**: ✓ Ativo
- **Module Resolution**: `bundler` (Next.js nativo)
- **Path Aliases**: `@/*` → raiz do projeto
- **JSX**: `preserve` (Next.js 13+)

### Tailwind (tailwind.config.js)
- **JIT Mode**: Automático
- **Dark Mode**: Class-based (`.dark`)
- **Custom Properties**: Theme colors extensíveis

---

## Variáveis de Ambiente

```env
GITHUB_TOKEN=<token>              # Aumenta rate limit da GitHub API (opcional)
DISABLE_HMR=true                  # Desabilita HMR em dev (usado por AI Studio)
NEXT_PUBLIC_*=<valor>             # Expõe ao cliente (prefixo)
```

---

## Performance & Otimizações

### Server-Side
- **App Router** (Next.js 15): RSC nativo
- **ISR**: Revalidação de dados a cada 3600s
- **Standalone Output**: Deployment otimizado

### Client-Side
- **Code Splitting**: Automático via webpack/Next.js
- **Image Optimization**: Integrado via Next.js Image
- **CSS**: Tailwind purging automático

### Animações
- **Motion**: Transpilado via webpack (não afeta bundle)
- **Spline**: Lazy-load 3D assets

---

## Componentes-Chave

### Hero.tsx
- Renderiza Spline 3D interativa
- Fallback em canvas/WebGL
- Texto animado com Typewriter

### ProjectCard.tsx
- Dynamic color theming baseado em linguagem
- Metadata (stars, forks, topics)
- Links para repo + live demo

### InteractiveBackground.tsx
- Canvas-based WebGL effects
- Responds to mouse position
- Fallback para gradient CSS

### Header.tsx
- Navigation com language switcher
- Sticky positioning
- Menu mobile responsivo

---

## Scripts NPM

```bash
npm run dev       # Dev server com HMR (port 3000)
npm run build     # Build otimizado (output: standalone)
npm run start     # Prod server
npm run lint      # ESLint check
npm run clean     # Limpar .next
```

---

## Dependências Críticas

| Lib | Versão | Propósito |
|-----|--------|----------|
| next | 15.4.9 | Framework core |
| react | 19.2.1 | UI engine |
| typescript | 5.9.3 | Type safety |
| tailwindcss | 4.1.11 | CSS utilities |
| motion | 12.23.24 | Animações |
| @splinetool/react-spline | 4.1.0 | 3D rendering |
| @google/genai | 1.17.0 | AI integration |

---

## Constraints & Decisões

### Hard Constraints (CLAUDE.md)
- ✋ Sem dados sensíveis (NDA, contatos pessoais)
- ✋ Sem negatividade em copy
- ✋ Sem alucinações
- ✓ Projetos ordenados por recência
- ✓ Hierarquia: Hook > Result > Tools

### Data-First Rule
Todos skills mapeiam para projetos reais (portfolio.ts)

### i18n
Suportado via LanguageContext (PT-BR / EN por padrão)

---

## Deploy

### Plataformas Testadas
- **Vercel** (recomendado com Next.js)
- **Firebase Hosting** (com Node backend)

### Build
```bash
npm run build
# → .next/standalone + public
```

### Secrets em Produção
- `GITHUB_TOKEN` via env vars
- Nenhum secret commitado

---

## Tipos TypeScript

### UnifiedProject
Tipagem unificada para GitHub repos + projetos locais.

```typescript
type UnifiedProject = {
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
```

---

## Próximos Passos / TODO

- [ ] Adicionar analytics (Vercel Analytics)
- [ ] Cache permanente para GitHub data
- [ ] Testes E2E (Playwright/Cypress)
- [ ] PWA manifest
- [ ] SEO metadata dinâmica

---

## Contato & Referência

**Repositório**: `JaoV1ctor`  
**Email**: joaopopogrande@gmail.com

---

*Gerado automaticamente - Última atualização: 2026-07-22*
