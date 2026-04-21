import React from 'react';
import type { Position } from '@/types';
import type { Direction } from '@/types';
import { positionsEqual } from '@/utils/gameUtils';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  boardSize: number;
  direction: Direction;
}

type CellType = 'snake-head' | 'snake' | 'food' | 'empty';

function getCellType(
  row: number,
  col: number,
  snake: Position[],
  food: Position
): CellType {
  const cell: Position = { row, col };
  if (snake.length > 0 && positionsEqual(snake[0], cell)) return 'snake-head';
  if (snake.some((segment) => positionsEqual(segment, cell))) return 'snake';
  if (positionsEqual(cell, food)) return 'food';
  return 'empty';
}

const directionRotation: Record<string, string> = {
  RIGHT: 'rotate(0deg)',
  DOWN: 'rotate(90deg)',
  LEFT: 'rotate(180deg)',
  UP: 'rotate(270deg)',
};

function SnakeEyes({ direction }: { direction: Direction }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ transform: directionRotation[direction] }}
    >
      <div className="relative w-full h-full">
        {/* Top eye */}
        <div className="absolute rounded-full bg-white"
          style={{ width: '30%', height: '30%', top: '12%', right: '12%' }}
        >
          <div className="absolute rounded-full bg-black"
            style={{ width: '50%', height: '50%', top: '25%', right: '10%' }}
          />
        </div>
        {/* Bottom eye */}
        <div className="absolute rounded-full bg-white"
          style={{ width: '30%', height: '30%', bottom: '12%', right: '12%' }}
        >
          <div className="absolute rounded-full bg-black"
            style={{ width: '50%', height: '50%', top: '25%', right: '10%' }}
          />
        </div>
      </div>
    </div>
  );
}

const cellStyles: Record<CellType, string> = {
  'snake-head': 'bg-[#16a34a] rounded-sm relative',
  snake: 'bg-[#22c55e] rounded-sm',
  food: 'bg-[#ef4444] rounded-full animate-pulse-food',
  empty: 'bg-muted border border-border',
};

function GameBoardInner({ snake, food, boardSize, direction }: GameBoardProps) {
  const cells: React.ReactNode[] = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const type = getCellType(row, col, snake, food);
      cells.push(
        <div
          key={`${row}-${col}`}
          className={`aspect-square ${cellStyles[type]}`}
        >
          {type === 'snake-head' && <SnakeEyes direction={direction} />}
        </div>
      );
    }
  }

  return (
    <div
      className="grid w-full"
      style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
    >
      {cells}
    </div>
  );
}

export const GameBoard = React.memo(GameBoardInner);
