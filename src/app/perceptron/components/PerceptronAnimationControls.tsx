interface PerceptronAnimationControlsProps {
  isPlaying: boolean;
  onStart: () => void;
  onReset: () => void;
}

export default function PerceptronAnimationControls({
  isPlaying,
  onStart,
  onReset,
}: PerceptronAnimationControlsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
      <button
        onClick={onStart}
        disabled={isPlaying}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
      >
        {isPlaying ? "Playing..." : "Start Animation"}
      </button>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
