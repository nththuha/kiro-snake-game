# Requirements Document

## Introduction

A modern Snake Game built with React, TypeScript, and Vite, using Yarn as the package manager. The game features a 20x20 grid where a snake moves automatically, eats food to grow and score points, and ends when the snake collides with a wall or itself. The UI uses shadcn/ui components with a dark mode design, centered layout, and smooth animations. Game logic is extracted into a custom hook (`useSnakeGame`) to maintain clean separation of concerns.

## Glossary

- **Game_Board**: A 20x20 grid of cells that represents the playing field where the Snake moves and Food appears.
- **Snake**: A sequence of contiguous cells on the Game_Board that moves in a cardinal direction, grows when consuming Food, and triggers game over on collision.
- **Food**: A single cell on the Game_Board, visually distinct (red with pulse animation), that the Snake consumes to grow and increase the score.
- **Direction**: One of four cardinal directions (UP, DOWN, LEFT, RIGHT) that determines the Snake movement vector.
- **Score_Display**: A UI element positioned above the Game_Board that shows the current score value.
- **Game_Over_Dialog**: A modal overlay displayed when the game ends, showing the final score and a restart option.
- **Restart_Button**: A UI control that resets the game state to initial conditions and begins a new game.
- **Game_Card**: A shadcn/ui Card component with rounded corners, shadow, and padding that wraps the entire game UI.
- **Tick_Interval**: The time in milliseconds between automatic Snake movement steps, starting at 150ms and decreasing as the score increases, with a minimum of 120ms.
- **useSnakeGame_Hook**: A custom React hook that encapsulates all game state and logic, returning state values and control functions to the UI layer.
- **Cell**: A single square unit within the Game_Board grid.

## Requirements

### Requirement 1: Project Setup and Build Configuration

**User Story:** As a developer, I want the project scaffolded with Vite, React, TypeScript, and Yarn, so that I can run the game immediately after installation.

#### Acceptance Criteria

1. THE Project SHALL use Vite as the build tool with the React + TypeScript template.
2. THE Project SHALL use Yarn as the package manager with a valid `package.json` and `yarn.lock`.
3. WHEN a developer runs `yarn install` followed by `yarn dev`, THE Project SHALL start a local development server and render the Snake Game without errors.
4. THE Project SHALL organize source code into the following directories: `components`, `hooks`, `types`, and `utils`.

### Requirement 2: Game Board Rendering

**User Story:** As a player, I want to see a clearly defined game board, so that I can understand the playing field.

#### Acceptance Criteria

1. THE Game_Board SHALL render as a 20x20 grid of Cell elements.
2. THE Game_Board SHALL display subtle borders between each Cell to visually distinguish grid positions.
3. THE Game_Board SHALL be centered horizontally and vertically within the viewport using a full-page layout.
4. THE Game_Card SHALL wrap the Game_Board, Score_Display, and Restart_Button with rounded corners, a shadow, and padding.

### Requirement 3: Snake Rendering and Movement

**User Story:** As a player, I want the snake to move automatically and respond to my arrow key inputs, so that I can play the game.

#### Acceptance Criteria

1. THE Snake SHALL render with a gradient green or bright green color that visually distinguishes it from empty Cell elements.
2. THE Snake SHALL move automatically in the current Direction at the Tick_Interval rate.
3. WHEN the player presses an arrow key (UP, DOWN, LEFT, or RIGHT), THE Snake SHALL change its Direction to match the pressed key on the next tick.
4. WHEN the player presses an arrow key opposite to the current Direction (e.g., LEFT while moving RIGHT), THE Snake SHALL ignore the input and continue in the current Direction.
5. THE Snake SHALL initialize with a length of 3 cells at a predefined starting position on the Game_Board.

### Requirement 4: Food Spawning

**User Story:** As a player, I want food to appear randomly on the board, so that I have a target to pursue.

#### Acceptance Criteria

1. THE Food SHALL render as a red Cell with a pulse or scale animation to visually distinguish it from other Cell elements.
2. WHEN the game starts, THE Game_Board SHALL display exactly one Food item at a random position that does not overlap with any Snake Cell.
3. WHEN the Snake consumes Food, THE Game_Board SHALL spawn a new Food item at a random position that does not overlap with any Snake Cell.
4. FOR ALL Food spawn events, THE Food position SHALL be a Cell that is not occupied by any part of the Snake.

### Requirement 5: Snake Growth and Scoring

**User Story:** As a player, I want the snake to grow and my score to increase when I eat food, so that I feel a sense of progression.

#### Acceptance Criteria

1. WHEN the Snake head moves onto a Cell occupied by Food, THE Snake SHALL increase its length by one Cell.
2. WHEN the Snake consumes Food, THE Score_Display SHALL increment the displayed score by one point.
3. THE Score_Display SHALL show the current score value at the top of the Game_Card above the Game_Board.
4. THE Score_Display SHALL initialize at zero when a new game begins.

### Requirement 6: Speed Progression

**User Story:** As a player, I want the game to get faster as my score increases, so that the difficulty scales with my progress.

#### Acceptance Criteria

1. THE Tick_Interval SHALL start at 150 milliseconds at the beginning of a new game.
2. WHEN the score increases, THE Tick_Interval SHALL decrease to increase the Snake movement speed.
3. THE Tick_Interval SHALL NOT decrease below 120 milliseconds regardless of the score value.

### Requirement 7: Game Over Detection

**User Story:** As a player, I want the game to end when the snake hits a wall or itself, so that there is a clear lose condition.

#### Acceptance Criteria

1. WHEN the Snake head moves to a position outside the Game_Board boundaries (row < 0, row >= 20, col < 0, col >= 20), THE Game_Over_Dialog SHALL be displayed.
2. WHEN the Snake head moves to a position occupied by another Snake Cell, THE Game_Over_Dialog SHALL be displayed.
3. WHEN game over occurs, THE Snake SHALL stop moving and the game loop SHALL cease.
4. THE Game_Over_Dialog SHALL display the final score value.
5. THE Game_Over_Dialog SHALL contain a Restart_Button.

### Requirement 8: Game Restart

**User Story:** As a player, I want to restart the game after a game over, so that I can play again without refreshing the page.

#### Acceptance Criteria

1. WHEN the player activates the Restart_Button, THE useSnakeGame_Hook SHALL reset all game state to initial conditions (Snake position, Direction, score, Tick_Interval, Food position).
2. WHEN the game restarts, THE Snake SHALL begin moving automatically from the initial starting position.
3. THE Restart_Button SHALL be accessible from both the Game_Over_Dialog and the main Game_Card UI.

### Requirement 9: Dark Mode UI Design

**User Story:** As a player, I want a modern dark-themed interface, so that the game is visually appealing and comfortable to play.

#### Acceptance Criteria

1. THE Game_Card SHALL use a dark color scheme with a dark background and light text.
2. THE Game_Board SHALL use dark-toned Cell backgrounds with subtle lighter borders.
3. THE Game_Over_Dialog SHALL follow the same dark color scheme as the Game_Card.
4. THE UI SHALL use shadcn/ui components for the Game_Card, Game_Over_Dialog, and Restart_Button.

### Requirement 10: Animations and Visual Polish

**User Story:** As a player, I want smooth animations and visual feedback, so that the game feels polished and responsive.

#### Acceptance Criteria

1. THE Food SHALL display a continuous pulse or scale animation to draw the player's attention.
2. WHEN game over occurs, THE Game_Over_Dialog SHALL appear with a subtle entrance animation.
3. THE Snake cells SHALL render with smooth color transitions.

### Requirement 11: Architecture and Code Quality

**User Story:** As a developer, I want clean separation between UI and logic with type safety, so that the codebase is maintainable and extensible.

#### Acceptance Criteria

1. THE useSnakeGame_Hook SHALL encapsulate all game state (Snake position, Food position, Direction, score, game-over status, Tick_Interval) and expose state values and control functions to consuming components.
2. THE UI components SHALL be functional React components that receive game state from the useSnakeGame_Hook.
3. THE Project SHALL define TypeScript types for all game entities (Position, Direction, GameState) in a dedicated `types` directory.
4. THE Project SHALL extract utility functions (random food generation, collision detection) into a dedicated `utils` directory.
5. THE UI components SHALL avoid unnecessary re-renders by using appropriate React memoization techniques.

### Requirement 12: Keyboard Input Handling

**User Story:** As a player, I want responsive keyboard controls, so that the snake reacts to my inputs without delay.

#### Acceptance Criteria

1. WHEN the player presses an arrow key, THE useSnakeGame_Hook SHALL register the new Direction before the next tick processes.
2. THE keyboard event listener SHALL be active only while the game is running (not during game over state).
3. WHEN multiple arrow keys are pressed between ticks, THE useSnakeGame_Hook SHALL use only the most recent valid Direction input.

### Requirement 13: Responsive Layout

**User Story:** As a player, I want the game to display correctly on different screen sizes, so that I can play on various devices.

#### Acceptance Criteria

1. THE Game_Card SHALL scale appropriately to fit within the viewport on screens of varying widths.
2. THE Game_Board cell size SHALL adapt to maintain a square aspect ratio while fitting within the Game_Card.

### Requirement 14: Sound Effects (Optional)

**User Story:** As a player, I want audio feedback when eating food, so that the game feels more engaging.

#### Acceptance Criteria

1. WHEN the Snake consumes Food, THE Game SHALL play a short eating sound effect.
2. IF the audio playback fails, THEN THE Game SHALL continue operating without interruption.
