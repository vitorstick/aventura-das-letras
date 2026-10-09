# Instruções de Desenvolvimento e Arquitetura - Aventura das Letras 🦕

## 1. Visão Geral do Projeto
A **Aventura das Letras** é uma aplicação web interativa concebida para crianças de 6 anos (entrada no 1.º ciclo do Ensino Básico em Portugal) aprenderem a reconhecer, ouvir, discriminar e associar as letras e combinações de vogais:
- **Vogais simples:** **I**, **U**, **A**, **E**
- **Combinações:** **UI** e **IU**

O jogo foi desenhado especificamente para telemóveis e tablets no navegador web (Safari no iOS e Chrome no Android), garantindo fluidez tátil, acessibilidade, segurança e reforço positivo constante.

---

## 2. Princípios Pedagógicos & Contexto pt-PT
- **Português de Portugal (pt-PT):**
  - Todas as palavras, fonemas e exemplos refletem o vocabulário usado em Portugal:
    - **Letra I:** *Ilha*, *Igreja*, *Iogurte*, *Iguana*.
    - **Letra U:** *Urso*, *Uvas*, *Unha*, *Unicórnio*.
    - **Combinação UI:** *Ui!*, *Uivo*, *Cuidado*, *Ruivo*.
    - **Combinação IU:** *Viu*, *Riu*, *Partiu*, *Subiu*.
    - **Letra A:** *Avião*, *Abelha*, *Árvore*, *Ananás*.
    - **Letra E:** *Égua*, *Eco*, *Estrela*, *Elefante*.
  - A voz principal utiliza gravações neurais europeias (`pt-PT-RaquelNeural`), com fallback dinâmico para a voz `pt-PT` da Web Speech API.
- **Psicologia para Crianças de 6 Anos:**
  - **Reforço Positivo:** Não existem ecrãs de "Game Over", pontuações negativas ou penalizações sonoras estridentes.
  - Se a criança tocar na opção incorreta:
    - O botão abana suavemente (`wiggle`).
    - Ouve-se um som gentil de mola (*boing*).
    - O Dino incentiva vocalmente: *"Quase lá! Essa é [X]! Procura [Y]!"*.
  - A criança pode tentar até acertar e celebrar com estrelas e confetes.

---

## 3. Mascote do Jogo: O Dino 🦕
- **Identidade:** Um dinossauro bebé amigável, desenhado em SVG vetorial.
- **Estados Visuais:**
  - `idle`: Respiração suave, olhos brilhantes e cauda a abanar.
  - `talk`: Boca animada a abrir/fechar sincronizada em tempo real com a reprodução de áudio/fala.
  - `cheer`: Saltos de alegria, braços levantados e olhos em arco feliz (`^ ^`).
  - `interação direta`: Ao tocar no Dino a qualquer momento, ele emite um som simpático e fala com a criança.

---

## 4. Estrutura das 20 Etapas Sequenciais (Caminho da Floresta 🐾)
A progressão é sequencial para manter a atenção e guiar o processo cognitivo através de 20 etapas:

1. **Etapa 1 — A Letra I (Explorador):** Apresentação da letra, som `/i/` e cartões interativos com soletração fonológica (*Ilha*, *Igreja*, *Iogurte*, *Iguana*).
2. **Etapa 2 — Bolhas do I:** Rebentar 5 bolhas contendo a letra **I**. Distratores pedagógicos limitados a letras simples.
3. **Etapa 3 — Detetive do I:** Encontrar a letra **I** no meio das palavras (*Peixe*, *Livro*, *Rainha*, *Biscoito*).
4. **Etapa 4 — A Letra U (Explorador):** Apresentação da letra, som `/u/` e cartões (*Urso*, *Uvas*, *Unha*, *Unicórnio*).
5. **Etapa 5 — Bolhas do U:** Rebentar 5 bolhas com a letra **U**.
6. **Etapa 6 — Detetive do U:** Encontrar a letra **U** no meio das palavras (*Lua*, *Nuvem*, *Coruja*, *Tartaruga*).
7. **Etapa 7 — A Combinação UI (Explorador):** Junção de U + I = UI (*Ui!*, *Uivo*, *Cuidado*, *Ruivo*).
8. **Etapa 8 — Bolhas do UI:** Rebentar 5 bolhas com a combinação **UI**. Distratores incluem **IU** e letras simples.
9. **Etapa 9 — Detetive do UI:** Encontrar a combinação **UI** no meio das palavras.
10. **Etapa 10 — A Combinação IU (Explorador):** Junção de I + U = IU (*Viu*, *Riu*, *Partiu*, *Subiu*).
11. **Etapa 11 — Bolhas do IU:** Rebentar 5 bolhas com a combinação **IU**.
12. **Etapa 12 — Detetive do IU:** Encontrar a combinação **IU** no meio das palavras.
13. **Etapa 13 — A Letra A (Explorador):** Apresentação da letra, som `/a/` e cartões (*Avião*, *Abelha*, *Árvore*, *Ananás*).
14. **Etapa 14 — Bolhas do A:** Rebentar 5 bolhas com a letra **A**.
15. **Etapa 15 — Detetive do A:** Encontrar a letra **A** no meio das palavras (*Gato*, *Barco*, *Casa*, *Banana*).
16. **Etapa 16 — A Letra E (Explorador):** Apresentação da letra, som `/e/` e cartões (*Égua*, *Eco*, *Estrela*, *Elefante*).
17. **Etapa 17 — Bolhas do E:** Rebentar 5 bolhas com a letra **E**.
18. **Etapa 18 — Detetive do E:** Encontrar a letra **E** no meio das palavras (*Vela*, *Coelho*, *Dente*, *Estrela*).
19. **Etapa 19 — O Grande Desafio:** Quiz com 7 perguntas equilibradas cobrindo todas as letras e combinações, com opções de resposta baralhadas (Fisher-Yates).
20. **Etapa 20 — Super Festa do Dino 🏆:** Troféu dourado, 19 estrelas conquistadas e chuva de confetes.

---

## 5. Especificações Técnicas (Tech Stack)
- **Frontend Framework:** React 18 + TypeScript + Vite 5.
- **Estilos:** Tailwind CSS com extensões (`border-3`, `scale-102`, `spacing-22/26`) e suporte a `prefers-reduced-motion`.
- **Ícones:** Lucide React (`lucide-react`).
- **Efeitos Visuais:** `canvas-confetti`.
- **Motor de Áudio (`src/utils/soundEngine.ts`):**
  - **Sintetizador Web Audio API:** Gera sons procedurais em tempo real (pop de bolhas, estrelas, arpeggio de sucesso, boing suave e fanfarra final).
  - **Gravações pt-PT:** Carrega ficheiros MP3 de `public/audio/` respeitando o caminho base do Vite (`import.meta.env.BASE_URL`).
  - **Sincronização com Mascote:** `onSpeakingChange` notifica a mascote para ativar o estado `talk` durante a reprodução.
- **Persistência de Dados (`src/hooks/useProgress.ts`):**
  - Guarda sob a chave `dino_progress_v1` o progresso (`unlockedStep`), etapas concluídas (`completedSteps`) e estado do som (`soundEnabled`).
  - Inclui validação rigorosa (`sanitizeProgress`) contra dados corrompidos ou `NaN`, e migração automática de chaves legadas.
- **Proteção Parental (`src/components/ParentGateModal.tsx`):**
  - Previne reinicialização acidental do jogo através de um desafio de cálculo para adultos.
- **Testes Automatizados:** Vitest (`npm test`) com testes para tokenização, baralhamento equilibrado de perguntas, persistência e integridade do modelo de dados (`gameData.ts`).

---

## 6. Pipeline de Áudio (pt-PT)
Para gerar ou atualizar os ficheiros de voz:
```bash
pip install edge-tts
python scripts/generate_audio.py
```
O script lê os termos de `gameData.ts`, evita regravar ficheiros existentes em `public/audio/`, e exporta ficheiros MP3 com a voz `pt-PT-RaquelNeural`.

---

## 7. Como Adicionar Novas Letras (O, Consoantes, etc.)
1. Adicionar a nova chave ao tipo `LetterKey` em `src/types/game.ts`.
2. Adicionar os dados da letra em `GAME_DATA.letters` em `src/data/gameData.ts`:
   - `char`, `soundText`, `spokenIntro`, `words`, `middleWords`.
3. Adicionar as novas etapas sequenciais em `GAME_DATA.steps`.
4. Executar `python scripts/generate_audio.py` para gerar os novos ficheiros MP3.
5. Executar `npm test` para validar a integridade dos dados e regras do jogo.
