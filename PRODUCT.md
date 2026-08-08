# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Dois públicos com o mesmo peso: (1) recrutadores técnicos avaliando para vaga CLT — triagem rápida de habilidades; (2) clientes freelance/PJ buscando contratar dev/design diretamente. O portfólio precisa servir candidatura a vaga e captação de cliente ao mesmo tempo.

## Product Purpose
Portfólio pessoal de Joao Victor (dev/designer). Existe para provar competência técnica de forma verificável e converter visitantes em oportunidade — entrevista ou contrato.

## Positioning
Execução técnica de elite: domínio de stack moderna (Next.js 15, Framer Motion, integração 3D via Spline, terminal interativo) demonstrado ao vivo no próprio site, não apenas descrito. O produto é a prova.

## Operating Context
- Duas fontes de dados separadas (não duplicadas): `data/portfolio.ts` (projetos profissionais reais, usado só em `app/page.tsx`) e `lib/data.ts` (conteúdo geral/demo, i18n `{pt, en}`, usado por Terminal, Contact, Footer, TechStack, DigitalGarden).
- Formulário de contato via FormSubmit (AJAX direto pro e-mail).
- Multilíngue via Context API (troca de idioma em tempo real).

## Capabilities and Constraints
- Lógica de Evidência: toda skill exibida deve remeter a projeto real (`relatedProjectIds`).
- Priorização de recência: projetos mais recentes primeiro.
- Hierarquia de informação: Hook (title) > Result (resultMetric) > Tools (technologies), sem blocos de texto.
- Zero alucinação/invenção de dado, zero negatividade, proibido expor dados sensíveis (NDA, contato pessoal fora dos canais oficiais).

## Brand Commitments
Nome: Joao Victor. Contato oficial: GitHub @JaoV1ctor, e-mail de contato do README (vibeagency.oficial@gmail.com). Tom: consultivo e prestativo, equilíbrio entre confiança e humildade, clareza executiva (direto, legível).

## Evidence on Hand
Projetos reais em `data/portfolio.ts` e `lib/data.ts` — conteúdo factual, não pode ser inventado ou alterado em conteúdo (só em apresentação visual). Nenhum dado de cliente sob NDA deve ser exposto.

## Product Principles
1. Prova antes de afirmação — toda claim de skill ancorada em projeto real.
2. Execução ao vivo como argumento — a própria UI (animação, 3D, terminal) é evidência de competência técnica.
3. Sem atrito para os dois públicos — recrutador em triagem rápida e cliente avaliando serviço devem achar o que precisam sem navegação excessiva.
4. Recência e hierarquia sempre visíveis — Hook > Result > Tools, projetos novos primeiro.
5. Zero ruído — sem enfeite que não sirva a prova de competência ou conversão.

## Accessibility & Inclusion
Nenhum requisito específico levantado ainda; seguir boas práticas padrão (contraste, navegação por teclado, prefers-reduced-motion dado peso alto em animação/3D).
