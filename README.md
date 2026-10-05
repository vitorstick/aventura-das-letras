# 🦕 Aventura das Letras - O Jogo do Dino

Jogo educativo e interativo concebido para crianças de 6 anos aprenderem as letras do alfabeto em **Português de Portugal (pt-PT)**, com foco inicial nas vogais **I** e **U**.

O jogo corre diretamente no navegador web e é 100% otimizado para jogar em telemóveis e tablets com comandos táteis intuitivos.

---

## ✨ Funcionalidades Principais

- 🦕 **Mascote Dino Interativa:** Um dinossauro bebé amigável que fala em português, comemora as vitórias e incentiva a criança em todos os passos.
- 🇵🇹 **Português de Portugal:** Pronúncia autêntica (voz pt-PT) e vocabulário familiar em Portugal (*Ilha*, *Igreja*, *Iogurte*, *Iguana*, *Urso*, *Uvas*, *Unha*, *Unicórnio*).
- 🐾 **Mapa Sequencial de 8 Etapas:**
  1. **Descobrir o I:** Sons, formas e cartões táteis interativos.
  2. **Bolhas do I:** Minigame de rebentar bolhas de sabão no telemóvel.
  3. **Desenhar o I:** Traçado com o dedo, estrelas e rasto brilhante.
  4. **Descobrir o U:** Exploração de sons e objetos com o U.
  5. **Bolhas do U:** Minigame de agilidade tátil com a letra U.
  6. **Desenhar o U:** Traçado curvo guiado com checkpoints.
  7. **Desafio I vs U:** Jogo de associação imagem-letra.
  8. **Festa dos Campeões:** Troféu dourado, estrelas e chuva de confetes.
- 📱 **Otimizado para Telemóvel:** Botões grandes táteis, sem zoom involuntário, suporte de instalação no ecrã de início (PWA).
- 🔊 **Efeitos Sonoros Sintetizados:** Sons agradáveis em tempo real via Web Audio API (sem downloads pesados de áudio).
- ⭐ **Reforço Positivo:** A criança nunca "perde" nem é penalizada; o Dino incentiva a tentar de novo até acertar.

---

## 🛠️ Tecnologias Utilizadas

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide React** (Ícones táteis)
- **Canvas Confetti** (Efeitos visuais)
- **Web Audio API & Web Speech API** (Sons e Voz pt-PT)

---

## 🚀 Como Executar Localmente

### 1. Instalar as dependências:
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

O terminal indicará o endereço local (por exemplo: `http://localhost:5173/`).

### 3. Jogar no Telemóvel:
Ao executar `npm run dev`, o Vite disponibiliza um endereço de rede local (exemplo: `http://192.168.x.x:5173/`).
Basta aceder a esse endereço no browser do telemóvel (ligado ao mesmo Wi-Fi) para jogar com toque direto no ecrã!

### 4. Compilar para Produção:
```bash
npm run build
```
Os ficheiros estáticos prontos para publicação serão gerados na pasta `dist/`.

---

## 📖 Documentação Detalhada
Para ver todas as decisões pedagógicas, regras dos minigames e como adicionar mais letras, consulta o ficheiro [instructions.md](instructions.md).
