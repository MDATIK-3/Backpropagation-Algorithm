"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MathEquation from "@/app/components/shared/math-equation";
import { GitBranch, Plus } from "lucide-react";

interface MultiPathGradientsProps {
  inputs: [number, number];
  weightsLayer1: [[number, number], [number, number]];
  weightsLayer2: [[number, number], [number, number]];
  targets: [number, number];
}

export default function MultiPathGradients({
  inputs,
  weightsLayer1,
  weightsLayer2,
  targets,
}: MultiPathGradientsProps) {
  // Forward pass calculations
  const z2 = [
    weightsLayer1[0][0] * inputs[0] + weightsLayer1[0][1] * inputs[1],
    weightsLayer1[1][0] * inputs[0] + weightsLayer1[1][1] * inputs[1],
  ];
  const a2 = [1 / (1 + Math.exp(-z2[0])), 1 / (1 + Math.exp(-z2[1]))];

  const z3 = [
    weightsLayer2[0][0] * a2[0] + weightsLayer2[0][1] * a2[1],
    weightsLayer2[1][0] * a2[0] + weightsLayer2[1][1] * a2[1],
  ];
  const a3 = [1 / (1 + Math.exp(-z3[0])), 1 / (1 + Math.exp(-z3[1]))];

  const errors = [a3[0] - targets[0], a3[1] - targets[1]];

  // Gradient calculations for θ⁽¹⁾₁₁
  const dJ_da3_1 = errors[0]; // ∂J/∂a₁⁽³⁾
  const dJ_da3_2 = errors[1]; // ∂J/∂a₂⁽³⁾

  const da3_dz3_1 = a3[0] * (1 - a3[0]); // ∂a₁⁽³⁾/∂z₁⁽³⁾
  const da3_dz3_2 = a3[1] * (1 - a3[1]); // ∂a₂⁽³⁾/∂z₂⁽³⁾

  const dz3_da2_1_from_output1 = weightsLayer2[0][0]; // ∂z₁⁽³⁾/∂a₁⁽²⁾
  const dz3_da2_1_from_output2 = weightsLayer2[1][0]; // ∂z₂⁽³⁾/∂a₁⁽²⁾

  const da2_dz2_1 = a2[0] * (1 - a2[0]); // ∂a₁⁽²⁾/∂z₁⁽²⁾
  const dz2_dtheta11 = inputs[0]; // ∂z₁⁽²⁾/∂θ₁₁⁽¹⁾

  // Two paths for θ⁽¹⁾₁₁
  const path1 =
    dJ_da3_1 * da3_dz3_1 * dz3_da2_1_from_output1 * da2_dz2_1 * dz2_dtheta11;
  const path2 =
    dJ_da3_2 * da3_dz3_2 * dz3_da2_1_from_output2 * da2_dz2_1 * dz2_dtheta11;
  const totalGradient = path1 + path2;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
            Multi-Path Gradient Calculation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            In multi-layer networks, a single weight can affect multiple outputs
            through different paths. We must sum the gradients from all paths to
            get the total gradient.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-semibold text-blue-800 mb-2">
              Example: Computing ∂J/∂θ⁽¹⁾₁₁
            </p>
            <p className="text-blue-700 text-sm">
              θ⁽¹⁾₁₁ affects both output neurons through hidden neuron h₁,
              creating two gradient paths that must be summed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Path 1 */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="text-lg text-green-700">
            Path 1: θ⁽¹⁾₁₁ → h₁ → y₁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              {/* <MathEquation equation="\\frac{\\partial J}{\\partial \\theta^{(1)}_{11}}|_{path1} = \\frac{\\partial J}{\\partial a^{(3)}_1} \\cdot \\frac{\\partial a^{(3)}_1}{\\partial z^{(3)}_1} \\cdot \\frac{\\partial z^{(3)}_1}{\\partial a^{(2)}_1} \\cdot \\frac{\\partial a^{(2)}_1}{\\partial z^{(2)}_1} \\cdot \\frac{\\partial z^{(2)}_1}{\\partial \\theta^{(1)}_{11}}" /> */}
              <div className="font-mono text-purple-800 text-center whitespace-pre-wrap leading-loose">
                {`∂J / ∂θ^(1)₁₁ |path₁ = (∂J / ∂a^(3)₁) · (∂a^(3)₁ / ∂z^(3)₁) · (∂z^(3)₁ / ∂a^(2)₁) · (∂a^(2)₁ / ∂z^(2)₁) · (∂z^(2)₁ / ∂θ^(1)₁₁)`}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="bg-red-100 p-2 rounded text-center">
                <p className="font-semibold">∂J/∂a₁⁽³⁾</p>
                <p>{dJ_da3_1.toFixed(4)}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded text-center">
                <p className="font-semibold">∂a₁⁽³⁾/∂z₁⁽³⁾</p>
                <p>{da3_dz3_1.toFixed(4)}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded text-center">
                <p className="font-semibold">∂z₁⁽³⁾/∂a₁⁽²⁾</p>
                <p>{dz3_da2_1_from_output1.toFixed(4)}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded text-center">
                <p className="font-semibold">∂a₁⁽²⁾/∂z₁⁽²⁾</p>
                <p>{da2_dz2_1.toFixed(4)}</p>
              </div>
              <div className="bg-green-100 p-2 rounded text-center">
                <p className="font-semibold">∂z₁⁽²⁾/∂θ₁₁⁽¹⁾</p>
                <p>{dz2_dtheta11.toFixed(4)}</p>
              </div>
            </div>

            <div className="bg-green-100 p-3 rounded">
              <p className="font-semibold text-center">
                Path 1 Result: {path1.toFixed(6)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Path 2 */}
      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="text-lg text-orange-700">
            Path 2: θ⁽¹⁾₁₁ → h₁ → y₂
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              {/* <MathEquation equation="\\frac{\\partial J}{\\partial \\theta^{(1)}_{11}}|_{path2} = \\frac{\\partial J}{\\partial a^{(3)}_2} \\cdot \\frac{\\partial a^{(3)}_2}{\\partial z^{(3)}_2} \\cdot \\frac{\\partial z^{(3)}_2}{\\partial a^{(2)}_1} \\cdot \\frac{\\partial a^{(2)}_1}{\\partial z^{(2)}_1} \\cdot \\frac{\\partial z^{(2)}_1}{\\partial \\theta^{(1)}_{11}}" /> */}
              <div className="font-mono text-purple-800 text-center whitespace-pre-wrap leading-loose">
                {`∂J / ∂θ^(1)₁₁ |path₂ = (∂J / ∂a^(3)₂) · (∂a^(3)₂ / ∂z^(3)₂) · (∂z^(3)₂ / ∂a^(2)₁) · (∂a^(2)₁ / ∂z^(2)₁) · (∂z^(2)₁ / ∂θ^(1)₁₁)`}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="bg-red-100 p-2 rounded text-center">
                <p className="font-semibold">∂J/∂a₂⁽³⁾</p>
                <p>{dJ_da3_2.toFixed(4)}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded text-center">
                <p className="font-semibold">∂a₂⁽³⁾/∂z₂⁽³⁾</p>
                <p>{da3_dz3_2.toFixed(4)}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded text-center">
                <p className="font-semibold">∂z₂⁽³⁾/∂a₁⁽²⁾</p>
                <p>{dz3_da2_1_from_output2.toFixed(4)}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded text-center">
                <p className="font-semibold">∂a₁⁽²⁾/∂z₁⁽²⁾</p>
                <p>{da2_dz2_1.toFixed(4)}</p>
              </div>
              <div className="bg-green-100 p-2 rounded text-center">
                <p className="font-semibold">∂z₁⁽²⁾/∂θ₁₁⁽¹⁾</p>
                <p>{dz2_dtheta11.toFixed(4)}</p>
              </div>
            </div>

            <div className="bg-orange-100 p-3 rounded">
              <p className="font-semibold text-center">
                Path 2 Result: {path2.toFixed(6)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Gradient */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle className="text-lg text-purple-700 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Total Gradient
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              {/* <MathEquation equation="\\frac{\\partial J}{\\partial \\theta^{(1)}_{11}} = \\frac{\\partial J}{\\partial \\theta^{(1)}_{11}}|_{path1} + \\frac{\\partial J}{\\partial \\theta^{(1)}_{11}}|_{path2}" /> */}
              <div className="font-mono text-purple-800 text-center whitespace-pre-wrap leading-loose">
                {`∂J / ∂θ^(1)₁₁ = (∂J / ∂θ^(1)₁₁ |path₁) + (∂J / ∂θ^(1)₁₁ |path₂)`}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                {path1.toFixed(6)}
              </Badge>
              <Plus className="w-4 h-4 text-gray-500" />
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
                {path2.toFixed(6)}
              </Badge>
              <span className="text-gray-500">=</span>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-lg">
                {totalGradient.toFixed(6)}
              </Badge>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="font-semibold text-purple-800 text-center">
                Final Gradient: ∂J/∂θ⁽¹⁾₁₁ = {totalGradient.toFixed(6)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
