"use client"

import { useState } from "react"
import PageLayout from "@/app/components/shared/page-layout"
import SimpleNeuralNetwork from "@/app/components/visualizations/simple-neural-network"
import ForwardPropagationSteps from "@/app/components/visualizations/forward-propagation-steps"
import BackpropChainRule from "@/app/components/visualizations/backprop-chain-rule"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Brain, Calculator, ArrowRight } from "lucide-react"

export default function ToyExercisePage() {
  const [networkParams, setNetworkParams] = useState({
    input: 1.0,
    theta1: 0.5,
    theta2: -0.3,
    target: 0.8,
  })

  const [animationStep, setAnimationStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentView, setCurrentView] = useState<"forward" | "backward">("forward")

  const startAnimation = () => {
    setAnimationStep(0)
    setIsAnimating(true)
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= 4) {
          setIsAnimating(false)
          clearInterval(interval)
          return 0
        }
        return prev + 1
      })
    }, 1500)
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setAnimationStep(0)
  }

  // Calculate network values
  const z2 = networkParams.theta1 * networkParams.input + networkParams.theta2
  const a2 = 1 / (1 + Math.exp(-z2))
  const y = a2
  const error = y - networkParams.target
  const cost = 0.5 * error * error

  return (
    <PageLayout
      title="Toy Exercise: Simple Neural Network"
      description="Learn backpropagation fundamentals through the simplest possible neural network with interactive animations and step-by-step mathematical breakdowns."
    >
      <div className="space-y-12">
        {/* Introduction */}
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
                    To understand backpropagation, we start with the simplest possible neural network: one input neuron,
                    one hidden layer neuron, and one output neuron. This toy example demonstrates all the fundamental
                    concepts without overwhelming complexity.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-800 mb-2">Key Learning Objectives:</p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Understand forward propagation through linear combinations and activations</li>
                      <li>• Apply the chain rule to compute gradients for backpropagation</li>
                      <li>• Visualize how parameter changes affect network output and cost</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">1 Input Neuron</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">1 Hidden Neuron</Badge>
                    <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">1 Output Neuron</Badge>
                    <Badge className="bg-purple-100 text-purple-800 w-full justify-center py-2">
                      2 Parameters (θ₁, θ₂)
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Network Visualization */}
        <section>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Network Architecture
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={startAnimation}
                        disabled={isAnimating}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Animate Forward Pass
                      </Button>
                      <Button size="sm" variant="outline" onClick={resetAnimation}>
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleNeuralNetwork
                    input={networkParams.input}
                    theta1={networkParams.theta1}
                    theta2={networkParams.theta2}
                    target={networkParams.target}
                    animationStep={animationStep}
                    isAnimating={isAnimating}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Interactive Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Input (x): {networkParams.input.toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.input]}
                        onValueChange={(value) => setNetworkParams((prev) => ({ ...prev, input: value[0] }))}
                        max={2}
                        min={-2}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Weight θ₁: {networkParams.theta1.toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.theta1]}
                        onValueChange={(value) => setNetworkParams((prev) => ({ ...prev, theta1: value[0] }))}
                        max={2}
                        min={-2}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bias θ₂: {networkParams.theta2.toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.theta2]}
                        onValueChange={(value) => setNetworkParams((prev) => ({ ...prev, theta2: value[0] }))}
                        max={2}
                        min={-2}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Target (t): {networkParams.target.toFixed(3)}
                      </label>
                      <Slider
                        value={[networkParams.target]}
                        onValueChange={(value) => setNetworkParams((prev) => ({ ...prev, target: value[0] }))}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="font-semibold mb-2">Current Computations:</p>
                      <div className="text-sm space-y-1 font-mono">
                        <p>
                          <strong>z⁽²⁾ =</strong> {z2.toFixed(4)}
                        </p>
                        <p>
                          <strong>a⁽²⁾ =</strong> {a2.toFixed(4)}
                        </p>
                        <p>
                          <strong>y =</strong> {y.toFixed(4)}
                        </p>
                        <p>
                          <strong>Error =</strong> {error.toFixed(4)}
                        </p>
                        <p>
                          <strong>Cost =</strong> {cost.toFixed(6)}
                        </p>
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
              variant={currentView === "forward" ? "default" : "outline"}
              onClick={() => setCurrentView("forward")}
              className="flex items-center"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Forward Propagation
            </Button>
            <Button
              variant={currentView === "backward" ? "default" : "outline"}
              onClick={() => setCurrentView("backward")}
              className="flex items-center"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Backpropagation
            </Button>
          </div>
        </section>

        {/* Content based on current view */}
        {currentView === "forward" ? (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Forward Propagation Steps</h2>
            <ForwardPropagationSteps
              input={networkParams.input}
              theta1={networkParams.theta1}
              theta2={networkParams.theta2}
              target={networkParams.target}
              currentStep={animationStep}
            />
          </section>
        ) : (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Backpropagation Chain Rule</h2>
            <BackpropChainRule
              input={networkParams.input}
              theta1={networkParams.theta1}
              theta2={networkParams.theta2}
              target={networkParams.target}
            />
          </section>
        )}

        {/* Summary */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Key Insights from the Toy Exercise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 mb-3 px-4 py-2">Forward Pass</Badge>
                  <p className="text-sm text-gray-700">
                    Information flows forward through linear combinations and activation functions, transforming input
                    to output.
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 mb-3 px-4 py-2">Chain Rule</Badge>
                  <p className="text-sm text-gray-700">
                    Gradients are computed by chaining partial derivatives backward through the network using the chain
                    rule.
                  </p>
                </div>
                <div className="text-center">
                  <Badge className="bg-purple-100 text-purple-800 mb-3 px-4 py-2">Parameter Updates</Badge>
                  <p className="text-sm text-gray-700">
                    Weights are updated in the direction opposite to the gradient to minimize the cost function.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>
  )
}
