import React from 'react';
import type { Position, Direction } from '@/types';
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
): { type: CellType; index: number } {
  const cell: Position = { row, col };
  if (snake.length > 0 && positionsEqual(snake[0], cell)) return { type: 'snake-head', index: 0 };
  const idx = snake.findIndex((segment) => positionsEqual(segment, cell));
  if (idx !== -1) return { type: 'snake', index: idx };
  if (positionsEqual(cell, food)) return { type: 'food', index: -1 };
  return { type: 'empty', index: -1 };
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
        <div className="absolute rounded-full"
          style={{
            width: '28%', height: '28%', top: '14%', right: '14%',
            background: 'radial-gradient(circle, #fff 40%, rgba(255,255,255,0.6))',
            boxShadow: '0 0 4px rgba(255,255,255,0.5)',
          }}
        >
          <div className="absolute rounded-full bg-[#0f172a]"
            style={{ width: '45%', height: '45%', top: '28%', right: '15%' }}
          />
        </div>
        <div className="absolute rounded-full"
          style={{
            width: '28%', height: '28%', bottom: '14%', right: '14%',
            background: 'radial-gradient(circle, #fff 40%, rgba(255,255,255,0.6))',
            boxShadow: '0 0 4px rgba(255,255,255,0.5)',
          }}
        >
          <div className="absolute rounded-full bg-[#0f172a]"
            style={{ width: '45%', height: '45%', top: '28%', right: '15%' }}
          />
        </div>
      </div>
    </div>
  );
}

function getSnakeColor(index: number, total: number): string {
  const t = total <= 1 ? 0 : index / (total - 1);
  // Gradient from bright neon green to cyan
  const r = Math.round(34 + t * 0);
  const g = Math.round(197 - t * (197 - 211));
  const b = Math.round(94 + t * (238 - 94));
  return `rgb(${r}, ${g}, ${b})`;
}

function GameBoardInner({ snake, food, boardSize, direction }: GameBoardProps) {
  const cells: React.ReactNode[] = [];
  const snakeLen = snake.length;

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const { type, index } = getCellType(row, col, snake, food);

      let style: React.CSSProperties = {};
      let className = 'aspect-square relative ';

      if (type === 'snake-head') {
        const color = getSnakeColor(0, snakeLen);
        style = {
          background: color,
          borderRadius: '30%',
          boxShadow: `0 0 8px ${color}80, 0 0 16px ${color}30`,
        };
      } else if (type === 'snake') {
        const color = getSnakeColor(index, snakeLen);
        const opacity = 1 - (index / snakeLen) * 0.25;
        style = {
          background: color,
          borderRadius: '25%',
          opacity,
          boxShadow: `0 0 6px ${color}40`,
        };
      } else if (type === 'food') {
        className += 'animate-pulse-food ';
        style = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };
      } else {
        style = {
          background: 'rgba(30, 41, 59, 0.3)',
          borderRadius: '15%',
          border: '1px solid rgba(148, 163, 184, 0.04)',
        };
      }

      cells.push(
        <div key={`${row}-${col}`} className={className} style={style}>
          {type === 'snake-head' && <SnakeEyes direction={direction} />}
          {type === 'food' && (
            <div
              className="rounded-full"
              style={{
                width: '65%',
                height: '65%',
                background: 'radial-gradient(circle at 35% 35%, #fb7185, #ec4899, #be185d)',
                boxShadow: '0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(236, 72, 153, 0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div
      className="grid w-full gap-[1px] p-1"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        background: 'rgba(15, 23, 42, 0.9)',
      }}
    >
      {cells}
    </div>
  );
}

export const GameBoard = React.memo(GameBoardInner);
