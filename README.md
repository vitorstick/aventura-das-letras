# 🦕 Aventura das Letras - O Jogo do Dino

Jogo educativo e interativo concebido para crianças de 6 anos (1.º ciclo do Ensino Básico) aprenderem as letras e combinações de vogais em **Português de Portugal (pt-PT)**, incluindo **I**, **U**, as combinações **UI** e **IU**, e as letras **A** e **E**.

O jogo corre diretamente no navegador web e é 100% otimizado para telemóveis e tablets com comandos táteis intuitivos.

---

## ✨ Funcionalidades Principais

- 🦕 **Mascote Dino Interativa:** Um dinossauro bebé amigável com animação labial sincronizada com a voz (`talk`), que incentiva a criança, ensina e comemora as vitórias.
- 🇵🇹 **Português de Portugal (Voz pt-PT Raquel Neural):** Áudio gravado de alta qualidade com sotaque autêntico europeu e vocabulário de Portugal (*Ilha*, *Urso*, *Uivo*, *Viu*, *Avião*, *Elefante*, etc.), com fallback dinâmico para a Web Speech API.
- 🐾 **Caminho da Floresta Sequencial (20 Etapas):**
  - **Ciclo do I:** Explorador do I (sons e palavras), Bolhas do I (5 alvos), Detetive do I (encontrar no meio de palavras).
  - **Ciclo do U:** Explorador do U, Bolhas do U, Detetive do U.
  - **Ciclo da Combinação UI:** Explorador do UI, Bolhas do UI, Detetive do UI.
  - **Ciclo da Combinação IU:** Explorador do IU, Bolhas do IU, Detetive do IU.
  - **Ciclo do A:** Explorador do A, Bolhas do A, Detetive do A.
  - **Ciclo do E:** Explorador do E, Bolhas do E, Detetive do E.
  - **O Grande Desafio:** Quiz de associação imagem-letra/combinação com perguntas equilibradas e opções baralhadas.
  - **Super Festa do Dino:** Celebração final com troféu, confetes e balanço de estrelas.
- 🔒 **Proteção Parental:** Reinicialização do progresso protegida por um desafio matemático simples para pais ("Quanto é 7 + 5?"), impedindo perdas acidentais de progresso.
- ⭐ **Progresso Seguro e Versionado:** O progresso e as preferências de som são guardados no `localStorage` de forma validada (`dino_progress_v1`).
- ♿ **Acessibilidade e Usabilidade:** Todos os elementos interativos são botões semânticos acessíveis por teclado e leitor de ecrã, com suporte a redução de movimento (`prefers-reduced-motion`) e zoom permitido para utilizadores de baixa visão.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite 5**
- **Tailwind CSS 3** (com extensões táteis)
- **Vitest** (Testes unitários e de integridade dos dados)
- **Lucide React** (Ícones táteis)
- **Canvas Confetti** (Efeitos visuais comemorativos)
- **Web Audio API** + Biblioteca de 236 gravações neurais pt-PT

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

### 3. Executar a suite de testes:
```bash
npm test
```

### 4. Compilar para Produção:
```bash
npm run build
```

---

## 🎙️ Pipeline de Geração de Áudio (pt-PT Raquel Neural)

Os ficheiros de voz pt-PT são gerados via `edge-tts`:
```bash
pip install edge-tts
python scripts/generate_audio.py
```
O script lê os termos de `gameData.ts`, evita reprocessar ficheiros já existentes em `public/audio/`, e exporta gravações MP3 de alta fidelidade com a voz `pt-PT-RaquelNeural`.

---

## 📖 Documentação Detalhada
Para ver todas as decisões pedagógicas e arquitetura, consulta o ficheiro [instructions.md](instructions.md).
