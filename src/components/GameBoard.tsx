import React from 'react';
import type { Position } from '@/types';
import { positionsEqual } from '@/utils/gameUtils';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  boardSize: number;
}

function getCellType(
  row: number,
  col: number,
  snake: Position[],
  food: Position
): 'snake' | 'food' | 'empty' {
  const cell: Position = { row, col };
  if (snake.some((segment) => positionsEqual(segment, cell))) return 'snake';
  if (positionsEqual(cell, food)) return 'food';
  return 'empty';
}

const cellStyles: Record<'snake' | 'food' | 'empty', string> = {
  snake: 'bg-[#22c55e] rounded-sm transition-colors duration-200',
  food: 'bg-[#ef4444] rounded-full animate-pulse-food',
  empty: 'bg-[#1a1a2e] border border-[#2a2a4a] transition-colors duration-200',
};

function GameBoardInner({ snake, food, boardSize }: GameBoardProps) {
  const cells: React.ReactNode[] = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const type = getCellType(row, col, snake, food);
      cells.push(
        <div
          key={`${row}-${col}`}
          className={`aspect-square ${cellStyles[type]}`}
        />
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
