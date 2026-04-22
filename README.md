# 🐍 Snake Game

A modern take on the classic Snake game, built with React, TypeScript, and Tailwind CSS. Features a sleek neon-themed UI with particle effects, smooth animations, and a polished gameplay experience.

## 🎮 Demo

👉 [Play it live](https://kiro-snake-game-nth.vercel.app/)

![Snake Game](src/assets/hero.png)

## ✨ Features

- **Classic Snake gameplay** on a 20×20 grid with wall and self-collision
- **Adjustable speed** — control the game pace with a speed slider (1–10)
- **High score tracking** — persisted in localStorage across sessions
- **Sound effects** — toggle background audio on/off
- **Pause / Resume** — press Space or use the on-screen button
- **Mobile support** — swipe gestures and on-screen directional controls
- **Multilingual** — supports 6 languages:
  - 🇬🇧 English
  - 🇻🇳 Tiếng Việt
  - 🇩🇪 Deutsch
  - 🇨🇳 中文
  - 🇫🇷 Français
  - 🇯🇵 日本語
- **Particle background** and ambient glow effects for a neon aesthetic
- **Game Over dialog** with final score and high score display

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — fast dev server and build tool
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [Radix UI](https://www.radix-ui.com/) — accessible dialog primitives
- [Lucide React](https://lucide.dev/) — icons
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) — internationalization
- [Vitest](https://vitest.dev/) — unit testing

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Yarn (or npm)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/snake-game.git
cd snake-game

# Install dependencies
yarn install

# Start the dev server
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
yarn build
```

Output goes to the `dist/` folder.

### Run Tests

```bash
yarn test
```

## 🎮 Controls

| Action        | Keyboard       | Mobile            |
| ------------- | -------------- | ----------------- |
| Move          | Arrow keys     | Swipe / D-pad     |
| Pause / Resume| Space          | Pause button      |
| Restart       | —              | Restart button     |

## 📁 Project Structure

```
src/
├── components/     # UI components (GameBoard, GameCard, ScoreDisplay, etc.)
├── hooks/          # Custom hooks (useSnakeGame, useGameAudio, useSwipeControls)
├── i18n/           # Internationalization config and locale files
├── types/          # TypeScript type definitions and game constants
├── utils/          # Game logic utilities
└── App.tsx         # Root component
```

## 📄 License

MIT
