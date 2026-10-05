# Instruções de Desenvolvimento e Arquitetura - Aventura das Letras 🦕

## 1. Visão Geral do Projeto
A **Aventura das Letras** é uma aplicação web interativa concebida para crianças de 6 anos (entrada no 1.º ciclo do Ensino Básico em Portugal) aprenderem a reconhecer, traçar e associar as letras do alfabeto, focando-se inicialmente nas vogais **I** e **U**.

O jogo foi desenhado especificamente para ser jogado em telemóveis e tablets no navegador web (Safari no iOS e Chrome no Android), garantindo uma experiência fluida, sem atrasos táteis e com reforço positivo constante.

---

## 2. Princípios Pedagógicos & Contexto pt-PT
- **Português de Portugal (pt-PT):**
  - Todas as palavras, fonemas e exemplos refletem o vocabulário usado em Portugal:
    - **Letra I:** *Ilha*, *Igreja*, *Iogurte*, *Iguana*.
    - **Letra U:** *Urso*, *Uvas*, *Unha*, *Unicórnio*.
  - A voz do sistema prioriza a variante `pt-PT` da Web Speech API.
- **Psicologia para Crianças de 6 Anos:**
  - **Reforço Positivo:** Não existem ecrãs de "Game Over", penalizações ou sons estridentes de erro.
  - Se a criança tocar na opção errada:
    - O botão abana suavemente (`wiggle`).
    - Ouve-se um som gentil de mola (*boing*).
    - O Dino incentiva: *"Quase lá! Tenta outra vez, tu consegues!"*.
  - A criança pode tentar até acertar e celebrar com estrelas e confetes.

---

## 3. Mascote do Jogo: O Dino 🦕
- **Identidade:** Um dinossauro bebé amigável, desenhado em SVG vetorial para manter nitidez absoluta em ecrãs Retina e alta densidade.
- **Estados Visuais:**
  - `idle`: Respiração suave, olhos brilhantes e cauda a abanar.
  - `talk`: Boca animada a abrir/fechar sincronizada com o áudio.
  - `cheer`: Saltos de alegria, braços levantados e olhos em arco feliz (`^ ^`).
  - `interação direta`: Ao tocar no Dino a qualquer momento, ele emite um som simpático e fala com a criança.

---

## 4. Estrutura das Etapas Sequenciais (Caminho da Floresta 🐾)
A progressão é sequencial para manter a atenção e guiar o processo cognitivo:

1. **Etapa 1 — Descobrir a Letra I:**
   - Apresentação da letra gigante com o som fonético `/i/`.
   - Exploração de 4 cartões táteis com objetos familiares em Portugal (*Ilha*, *Igreja*, *Iogurte*, *Iguana*).
   - Ao tocar em pelo menos 2 objetos, desbloqueia o botão de avanço.
2. **Etapa 2 — Bolhas da Letra I:**
   - Minigame tátil onde bolhas sobem pelo ecrã.
   - Objetivo: Rebentar 5 bolhas contendo a letra **I**.
   - Letras distratoras (A, E, O) abanam suavemente se tocadas.
3. **Etapa 3 — Desenhar a Letra I (Caligrafia Cursiva Escolar):**
   - Pauta de caderno de caligrafia escolar portuguesa desenhada no fundo (linha base, linha média e teto).
   - Traçado cursivo minúsculo autêntico: perninha de entrada inclinada, descida da haste e perninha de saída para dar a mão à próxima letra.
   - Pôr o pingo no *i*: após o traço, o ponto superior acende com uma estrela animada para a criança tocar.
   - Seletor de Minúscula (*i*) e Maiúscula (*I*) cursiva.
4. **Etapa 4 — Descobrir a Letra U:**
   - Apresentação da letra gigante com o som fonético `/u/`.
   - Exploração dos objetos: *Urso*, *Uvas*, *Unha*, *Unicórnio*.
5. **Etapa 5 — Bolhas da Letra U:**
   - Minigame de apanhar 5 bolhas com a letra **U**.
6. **Etapa 6 — Desenhar a Letra U (Caligrafia Cursiva Escolar):**
   - Traçado cursivo com as duas ondas escolares de mão dada (subida, descida, baloiço, subida, descida e perninha de saída).
   - Pauta escolar e curvas de Bézier fluidas.
7. **Etapa 7 — O Grande Desafio (I vs U):**
   - Aparece uma imagem (ex.: *Uvas* 🍇 ou *Ilha* 🏝️).
   - A criança escolhe entre dois botões gigantes: **[ I ]** ou **[ U ]**.
   - Perguntas dinâmicas com feedback sonoro imediato.
8. **Etapa 8 — Grande Festa do Dino 🏆:**
   - Troféu dourado, exibição de todas as estrelas conquistadas, chuva de confetes e música de vitória.

---

## 5. Especificações Técnicas (Tech Stack)
- **Frontend Framework:** React 18 + Vite.
- **Estilos:** Tailwind CSS com cores vibrantes para crianças e animações táteis aceleradas por GPU.
- **Ícones:** Lucide React (`lucide-react`).
- **Efeitos de Partículas:** `canvas-confetti` para chuvas de confetes e estrelas.
- **Motor de Som (`src/utils/soundEngine.js`):**
  - **Sintetizador Web Audio API:** Gera sons em tempo real sem ficheiros externos (pop de bolhas, sininhos de estrelas, arpeggio de sucesso, boing suave e fanfarra final).
  - **Síntese de Voz:** `window.speechSynthesis` com seleção prioritária da voz `pt-PT` e velocidade adaptada (0.88x).
  - **Desbloqueio de Áudio:** Os browsers móveis exigem interação do utilizador para áudio; o botão "Começar a Brincar!" desbloqueia imediatamente o contexto.
- **Persistência Local:** `localStorage` guarda o progresso (`dino_unlocked_step`) e as estrelas (`dino_stars`).

---

## 6. Como Expandir para Outras Letras (A, E, O, etc.)
Para adicionar uma nova letra no futuro:
1. Abrir `src/data/gameData.js`.
2. Adicionar o objeto da letra sob `GAME_DATA.letters`:
   ```javascript
   A: {
     char: 'A',
     soundText: 'Aaa',
     spokenIntro: 'Esta é a letra A!',
     color: '#FF5722',
     words: [
       { word: 'Avião', emoji: '✈️', audioText: 'A de Avião!' },
       { word: 'Abelha', emoji: '🐝', audioText: 'A de Abelha!' }
     ],
     tracing: { points: [...], hint: '...' }
   }
   ```
3. Adicionar as etapas correspondentes à lista `GAME_DATA.steps`.
