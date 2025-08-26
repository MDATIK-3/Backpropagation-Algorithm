interface PerceptronControlsProps {
  params: { input: number; theta1: number; theta2: number; target: number };
  onParamChange: (
    param: keyof PerceptronControlsProps["params"],
    value: number
  ) => void;
}

export default function PerceptronControls({
  params,
  onParamChange,
}: PerceptronControlsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Input (x): {params.input.toFixed(2)}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          value={params.input}
          onChange={(e) => onParamChange("input", parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Weight θ₁: {params.theta1.toFixed(2)}
        </label>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.01"
          value={params.theta1}
          onChange={(e) => onParamChange("theta1", parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Bias θ₂: {params.theta2.toFixed(2)}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.01"
          value={params.theta2}
          onChange={(e) => onParamChange("theta2", parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Target (t): {params.target.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={params.target}
          onChange={(e) => onParamChange("target", parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
