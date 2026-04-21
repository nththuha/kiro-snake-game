interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="text-center text-lg font-semibold text-white mb-2">
      Score: {score}
    </div>
  );
}
