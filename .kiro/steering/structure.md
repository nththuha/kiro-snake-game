# Project Structure

```
src/
├── main.tsx              # App entry point (initializes i18n, renders App)
├── App.tsx               # Root component (layout, background effects)
├── index.css             # Global styles, CSS variables, Tailwind imports, custom animations
├── test-setup.ts         # Vitest setup (jest-dom matchers)
│
├── components/           # React UI components
│   ├── GameCard.tsx       # Main game container — orchestrates all sub-components
│   ├── GameBoard.tsx      # Grid renderer (snake, food, empty cells)
│   ├── GameOverDialog.tsx # End-of-game modal
│   ├── ScoreDisplay.tsx   # Score + high score display
│   ├── SpeedSlider.tsx    # Speed control slider
│   ├── MobileControls.tsx # On-screen D-pad for touch devices
│   ├── HowToPlay.tsx      # Instructions panel
│   ├── LanguageSwitcher.tsx
│   ├── SoundToggle.tsx
│   ├── ThemeToggle.tsx
│   ├── ParticleBackground.tsx
│   └── ui/               # Reusable primitives (shadcn/ui style)
│       ├── button.tsx
│       ├── card.tsx
│       └── dialog.tsx
│
├── hooks/                # Custom React hooks
│   ├── useSnakeGame.ts    # Core game logic (state, game loop, input handling)
│   ├── useGameAudio.ts    # Web Audio API background music
│   ├── useSwipeControls.ts # Touch swipe gesture detection
│   └── useTheme.ts        # Theme management (currently dark-only)
│
├── types/
│   └── index.ts          # Shared types, constants, direction vectors, board config
│
├── utils/
│   └── gameUtils.ts      # Pure game logic functions (movement, collision, food spawning)
│
├── lib/
│   └── utils.ts          # `cn()` class name merge utility
│
└── i18n/
    ├── index.ts          # i18next initialization + language list
    └── locales/          # Translation JSON files (en, vi, de, zh, fr, ja)
```

## Architecture Patterns
- Game logic is split between pure utility functions (`utils/gameUtils.ts`) and the stateful hook (`hooks/useSnakeGame.ts`)
- `useSnakeGame` owns all game state and exposes it to `GameCard`, which distributes props to child components
- Components are function components using hooks; `GameBoard` is wrapped in `React.memo` for performance
- UI primitives in `components/ui/` follow shadcn/ui conventions using `class-variance-authority` for variants
- All user-facing strings go through `react-i18next` `t()` function; translations live in `i18n/locales/*.json`
- Types and game constants are centralized in `types/index.ts`
