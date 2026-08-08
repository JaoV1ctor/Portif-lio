---
name: Vibe Portfolio
description: Portfólio dark tech de Joao Victor — command deck com terminal interativo, glassmorphism e glow de status
colors:
  background: "#0A0A0A"
  surface: "#1A1A1A"
  border-subtle: "#333333"
  text-primary: "#FFFFFF"
  text-secondary: "#A3A3A3"
  accent-blue: "#3B82F6"
  accent-green: "#10B981"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    letterSpacing: "normal"
    fontStyle: "italic"
    textTransform: "uppercase"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  mono:
    fontFamily: "ui-monospace, monospace"
    fontSize: "0.875rem"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  glass-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Vibe Portfolio

## Overview

**Creative North Star: "The Command Deck"**

O portfólio se comporta como o painel de controle de um dev-piloto: fundo preto absoluto, superfícies de vidro fosco flutuando por cima, e glow de status (azul = ativo/foco, verde = online/sucesso) sinalizando estado em tempo real. Cada elemento parece instrumentação — o Terminal interativo é a cabine de comando, não decoração.

O temperamento é preciso e confiante: bordas nítidas em vidro (não difusas), glow controlado e intencional (nunca ambiente ou gratuito), sensação de ferramenta profissional que o visitante pode confiar e operar. Profundidade vem de glassmorphism em camadas — blur e transparência empilhados — não de sombra dramática solta no espaço.

**Key Characteristics:**
- Fundo preto puro (#0A0A0A) como vácuo; toda superfície é vidro sobreposto, nunca opaca sólida.
- Glow de cor (azul/verde) reservado para estado: foco, hover, sucesso, atividade — nunca ambiente.
- Tipografia Poppins bold/extrabold em títulos, itálico+uppercase em headlines de seção, mono no Terminal e no Footer.
- Cantos generosamente arredondados (16–32px) em quase toda superfície; pill (full) em botões e badges de status.
- Tilt 3D sutil em cards ao hover — a interface reage fisicamente ao cursor, reforçando "instrumentação viva".

## Colors

Paleta escura de duas cores de sinal sobre neutros — cada acento tem um papel operacional, não decorativo.

### Primary
- **Command Blue** (#3B82F6): foco, CTAs primários, links ativos, glow de hover em cards e inputs. É a cor de "isto está selecionado/ativo".

### Secondary
- **Status Green** (#10B981): indicadores de disponibilidade/sucesso (dot "open to work" no Hero, cursor do Terminal, mensagens de sucesso no Contact). É a cor de "isto está online/confirmado".

### Neutral
- **Void Black** (#0A0A0A): fundo base de toda a página.
- **Glass Surface** (#1A1A1A): superfície de cards e painéis antes do blur.
- **Border Subtle** (#333333): divisórias e bordas em repouso.
- **Text Primary** (#FFFFFF): títulos e corpo principal.
- **Text Secondary** (#A3A3A3): legendas, descrições, texto de apoio.

### Named Rules
**The Signal Rule.** Azul e verde só aparecem para comunicar estado (foco, hover, sucesso, atividade). Fora desses gatilhos, a interface fica monocromática — a cor é sinal, não ambientação.

## Typography

**Display Font:** Poppins (pesos 300–800, via next/font/google)
**Mono Font:** stack monoespaçada padrão, usada no Terminal e no Footer

**Character:** Poppins extrabold carrega o peso das headlines; o itálico-uppercase em títulos de seção ("PROJECTS", "CONTACT") dá cadência de rótulo de painel. O mono entra só onde o produto está literalmente simulando um terminal — nunca como corpo de texto geral.

### Hierarchy
- **Display** (extrabold 800, clamp 3rem–4.5rem, leading 1.1, tracking -0.02em): H1 do Hero.
- **Headline** (bold 700, clamp 2.25–3rem, itálico, uppercase): títulos de seção (Projects, Contact).
- **Title** (bold 700, 1.5rem, tracking tight): títulos de card de projeto.
- **Body** (regular 400, 1.125rem, cor text-secondary): parágrafos de apoio.
- **Label** (bold 700, 0.75rem, tracking 0.2em, uppercase): badges, tags de tecnologia, nav.
- **Mono** (regular, 0.875rem): conteúdo do Terminal, copyright do Footer.

### Named Rules
**The One Voice Rule.** Só um peso de destaque por bloco: um H1 extrabold não divide protagonismo com um subtítulo igualmente pesado — o corpo cai sempre para text-secondary.

## Layout

Grid responsivo tipo bento (`auto-fit, minmax(300px, 1fr)`) para blocos de conteúdo modular. Containers centralizados com bastante respiro lateral; densidade baixa a média — cada card tem padding generoso (24px+) para reforçar a sensação de "painel", não de lista densa. Motion (Framer Motion) governa entrada e transição: springs (stiffness ~260, damping ~26) em elementos interativos, easing customizado (`cubic-bezier(0.23,1,0.32,1)`) em saídas de tilt 3D.

## Elevation & Depth

Sistema híbrido: glassmorphism em camadas é a fonte primária de profundidade (`backdrop-filter: blur(16px) saturate(180%)` sobre fundos semi-transparentes rgba(26,26,26,0.4)), reforçado por glow colorido de estado em vez de sombra neutra tradicional. Sombra pura (`box-shadow` preto) aparece pouco; quando aparece, é para ancorar o card ao fundo, não para dramatizar.

### Shadow Vocabulary
- **Glass ambient** (`0 8px 32px 0 rgba(0,0,0,0.37)`): sombra de base sob painéis de vidro (`.glass-effect`).
- **Focus glow blue** (`0 0 20px rgba(0,112,243,0.2–0.3)`): inputs em foco, CTA primário em hover.
- **Success glow green**: dot de status "open to work", confirmação de formulário.
- **Terminal glow** (`0 30px 100px -20px rgba(14,165,233,0.3)`): sombra ampla e difusa exclusiva do Terminal, reforça seu papel de peça central.

### Named Rules
**The Layered Glass Rule.** Profundidade nasce de empilhar blur+transparência, não de escurecer o fundo. Uma superfície sem `backdrop-filter` não pertence a este sistema.

## Shapes

Cantos generosamente arredondados em quase tudo: 16px (`rounded-2xl`) em cards padrão, até 32px (`rounded-[32px]`) em cards de projeto e formulário de contato. Botões e badges de status usam pill total (`rounded-full`). Bordas finas de 1px em `white/10` ou `border-subtle` definem o limite do vidro sem pesar visualmente. Sem clipping agressivo ou geometria angular — a linguagem de forma é toda suave e orgânica sobre a base tecnológica.

## Components

### Buttons
- **Shape:** pill (`rounded-full`).
- **Primary:** fundo accent-blue, glow de sombra azul (`shadow-[0_0_20px_rgba(0,112,243,0.3)]`), padding 16px 32px.
- **Hover / Focus:** `scale: 1.05` via motion, intensifica o glow.

### Cards / Containers
- **Corner Style:** 24–32px.
- **Background:** gradiente sutil `from-white/[0.04] to-surface/40`, sempre com `backdrop-blur`.
- **Shadow Strategy:** ver Elevation — glow colorido dinâmico no hover (cor varia por badge/linguagem no ProjectCard), tilt 3D físico (`translateZ 15–40px`) reforçando profundidade real.
- **Border:** 1px `white/10`, some para `white/30` no hover.
- **Internal Padding:** 24px.

### Inputs / Fields
- **Style:** fundo `black/40`, `rounded-2xl`, padding 20px/16px.
- **Focus:** borda accent-blue + glow azul (`shadow-[0_0_20px_rgba(0,112,243,0.2)]`).
- **Error:** borda vermelha translúcida + glow vermelho sutil.

### Navigation
- **Style:** header com toggle de idioma em pill de vidro, auto-hide no scroll (translateY -100%, spring 0.35s), item ativo com glow de sombra azul.

### Terminal (componente-assinatura)
Cabine de comando do site: fundo quase-preto (`#0b0c10/80`) com blur pesado, borda dupla branca translúcida, scanline overlay em mix-blend-overlay simulando CRT, header estilo macOS com três dots coloridos (#FF5F56/#FFBD2E/#27C93F), texto mono, cursor piscante verde, e easter egg de minigame. É o único lugar onde a metáfora "instrumentação" vira literal — nenhum outro componente deve tentar recriar esse efeito CRT/scanline.

## Do's and Don'ts

### Do:
- **Do** reservar azul e verde só para estado (foco/hover/sucesso/atividade) — The Signal Rule.
- **Do** construir profundidade com `backdrop-filter` empilhado antes de recorrer a sombra preta pesada.
- **Do** manter cantos arredondados generosos (16px+) e pill em botões/badges.
- **Do** usar Poppins extrabold só no H1 de cada seção — um único ponto de peso máximo por bloco.

### Don't:
- **Don't** introduzir cor de acento fora do par azul/verde sem justificativa de novo estado.
- **Don't** usar cantos retos ou geometria angular — quebra a linguagem de forma orgânica do sistema.
- **Don't** replicar o efeito CRT/scanline do Terminal em outros componentes — é assinatura exclusiva dele.
- **Don't** empilhar dois pesos de heading igualmente fortes no mesmo bloco (viola The One Voice Rule).
