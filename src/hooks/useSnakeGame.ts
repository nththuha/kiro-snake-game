import { useState, useEffect, useRef, useCallback } from 'react';
import type { Position } from '@/types';
import {
  Direction,
  BOARD_SIZE,
  INITIAL_DIRECTION,
  INITIAL_SNAKE_LENGTH,
} from '@/types';
import {
  getNextHead,
  isOutOfBounds,
  isSelfCollision,
  positionsEqual,
  spawnFood,
  isValidDirectionChange,
  calculateTickInterval,
} from '@/utils/gameUtils';

const HIGH_SCORE_KEY = 'snake-game-high-score';

function loadHighScore(): number {
  try {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    return stored ? Math.max(0, Number(stored)) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // localStorage unavailable
  }
}

export interface UseSnakeGameReturn {
  snake: Position[];
  food: Position;
  score: number;
  highScore: number;
  gameOver: boolean;
  paused: boolean;
  started: boolean;
  direction: Direction;
  speed: number;
  setSpeed: (speed: number) => void;
  restart: () => void;
  togglePause: () => void;
}

function createInitialSnake(): Position[] {
  const snake: Position[] = [];
  const startRow = 10;
  const startCol = 9;
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ row: startRow, col: startCol - i });
  }
  return snake;
}

interface GameTickState {
  snake: Position[];
  food: Position;
  score: number;
  gameOver: boolean;
}

export function useSnakeGame(boardSize: number = BOARD_SIZE): UseSnakeGameReturn {
  const initialSnake = createInitialSnake();

  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(() => spawnFood(initialSnake, boardSize)!);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(loadHighScore);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(5);

  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef<GameTickState>({ snake: initialSnake, food: spawnFood(initialSnake, boardSize)!, score: 0, gameOver: false });

  // Keep stateRef in sync
  stateRef.current = { snake, food, score, gameOver };

  const restart = useCallback(() => {
    const newSnake = createInitialSnake();
    const newFood = spawnFood(newSnake, boardSize)!;
    setSnake(newSnake);
    setFood(newFood);
    setScore(0);
    setGameOver(false);
    setDirection(INITIAL_DIRECTION);
    setPaused(false);
    setStarted(false);
    directionRef.current = INITIAL_DIRECTION;
    stateRef.current = { snake: newSnake, food: newFood, score: 0, gameOver: false };
  }, [boardSize]);

  const togglePause = useCallback(() => {
    if (!gameOver) {
      setPaused((prev) => !prev);
    }
  }, [gameOver]);

  // Update high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }
  }, [gameOver, score, highScore]);

  // Game loop
  useEffect(() => {
    if (gameOver || paused || !started) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const tick = () => {
      const { snake: currentSnake, food: currentFood, score: currentScore } = stateRef.current;
      const currentDirection = directionRef.current;
      const head = currentSnake[0];
      const nextHead = getNextHead(head, currentDirection);

      // Wall collision
      if (isOutOfBounds(nextHead, boardSize)) {
        setGameOver(true);
        return;
      }

      // Self collision
      if (isSelfCollision(nextHead, currentSnake)) {
        setGameOver(true);
        return;
      }

      // Update displayed direction
      setDirection(currentDirection);

      // Check food eaten
      const ateFood = positionsEqual(nextHead, currentFood);

      let newSnake: Position[];
      if (ateFood) {
        newSnake = [nextHead, ...currentSnake];
        const newScore = currentScore + 1;
        const newFood = spawnFood(newSnake, boardSize) ?? currentFood;
        setSnake(newSnake);
        setFood(newFood);
        setScore(newScore);
        stateRef.current = { snake: newSnake, food: newFood, score: newScore, gameOver: false };
      } else {
        newSnake = [nextHead, ...currentSnake.slice(0, -1)];
        setSnake(newSnake);
        stateRef.current = { ...stateRef.current, snake: newSnake };
      }
    };

    const tickInterval = calculateTickInterval(score, speed);
    intervalRef.current = setInterval(tick, tickInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameOver, paused, started, score, speed, boardSize]);

  // Keyboard listener
  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
      }

      if (paused) return;

      const keyDirectionMap: Record<string, Direction> = {
        ArrowUp: Direction.UP,
        ArrowDown: Direction.DOWN,
        ArrowLeft: Direction.LEFT,
        ArrowRight: Direction.RIGHT,
      };

      const newDirection = keyDirectionMap[e.key];
      if (!newDirection) return;

      e.preventDefault();

      if (!started) {
        if (isValidDirectionChange(INITIAL_DIRECTION, newDirection)) {
          directionRef.current = newDirection;
        }
        setStarted(true);
        return;
      }

      if (isValidDirectionChange(directionRef.current, newDirection)) {
        directionRef.current = newDirection;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, paused, started, togglePause]);

  return { snake, food, score, highScore, gameOver, paused, started, direction, speed, setSpeed, restart, togglePause };
}
