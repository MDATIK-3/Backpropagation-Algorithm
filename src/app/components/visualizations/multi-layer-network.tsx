"use client";

import { useEffect, useRef } from "react";

interface MultiLayerNetworkProps {
  inputs: [number, number];
  weightsLayer1: [[number, number], [number, number]]; // [neuron][input]
  weightsLayer2: [[number, number], [number, number]]; // [output][hidden]
  targets: [number, number];
  animationStep: number;
  isAnimating: boolean;
  width?: number;
  height?: number;
}

export default function MultiLayerNetwork({
  inputs,
  weightsLayer1,
  weightsLayer2,
  targets,
  animationStep,
  isAnimating,
  width = 650,
  height = 450,
}: MultiLayerNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size for high DPI
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate forward pass
    const z2 = [
      weightsLayer1[0][0] * inputs[0] + weightsLayer1[0][1] * inputs[1], // h1
      weightsLayer1[1][0] * inputs[0] + weightsLayer1[1][1] * inputs[1], // h2
    ];
    const a2 = [1 / (1 + Math.exp(-z2[0])), 1 / (1 + Math.exp(-z2[1]))];

    const z3 = [
      weightsLayer2[0][0] * a2[0] + weightsLayer2[0][1] * a2[1], // y1
      weightsLayer2[1][0] * a2[0] + weightsLayer2[1][1] * a2[1], // y2
    ];
    const a3 = [1 / (1 + Math.exp(-z3[0])), 1 / (1 + Math.exp(-z3[1]))];

    const errors = [a3[0] - targets[0], a3[1] - targets[1]];
    const cost = 0.5 * (errors[0] * errors[0] + errors[1] * errors[1]);

    // Define layer positions
    const layers = [
      // Input layer
      [
        { x: 80, y: height / 3, label: "x₁", value: inputs[0], type: "input" },
        {
          x: 80,
          y: (2 * height) / 3,
          label: "x₂",
          value: inputs[1],
          type: "input",
        },
      ],
      // Hidden layer
      [
        { x: 280, y: height / 3, label: "h₁", value: a2[0], type: "hidden" },
        {
          x: 280,
          y: (2 * height) / 3,
          label: "h₂",
          value: a2[1],
          type: "hidden",
        },
      ],
      // Output layer
      [
        { x: 480, y: height / 3, label: "y₁", value: a3[0], type: "output" },
        {
          x: 480,
          y: (2 * height) / 3,
          label: "y₂",
          value: a3[1],
          type: "output",
        },
      ],
    ];

    // Draw connections with weight labels
    const connectionColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
    let connectionIndex = 0;

    // Layer 1 to Layer 2 connections
    for (let i = 0; i < layers[0].length; i++) {
      for (let j = 0; j < layers[1].length; j++) {
        const fromNode = layers[0][i];
        const toNode = layers[1][j];
        const weight = weightsLayer1[j][i];

        const isActive = isAnimating && animationStep >= connectionIndex;
        ctx.strokeStyle = isActive
          ? "#fbbf24"
          : connectionColors[connectionIndex % connectionColors.length];
        ctx.lineWidth = isActive ? 4 : 2;

        ctx.beginPath();
        ctx.moveTo(fromNode.x + 25, fromNode.y);
        ctx.lineTo(toNode.x - 25, toNode.y);
        ctx.stroke();

        // Weight labels
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2 - 15;
        ctx.fillStyle =
          connectionColors[connectionIndex % connectionColors.length];
        ctx.font = "bold 12px serif";
        ctx.textAlign = "center";
        ctx.fillText(`θ⁽¹⁾${j + 1}${i + 1}`, midX, midY);
        ctx.font = "10px monospace";
        ctx.fillText(`(${weight.toFixed(2)})`, midX, midY + 12);

        connectionIndex++;
      }
    }

    // Layer 2 to Layer 3 connections
    for (let i = 0; i < layers[1].length; i++) {
      for (let j = 0; j < layers[2].length; j++) {
        const fromNode = layers[1][i];
        const toNode = layers[2][j];
        const weight = weightsLayer2[j][i];

        const isActive = isAnimating && animationStep >= connectionIndex;
        ctx.strokeStyle = isActive
          ? "#fbbf24"
          : connectionColors[connectionIndex % connectionColors.length];
        ctx.lineWidth = isActive ? 4 : 2;

        ctx.beginPath();
        ctx.moveTo(fromNode.x + 25, fromNode.y);
        ctx.lineTo(toNode.x - 25, toNode.y);
        ctx.stroke();

        // Weight labels
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2 - 15;
        ctx.fillStyle =
          connectionColors[connectionIndex % connectionColors.length];
        ctx.font = "bold 12px serif";
        ctx.textAlign = "center";
        ctx.fillText(`θ⁽²⁾${j + 1}${i + 1}`, midX, midY);
        ctx.font = "10px monospace";
        ctx.fillText(`(${weight.toFixed(2)})`, midX, midY + 12);

        connectionIndex++;
      }
    }

    // Draw nodes
    const nodeColors = ["#10b981", "#f59e0b", "#ef4444"];
    layers.forEach((layer, layerIndex) => {
      layer.forEach((node, nodeIndex) => {
        const isActive =
          isAnimating && animationStep >= layerIndex * 4 + nodeIndex;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
        ctx.fillStyle = isActive ? "#fbbf24" : nodeColors[layerIndex];
        ctx.fill();
        ctx.strokeStyle = "#374151";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node labels
        ctx.fillStyle = "white";
        ctx.font = "bold 14px serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + 4);

        // Value labels
        ctx.fillStyle = "#374151";
        ctx.font = "12px monospace";
        ctx.fillText(node.value.toFixed(4), node.x, node.y + 45);

        // Add pulsing effect for active nodes
        if (isActive) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    });

    // Add cost function display
    ctx.fillStyle = "#374151";
    ctx.font = "16px serif";
    ctx.textAlign = "center";
    ctx.fillText("Cost Function", width - 100, height / 2 - 40);

    ctx.beginPath();
    ctx.arc(width - 100, height / 2, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#dc2626";
    ctx.fill();
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 12px serif";
    ctx.fillText("J(θ)", width - 100, height / 2 + 4);

    ctx.fillStyle = "#374151";
    ctx.font = "12px monospace";
    ctx.fillText(cost.toFixed(6), width - 100, height / 2 + 50);

    // Layer labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillText("Input Layer", 80, 40);
    ctx.fillText("Hidden Layer", 280, 40);
    ctx.fillText("Output Layer", 480, 40);

    // Target values
    ctx.fillStyle = "#374151";
    ctx.font = "12px serif";
    ctx.textAlign = "left";
    ctx.fillText(`Target y₁: ${targets[0].toFixed(3)}`, 20, height - 60);
    ctx.fillText(`Target y₂: ${targets[1].toFixed(3)}`, 20, height - 40);
    ctx.fillText(`Error₁: ${errors[0].toFixed(4)}`, 20, height - 20);
    ctx.fillText(`Error₂: ${errors[1].toFixed(4)}`, 150, height - 20);
  }, [
    inputs,
    weightsLayer1,
    weightsLayer2,
    targets,
    animationStep,
    isAnimating,
    width,
    height,
  ]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-full sm:max-w-[600px] px-2">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "600px",
            display: "block",
          }}
          className="border border-gray-200 rounded-lg bg-white shadow-sm"
        />
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center max-w-2xl px-2">
        <p className="font-semibold mb-1">Multi-Layer Neural Network</p>
        <p className="text-xs">
          2 inputs → 2 hidden neurons → 2 outputs. Weight notation: θ⁽ˡ⁾ᵢⱼ where
          l=layer, i=to neuron, j=from neuron.
        </p>
      </div>
    </div>
  );
}
