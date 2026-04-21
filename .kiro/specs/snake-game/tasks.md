# Implementation Plan: Snake Game

## Overview

Build a browser-based Snake Game using Vite + React + TypeScript with Yarn. Implementation follows an incremental approach: project scaffolding → types and utilities → game logic hook → UI components → polish and wiring. Each task builds on the previous, ensuring no orphaned code.

## Tasks

- [x] 1. Scaffold project and install dependencies
  - Initialize a Vite project with the React + TypeScript template using Yarn
  - Install shadcn/ui dependencies (including Tailwind CSS, `@radix-ui/react-dialog`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`)
  - Install `fast-check` and `vitest` as dev dependencies along with `@testing-library/react` and `@testing-library/jest-dom`
  - Configure Tailwind CSS with dark mode support
  - Set up shadcn/ui configuration and generate Card, Dialog, and Button components
  - Create directory structure: `src/components`, `src/hooks`, `src/types`, `src/utils`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Define TypeScript types and constants
  - [x] 2.1 Create core type definitions in `src/types/index.ts`
    - Define `Position` interface with `row` and `col` fields
    - Define `Direction` enum with UP, DOWN, LEFT, RIGHT values
    - Define `GameState` interface with snake, food, direction, score, gameOver fields
    - Export `DIRECTION_VECTORS`, `OPPOSITE_DIRECTIONS` maps
    - Export constants: `BOARD_SIZE` (20), `INITIAL_SNAKE_LENGTH` (3), `INITIAL_TICK_INTERVAL` (150), `MIN_TICK_INTERVAL` (120), `INITIAL_DIRECTION` (RIGHT)
    - _Requirements: 11.3_

- [x] 3. Implement utility functions
  - [x] 3.1 Create `src/utils/gameUtils.ts` with all game utility functions
    - Implement `getNextHead(head, direction)` — returns position offset by one step in the direction vector
    - Implement `isOutOfBounds(position, boardSize)` — checks if position is outside board boundaries
    - Implement `isSelfCollision(head, body)` — checks if head overlaps any body segment
    - Implement `positionsEqual(a, b)` — checks if two positions are equal
    - Implement `spawnFood(snake, boardSize)` — generates random food position not on the snake
    - Implement `isValidDirectionChange(current, next)` — rejects 180° reversals
    - Implement `calculateTickInterval(score)` — returns `Math.max(120, 150 - Math.floor(score / 5) * 5)`
    - _Requirements: 3.2, 3.4, 4.2, 4.3, 4.4, 6.1, 6.2, 6.3, 7.1, 7.2, 11.4_

  - [ ]* 3.2 Write property test: Movement produces correct offset (Property 1)
    - **Property 1: Movement produces correct offset**
    - Test that `getNextHead(position, direction)` returns a position offset by exactly one step in the direction vector
    - Use random `Position` (row/col in [-5, 25]) × random `Direction`
    - **Validates: Requirements 3.2**

  - [ ]* 3.3 Write property test: Opposite direction is always rejected (Property 2)
    - **Property 2: Opposite direction is always rejected**
    - Test that `isValidDirectionChange(current, opposite(current))` returns false, and non-opposite returns true
    - Use all 4 directions as current × all 4 as next
    - **Validates: Requirements 3.4**

  - [ ]* 3.4 Write property test: Food never spawns on the snake (Property 3)
    - **Property 3: Food never spawns on the snake**
    - Test that `spawnFood(snake, boardSize)` returns a position within bounds and not overlapping any snake cell
    - Use random snake arrays (1–399 positions on 20×20 board)
    - **Validates: Requirements 4.2, 4.3, 4.4**

  - [ ]* 3.5 Write property test: Tick interval is monotonically non-increasing and bounded (Property 5)
    - **Property 5: Tick interval is monotonically non-increasing and bounded**
    - Test that for scores `a > b`, `calculateTickInterval(a) <= calculateTickInterval(b)`, and result is always >= 120
    - Use random non-negative integers for score
    - **Validates: Requirements 6.2, 6.3**

  - [ ]* 3.6 Write property test: Out-of-bounds detection is correct (Property 6)
    - **Property 6: Out-of-bounds detection is correct**
    - Test that positions outside `[0, boardSize)` return true, positions inside return false
    - Use random positions (row/col in [-10, 30]) × board sizes
    - **Validates: Requirements 7.1**

  - [ ]* 3.7 Write property test: Self-collision detection is correct (Property 7)
    - **Property 7: Self-collision detection is correct**
    - Test that `isSelfCollision(head, body)` returns true iff head equals at least one body position
    - Use random snake bodies × random head positions
    - **Validates: Requirements 7.2**

- [x] 4. Checkpoint - Verify utilities and property tests
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement the useSnakeGame hook
  - [x] 5.1 Create `src/hooks/useSnakeGame.ts`
    - Initialize state: snake (3 cells starting position), food (random via `spawnFood`), score (0), gameOver (false), direction (RIGHT)
    - Use `useRef` for current direction and interval ID to avoid stale closures
    - Implement game loop with `setInterval` in a `useEffect`, calling movement/collision/food logic each tick
    - On each tick: compute next head, check wall collision (`isOutOfBounds`), check self collision (`isSelfCollision`), check food eaten (`positionsEqual`), grow or move snake, update score, adjust tick interval via `calculateTickInterval`
    - Register keyboard event listener in `useEffect` — map arrow keys to direction changes via `isValidDirectionChange`, ignore keys during game over
    - Only use the most recent valid direction input between ticks
    - Implement `restart` function with `useCallback` that resets all state to initial conditions
    - Clean up interval and keyboard listener on unmount and game over
    - Return `{ snake, food, score, gameOver, direction, restart }`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 7.1, 7.2, 7.3, 8.1, 8.2, 11.1, 11.5, 12.1, 12.2, 12.3_

  - [ ]* 5.2 Write property test: Food consumption grows snake and increments score (Property 4)
    - **Property 4: Food consumption grows snake and increments score**
    - Test that when the snake's next head position equals food, snake length increases by 1 and score increases by 1
    - Use random valid game states where head lands on food
    - **Validates: Requirements 5.1, 5.2**

- [x] 6. Implement UI components
  - [x] 6.1 Create `ScoreDisplay` component (`src/components/ScoreDisplay.tsx`)
    - Accept `score` prop and render the current score value
    - Style with light text on dark background
    - _Requirements: 5.3, 5.4, 9.1_

  - [x] 6.2 Create `GameBoard` component (`src/components/GameBoard.tsx`)
    - Accept `snake`, `food`, and `boardSize` props
    - Render a 20×20 CSS Grid of cells
    - Style snake cells with green/gradient green, food cell with red + pulse animation, empty cells with dark background and subtle borders
    - Wrap with `React.memo` to prevent unnecessary re-renders
    - _Requirements: 2.1, 2.2, 3.1, 4.1, 10.1, 10.3, 11.2, 11.5_

  - [x] 6.3 Create `GameOverDialog` component (`src/components/GameOverDialog.tsx`)
    - Use shadcn/ui `Dialog` component
    - Accept `isOpen`, `score`, and `onRestart` props
    - Display final score and a restart button
    - Apply entrance animation via Tailwind transitions
    - Dark theme styling
    - _Requirements: 7.4, 7.5, 8.3, 9.3, 10.2_

  - [x] 6.4 Create `GameCard` component (`src/components/GameCard.tsx`)
    - Use shadcn/ui `Card` component with dark styling, rounded corners, shadow, padding
    - Call `useSnakeGame` hook internally
    - Compose `ScoreDisplay`, `GameBoard`, restart button, and `GameOverDialog`
    - Include a restart button accessible from the main card UI
    - _Requirements: 2.3, 2.4, 8.3, 9.1, 9.4, 13.1, 13.2_

  - [x] 6.5 Update `App.tsx` to render `GameCard`
    - Set up full-page centered layout with dark background
    - Render `GameCard` as the root game component
    - _Requirements: 2.3, 9.1_

  - [ ]* 6.6 Write unit tests for UI components
    - Test GameBoard renders 400 cells for a 20×20 board
    - Test ScoreDisplay renders the score value
    - Test GameOverDialog shows final score and restart button when open
    - _Requirements: 2.1, 5.3, 7.4, 7.5_

- [x] 7. Checkpoint - Verify full game functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Add Tailwind animations and responsive styling
  - [-] 8.1 Add CSS animations and responsive layout
    - Define pulse/scale keyframe animation for food cell in Tailwind config or CSS
    - Add entrance animation for GameOverDialog
    - Ensure GameCard and GameBoard scale responsively to fit viewport
    - Ensure cells maintain square aspect ratio
    - _Requirements: 10.1, 10.2, 10.3, 13.1, 13.2_

- [ ] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Sound effects (Requirement 14) are optional and not included in the core task list
