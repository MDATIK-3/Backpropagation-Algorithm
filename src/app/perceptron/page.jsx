"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  AlertCircle,
  RefreshCw,
  Play,
  Settings,
  Info,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";
import BasicPerceptron from "./components/BasicPerceptron";

const NeuronCalculationTooltip = ({
  neuronInfo,
  weights,
  biases,
  layerOutputs,
  activation,
  activationFunctions,
  formatNumber,
}) => {
  if (!neuronInfo || neuronInfo.layerIndex === 0) {
    return null;
  }

  const { layerIndex, neuronIndex, x, y, radius } = neuronInfo;
  const prevLayerOutputs = layerOutputs[layerIndex - 1] || [];
  const neuronWeights = weights[layerIndex - 1]?.[neuronIndex] || [];
  const neuronBias = biases[layerIndex - 1]?.[neuronIndex] ?? 0;

  let weightedSum = 0;
  const calculations = prevLayerOutputs.map((output, i) => {
    const weight = neuronWeights[i] || 0;
    const product = output * weight;
    weightedSum += product;
    return { output, weight, product };
  });

  const preActivationTotal = weightedSum + neuronBias;
  const finalValue = layerOutputs[layerIndex]?.[neuronIndex] ?? 0;

  return (
    <div
      className="absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-slate-200 p-4 text-xs text-slate-800 pointer-events-none transition-opacity duration-200"
      style={{
        left: `${x + radius * 2 + 15}px`,
        top: `${y}px`,
        maxWidth: "300px",
        transform: "translateY(-50%)",
        zIndex: 50,
      }}
    >
      <h4 className="font-bold text-sm mb-2 border-b pb-1">
        Neuron L{layerIndex}, N{neuronIndex + 1} Calculation
      </h4>
      <div className="font-mono max-h-40 overflow-y-auto pr-2">
        <div className="font-semibold mb-1">
          Weighted Inputs (Input * Weight)
        </div>
        {calculations.map((calc, i) => (
          <div key={i} className="flex justify-between items-center">
            <span>
              {formatNumber(calc.output, 2)} * {formatNumber(calc.weight, 2)}
            </span>
            <span>= {formatNumber(calc.product, 3)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center border-t mt-1 pt-1">
          <span className="font-semibold">Sum:</span>
          <span>{formatNumber(weightedSum, 3)}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="font-semibold">Bias:</span>
          <span>+ {formatNumber(neuronBias, 3)}</span>
        </div>
        <div className="flex justify-between items-center font-bold border-t mt-1 pt-1">
          <span>Total (Z):</span>
          <span>{formatNumber(preActivationTotal, 3)}</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t">
        <p className="font-bold">
          Activation({activation}):{" "}
          <span className="font-mono">{formatNumber(finalValue, 4)}</span>
        </p>
      </div>
    </div>
  );
};

const NeuralNetworkVisualizer = ({
  inputSize = 4,
  hiddenLayers = [4, 3],
  outputSize = 1,
  activation = "sigmoid",
}) => {
  const [inputs, setInputs] = useState([]);
  const [inputStrings, setInputStrings] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [layerOutputs, setLayerOutputs] = useState([]);
  const [weights, setWeights] = useState([]);
  const [biases, setBiases] = useState([]);
  const [isComputing, setIsComputing] = useState(false);
  const [activationSignals, setActivationSignals] = useState(new Set());
  const [errors, setErrors] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const [showWeights, setShowWeights] = useState(false);
  const [showBiases, setShowBiases] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [selectedNeuron, setSelectedNeuron] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);
  const [hoveredNeuron, setHoveredNeuron] = useState(null);
  const [computationHistory, setComputationHistory] = useState([]);

  const validateInputSize = (size) => size >= 1 && size <= 20;
  const validateOutputSize = (size) => size >= 1 && size <= 20;
  const validateHiddenLayers = (layers) => {
    return (
      Array.isArray(layers) &&
      layers.length <= 10 &&
      layers.every((size) => size >= 1 && size <= 50)
    );
  };
  const validateInputValue = (value) =>
    !isNaN(value) && isFinite(value) && Math.abs(value) <= 1000;

  const activationFunctions = useMemo(
    () => ({
      sigmoid: {
        fn: (x) => 1 / (1 + Math.exp(-Math.max(-100, Math.min(100, x)))),
        range: "[0, 1]",
      },
      relu: { fn: (x) => Math.max(0, x), range: "[0, ∞)" },
      tanh: {
        fn: (x) => Math.tanh(Math.max(-100, Math.min(100, x))),
        range: "[-1, 1]",
      },
      leaky_relu: { fn: (x) => (x > 0 ? x : 0.01 * x), range: "(-∞, ∞)" },
      linear: { fn: (x) => x, range: "(-∞, ∞)" },
      softmax: {
        fn: (x, allSums) => {
          if (!allSums || allSums.length === 0) return 0;
          const maxVal = Math.max(...allSums);
          const exp = Math.exp(x - maxVal);
          const sum = allSums.reduce(
            (acc, val) => acc + Math.exp(val - maxVal),
            0
          );
          return sum > 0 ? exp / sum : 0;
        },
        range: "[0, 1]",
      },
    }),
    []
  );

  const initializeNetwork = useCallback(() => {
    try {
      const validationErrors = {};
      if (!validateInputSize(inputSize))
        validationErrors.inputSize = "Input size must be 1-20";
      if (!validateOutputSize(outputSize))
        validationErrors.outputSize = "Output size must be 1-20";
      if (!validateHiddenLayers(hiddenLayers))
        validationErrors.hiddenLayers = "Invalid hidden layers";

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsInitialized(false);
        return;
      }

      setErrors({});
      const layers = [inputSize, ...hiddenLayers, outputSize];
      const newWeights = [];
      const newBiases = [];

      for (let i = 0; i < layers.length - 1; i++) {
        const fanIn = layers[i];
        const fanOut = layers[i + 1];
        const limit = Math.sqrt(6 / (fanIn + fanOut));
        const layerWeights = Array(layers[i + 1])
          .fill(0)
          .map(() =>
            Array(layers[i])
              .fill(0)
              .map(() => (Math.random() * 2 - 1) * limit)
          );
        const layerBiases = Array(layers[i + 1])
          .fill(0)
          .map(() => (Math.random() * 2 - 1) * 0.1);
        newWeights.push(layerWeights);
        newBiases.push(layerBiases);
      }

      setWeights(newWeights);
      setBiases(newBiases);
      const initialInputs = Array(inputSize).fill(0);
      setInputs(initialInputs);
      setInputStrings(initialInputs.map(String));
      setOutputs(Array(outputSize).fill(0));
      setLayerOutputs(layers.map((size) => Array(size).fill(0)));
      setComputationHistory([]);
      setIsInitialized(true);
      setSelectedNeuron(null);
    } catch (error) {
      setErrors({
        initialization: "Failed to initialize network: " + error.message,
      });
      setIsInitialized(false);
    }
  }, [inputSize, hiddenLayers, outputSize]);

  useEffect(() => {
    initializeNetwork();
  }, [initializeNetwork]);

  const calculateNetworkLayout = useCallback(() => {
    const layers = [inputSize, ...hiddenLayers, outputSize];
    const maxNeurons = Math.max(...layers, 1);
    const baseSpacing = Math.max(60, 300 / maxNeurons);
    const layerSpacing = Math.max(180, layers.length > 4 ? 150 : 220);
    const startX = 80;
    const canvasHeight = Math.max(400, maxNeurons * baseSpacing + 100);
    const centerY = canvasHeight / 2;

    return {
      layers: layers.map((layerSize, layerIndex) => {
        const neuronSpacing =
          layerSize > 1
            ? Math.min(baseSpacing, (canvasHeight - 100) / (layerSize - 1))
            : baseSpacing;
        const layerY = centerY - ((layerSize - 1) * neuronSpacing) / 2;
        return Array(layerSize)
          .fill(0)
          .map((_, neuronIndex) => ({
            x: startX + layerIndex * layerSpacing,
            y: layerY + neuronIndex * neuronSpacing,
            layerIndex,
            neuronIndex,
            value: layerOutputs[layerIndex]?.[neuronIndex] ?? 0,
            radius: Math.max(15, Math.min(25, 350 / maxNeurons)),
          }));
      }),
      dimensions: {
        width: startX + (layers.length - 1) * layerSpacing + 160,
        height: canvasHeight,
      },
    };
  }, [inputSize, hiddenLayers, outputSize, layerOutputs]);

  const forwardPass = useCallback(async () => {
    if (!isInitialized || isComputing) return;

    let hasErrors = false;
    inputs.forEach((_, index) => {
      const numValue = parseFloat(inputStrings[index]);
      if (!validateInputValue(numValue)) {
        setErrors((prev) => ({ ...prev, [`input_${index}`]: "Invalid input" }));
        hasErrors = true;
      }
    });
    if (hasErrors) return;

    setIsComputing(true);
    setActivationSignals(new Set());
    setErrors((prev) => ({ ...prev, computation: null }));

    try {
      let currentValues = [...inputs];
      const hiddenActivationFunc =
        activationFunctions[activation === "softmax" ? "relu" : activation];
      const outputActivationFunc = activationFunctions[activation];

      setLayerOutputs((prev) => {
        const updated = [...prev];
        updated[0] = currentValues;
        return updated;
      });

      for (let layerIdx = 0; layerIdx < weights.length; layerIdx++) {
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        setActivationSignals(new Set([`layer-${layerIdx}`]));

        const nextValues = [];
        const isOutputLayer = layerIdx === weights.length - 1;
        const currentActivationFunc = isOutputLayer
          ? outputActivationFunc
          : hiddenActivationFunc;

        let allSumsForSoftmax;
        if (isOutputLayer && activation === "softmax") {
          allSumsForSoftmax = weights[layerIdx].map((neuronWeights, nIdx) => {
            let s = biases[layerIdx][nIdx];
            currentValues.forEach((val, iIdx) => {
              s += val * neuronWeights[iIdx];
            });
            return s;
          });
        }

        for (
          let neuronIdx = 0;
          neuronIdx < weights[layerIdx].length;
          neuronIdx++
        ) {
          let sum = biases[layerIdx][neuronIdx];
          currentValues.forEach((inputValue, inputIdx) => {
            sum += inputValue * weights[layerIdx][neuronIdx][inputIdx];
          });

          let activatedValue;
          if (isOutputLayer && activation === "softmax") {
            activatedValue = currentActivationFunc.fn(sum, allSumsForSoftmax);
          } else {
            activatedValue = currentActivationFunc.fn(sum);
          }
          nextValues.push(activatedValue);
        }

        currentValues = nextValues;
        setLayerOutputs((prev) => {
          const updated = [...prev];
          updated[layerIdx + 1] = [...currentValues];
          return updated;
        });
      }

      setOutputs([...currentValues]);
      setComputationHistory((prev) => [
        ...prev.slice(-4),
        {
          timestamp: new Date(),
          inputs: [...inputs],
          outputs: [...currentValues],
        },
      ]);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        computation: "Computation failed: " + error.message,
      }));
    } finally {
      setActivationSignals(new Set());
      setIsComputing(false);
    }
  }, [
    inputs,
    weights,
    biases,
    activation,
    activationFunctions,
    animationSpeed,
    isInitialized,
    inputStrings,
  ]);

  const handleInputChange = useCallback(
    (index, value) => {
      const newStrings = [...inputStrings];
      newStrings[index] = value;
      setInputStrings(newStrings);
      setErrors((prev) => ({ ...prev, [`input_${index}`]: null }));

      if (value.trim() === "" || value === "-") {
        const newInputs = [...inputs];
        newInputs[index] = 0;
        setInputs(newInputs);
        return;
      }
      const numValue = parseFloat(value);
      if (validateInputValue(numValue)) {
        const newInputs = [...inputs];
        newInputs[index] = numValue;
        setInputs(newInputs);
      } else {
        setErrors((prev) => ({ ...prev, [`input_${index}`]: "Invalid value" }));
      }
    },
    [inputs, inputStrings]
  );

  const randomizeInputs = () => {
    const newInputs = Array(inputSize)
      .fill(0)
      .map(() => parseFloat(((Math.random() - 0.5) * 10).toFixed(2)));
    setInputs(newInputs);
    setInputStrings(newInputs.map(String));
    setErrors({});
  };

  const resetInputs = () => {
    const newInputs = Array(inputSize).fill(0);
    setInputs(newInputs);
    setInputStrings(newInputs.map(String));
    setErrors({});
  };

  const formatNumber = (num, precision = 4) => {
    if (typeof num !== "number" || !isFinite(num)) return "N/A";
    return num.toFixed(precision);
  };

  const NetworkDiagram = () => {
    const layout = calculateNetworkLayout();
    const { layers, dimensions } = layout;

    return (
      <div className="relative bg-slate-50 rounded-xl border border-slate-200 overflow-auto">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {layers.slice(0, -1).map((layer, layerIdx) =>
            layer.map((fromNeuron) =>
              layers[layerIdx + 1].map((toNeuron) => {
                const weight =
                  weights[layerIdx]?.[toNeuron.neuronIndex]?.[
                    fromNeuron.neuronIndex
                  ] ?? 0;
                const isActive = activationSignals.has(`layer-${layerIdx}`);
                const isHovered =
                  hoveredConnection ===
                  `${layerIdx}-${fromNeuron.neuronIndex}-${toNeuron.neuronIndex}`;
                return (
                  <g
                    key={`${layerIdx}-${fromNeuron.neuronIndex}-${toNeuron.neuronIndex}`}
                  >
                    <line
                      x1={fromNeuron.x + fromNeuron.radius}
                      y1={fromNeuron.y + fromNeuron.radius}
                      x2={toNeuron.x + toNeuron.radius}
                      y2={toNeuron.y + toNeuron.radius}
                      stroke={weight > 0 ? "#10b981" : "#ef4444"}
                      strokeWidth={
                        isActive
                          ? 3
                          : isHovered
                          ? 2.5
                          : Math.max(0.5, Math.abs(weight) * 2)
                      }
                      opacity={
                        isActive
                          ? 1
                          : Math.min(0.8, Math.abs(weight) * 1.5 + 0.1)
                      }
                      className="transition-all duration-300"
                      onMouseEnter={() =>
                        setHoveredConnection(
                          `${layerIdx}-${fromNeuron.neuronIndex}-${toNeuron.neuronIndex}`
                        )
                      }
                      onMouseLeave={() => setHoveredConnection(null)}
                    />
                    {(showWeights || isHovered) && (
                      <text
                        x={(fromNeuron.x + toNeuron.x) / 2 + fromNeuron.radius}
                        y={
                          (fromNeuron.y + toNeuron.y) / 2 +
                          fromNeuron.radius -
                          6
                        }
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#374151"
                        style={{
                          paintOrder: "stroke",
                          stroke: "#ffffff",
                          strokeWidth: "3px",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                        }}
                      >
                        {formatNumber(weight, 2)}
                      </text>
                    )}
                  </g>
                );
              })
            )
          )}

          {layers.map((layer, layerIdx) =>
            layer.map((neuron) => {
              const isSelected =
                selectedNeuron === `${layerIdx}-${neuron.neuronIndex}`;
              const value = neuron.value;
              const intensity = Math.min(1, Math.abs(value));
              return (
                <g
                  key={`${layerIdx}-${neuron.neuronIndex}`}
                  onClick={() =>
                    setSelectedNeuron(`${layerIdx}-${neuron.neuronIndex}`)
                  }
                  onMouseEnter={() => setHoveredNeuron({ ...neuron })}
                  onMouseLeave={() => setHoveredNeuron(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={neuron.x + neuron.radius}
                    cy={neuron.y + neuron.radius}
                    r={neuron.radius}
                    fill={`hsl(${
                      layerIdx === 0
                        ? 217
                        : layerIdx === layers.length - 1
                        ? 142
                        : 262
                    }, 80%, ${60 - intensity * 20}%)`}
                    stroke={isSelected ? "#fbbf24" : "#94a3b8"}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300"
                    filter={isSelected ? "url(#glow)" : ""}
                  />
                  {layerIdx > 0 && showBiases && (
                    <circle
                      cx={neuron.x + neuron.radius}
                      cy={neuron.y + neuron.radius}
                      r={neuron.radius * 0.3}
                      fill="#f59e0b"
                    />
                  )}
                  <text
                    x={neuron.x + neuron.radius}
                    y={neuron.y + neuron.radius + 4}
                    textAnchor="middle"
                    fontSize={neuron.radius > 20 ? "11" : "9"}
                    fontWeight="700"
                    fill="white"
                    className="pointer-events-none select-none"
                  >
                    {formatNumber(value, 2)}
                  </text>
                  {neuron.neuronIndex === 0 && (
                    <text
                      x={neuron.x + neuron.radius}
                      y={neuron.y - 15}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="700"
                      fill="#374151"
                    >
                      {layerIdx === 0
                        ? "Input"
                        : layerIdx === layers.length - 1
                        ? "Output"
                        : `Hidden ${layerIdx}`}
                    </text>
                  )}
                </g>
              );
            })
          )}
        </svg>
        <NeuronCalculationTooltip
          neuronInfo={hoveredNeuron}
          weights={weights}
          biases={biases}
          layerOutputs={layerOutputs}
          activation={
            hoveredNeuron?.layerIndex === weights.length
              ? activation
              : activation === "softmax"
              ? "relu"
              : activation
          }
          activationFunctions={activationFunctions}
          formatNumber={formatNumber}
        />
      </div>
    );
  };

  const ErrorDisplay = ({ error, className = "" }) =>
    error ? (
      <div
        className={`flex items-center gap-2 text-red-600 text-sm ${className}`}
      >
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    ) : null;

  if (!isInitialized) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 text-center">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center justify-center gap-2">
            <AlertCircle size={20} /> Network Initialization Failed
          </h3>
          {Object.values(errors).map((err, i) => (
            <p key={i} className="text-red-700">
              {err}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Network Diagram</h2>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Info size={16} />
            <span>Click neurons for details • Hover for calculations</span>
          </div>
        </div>
        <NetworkDiagram />
      </div>
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap className="text-blue-600" size={24} /> Input Values
          </h2>
          <div className="flex gap-2">
            <button
              onClick={randomizeInputs}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
            >
              <RefreshCw size={18} /> Random
            </button>
            <button
              onClick={resetInputs}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all font-medium"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-6 mb-6">
          {inputStrings.map((value, index) => (
            <div key={index} className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Input {index + 1}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors[`input_${index}`]
                    ? "border-red-300 focus:ring-red-500 bg-red-50"
                    : "border-slate-300 focus:ring-blue-500 bg-white hover:border-slate-400"
                }`}
                placeholder="0.00"
              />
              <ErrorDisplay
                error={errors[`input_${index}`]}
                className="mt-1 absolute text-xs"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={forwardPass}
            disabled={isComputing || !isInitialized}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isComputing || !isInitialized
                ? "bg-slate-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95"
            }`}
          >
            <Play size={20} />
            {isComputing ? "Computing..." : "Compute Forward Pass"}
          </button>
          <button
            onClick={initializeNetwork}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <RefreshCw size={20} /> Re-initialize
          </button>
        </div>
      </div>
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setShowWeights(!showWeights)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showWeights
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {showWeights ? <Eye size={18} /> : <EyeOff size={18} />} Weights
          </button>
          <button
            onClick={() => setShowBiases(!showBiases)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              showBiases
                ? "bg-amber-500 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {showBiases ? <Eye size={18} /> : <EyeOff size={18} />} Biases
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">
              Animation Speed:
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-slate-600 w-12 text-right">
              {animationSpeed}ms
            </span>
          </div>
        </div>
      </div>
      {selectedNeuron && (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Neuron Details</h2>
            <button
              onClick={() => setSelectedNeuron(null)}
              className="px-3 py-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
          {(() => {
            const [layerIdx, neuronIdx] = selectedNeuron.split("-").map(Number);
            const value = layerOutputs[layerIdx]?.[neuronIdx] ?? 0;
            const layers = [inputSize, ...hiddenLayers, outputSize];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3">
                    Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Layer:</span>
                      <span className="font-medium">
                        {layerIdx === 0
                          ? "Input"
                          : layerIdx === layers.length - 1
                          ? "Output"
                          : `Hidden ${layerIdx}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Position:</span>
                      <span className="font-medium">{neuronIdx + 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Value:</span>
                      <span className="font-mono font-bold text-blue-600">
                        {formatNumber(value)}
                      </span>
                    </div>
                    {layerIdx > 0 &&
                      biases[layerIdx - 1]?.[neuronIdx] !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Bias:</span>
                          <span className="font-mono font-medium text-amber-600">
                            {formatNumber(biases[layerIdx - 1][neuronIdx])}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
                {layerIdx > 0 && weights[layerIdx - 1]?.[neuronIdx] && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">
                      Input Weights
                    </h3>
                    <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
                      {weights[layerIdx - 1][neuronIdx].map((weight, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-slate-600">
                            From neuron {idx + 1}:
                          </span>
                          <span
                            className={`font-mono font-medium ${
                              weight >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {formatNumber(weight, 3)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
      {computationHistory.length > 0 && (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Computation History (Last 3)
          </h2>
          <div className="space-y-3">
            {computationHistory
              .slice(-3)
              .reverse()
              .map((computation, idx) => (
                <div
                  key={computation.timestamp.toISOString() + idx}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600">
                      {computation.timestamp.toLocaleTimeString()}
                    </span>
                    <span className="text-xs text-slate-500">
                      Run #{computationHistory.length - idx}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">
                        Inputs:{" "}
                      </span>
                      <span className="font-mono text-blue-600">
                        [
                        {computation.inputs
                          .map((v) => formatNumber(v, 2))
                          .join(", ")}
                        ]
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Outputs:{" "}
                      </span>
                      <span className="font-mono text-green-600">
                        [
                        {computation.outputs
                          .map((v) => formatNumber(v, 4))
                          .join(", ")}
                        ]
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NetworkConfigurator = () => {
  const [config, setConfig] = useState({
    inputSize: 3,
    hiddenLayers: [4, 3],
    outputSize: 2,
    activation: "sigmoid",
  });
  const [tempHiddenLayers, setTempHiddenLayers] = useState("4, 3");
  const [errors, setErrors] = useState({});

  const presets = [
    {
      name: "Simple Perceptron",
      inputSize: 2,
      hiddenLayers: [],
      outputSize: 1,
      activation: "sigmoid",
      description: "Basic binary classifier",
    },
    {
      name: "XOR Problem",
      inputSize: 2,
      hiddenLayers: [3],
      outputSize: 1,
      activation: "tanh",
      description: "Classic non-linear problem",
    },
    {
      name: "Multi-class",
      inputSize: 4,
      hiddenLayers: [4, 2],
      outputSize: 1,
      activation: "softmax",
      description: "3-class classification example",
    },
    {
      name: "Deep Network",
      inputSize: 3,
      hiddenLayers: [10, 8, 6],
      outputSize: 2,
      activation: "leaky_relu",
      description: "A deeper architecture",
    },
    {
      name: "Regression",
      inputSize: 5,
      hiddenLayers: [12, 8],
      outputSize: 1,
      activation: "linear",
      description: "Predicting a continuous value",
    },
  ];

  const handleHiddenLayerChange = (value) => {
    setTempHiddenLayers(value);
    const newErrors = { ...errors };
    if (value.trim() === "") {
      setConfig((c) => ({ ...c, hiddenLayers: [] }));
      delete newErrors.hiddenLayers;
      setErrors(newErrors);
      return;
    }
    const parts = value
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p !== "");
    const numbers = parts.map(Number);
    if (numbers.some((n) => isNaN(n) || n < 1 || n > 50)) {
      newErrors.hiddenLayers = "Sizes must be numbers between 1 and 50.";
    } else if (numbers.length > 10) {
      newErrors.hiddenLayers = "Maximum of 10 hidden layers.";
    } else {
      setConfig((c) => ({ ...c, hiddenLayers: numbers }));
      delete newErrors.hiddenLayers;
    }
    setErrors(newErrors);
  };

  const applyPreset = (preset) => {
    setConfig(preset);
    setTempHiddenLayers(preset.hiddenLayers.join(", "));
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <div className="max-w-7xl mx-auto pt-8 pb-4 px-6">
        <BasicPerceptron />
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Interactive Neural Network
          </h1>
          <p className="text-slate-600 text-lg">
            Configure, visualize, and understand the forward pass of a
            Multi-Layer Perceptron.
          </p>
        </div>
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Settings className="text-blue-600" size={28} /> Configure Network
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Manual Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Input Neurons
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={config.inputSize}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        inputSize: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hidden Layers (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 8, 6, 4"
                    value={tempHiddenLayers}
                    onChange={(e) => handleHiddenLayerChange(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.hiddenLayers
                        ? "border-red-300 focus:ring-red-500"
                        : "border-slate-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.hiddenLayers && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.hiddenLayers}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Output Neurons
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={config.outputSize}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        outputSize: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Activation Function
                  </label>
                  <select
                    value={config.activation}
                    onChange={(e) =>
                      setConfig({ ...config, activation: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sigmoid">Sigmoid</option>
                    <option value="relu">ReLU</option>
                    <option value="leaky_relu">Leaky ReLU</option>
                    <option value="tanh">Tanh</option>
                    <option value="linear">Linear</option>
                    <option value="softmax">Softmax (Output Layer)</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Quick Presets
              </h3>
              <div className="space-y-3">
                {presets.map((preset) => (
                  <div
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer transition-all hover:shadow-md group"
                  >
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {preset.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {preset.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NeuralNetworkVisualizer key={JSON.stringify(config)} {...config} />
    </div>
  );
};

export default NetworkConfigurator;
