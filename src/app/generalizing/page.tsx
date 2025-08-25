"use client";

import { useState } from "react";
import PageLayout from "@/app/components/shared/page-layout";
import MultiLayerNetwork from "@/app/components/visualizations/multi-layer-network";
import WeightMatrixControls from "@/app/components/visualizations/weight-matrix-controls";
import MultiPathGradients from "@/app/components/visualizations/multi-path-gradients";
import MathEquation from "@/app/components/shared/math-equation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Network, Calculator, GitBranch } from "lucide-react";
import GeneralizingIntro from "./components/GeneralizingIntro";
export default function GeneralizingPage() {
  const [networkParams, setNetworkParams] = useState({
    inputs: [1.0, 0.5] as [number, number],
    weightsLayer1: [
      [0.2, 0.8],
      [0.4, 0.6],
    ] as [[number, number], [number, number]],

    weightsLayer2: [
      [0.3, 0.7],
      [0.5, 0.9],
    ] as [[number, number], [number, number]],
    targets: [0.9, 0.1] as [number, number],
  });

  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentView, setCurrentView] = useState<"network" | "gradients">(
    "network"
  );

  const startAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(true);
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= 8) {
          setIsAnimating(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
  };

  // Calculate network outputs and cost
  const z2 = [
    networkParams.weightsLayer1[0][0] * networkParams.inputs[0] +
      networkParams.weightsLayer1[0][1] * networkParams.inputs[1],
    networkParams.weightsLayer1[1][0] * networkParams.inputs[0] +
      networkParams.weightsLayer1[1][1] * networkParams.inputs[1],
  ];
  const a2 = [1 / (1 + Math.exp(-z2[0])), 1 / (1 + Math.exp(-z2[1]))];

  const z3 = [
    networkParams.weightsLayer2[0][0] * a2[0] +
      networkParams.weightsLayer2[0][1] * a2[1],
    networkParams.weightsLayer2[1][0] * a2[0] +
      networkParams.weightsLayer2[1][1] * a2[1],
  ];
  const a3 = [1 / (1 + Math.exp(-z3[0])), 1 / (1 + Math.exp(-z3[1]))];

  const errors = [
    a3[0] - networkParams.targets[0],
    a3[1] - networkParams.targets[1],
  ];
  const cost = 0.5 * (errors[0] * errors[0] + errors[1] * errors[1]);

  return (
    <PageLayout
      title="Generalizing the Concept"
      description="Explore how backpropagation scales to multi-layer networks with multiple neurons per layer, featuring complex weight matrices and multi-path gradient calculations."
    >
      <div className="space-y-12">
        <GeneralizingIntro />
        {/* Introduction */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="w-6 h-6 mr-3 text-purple-600" />
                Multi-Layer Networks: Scaling Up Complexity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Moving beyond the simple toy example, we now explore
                    networks with multiple neurons in each layer. This
                    introduces weight matrices, multiple gradient paths, and the
                    need to sum gradients from different routes through the
                    network.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="font-semibold text-purple-800 mb-2">
                      New Challenges:
                    </p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Weight matrices instead of individual weights</li>
                      <li>
                        • Multiple paths from each weight to the cost function
                      </li>
                      <li>• Matrix notation for efficient computation</li>
                      <li>• Mean squared error for multiple outputs</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                      2 Input Neurons
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">
                      2 Hidden Neurons
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">
                      2 Output Neurons
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 w-full justify-center py-2">
                      8 Parameters
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cost Function */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Mean Squared Error for Multiple Outputs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  With multiple outputs, we use the mean squared error across
                  all output neurons:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <MathEquation equation="J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (y_i - a_i^{(3)})^2" />
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Badge className="bg-blue-100 text-blue-800 mb-2">
                      Current Cost
                    </Badge>
                    <p className="font-mono text-lg">{cost.toFixed(6)}</p>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      Output 1 Error
                    </Badge>
                    <p className="font-mono text-lg">{errors[0].toFixed(4)}</p>
                  </div>
                  <div>
                    <Badge className="bg-red-100 text-red-800 mb-2">
                      Output 2 Error
                    </Badge>
                    <p className="font-mono text-lg">{errors[1].toFixed(4)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Network */}
        <section>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4 flex-shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Multi-Layer Network Architecture
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={startAnimation}
                        disabled={isAnimating}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Animate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={resetAnimation}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full flex justify-center items-center">
                    <div className="w-full max-w-[500px]">
                      <MultiLayerNetwork
                        inputs={networkParams.inputs}
                        weightsLayer1={networkParams.weightsLayer1}
                        weightsLayer2={networkParams.weightsLayer2}
                        targets={networkParams.targets}
                        animationStep={animationStep}
                        isAnimating={isAnimating}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full lg:w-1/4 flex-shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Input & Target Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Input x₁: {networkParams.inputs[0].toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.inputs[0]]}
                        onValueChange={(value) =>
                          setNetworkParams((prev) => ({
                            ...prev,
                            inputs: [value[0], prev.inputs[1]],
                          }))
                        }
                        max={2}
                        min={-2}
                        step={0.1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Input x₂: {networkParams.inputs[1].toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.inputs[1]]}
                        onValueChange={(value) =>
                          setNetworkParams((prev) => ({
                            ...prev,
                            inputs: [prev.inputs[0], value[0]],
                          }))
                        }
                        max={2}
                        min={-2}
                        step={0.1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Target y₁: {networkParams.targets[0].toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.targets[0]]}
                        onValueChange={(value) =>
                          setNetworkParams((prev) => ({
                            ...prev,
                            targets: [value[0], prev.targets[1]],
                          }))
                        }
                        max={1}
                        min={0}
                        step={0.1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Target y₂: {networkParams.targets[1].toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.targets[1]]}
                        onValueChange={(value) =>
                          setNetworkParams((prev) => ({
                            ...prev,
                            targets: [prev.targets[0], value[0]],
                          }))
                        }
                        max={1}
                        min={0}
                        step={0.1}
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-sm mb-2">
                        Network Outputs:
                      </p>
                      <div className="space-y-1 text-xs font-mono">
                        <p>y₁ = {a3[0].toFixed(4)}</p>
                        <p>y₂ = {a3[1].toFixed(4)}</p>
                        <p>Cost = {cost.toFixed(6)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* View Toggle */}
        <section>
          <div className="flex justify-center space-x-4">
            <Button
              variant={currentView === "network" ? "default" : "outline"}
              onClick={() => setCurrentView("network")}
              className="flex items-center"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Weight Matrix Controls
            </Button>
            <Button
              variant={currentView === "gradients" ? "default" : "outline"}
              onClick={() => setCurrentView("gradients")}
              className="flex items-center"
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Multi-Path Gradients
            </Button>
          </div>
        </section>

        {/* Content based on current view */}
        {currentView === "network" ? (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">
              Interactive Weight Matrix Controls
            </h2>
            <WeightMatrixControls
              weightsLayer1={networkParams.weightsLayer1}
              weightsLayer2={networkParams.weightsLayer2}
              onWeightsLayer1Change={(weights) =>
                setNetworkParams((prev) => ({
                  ...prev,
                  weightsLayer1: weights,
                }))
              }
              onWeightsLayer2Change={(weights) =>
                setNetworkParams((prev) => ({
                  ...prev,
                  weightsLayer2: weights,
                }))
              }
            />
          </section>
        ) : (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">
              Multi-Path Gradient Calculations
            </h2>
            <MultiPathGradients
              inputs={networkParams.inputs}
              weightsLayer1={networkParams.weightsLayer1}
              weightsLayer2={networkParams.weightsLayer2}
              targets={networkParams.targets}
            />
          </section>
        )}

        {/* Summary */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Key Insights from Multi-Layer Networks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 mb-3 px-4 py-2">
                    Weight Matrices
                  </Badge>
                  <p className="text-sm text-gray-700">
                    Weights are organized in matrices where θ⁽ˡ⁾ᵢⱼ represents
                    the weight from neuron j in layer l-1 to neuron i in layer
                    l.
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-3 px-4 py-2">
                    Multiple Paths
                  </Badge>
                  <p className="text-sm text-gray-700">
                    Each weight can affect multiple outputs through different
                    paths, requiring us to sum gradients from all possible
                    routes.
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="bg-purple-100 text-purple-800 mb-3 px-4 py-2">
                    Scalable Algorithm
                  </Badge>
                  <p className="text-sm text-gray-700">
                    The backpropagation algorithm scales efficiently to networks
                    of any size using matrix operations and systematic gradient
                    computation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
