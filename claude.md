# Project Constitution

## Data Schemas
- **Portfolio Data Model**: Defined strictly in `gemini.md`. All skills must map to projects. Information hierarchy must be Hook > Result > Tools.

## Behavioral Rules
- **Tone**: Consultativo e prestativo (Guia). Equilíbrio entre confiança e humildade. Clareza Executiva (direto e legível).
- **Lógica de Evidência**: Habilidades devem ser comprovadas por projetos reais.
- **Priorização de Recência**: Projetos mais recentes primeiro.
- **Hierarquia de Informação**: Sem blocos de texto (Hook > Result > Tools).
- **HARD CONSTRAINTS**: Proibido alucinar/mentir, zero negatividade, proibido divulgar dados sensíveis (NDA, infos pessoais de contato), evitar prolixidade.
- **Fallback**: Redirecionar graciosamente ou fornecer links de segurança (LinkedIn/Email).

## Architectural Invariants
- **Layer 1: Architecture (`architecture/`)** - Technical SOPs and logic state.
- **Layer 2: Navigation** - Reasoning layer.
- **Layer 3: Tools (`tools/`)** - Deterministic Python scripts.
- **Data-First Rule**: Define schemas before scripting tools.
- **Self-Annealing**: Analyze, Patch, Test, Update Architecture.
