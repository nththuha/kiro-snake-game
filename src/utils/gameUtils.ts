import type { Position } from '@/types';
import {
  Direction,
  DIRECTION_VECTORS,
  OPPOSITE_DIRECTIONS,
} from '@/types';

/** Calculate the next head position given current head and direction */
export function getNextHead(head: Position, direction: Direction): Position {
  const vector = DIRECTION_VECTORS[direction];
  return {
    row: head.row + vector.row,
    col: head.col + vector.col,
  };
}

/** Check if a position is outside the board boundaries [0, boardSize) */
export function isOutOfBounds(position: Position, boardSize: number): boolean {
  return (
    position.row < 0 ||
    position.row >= boardSize ||
    position.col < 0 ||
    position.col >= boardSize
  );
}

/** Check if a position collides with any segment in the snake body */
export function isSelfCollision(head: Position, body: Position[]): boolean {
  return body.some((segment) => positionsEqual(head, segment));
}

/** Check if two positions are equal (row and col match) */
export function positionsEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

/** Spawn food at a random position not occupied by the snake. Returns null if the board is full. */
export function spawnFood(
  snake: Position[],
  boardSize: number
): Position | null {
  const totalCells = boardSize * boardSize;

  if (snake.length >= totalCells) {
    return null;
  }

  const occupied = new Set(snake.map((p) => `${p.row},${p.col}`));
  const available: Position[] = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (!occupied.has(`${row},${col}`)) {
        available.push({ row, col });
      }
    }
  }

  return available[Math.floor(Math.random() * available.length)];
}

/** Check if a direction change is valid (not a 180° reversal) */
export function isValidDirectionChange(
  current: Direction,
  next: Direction
): boolean {
  return OPPOSITE_DIRECTIONS[current] !== next;
}

/** Calculate tick interval based on score and speed (1-10). Higher speed = faster. */
export function calculateTickInterval(score: number, speed: number = 5): number {
  // Base interval: speed 1 = 300ms, speed 5 = 150ms, speed 10 = 50ms
  const baseInterval = 350 - speed * 30;
  return Math.max(50, baseInterval - Math.floor(score / 5) * 5);
}
