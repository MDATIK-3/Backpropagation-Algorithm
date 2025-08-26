import { useRef, useEffect, useCallback } from "react";

interface NetworkNode {
  x: number;
  y: number;
  label: string;
  type: "input" | "bias" | "linear" | "activation" | "output" | "cost";
  value: number;
  radius: number;
}

interface NetworkConnection {
  from: number;
  to: number;
  weight: string;
  value?: number;
  color: string;
  type: "weight" | "activation" | "cost";
}

interface PerceptronNetworkDiagramProps {
  params: { input: number; theta1: number; theta2: number; target: number };
  animationStep: number;
  isAnimating: boolean;
  width?: number;
  height?: number;
}

export default function PerceptronNetworkDiagram({
  params,
  animationStep,
  isAnimating,
  width = 700,
  height = 450,
}: PerceptronNetworkDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sigmoid = (x: number) =>
    1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));

  const drawNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // ...existing code for drawing network, nodes, connections, labels...
    // This code should be moved from the main component
  }, [params, animationStep, isAnimating, width, height]);

  useEffect(() => {
    drawNetwork();
  }, [drawNetwork]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full border-2 border-gray-200 rounded-lg bg-gray-50 shadow-inner"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
