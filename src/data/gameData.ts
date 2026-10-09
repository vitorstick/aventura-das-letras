// Vocabulário e Configuração Educativa em Português de Portugal (pt-PT)
import { GameDataSet } from '../types/game';

export const GAME_DATA: GameDataSet = {
  letters: {
    I: {
      char: 'I',
      soundText: 'Iii',
      spokenIntro: 'Olá amiguinho! Esta é a letra I! Ouve como faz: Iiiii!',
      nameAudioKey: 'letter_name_i',
      soundAudioKey: 'letter_sound_i',
      introAudioKey: 'letter_intro_i',
      color: '#0288D1',
      words: [
        { id: 'ilha', word: 'Ilha', emoji: '🏝️', audioText: 'I de Ilha! Uma ilha no meio do mar!', audioWordKey: 'word_only_ilha', audioPhraseKey: 'word_phrase_ilha', spelling: ['I', 'L', 'H', 'A'], syllables: ['I', 'lha'] },
        { id: 'igreja', word: 'Igreja', emoji: '⛪', audioText: 'I de Igreja! A torre da igreja!', audioWordKey: 'word_only_igreja', audioPhraseKey: 'word_phrase_igreja', spelling: ['I', 'G', 'R', 'E', 'J', 'A'], syllables: ['I', 'gre', 'ja'] },
        { id: 'iman', word: 'Íman', emoji: '🧲', audioText: 'I de Íman! Um íman forte que puxa o metal!', audioWordKey: 'word_only_iman', audioPhraseKey: 'word_phrase_iman', spelling: ['Í', 'M', 'A', 'N'], syllables: ['Í', 'man'] },
        { id: 'iguana', word: 'Iguana', emoji: '🦎', audioText: 'I de Iguana! A simpática iguana verde!', audioWordKey: 'word_only_iguana', audioPhraseKey: 'word_phrase_iguana', spelling: ['I', 'G', 'U', 'A', 'N', 'A'], syllables: ['I', 'gua', 'na'] }
      ],
      // Palavras para encontrar a letra I no meio da palavra
      middleWords: [
        { word: 'PEIXE', display: 'Peixe', emoji: '🐟', prompt: 'Onde está a letra I na palavra Peixe?', audioWordKey: 'word_only_peixe' },
        { word: 'LIVRO', display: 'Livro', emoji: '📖', prompt: 'Onde está a letra I na palavra Livro?', audioWordKey: 'word_only_livro' },
        { word: 'RAINHA', display: 'Rainha', emoji: '👑', prompt: 'Onde está a letra I na palavra Rainha?', audioWordKey: 'word_only_rainha' },
        { word: 'BISCOITO', display: 'Biscoito', emoji: '🍪', prompt: 'A palavra Biscoito tem duas letras I! Consegues encontrar as duas?', audioWordKey: 'word_only_biscoito' }
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
      nameAudioKey: 'letter_name_u',
      soundAudioKey: 'letter_sound_u',
      introAudioKey: 'letter_intro_u',
      color: '#E91E63',
      words: [
        { id: 'urso', word: 'Urso', emoji: '🐻', audioText: 'U de Urso! Um urso fofinho!', audioWordKey: 'word_only_urso', audioPhraseKey: 'word_phrase_urso', spelling: ['U', 'R', 'S', 'O'], syllables: ['Ur', 'so'] },
        { id: 'uvas', word: 'Uvas', emoji: '🍇', audioText: 'U de Uvas! Uvas docinhas e roxas!', audioWordKey: 'word_only_uvas', audioPhraseKey: 'word_phrase_uvas', spelling: ['U', 'V', 'A', 'S'], syllables: ['U', 'vas'] },
        { id: 'unha', word: 'Unha', emoji: '💅', audioText: 'U de Unha! A unha do nosso dedo!', audioWordKey: 'word_only_unha', audioPhraseKey: 'word_phrase_unha', spelling: ['U', 'N', 'H', 'A'], syllables: ['U', 'nha'] },
        { id: 'unicornio', word: 'Unicórnio', emoji: '🦄', audioText: 'U de Unicórnio! Um unicórnio mágico!', audioWordKey: 'word_only_unicornio', audioPhraseKey: 'word_phrase_unicornio', spelling: ['U', 'N', 'I', 'C', 'Ó', 'R', 'N', 'I', 'O'], syllables: ['U', 'ni', 'cór', 'nio'] }
      ],
      // Palavras para encontrar a letra U no meio da palavra
      middleWords: [
        { word: 'LUA', display: 'Lua', emoji: '🌙', prompt: 'Onde está a letra U na palavra Lua?', audioWordKey: 'word_only_lua' },
        { word: 'NUVEM', display: 'Nuvem', emoji: '☁️', prompt: 'Onde está a letra U na palavra Nuvem?', audioWordKey: 'word_only_nuvem' },
        { word: 'CORUJA', display: 'Coruja', emoji: '🦉', prompt: 'Onde está a letra U na palavra Coruja?', audioWordKey: 'word_only_coruja' },
        { word: 'LUVA', display: 'Luva', emoji: '🧤', prompt: 'Onde está a letra U na palavra Luva?', audioWordKey: 'word_only_luva' }
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
      nameAudioKey: 'letter_name_ui',
      soundAudioKey: 'letter_sound_ui',
      introAudioKey: 'letter_intro_ui',
      color: '#00897B',
      words: [
        { id: 'ui', word: 'Ui!', emoji: '😱', audioText: 'Ui! Que susto apanhou o Dino!', audioWordKey: 'word_only_ui', audioPhraseKey: 'word_phrase_ui', spelling: ['U', 'I'], syllables: ['Ui'] },
        { id: 'uivo', word: 'Uivo', emoji: '🐺', audioText: 'UI de Uivo! O lobo a uivar à lua no bosque!', audioWordKey: 'word_only_uivo', audioPhraseKey: 'word_phrase_uivo', spelling: ['U', 'I', 'V', 'O'], syllables: ['Ui', 'vo'] },
        { id: 'cuidado', word: 'Cuidado', emoji: '⚠️', audioText: 'UI em Cuidado! Olha com atenção para não tropeçar!', audioWordKey: 'word_only_cuidado', audioPhraseKey: 'word_phrase_cuidado', spelling: ['C', 'U', 'I', 'D', 'A', 'D', 'O'], syllables: ['Cui', 'da', 'do'] },
        { id: 'fui', word: 'Fui', emoji: '🚶', audioText: 'UI de Fui! Fui dar um passeio com o Dino pelo parque!', audioWordKey: 'word_only_fui', audioPhraseKey: 'word_phrase_fui', spelling: ['F', 'U', 'I'], syllables: ['Fui'] }
      ],
      // Palavras para encontrar a combinação UI
      middleWords: [
        { word: 'UI', display: 'Ui!', emoji: '😱', prompt: 'Onde está a combinação UI na palavra Ui?', audioWordKey: 'word_only_ui' },
        { word: 'UIVO', display: 'Uivo', emoji: '🐺', prompt: 'Onde está o UI na palavra Uivo?', audioWordKey: 'word_only_uivo' },
        { word: 'CUIDADO', display: 'Cuidado', emoji: '⚠️', prompt: 'Onde está o UI na palavra Cuidado?', audioWordKey: 'word_only_cuidado' },
        { word: 'FUI', display: 'Fui', emoji: '🚶', prompt: 'Consegues encontrar o UI na palavra Fui?', audioWordKey: 'word_only_fui' }
      ]
    },
    IU: {
      char: 'IU',
      soundText: 'Iuuu',
      spokenIntro: 'Que maravilha! Agora juntamos o I e o U para fazer IU! Ouve como faz: Iuuuuu!',
      nameAudioKey: 'letter_name_iu',
      soundAudioKey: 'letter_sound_iu',
      introAudioKey: 'letter_intro_iu',
      color: '#D81B60',
      words: [
        { id: 'viu', word: 'Viu', emoji: '👀', audioText: 'IU de Viu! O Dino viu um ninho de passarinhos!', audioWordKey: 'word_only_viu', audioPhraseKey: 'word_phrase_viu', spelling: ['V', 'I', 'U'], syllables: ['Viu'] },
        { id: 'riu', word: 'Riu', emoji: '😄', audioText: 'IU de Riu! O Dino riu muito com uma cócega divertida!', audioWordKey: 'word_only_riu', audioPhraseKey: 'word_phrase_riu', spelling: ['R', 'I', 'U'], syllables: ['Riu'] },
        { id: 'subiu', word: 'Subiu', emoji: '🐒', audioText: 'IU em Subiu! O macaco subiu à árvore bem depressa!', audioWordKey: 'word_only_subiu', audioPhraseKey: 'word_phrase_subiu', spelling: ['S', 'U', 'B', 'I', 'U'], syllables: ['Su', 'biu'] },
        { id: 'fugiu', word: 'Fugiu', emoji: '🐇', audioText: 'IU em Fugiu! O coelhinho fugiu a saltitar pela relva!', audioWordKey: 'word_only_fugiu', audioPhraseKey: 'word_phrase_fugiu', spelling: ['F', 'U', 'G', 'I', 'U'], syllables: ['Fu', 'giu'] }
      ],
      // Palavras para encontrar a combinação IU
      middleWords: [
        { word: 'VIU', display: 'Viu', emoji: '👀', prompt: 'Onde está o IU na palavra Viu?', audioWordKey: 'word_only_viu' },
        { word: 'RIU', display: 'Riu', emoji: '😄', prompt: 'Onde está o IU na palavra Riu?', audioWordKey: 'word_only_riu' },
        { word: 'SUBIU', display: 'Subiu', emoji: '🐒', prompt: 'Consegues encontrar o IU na palavra Subiu?', audioWordKey: 'word_only_subiu' },
        { word: 'FUGIU', display: 'Fugiu', emoji: '🐇', prompt: 'Onde está o IU na palavra Fugiu?', audioWordKey: 'word_only_fugiu' }
      ]
    },
    A: {
      char: 'A',
      soundText: 'Aaa',
      spokenIntro: 'Viva! Vamos aprender a letra A! Ouve como faz: Aaaaa!',
      nameAudioKey: 'letter_name_a',
      soundAudioKey: 'letter_sound_a',
      introAudioKey: 'letter_intro_a',
      color: '#FF6D00',
      words: [
        { id: 'arvore', word: 'Árvore', emoji: '🌳', audioText: 'Á de Árvore! Uma árvore grande com folhas verdes!', audioWordKey: 'word_only_arvore', audioPhraseKey: 'word_phrase_arvore', spelling: ['Á', 'R', 'V', 'O', 'R', 'E'], syllables: ['Ár', 'vo', 're'] },
        { id: 'agua', word: 'Água', emoji: '💧', audioText: 'Á de Água! Uma gota de água fresquinha!', audioWordKey: 'word_only_agua', audioPhraseKey: 'word_phrase_agua', spelling: ['Á', 'G', 'U', 'A'], syllables: ['Á', 'gua'] },
        { id: 'asa', word: 'Asa', emoji: '🪽', audioText: 'Á de Asa! A asa rápida do passarinho!', audioWordKey: 'word_only_asa', audioPhraseKey: 'word_phrase_asa', spelling: ['A', 'S', 'A'], syllables: ['A', 'sa'] },
        { id: 'aviao', word: 'Avião', emoji: '✈️', audioText: 'Á de Avião! O avião a voar alto nas nuvens!', audioWordKey: 'word_only_aviao', audioPhraseKey: 'word_phrase_aviao', spelling: ['A', 'V', 'I', 'Ã', 'O'], syllables: ['A', 'vi', 'ão'] }
      ],
      // Palavras para encontrar a letra A no meio da palavra
      middleWords: [
        { word: 'GATO', display: 'Gato', emoji: '🐱', prompt: 'Onde está a letra A na palavra Gato?', audioWordKey: 'word_only_gato' },
        { word: 'BARCO', display: 'Barco', emoji: '⛵', prompt: 'Onde está a letra A na palavra Barco?', audioWordKey: 'word_only_barco' },
        { word: 'CASA', display: 'Casa', emoji: '🏠', prompt: 'A palavra Casa tem duas letras A! Encontra as duas letras A!', audioWordKey: 'word_only_casa' },
        { word: 'BANANA', display: 'Banana', emoji: '🍌', prompt: 'A palavra Banana tem três letras A! Toca em todas as letras A!', audioWordKey: 'word_only_banana' }
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
      nameAudioKey: 'letter_name_e',
      soundAudioKey: 'letter_sound_e',
      introAudioKey: 'letter_intro_e',
      color: '#7C4DFF',
      words: [
        { id: 'egua', word: 'Égua', emoji: '🐴', audioText: 'É de Égua! Uma égua bonita a correr no prado!', audioWordKey: 'word_only_egua', audioPhraseKey: 'word_phrase_egua', spelling: ['É', 'G', 'U', 'A'], syllables: ['É', 'gua'] },
        { id: 'eco', word: 'Eco', emoji: '📣', audioText: 'É de Eco! Ouve o som a repetir... é o eco!', audioWordKey: 'word_only_eco', audioPhraseKey: 'word_phrase_eco', spelling: ['E', 'C', 'O'], syllables: ['E', 'co'] },
        { id: 'estrela', word: 'Estrela', emoji: '⭐', audioText: 'É de Estrela! Uma estrela brilhante no céu!', audioWordKey: 'word_only_estrela', audioPhraseKey: 'word_phrase_estrela', spelling: ['E', 'S', 'T', 'R', 'E', 'L', 'A'], syllables: ['Es', 'tre', 'la'] },
        { id: 'elefante', word: 'Elefante', emoji: '🐘', audioText: 'É de Elefante! Um grande elefante com orelhas compridas!', audioWordKey: 'word_only_elefante', audioPhraseKey: 'word_phrase_elefante', spelling: ['E', 'L', 'E', 'F', 'A', 'N', 'T', 'E'], syllables: ['E', 'le', 'fan', 'te'] }
      ],
      // Palavras para encontrar a letra E no meio da palavra
      middleWords: [
        { word: 'VELA', display: 'Vela', emoji: '🕯️', prompt: 'Onde está a letra E na palavra Vela?', audioWordKey: 'word_only_vela' },
        { word: 'COELHO', display: 'Coelho', emoji: '🐇', prompt: 'Onde está a letra E na palavra Coelho?', audioWordKey: 'word_only_coelho' },
        { word: 'DENTE', display: 'Dente', emoji: '🦷', prompt: 'A palavra Dente tem duas letras E! Consegues tocar nas duas letras E?', audioWordKey: 'word_only_dente' },
        { word: 'ESTRELA', display: 'Estrela', emoji: '⭐', prompt: 'Toca em todas as letras E na palavra Estrela!', audioWordKey: 'word_only_estrela' }
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
    { word: 'Ui!', emoji: '😱', letter: 'UI', prompt: 'Ui, que susto! Que combinação é esta? ui, iu, U ou I?', options: ['UI', 'IU', 'U', 'I'] },
    { word: 'Uivo', emoji: '🐺', letter: 'UI', prompt: 'Uivo do lobo... começa por que combinação? ui, iu, U ou I?', options: ['UI', 'IU', 'U', 'I'] },
    { word: 'Viu', emoji: '👀', letter: 'IU', prompt: 'Ele viu! A palavra Viu termina com que combinação? iu, ui, I ou U?', options: ['IU', 'UI', 'I', 'U'] },
    { word: 'Riu', emoji: '😄', letter: 'IU', prompt: 'Ele riu! A palavra Riu termina com que combinação? iu, ui, I ou U?', options: ['IU', 'UI', 'I', 'U'] },
    { word: 'Árvore', emoji: '🌳', letter: 'A', prompt: 'Árvore... começa com que letra? Á, É, I ou U?', options: ['A', 'E', 'I', 'U'] },
    { word: 'Égua', emoji: '🐴', letter: 'E', prompt: 'Égua... começa com que letra? Á, É, I ou U?', options: ['E', 'A', 'I', 'U'] },
    { word: 'Ilha', emoji: '🏝️', letter: 'I', prompt: 'Ilha... começa com que letra? Á, É, I ou U?', options: ['I', 'U', 'A', 'E'] },
    { word: 'Uvas', emoji: '🍇', letter: 'U', prompt: 'Uvas... começa com que letra? Á, É, I ou U?', options: ['U', 'I', 'A', 'E'] },
    { word: 'Água', emoji: '💧', letter: 'A', prompt: 'Água... começa com que letra? Á, É, I ou U?', options: ['A', 'E', 'I', 'U'] },
    { word: 'Eco', emoji: '📣', letter: 'E', prompt: 'Eco... começa com que letra? Á, É, I ou U?', options: ['E', 'A', 'I', 'U'] },
    { word: 'Urso', emoji: '🐻', letter: 'U', prompt: 'Urso... começa com que letra? Á, É, I ou U?', options: ['U', 'I', 'A', 'E'] },
    { word: 'Íman', emoji: '🧲', letter: 'I', prompt: 'Íman... começa com que letra? Á, É, I ou U?', options: ['I', 'U', 'A', 'E'] },
    { word: 'Asa', emoji: '🪽', letter: 'A', prompt: 'Asa... começa com que letra? Á, É, I ou U?', options: ['A', 'E', 'I', 'U'] },
    { word: 'Estrela', emoji: '⭐', letter: 'E', prompt: 'Estrela... começa com que letra? Á, É, I ou U?', options: ['E', 'A', 'I', 'U'] }
  ],

  // 20 Etapas Sequenciais da Aventura do Dino
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

    // --- CICLO DA LETRA U ---
    {
      id: 4,
      type: 'explorer',
      letter: 'U',
      title: 'A Letra U',
      subtitle: 'Toca nos objetos e ouve o som!',
      icon: '🐻',
      dinoSpeech: 'Boa! Agora vamos descobrir a letra U! Que palavras começam por U?'
    },
    {
      id: 5,
      type: 'bubble',
      letter: 'U',
      title: 'Bolhas do U',
      subtitle: 'Rebenta 5 bolhas com a letra U!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Cuidado com as outras letras! Só queremos rebentar a letra U!'
    },
    {
      id: 6,
      type: 'wordHunt',
      letter: 'U',
      title: 'Detetive do U',
      subtitle: 'Encontra a letra U no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'Olhos bem abertos! Encontra a letra U no meio das palavras!'
    },

    // --- CICLO DA COMBINAÇÃO UI ---
    {
      id: 7,
      type: 'explorer',
      letter: 'UI',
      title: 'A Combinação UI',
      subtitle: 'Junta o U e o I para fazer UI! Ouve o som!',
      icon: '😱',
      dinoSpeech: 'Vamos juntar as letras U e I! U mais I faz... UI!'
    },
    {
      id: 8,
      type: 'bubble',
      letter: 'UI',
      title: 'Bolhas do UI',
      subtitle: 'Rebenta 5 bolhas com a combinação UI!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Apanha todas as bolhas que tenham a combinação UI!'
    },
    {
      id: 9,
      type: 'wordHunt',
      letter: 'UI',
      title: 'Detetive do UI',
      subtitle: 'Encontra a combinação UI nas palavras!',
      icon: '🔍',
      dinoSpeech: 'Olhos de lince! Descobre onde está o UI nas palavras!'
    },

    // --- CICLO DA COMBINAÇÃO IU ---
    {
      id: 10,
      type: 'explorer',
      letter: 'IU',
      title: 'A Combinação IU',
      subtitle: 'Junta o I e o U para fazer IU! Ouve o som!',
      icon: '👀',
      dinoSpeech: 'Agora juntamos o I e o U! I mais U faz... IU!'
    },
    {
      id: 11,
      type: 'bubble',
      letter: 'IU',
      title: 'Bolhas do IU',
      subtitle: 'Rebenta 5 bolhas com a combinação IU!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Rebenta as bolhas com a combinação IU!'
    },
    {
      id: 12,
      type: 'wordHunt',
      letter: 'IU',
      title: 'Detetive do IU',
      subtitle: 'Encontra a combinação IU nas palavras!',
      icon: '🔍',
      dinoSpeech: 'Encontra a combinação IU escondida nas palavras!'
    },

    // --- CICLO DA LETRA A ---
    {
      id: 13,
      type: 'explorer',
      letter: 'A',
      title: 'A Letra A',
      subtitle: 'Descobre o avião, a abelha e mais!',
      icon: '✈️',
      dinoSpeech: 'Viva! Chegámos à letra A! Ouve como faz: Aaaaa! Toca nos desenhos!'
    },
    {
      id: 14,
      type: 'bubble',
      letter: 'A',
      title: 'Bolhas do A',
      subtitle: 'Rebenta 5 bolhas com a letra A!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Procura todas as bolhas com a letra A e rebenta-as com o dedinho!'
    },
    {
      id: 15,
      type: 'wordHunt',
      letter: 'A',
      title: 'Detetive do A',
      subtitle: 'Encontra a letra A no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'Atenção, detetive! Toca em todas as letras A no meio das palavras!'
    },

    // --- CICLO DA LETRA E ---
    {
      id: 16,
      type: 'explorer',
      letter: 'E',
      title: 'A Letra E',
      subtitle: 'Descobre o elefante, a estrela e mais!',
      icon: '🐘',
      dinoSpeech: 'Espetacular! Agora a letra E! O elefante e a estrela começam por E!'
    },
    {
      id: 17,
      type: 'bubble',
      letter: 'E',
      title: 'Bolhas do E',
      subtitle: 'Rebenta 5 bolhas com a letra E!',
      icon: '🫧',
      targetCount: 5,
      dinoSpeech: 'Rebenta as bolhas com a letra E! Cuidado com as outras!'
    },
    {
      id: 18,
      type: 'wordHunt',
      letter: 'E',
      title: 'Detetive do E',
      subtitle: 'Encontra a letra E no meio das palavras!',
      icon: '🔍',
      dinoSpeech: 'Consegues descobrir onde está a letra E no meio das palavras?'
    },

    // --- GRANDE DESAFIO & CELEBRAÇÃO ---
    {
      id: 19,
      type: 'quiz',
      letter: 'ALL',
      title: 'O Grande Desafio',
      subtitle: 'Qual é a letra ou combinação?',
      icon: '🎯',
      dinoSpeech: 'O grande teste das letras e combinações! Olha para o desenho e toca na opção certa!'
    },
    {
      id: 20,
      type: 'celebration',
      title: 'Super Festa do Dino!',
      subtitle: 'Aprendeste as letras I, U, A, E e as combinações UI e IU!',
      icon: '🏆',
      dinoSpeech: 'Parabéns, és um génio! Conquistaste as letras e as combinações UI e IU!'
    }
  ]
};
