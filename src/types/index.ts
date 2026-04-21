/** A position on the game board (row, col) */
export interface Position {
  row: number;
  col: number;
}

/** Cardinal movement directions */
export const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

/** Complete game state (used internally by the hook) */
export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  gameOver: boolean;
}

/** Direction vectors mapping each direction to its row/col offset */
export const DIRECTION_VECTORS: Record<Direction, Position> = {
  [Direction.UP]: { row: -1, col: 0 },
  [Direction.DOWN]: { row: 1, col: 0 },
  [Direction.LEFT]: { row: 0, col: -1 },
  [Direction.RIGHT]: { row: 0, col: 1 },
};

/** Maps each direction to its opposite */
export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
};

/** Board dimensions (20×20 grid) */
export const BOARD_SIZE = 20;

/** Snake starts with 3 cells */
export const INITIAL_SNAKE_LENGTH = 3;

/** Starting tick interval in milliseconds */
export const INITIAL_TICK_INTERVAL = 150;

/** Minimum tick interval in milliseconds */
export const MIN_TICK_INTERVAL = 120;

/** Snake initially moves to the right */
export const INITIAL_DIRECTION = Direction.RIGHT;
