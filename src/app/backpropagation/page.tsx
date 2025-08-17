"use client"

import { useState } from "react"
import PageLayout from "@/app/components/shared/page-layout"
import { GradientDescentSimulator as SimulatorPage } from "@/app/components/visualizations/training-simulator"
import AlgorithmBreakdown from "@/app/components/visualizations/algorithm-breakdown"
import MathEquation from "@/app/components/shared/math-equation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, Play } from "lucide-react"

export default function BackpropagationPage() {
  const [currentView, setCurrentView] = useState<"algorithm" | "training">("algorithm")

  return (
    <PageLayout
      title="Backpropagation Algorithm"
      description="Master the complete backpropagation algorithm with detailed mathematical derivations, interactive training simulations, and comprehensive step-by-step breakdowns."
    >
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-6 h-6 mr-3 text-red-600" />
                The Complete Backpropagation Algorithm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Backpropagation is the cornerstone algorithm for training neural networks. It efficiently computes
                    gradients by propagating errors backward through the network, enabling gradient descent optimization
                    of all parameters simultaneously.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <p className="font-semibold text-red-800 mb-2">Key Insight:</p>
                    <p className="text-red-700 text-sm">
                      Backpropagation is simply a method for calculating partial derivatives of the cost function with
                      respect to all parameters. The actual optimization is done by gradient descent.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    <Badge className="bg-blue-100 text-blue-800 w-full justify-center py-2">Forward Propagation</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">
                      Error Calculation
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">Backward Propagation</Badge>
                    <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">Parameter Updates</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mathematical Foundation */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Mathematical Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 mb-4">
                    The general formula for computing gradients in layer l combines δ terms from the next layer with
                    activations from the current layer:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <MathEquation equation="\frac{\partial J(\theta)}{\partial \theta^{(l)}_{ij}} = (\delta^{(l+1)})^T a^{(l)}" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Where δ⁽ˡ⁺¹⁾ represents the error terms from layer l+1 and a⁽ˡ⁾ are the activations from layer l
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-800 mb-2">Forward Pass:</p>
                    <div className="space-y-2 text-sm">
                      <MathEquation equation="z^{(l)} = \theta^{(l)} a^{(l-1)}" />
                      <MathEquation equation="a^{(l)} = \sigma(z^{(l)})" />
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-semibold text-red-800 mb-2">Backward Pass:</p>
                    <div className="space-y-2 text-sm">
                      <MathEquation equation="\delta^{(l)} = (\theta^{(l+1)})^T \delta^{(l+1)} \odot \sigma&apos;(z^{(l)})" />
                      <MathEquation equation="\frac{\partial J}{\partial \theta^{(l)}} = \delta^{(l+1)} (a^{(l)})^T" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* View Toggle */}
        <section>
          <div className="flex justify-center space-x-4">
            <Button
              variant={currentView === "algorithm" ? "default" : "outline"}
              onClick={() => setCurrentView("algorithm")}
              className="flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Algorithm Breakdown
            </Button>
            <Button
              variant={currentView === "training" ? "default" : "outline"}
              onClick={() => setCurrentView("training")}
              className="flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Interactive Training
            </Button>
          </div>
        </section>

        {/* Content based on current view */}
        {currentView === "algorithm" ? (
          <section>
            <AlgorithmBreakdown />
          </section>
        ) : (
          <SimulatorPage />
        )}

        <section>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <CardTitle className="text-lg sm:text-xl font-bold">Training Process: Putting It All Together</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                During each iteration (epoch), we perform forward propagation to compute outputs and backward
                propagation to compute errors. One complete iteration is known as an epoch. It&apos;s common to report
                evaluation metrics after each epoch to watch the evolution of the neural network as it trains.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-sm">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: 1,
                      title: "Forward Pass",
                      description: "Compute network output using current parameters and calculate cost function",
                      color: "bg-blue-600",
                    },
                    {
                      step: 2,
                      title: "Backward Pass",
                      description: "Propagate errors backward and compute gradients for all parameters",
                      color: "bg-yellow-600",
                    },
                    {
                      step: 3,
                      title: "Update",
                      description: "Apply gradient descent to update all parameters and repeat until convergence",
                      color: "bg-green-600",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="text-center p-4 rounded-xl bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div
                        className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl`}
                      >
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 hover:shadow-md transition-all duration-300">
                <p className="font-semibold text-green-800 mb-2">Convergence Criteria:</p>
                <p className="text-green-700 text-sm sm:text-base">
                  Training continues until the cost function reaches a minimum threshold, gradients become very small,
                  or a maximum number of epochs is reached. The network has then learned to map inputs to desired outputs.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <CardTitle className="text-center text-lg sm:text-xl font-bold">Mastering Backpropagation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
                  <Badge className="bg-blue-100 text-blue-800 mb-3 px-4 py-2 text-sm font-medium">Mathematical Foundation</Badge>
                  <p className="text-center text-sm sm:text-base text-gray-700">
                    Chain rule enables systematic computation of gradients through composite functions in neural networks.
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
                  <Badge className="bg-yellow-100 text-yellow-800 mb-3 px-4 py-2 text-sm font-medium">Efficient Algorithm</Badge>
                  <p className="text-center text-sm sm:text-base text-gray-700">
                    Backpropagation computes all gradients in a single backward pass, making training computationally efficient.
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
                  <Badge className="bg-green-100 text-green-800 mb-3 px-4 py-2 text-sm font-medium">Scalable Solution</Badge>
                  <p className="text-center text-sm sm:text-base text-gray-700">
                    The algorithm scales to networks of any size and complexity, enabling deep learning applications.
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-purple-200 shadow-sm hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
                  <Badge className="bg-purple-100 text-purple-800 mb-3 px-4 py-2 text-sm font-medium">Universal Method</Badge>
                  <p className="text-center text-sm sm:text-base text-gray-700">
                    Backpropagation is the foundation for training virtually all modern neural network architectures.
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
