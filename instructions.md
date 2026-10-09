# Instruções de Desenvolvimento e Arquitetura - Aventura das Letras 🦕

## 1. Visão Geral do Projeto
A **Aventura das Letras** é uma aplicação web interativa concebida para crianças de 6 anos (entrada no 1.º ciclo do Ensino Básico em Portugal) aprenderem a reconhecer, traçar e associar as letras do alfabeto, incluindo as vogais **I**, **U**, **A** e **E**.

O jogo foi desenhado especificamente para ser jogado em telemóveis e tablets no navegador web (Safari no iOS e Chrome no Android), garantindo uma experiência fluida, sem atrasos táteis e com reforço positivo constante.

---

## 2. Princípios Pedagógicos & Contexto pt-PT
- **Português de Portugal (pt-PT):**
  - Todas as palavras, fonemas e exemplos refletem o vocabulário usado em Portugal:
    - **Letra I:** *Ilha*, *Igreja*, *Iogurte*, *Iguana*.
    - **Letra U:** *Urso*, *Uvas*, *Unha*, *Unicórnio*.
    - **Letra A:** *Avião*, *Abelha*, *Árvore*, *Ananás*.
    - **Letra E:** *Elefante*, *Estrela*, *Escada*, *Espelho*.
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
A progressão é sequencial para manter a atenção e guiar o processo cognitivo através de 18 etapas:

1. **Etapa 1 — Descobrir a Letra I:** Apresentação da letra, som `/i/` e objetos (*Ilha*, *Igreja*, *Iogurte*, *Iguana*).
2. **Etapa 2 — Bolhas da Letra I:** Rebentar 5 bolhas contendo a letra **I**.
3. **Etapa 3 — Detetive do I:** Apontar/tocar na(s) letra(s) **I** no meio das palavras (*Peixe*, *Livro*, *Rainha*, *Biscoito*).
4. **Etapa 4 — Desenhar a Letra I:** Caligrafia cursiva escolar com pauta e pingo no i.
5. **Etapa 5 — Descobrir a Letra U:** Apresentação da letra, som `/u/` e objetos (*Urso*, *Uvas*, *Unha*, *Unicórnio*).
6. **Etapa 6 — Bolhas da Letra U:** Rebentar 5 bolhas com a letra **U**.
7. **Etapa 7 — Detetive do U:** Apontar/tocar na(s) letra(s) **U** no meio das palavras (*Lua*, *Nuvem*, *Coruja*, *Tartaruga*).
8. **Etapa 8 — Desenhar a Letra U:** Traçado cursivo em duas ondas de mão dada.
9. **Etapa 9 — Descobrir a Letra A:** Apresentação da letra, som `/a/` e objetos (*Avião*, *Abelha*, *Árvore*, *Ananás*).
10. **Etapa 10 — Bolhas da Letra A:** Rebentar 5 bolhas com a letra **A**.
11. **Etapa 11 — Detetive do A:** Apontar/tocar na(s) letra(s) **A** no meio das palavras (*Gato*, *Barco*, *Casa*, *Banana*).
12. **Etapa 12 — Desenhar a Letra A:** Caligrafia cursiva escolar da redondinha e perninha do **a**.
13. **Etapa 13 — Descobrir a Letra E:** Apresentação da letra, som `/e/` e objetos (*Elefante*, *Estrela*, *Escada*, *Espelho*).
14. **Etapa 14 — Bolhas da Letra E:** Rebentar 5 bolhas com a letra **E**.
15. **Etapa 15 — Detetive do E:** Apontar/tocar na(s) letra(s) **E** no meio das palavras (*Vela*, *Coelho*, *Dente*, *Estrela*).
16. **Etapa 16 — Desenhar a Letra E:** Caligrafia cursiva em laço de montanha russa do **e**.
17. **Etapa 17 — O Grande Desafio (I, U, A, E):** Jogo de associação imagem-letra com grelha 2x2 colorida.
18. **Etapa 18 — Grande Festa do Dino 🏆:** Troféu dourado, 18 estrelas e chuva de confetes.

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
