"use client";

import { useState } from "react";
import PageLayout from "@/app/components/shared/page-layout";
import SimpleNeuralNetwork from "@/app/components/visualizations/simple-neural-network";
import ForwardPropagationSteps from "@/app/components/visualizations/forward-propagation-steps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

export default function ToyExercisePage() {
  const [networkParams, setNetworkParams] = useState({
    input: 1.0,
    theta1: 0.5,
    theta2: -0.3,
    target: 0.8,
  });

  const z2 = networkParams.theta1 * networkParams.input + networkParams.theta2;
  const a2 = 1 / (1 + Math.exp(-z2));
  const y = a2;
  const error = y - networkParams.target;

  return (
    <PageLayout
      title="Toy Exercise: Simple Neural Network"
      description="Learn backpropagation fundamentals through the simplest possible neural network with interactive animations and step-by-step mathematical breakdowns."
    >
      <div className="space-y-12">
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-6 h-6 mr-3 text-blue-600" />
                The Simplest Neural Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To understand backpropagation, we start with the simplest
                    possible neural network: one input neuron, one hidden layer
                    neuron, and one output neuron. This toy example demonstrates
                    all the fundamental concepts without overwhelming
                    complexity.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-800 mb-2">
                      Key Learning Objectives:
                    </p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>
                        Understand forward propagation through linear
                        combinations and activations
                      </li>
                      <li>
                        Apply the chain rule to compute gradients for
                        backpropagation
                      </li>
                      <li>
                        Visualize how parameter changes affect network output
                        and cost
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                      1 Input Neuron
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">
                      1 Hidden Neuron
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">
                      1 Output Neuron
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 w-full justify-center py-2">
                      2 Parameters (θ₁, θ₂)
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardContent>
              <div className="w-full max-w-2xl mx-auto aspect-[7/4] relative">
                <SimpleNeuralNetwork
                  input={networkParams.input}
                  theta1={networkParams.theta1}
                  theta2={networkParams.theta2}
                  target={networkParams.target}
                  onParamChange={setNetworkParams}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">
            Forward Propagation Steps
          </h2>
          <ForwardPropagationSteps
            input={networkParams.input}
            theta1={networkParams.theta1}
            theta2={networkParams.theta2}
            target={networkParams.target}
          />
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Key Insights from the Toy Exercise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 mb-3 px-4 py-2">
                    Forward Pass
                  </Badge>
                  <p className="text-sm text-gray-700">
                    Information flows forward through linear combinations and
                    activation functions, transforming input to output.
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-3 px-4 py-2">
                    Chain Rule
                  </Badge>
                  <p className="text-sm text-gray-700">
                    Gradients are computed by chaining partial derivatives
                    backward through the network using the chain rule.
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="bg-purple-100 text-purple-800 mb-3 px-4 py-2">
                    Parameter Updates
                  </Badge>
                  <p className="text-sm text-gray-700">
                    Weights are updated in the direction opposite to the
                    gradient to minimize the cost function.
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
