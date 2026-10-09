// Vocabulário e Configuração Educativa em Português de Portugal (pt-PT)
import { GameDataSet } from '../types/game';

export const GAME_DATA: GameDataSet = {
  letters: {
    I: {
      char: 'I',
      soundText: 'Iii',
      spokenIntro: 'Olá amiguinho! Esta é a letra I! Ouve como faz: Iiiii!',
      color: '#0288D1',
      words: [
        { word: 'Ilha', emoji: '🏝️', audioText: 'I de Ilha! Uma ilha no meio do mar!' },
        { word: 'Igreja', emoji: '⛪', audioText: 'I de Igreja! A torre da igreja!' },
        { word: 'Iogurte', emoji: '🥛', audioText: 'I de Iogurte! Um iogurte bem fresquinho!' },
        { word: 'Iguana', emoji: '🦎', audioText: 'I de Iguana! A simpática iguana verde!' }
      ],
      // Palavras para encontrar a letra I no meio da palavra
      middleWords: [
        { word: 'PEIXE', display: 'Peixe', emoji: '🐟', prompt: 'Onde está a letra I na palavra Peixe?' },
        { word: 'LIVRO', display: 'Livro', emoji: '📖', prompt: 'Onde está a letra I na palavra Livro?' },
        { word: 'RAINHA', display: 'Rainha', emoji: '👑', prompt: 'Onde está a letra I na palavra Rainha?' },
        { word: 'BISCOITO', display: 'Biscoito', emoji: '🍪', prompt: 'A palavra Biscoito tem duas letras I! Consegues encontrar as duas?' }
      ],
      tracing: {
        lowercase: {
          char: 'i',
          label: 'Minúscula (i)',
          hint: 'Sobe com a perninha, desce e faz a curva... e não te esqueças do pingo no i!',
          points: [
            { x: 0.27, y: 0.70 },
            { x: 0.38, y: 0.54 },
            { x: 0.48, y: 0.38 },
            { x: 0.49, y: 0.54 },
            { x: 0.53, y: 0.69 },
            { x: 0.64, y: 0.67 },
            { x: 0.74, y: 0.61 }
          ],
          dot: { x: 0.48, y: 0.24 } // Pingo no i
        },
        uppercase: {
          char: 'I',
          label: 'Maiúscula (I)',
          hint: 'Faz a voltinha no cimo, desce a haste e curva na base!',
          points: [
            { x: 0.36, y: 0.28 },
            { x: 0.50, y: 0.21 },
            { x: 0.64, y: 0.25 },
            { x: 0.50, y: 0.34 },
            { x: 0.50, y: 0.52 },
            { x: 0.49, y: 0.70 },
            { x: 0.38, y: 0.71 },
            { x: 0.32, y: 0.65 }
          ]
        }
      }
    },
    U: {
      char: 'U',
      soundText: 'Uuu',
      spokenIntro: 'Que fixe! Esta é a letra U! Ouve como faz: Uuuuu!',
      color: '#E91E63',
      words: [
        { word: 'Urso', emoji: '🐻', audioText: 'U de Urso! Um urso fofinho!' },
        { word: 'Uvas', emoji: '🍇', audioText: 'U de Uvas! Uvas docinhas e roxas!' },
        { word: 'Unha', emoji: '💅', audioText: 'U de Unha! A unha do nosso dedo!' },
        { word: 'Unicórnio', emoji: '🦄', audioText: 'U de Unicórnio! Um unicórnio mágico!' }
      ],
      // Palavras para encontrar a letra U no meio da palavra
      middleWords: [
        { word: 'LUA', display: 'Lua', emoji: '🌙', prompt: 'Onde está a letra U na palavra Lua?' },
        { word: 'NUVEM', display: 'Nuvem', emoji: '☁️', prompt: 'Onde está a letra U na palavra Nuvem?' },
        { word: 'CORUJA', display: 'Coruja', emoji: '🦉', prompt: 'Onde está a letra U na palavra Coruja?' },
        { word: 'TARTARUGA', display: 'Tartaruga', emoji: '🐢', prompt: 'Onde está a letra U na palavra Tartaruga?' }
      ],
      tracing: {
        lowercase: {
          char: 'u',
          label: 'Minúscula (u)',
          hint: 'Faz duas ondinhas de mão dada: sobe, desce, faz baloiço, sobe e desce com a perninha!',
          points: [
            { x: 0.18, y: 0.70 },
            { x: 0.27, y: 0.54 },
            { x: 0.34, y: 0.38 },
            { x: 0.36, y: 0.56 },
            { x: 0.44, y: 0.70 },
            { x: 0.54, y: 0.55 },
            { x: 0.60, y: 0.38 },
            { x: 0.61, y: 0.56 },
            { x: 0.66, y: 0.69 },
            { x: 0.76, y: 0.66 },
            { x: 0.83, y: 0.61 }
          ]
        },
        uppercase: {
          char: 'U',
          label: 'Maiúscula (U)',
          hint: 'Começa com a voltinha cá em cima, desce, faz uma curva larga e sobe!',
          points: [
            { x: 0.26, y: 0.24 },
            { x: 0.35, y: 0.29 },
            { x: 0.35, y: 0.52 },
            { x: 0.43, y: 0.70 },
            { x: 0.58, y: 0.70 },
            { x: 0.67, y: 0.52 },
            { x: 0.67, y: 0.22 },
            { x: 0.66, y: 0.52 },
            { x: 0.70, y: 0.68 },
            { x: 0.80, y: 0.64 }
          ]
        }
      }
    },
    UI: {
      char: 'UI',
      soundText: 'Uiii',
      spokenIntro: 'Fantástico! Vamos juntar as letras U e I para fazer UI! Ouve como faz: Uiiiii!',
      color: '#00897B',
      words: [
        { word: 'Ui!', emoji: '😱', audioText: 'Ui! Que susto apanhou o Dino!' },
        { word: 'Uivo', emoji: '🐺', audioText: 'UI de Uivo! O lobo a uivar à lua no bosque!' },
        { word: 'Cuidado', emoji: '⚠️', audioText: 'UI em Cuidado! Olha com atenção para não tropeçar!' },
        { word: 'Fui', emoji: '🚶', audioText: 'UI de Fui! Fui dar um passeio com o Dino pelo parque!' }
      ],
      // Palavras para encontrar a combinação UI
      middleWords: [
        { word: 'UI', display: 'Ui!', emoji: '😱', prompt: 'Onde está a combinação UI na palavra Ui?' },
        { word: 'UIVO', display: 'Uivo', emoji: '🐺', prompt: 'Onde está o UI na palavra Uivo?' },
        { word: 'CUIDADO', display: 'Cuidado', emoji: '⚠️', prompt: 'Onde está o UI na palavra Cuidado?' },
        { word: 'FUI', display: 'Fui', emoji: '🚶', prompt: 'Consegues encontrar o UI na palavra Fui?' }
      ]
    },
    IU: {
      char: 'IU',
      soundText: 'Iuuu',
      spokenIntro: 'Que maravilha! Agora juntamos o I e o U para fazer IU! Ouve como faz: Iuuuuu!',
      color: '#D81B60',
      words: [
        { word: 'Viu', emoji: '👀', audioText: 'IU de Viu! O Dino viu um ninho de passarinhos!' },
        { word: 'Riu', emoji: '😄', audioText: 'IU de Riu! O Dino riu muito com uma cócega divertida!' },
        { word: 'Subiu', emoji: '🐒', audioText: 'IU em Subiu! O macaco subiu à árvore bem depressa!' },
        { word: 'Fugiu', emoji: '🐇', audioText: 'IU em Fugiu! O coelhinho fugiu a saltitar pela relva!' }
      ],
      // Palavras para encontrar a combinação IU
      middleWords: [
        { word: 'VIU', display: 'Viu', emoji: '👀', prompt: 'Onde está o IU na palavra Viu?' },
        { word: 'RIU', display: 'Riu', emoji: '😄', prompt: 'Onde está o IU na palavra Riu?' },
        { word: 'SUBIU', display: 'Subiu', emoji: '🐒', prompt: 'Consegues encontrar o IU na palavra Subiu?' },
        { word: 'FUGIU', display: 'Fugiu', emoji: '🐇', prompt: 'Onde está o IU na palavra Fugiu?' }
      ]
    },
    A: {
      char: 'A',
      soundText: 'Aaa',
      spokenIntro: 'Viva! Vamos aprender a letra A! Ouve como faz: Aaaaa!',
      color: '#FF6D00',
      words: [
        { word: 'Avião', emoji: '✈️', audioText: 'A de Avião! O avião a voar alto nas nuvens!' },
        { word: 'Abelha', emoji: '🐝', audioText: 'A de Abelha! A abelha a fazer mel docinho!' },
        { word: 'Árvore', emoji: '🌳', audioText: 'A de Árvore! Uma árvore grande com folhas verdes!' },
        { word: 'Ananás', emoji: '🍍', audioText: 'A de Ananás! Um ananás delicioso e fresquinho!' }
      ],
      // Palavras para encontrar a letra A no meio da palavra
      middleWords: [
        { word: 'GATO', display: 'Gato', emoji: '🐱', prompt: 'Onde está a letra A na palavra Gato?' },
        { word: 'BARCO', display: 'Barco', emoji: '⛵', prompt: 'Onde está a letra A na palavra Barco?' },
        { word: 'CASA', display: 'Casa', emoji: '🏠', prompt: 'A palavra Casa tem duas letras A! Encontra as duas letras A!' },
        { word: 'BANANA', display: 'Banana', emoji: '🍌', prompt: 'A palavra Banana tem três letras A! Toca em todas as letras A!' }
      ],
      tracing: {
        lowercase: {
          char: 'a',
          label: 'Minúscula (a)',
          hint: 'Sobe com a perninha, faz a volta redondinha, fecha e puxa a perninha para fora!',
          points: [
            { x: 0.24, y: 0.70 },
            { x: 0.35, y: 0.52 },
            { x: 0.44, y: 0.38 },
            { x: 0.32, y: 0.48 },
            { x: 0.26, y: 0.62 },
            { x: 0.38, y: 0.70 },
            { x: 0.48, y: 0.60 },
            { x: 0.48, y: 0.38 },
            { x: 0.49, y: 0.62 },
            { x: 0.54, y: 0.70 },
            { x: 0.68, y: 0.66 },
            { x: 0.78, y: 0.60 }
          ]
        },
        uppercase: {
          char: 'A',
          label: 'Maiúscula (A)',
          hint: 'Sobe a montanha, desce pelo outro lado e faz o laço no meio!',
          points: [
            { x: 0.26, y: 0.68 },
            { x: 0.36, y: 0.46 },
            { x: 0.48, y: 0.22 },
            { x: 0.60, y: 0.46 },
            { x: 0.70, y: 0.68 },
            { x: 0.64, y: 0.52 },
            { x: 0.50, y: 0.50 },
            { x: 0.38, y: 0.52 }
          ]
        }
      }
    },
    E: {
      char: 'E',
      soundText: 'Eee',
      spokenIntro: 'Espetacular! Esta é a letra E! Ouve como faz: Eeeee!',
      color: '#7C4DFF',
      words: [
        { word: 'Elefante', emoji: '🐘', audioText: 'E de Elefante! Um grande elefante com orelhas compridas!' },
        { word: 'Estrela', emoji: '⭐', audioText: 'E de Estrela! Uma estrela brilhante no céu!' },
        { word: 'Escada', emoji: '🪜', audioText: 'E de Escada! A escada para subir bem alto!' },
        { word: 'Espelho', emoji: '🪞', audioText: 'E de Espelho! O espelho para ver o nosso sorriso!' }
      ],
      // Palavras para encontrar a letra E no meio da palavra
      middleWords: [
        { word: 'VELA', display: 'Vela', emoji: '🕯️', prompt: 'Onde está a letra E na palavra Vela?' },
        { word: 'COELHO', display: 'Coelho', emoji: '🐇', prompt: 'Onde está a letra E na palavra Coelho?' },
        { word: 'DENTE', display: 'Dente', emoji: '🦷', prompt: 'A palavra Dente tem duas letras E! Consegues tocar nas duas letras E?' },
        { word: 'ESTRELA', display: 'Estrela', emoji: '⭐', prompt: 'Toca em todas as letras E na palavra Estrela!' }
      ],
      tracing: {
        lowercase: {
          char: 'e',
          label: 'Minúscula (e)',
          hint: 'Sobe com o dedinho, dá a volta em laço e faz a perninha de saída!',
          points: [
            { x: 0.24, y: 0.70 },
            { x: 0.38, y: 0.52 },
            { x: 0.50, y: 0.38 },
            { x: 0.44, y: 0.36 },
            { x: 0.34, y: 0.48 },
            { x: 0.38, y: 0.68 },
            { x: 0.52, y: 0.70 },
            { x: 0.68, y: 0.66 },
            { x: 0.78, y: 0.60 }
          ]
        },
        uppercase: {
          char: 'E',
          label: 'Maiúscula (E)',
          hint: 'Faz uma voltinha no cimo, um lacinho ao meio e uma voltinha maior em baixo!',
          points: [
            { x: 0.38, y: 0.26 },
            { x: 0.56, y: 0.22 },
            { x: 0.58, y: 0.36 },
            { x: 0.48, y: 0.44 },
            { x: 0.42, y: 0.44 },
            { x: 0.54, y: 0.50 },
            { x: 0.62, y: 0.62 },
            { x: 0.50, y: 0.70 },
            { x: 0.34, y: 0.66 }
          ]
        }
      }
    }
  },

  // Desafio com perguntas variadas cobrindo letras e combinações (I, U, UI, IU, A, E)
  quizItems: [
    { word: 'Ui!', emoji: '😱', letter: 'UI', prompt: 'Ui, que susto! Que combinação é esta? UI, IU, U ou I?', options: ['UI', 'IU', 'U', 'I'] },
    { word: 'Uivo', emoji: '🐺', letter: 'UI', prompt: 'Uivo do lobo... começa por que combinação? UI, IU, U ou I?', options: ['UI', 'IU', 'U', 'I'] },
    { word: 'Viu', emoji: '👀', letter: 'IU', prompt: 'Ele viu! A palavra Viu termina com que combinação? IU, UI, I ou U?', options: ['IU', 'UI', 'I', 'U'] },
    { word: 'Riu', emoji: '😄', letter: 'IU', prompt: 'Ele riu! A palavra Riu termina com que combinação? IU, UI, I ou U?', options: ['IU', 'UI', 'I', 'U'] },
    { word: 'Avião', emoji: '✈️', letter: 'A', prompt: 'Avião... começa com que letra? A, E, I ou U?', options: ['A', 'E', 'I', 'U'] },
    { word: 'Elefante', emoji: '🐘', letter: 'E', prompt: 'Elefante... começa com que letra? A, E, I ou U?', options: ['E', 'A', 'I', 'U'] },
    { word: 'Ilha', emoji: '🏝️', letter: 'I', prompt: 'Ilha... começa com que letra? A, E, I ou U?', options: ['I', 'U', 'A', 'E'] },
    { word: 'Uvas', emoji: '🍇', letter: 'U', prompt: 'Uvas... começa com que letra? A, E, I ou U?', options: ['U', 'I', 'A', 'E'] },
    { word: 'Abelha', emoji: '🐝', letter: 'A', prompt: 'Abelha... começa com que letra? A, E, I ou U?', options: ['A', 'E', 'I', 'U'] },
    { word: 'Estrela', emoji: '⭐', letter: 'E', prompt: 'Estrela... começa com que letra? A, E, I ou U?', options: ['E', 'A', 'I', 'U'] },
    { word: 'Urso', emoji: '🐻', letter: 'U', prompt: 'Urso... começa com que letra? A, E, I ou U?', options: ['U', 'I', 'A', 'E'] },
    { word: 'Iogurte', emoji: '🥛', letter: 'I', prompt: 'Iogurte... começa com que letra? A, E, I ou U?', options: ['I', 'U', 'A', 'E'] },
    { word: 'Árvore', emoji: '🌳', letter: 'A', prompt: 'Árvore... começa com que letra? A, E, I ou U?', options: ['A', 'E', 'I', 'U'] },
    { word: 'Escada', emoji: '🪜', letter: 'E', prompt: 'Escada... começa com que letra? A, E, I ou U?', options: ['E', 'A', 'I', 'U'] }
  ],

  // 24 Etapas Sequenciais da Aventura do Dino
  steps: [
    // --- CICLO DA LETRA I ---
    {
      id: 1,
      type: 'explorer',
      letter: 'I',
      title: 'A Letra I',
      subtitle: 'Toca nos objetos e ouve o som!',
      icon: '🏝️',
      dinoSpeech: 'Vamos conhecer a letra I! Toca nos cartões para ver o que começa por I!'
    },
    {
      id: 2,
      type: 'bubble',
      letter: 'I',
      title: 'Bolhas do I',
      subtitle: 'Rebenta 5 bolhas com a letra I!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Ajuda-me a rebentar 5 bolhas com a letra I! Toca nelas rápido!'
    },
    {
      id: 3,
      type: 'wordHunt',
      letter: 'I',
      title: 'Detetive do I',
      subtitle: 'Encontra a letra I no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'És um detetive! Procura a letra I escondida no meio das palavras!'
    },
    {
      id: 4,
      type: 'trace',
      letter: 'I',
      title: 'Desenhar o I',
      subtitle: 'Desenha com caligrafia cursiva e põe o pingo!',
      icon: '✨',
      dinoSpeech: 'Passa o teu dedo mágico pela linha para desenhar o I com estrelas!'
    },

    // --- CICLO DA LETRA U ---
    {
      id: 5,
      type: 'explorer',
      letter: 'U',
      title: 'A Letra U',
      subtitle: 'Toca nos objetos e ouve o som!',
      icon: '🐻',
      dinoSpeech: 'Boa! Agora vamos descobrir a letra U! Que palavras começam por U?'
    },
    {
      id: 6,
      type: 'bubble',
      letter: 'U',
      title: 'Bolhas do U',
      subtitle: 'Rebenta 5 bolhas com a letra U!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Cuidado com as outras letras! Só queremos rebentar a letra U!'
    },
    {
      id: 7,
      type: 'wordHunt',
      letter: 'U',
      title: 'Detetive do U',
      subtitle: 'Encontra a letra U no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'Olhos bem abertos! Encontra a letra U no meio das palavras!'
    },
    {
      id: 8,
      type: 'trace',
      letter: 'U',
      title: 'Desenhar o U',
      subtitle: 'Faz as duas ondas cursivas de mão dada!',
      icon: '✨',
      dinoSpeech: 'Desenha a letra U cursiva! Duas ondas de mão dada!'
    },

    // --- CICLO DA COMBINAÇÃO UI ---
    {
      id: 9,
      type: 'explorer',
      letter: 'UI',
      title: 'A Combinação UI',
      subtitle: 'Junta o U e o I para fazer UI! Ouve o som!',
      icon: '😱',
      dinoSpeech: 'Vamos juntar as letras U e I! U mais I faz... UI!'
    },
    {
      id: 10,
      type: 'bubble',
      letter: 'UI',
      title: 'Bolhas do UI',
      subtitle: 'Rebenta 5 bolhas com a combinação UI!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Apanha todas as bolhas que tenham a combinação UI!'
    },
    {
      id: 11,
      type: 'wordHunt',
      letter: 'UI',
      title: 'Detetive do UI',
      subtitle: 'Encontra a combinação UI nas palavras!',
      icon: '🔍',
      dinoSpeech: 'Olhos de lince! Descobre onde está o UI nas palavras!'
    },

    // --- CICLO DA COMBINAÇÃO IU ---
    {
      id: 12,
      type: 'explorer',
      letter: 'IU',
      title: 'A Combinação IU',
      subtitle: 'Junta o I e o U para fazer IU! Ouve o som!',
      icon: '👀',
      dinoSpeech: 'Agora juntamos o I e o U! I mais U faz... IU!'
    },
    {
      id: 13,
      type: 'bubble',
      letter: 'IU',
      title: 'Bolhas do IU',
      subtitle: 'Rebenta 5 bolhas com a combinação IU!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Rebenta as bolhas com a combinação IU!'
    },
    {
      id: 14,
      type: 'wordHunt',
      letter: 'IU',
      title: 'Detetive do IU',
      subtitle: 'Encontra a combinação IU nas palavras!',
      icon: '🔍',
      dinoSpeech: 'Encontra a combinação IU escondida nas palavras!'
    },

    // --- CICLO DA LETRA A ---
    {
      id: 15,
      type: 'explorer',
      letter: 'A',
      title: 'A Letra A',
      subtitle: 'Descobre o avião, a abelha e mais!',
      icon: '✈️',
      dinoSpeech: 'Viva! Chegámos à letra A! Ouve como faz: Aaaaa! Toca nos desenhos!'
    },
    {
      id: 16,
      type: 'bubble',
      letter: 'A',
      title: 'Bolhas do A',
      subtitle: 'Rebenta 5 bolhas com a letra A!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Procura todas as bolhas com a letra A e rebenta-as com o dedinho!'
    },
    {
      id: 17,
      type: 'wordHunt',
      letter: 'A',
      title: 'Detetive do A',
      subtitle: 'Encontra a letra A no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'Atenção, detetive! Toca em todas as letras A no meio das palavras!'
    },
    {
      id: 18,
      type: 'trace',
      letter: 'A',
      title: 'Desenhar o A',
      subtitle: 'Desenha a voltinha redonda e a perninha!',
      icon: '✨',
      dinoSpeech: 'Desenha a letra A cursiva! Faz a voltinha redonda e puxa a perninha!'
    },

    // --- CICLO DA LETRA E ---
    {
      id: 19,
      type: 'explorer',
      letter: 'E',
      title: 'A Letra E',
      subtitle: 'Descobre o elefante, a estrela e mais!',
      icon: '🐘',
      dinoSpeech: 'Espetacular! Agora a letra E! O elefante e a estrela começam por E!'
    },
    {
      id: 20,
      type: 'bubble',
      letter: 'E',
      title: 'Bolhas do E',
      subtitle: 'Rebenta 5 bolhas com a letra E!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Rebenta as bolhas com a letra E! Cuidado com as outras!'
    },
    {
      id: 21,
      type: 'wordHunt',
      letter: 'E',
      title: 'Detetive do E',
      subtitle: 'Encontra a letra E no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'Consegues descobrir onde está a letra E no meio das palavras?'
    },
    {
      id: 22,
      type: 'trace',
      letter: 'E',
      title: 'Desenhar o E',
      subtitle: 'Dá a volta em laço como uma montanha russa!',
      icon: '✨',
      dinoSpeech: 'Desenha a letra E cursiva! Faz o laço mágico com o dedinho!'
    },

    // --- GRANDE DESAFIO & CELEBRAÇÃO ---
    {
      id: 23,
      type: 'quiz',
      letter: 'ALL',
      title: 'O Grande Desafio',
      subtitle: 'Qual é a letra ou combinação?',
      icon: '🎯',
      dinoSpeech: 'O grande teste das letras e combinações! Olha para o desenho e toca na opção certa!'
    },
    {
      id: 24,
      type: 'celebration',
      title: 'Super Festa do Dino!',
      subtitle: 'Aprendeste as letras I, U, A, E e as combinações UI e IU!',
      icon: '🏆',
      dinoSpeech: 'Parabéns, és um génio! Conquistaste as letras e as combinações UI e IU!'
    }
  ]
};
