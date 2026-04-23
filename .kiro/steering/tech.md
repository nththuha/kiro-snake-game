# Tech Stack & Build

## Core Stack
- React 19 with TypeScript 6
- Vite 8 (dev server + bundler)
- Tailwind CSS 4 (via `@tailwindcss/vite` plugin, no separate config file)
- Vitest 4 + jsdom + React Testing Library for tests
- fast-check for property-based testing
- ESLint 9 (flat config) with react-hooks and react-refresh plugins

## Key Libraries
- `@radix-ui/react-dialog` — accessible dialog primitives (game over modal)
- `i18next` + `react-i18next` — internationalization
- `lucide-react` — icon components
- `class-variance-authority` + `clsx` + `tailwind-merge` — utility class composition (via `cn()` helper in `src/lib/utils.ts`)

## Path Alias
- `@/*` maps to `./src/*` (configured in tsconfig and vite/vitest configs)

## Common Commands
| Command | Description |
|---------|-------------|
| `yarn dev` | Start Vite dev server |
| `yarn build` | TypeScript check + Vite production build |
| `yarn test` | Run tests once (`vitest --run`) |
| `yarn test:watch` | Run tests in watch mode |
| `yarn lint` | ESLint check |

## TypeScript Config
- Target: ES2023, bundler module resolution
- Strict-ish: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` enabled
- `verbatimModuleSyntax` enabled — use `import type` for type-only imports

## Testing Setup
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Setup file: `src/test-setup.ts` (loads `@testing-library/jest-dom/vitest` matchers)
- Environment: jsdom with globals enabled
