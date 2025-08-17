"use client"

import { useState} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MathEquation from "@/app/components/shared/math-equation"
import { ArrowRight, ArrowLeft, RotateCcw, Calculator, Zap, TrendingDown, Brain, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AlgorithmStep {
  title: string
  description: string
  equations: string[]
  explanation: string
  insight: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export default function AlgorithmBreakdown() {
  const [currentStep, setCurrentStep] = useState(0)

  const algorithmSteps: AlgorithmStep[] = [
    {
      title: "Initialize Parameters",
      description: "Start with random weights and set hyperparameters",
      equations: [
        "\\theta_1^{(0)} = \\text{random}(-0.1, 0.1)",
        "\\theta_2^{(0)} = \\text{random}(-0.1, 0.1)",
        "\\eta = 0.01",
      ],
      explanation:
        "Initialize weights with small random values to break symmetry and avoid zero gradients. The learning rate \\(\\eta\\) controls step size, typically set between 0.001 and 0.1 for stability.",
      insight: "Random initialization prevents identical updates across neurons, while a well-chosen \\(\\eta\\) balances convergence speed and stability.",
      icon: RotateCcw,
      color: "border-gray-500 bg-gray-50",
    },
    {
      title: "Forward Propagation",
      description: "Compute network output from input to prediction",
      equations: [
        "z^{(2)} = \\theta_1 x + \\theta_2",
        "a^{(2)} = \\sigma(z^{(2)}) = \\frac{1}{1 + e^{-z^{(2)}}}",
        "\\hat{y} = a^{(2)}",
      ],
      explanation:
        "Transform input \\(x\\) through a linear combination and sigmoid activation to produce the prediction \\(\\hat{y}\\). This simulates the forward pass in a neural network.",
      insight: "The sigmoid function ensures outputs are in [0,1], suitable for binary classification, but may cause vanishing gradients in deep networks.",
      icon: ArrowRight,
      color: "border-indigo-500 bg-indigo-50",
    },
    {
      title: "Compute Cost",
      description: "Calculate the error between prediction and target",
      equations: [
        "J(\\theta) = \\frac{1}{2}(\\hat{y} - t)^2",
        "\\text{error} = \\hat{y} - t",
      ],
      explanation:
        "The mean squared error measures the difference between the predicted \\(\\hat{y}\\) and target \\(t\\). This cost guides the optimization process.",
      insight: "MSE is intuitive but sensitive to outliers; alternatives like cross-entropy loss are often used for classification tasks.",
      icon: Calculator,
      color: "border-rose-500 bg-rose-50",
    },
    {
      title: "Backward Propagation",
      description: "Compute gradients using the chain rule",
      equations: [
        "\\frac{\\partial J}{\\partial \\theta_1} = (\\hat{y} - t) \\cdot \\hat{y}(1 - \\hat{y}) \\cdot x",
        "\\frac{\\partial J}{\\partial \\theta_2} = (\\hat{y} - t) \\cdot \\hat{y}(1 - \\hat{y})",
      ],
      explanation:
        "Apply the chain rule to compute gradients of the cost with respect to parameters \\(\\theta_1\\) and \\(\\theta_2\\), propagating errors backward through the network.",
      insight: "Backpropagation efficiently computes gradients for all parameters, enabling scalable training of deep neural networks.",
      icon: ArrowLeft,
      color: "border-amber-500 bg-amber-50",
    },
    {
      title: "Update Parameters",
      description: "Apply gradient descent to minimize cost",
      equations: [
        "\\theta_1^{(t+1)} = \\theta_1^{(t)} - \\eta \\frac{\\partial J}{\\partial \\theta_1}",
        "\\theta_2^{(t+1)} = \\theta_2^{(t)} - \\eta \\frac{\\partial J}{\\partial \\theta_2}",
      ],
      explanation:
        "Adjust parameters by moving opposite to the gradient direction, scaled by \\(\\eta\\). This iteratively reduces the cost function.",
      insight: "Small \\(\\eta\\) ensures stability but slows convergence; large \\(\\eta\\) risks overshooting the minimum.",
      icon: TrendingDown,
      color: "border-teal-500 bg-teal-50",
    },
    {
      title: "Check Convergence",
      description: "Determine if training should continue",
      equations: [
        "\\text{if } |J(\\theta)| < \\epsilon \\text{ or } t \\geq \\text{max\\_epochs}",
        "\\text{then STOP, else repeat from step 2}",
      ],
      explanation:
        "Evaluate if the cost is below threshold \\(\\epsilon\\) or max epochs are reached. If not, continue iterating to refine parameters.",
      insight: "Early stopping or adaptive thresholds prevent overfitting and reduce computational cost.",
      icon: Zap,
      color: "border-violet-500 bg-violet-50",
    },
    {
      title: "Regularization",
      description: "Add penalty to prevent overfitting",
      equations: [
        "J(\\theta) = \\frac{1}{2}(\\hat{y} - t)^2 + \\lambda (\\theta_1^2 + \\theta_2^2)",
        "\\frac{\\partial J}{\\partial \\theta_1} = (\\hat{y} - t) \\cdot \\hat{y}(1 - \\hat{y}) \\cdot x + 2\\lambda \\theta_1",
      ],
      explanation:
        "Add an L2 regularization term to the cost function to penalize large weights, improving model generalization.",
      insight: "Regularization reduces overfitting but requires tuning \\(\\lambda\\) to balance bias and variance.",
      icon: Shield,
      color: "border-cyan-500 bg-cyan-50",
    },
    {
      title: "Momentum Update",
      description: "Accelerate gradient descent with momentum",
      equations: [
        "v_1^{(t+1)} = \\beta v_1^{(t)} + (1 - \\beta) \\frac{\\partial J}{\\partial \\theta_1}",
        "\\theta_1^{(t+1)} = \\theta_1^{(t)} - \\eta v_1^{(t+1)}",
      ],
      explanation:
        "Incorporate momentum to smooth gradient updates, using velocity \\(v_1\\) to accelerate convergence, especially in regions with consistent gradients.",
      insight: "Momentum helps escape local minima and speeds up training, with \\(\\beta\\) typically set to 0.9.",
      icon: Brain,
      color: "border-purple-500 bg-purple-50",
    },
  ]

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, algorithmSteps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const currentAlgorithmStep = algorithmSteps[currentStep]

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center justify-between text-lg sm:text-xl lg:text-2xl">
            Complete Backpropagation Algorithm
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={nextStep}
                disabled={currentStep === algorithmSteps.length - 1}
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                aria-label="Next step"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-center space-x-2 mb-4 flex-wrap gap-2">
            {algorithmSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${index === currentStep
                    ? "bg-indigo-600 text-white scale-110"
                    : index < currentStep
                      ? "bg-teal-200 text-teal-800 hover:bg-teal-300"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                aria-current={index === currentStep ? "true" : "false"}
                aria-label={`Go to step ${index + 1}: ${step.title}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="text-center">
            <Badge className="bg-indigo-100 text-indigo-800 px-3 py-1 text-sm">
              Step {currentStep + 1} of {algorithmSteps.length}
            </Badge>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`${currentAlgorithmStep.color} border-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl backdrop-blur-sm bg-opacity-80`}>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center text-lg sm:text-xl lg:text-2xl text-gray-900">
                <currentAlgorithmStep.icon className="w-6 h-6 mr-3 text-gray-700" />
                {currentAlgorithmStep.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-6">
                <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">{currentAlgorithmStep.description}</p>
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                  <p className="font-semibold mb-4 text-gray-800 text-sm sm:text-base">Mathematical Formulation:</p>
                  <div className="space-y-3">
                    {currentAlgorithmStep.equations.map((equation, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded border border-gray-100">
                        <MathEquation
                          equation={equation}
                          className="text-sm sm:text-base md:text-lg"
                          aria-describedby={`equation-${currentStep}-${index}`}
                        />
                        <span id={`equation-${currentStep}-${index}`} className="sr-only">{`Equation ${index + 1} for ${currentAlgorithmStep.title}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-semibold text-indigo-800 mb-2 text-sm sm:text-base">Explanation:</p>
                  <p className="text-indigo-700 leading-relaxed text-sm sm:text-base">{currentAlgorithmStep.explanation}</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                  <p className="font-semibold text-teal-800 mb-2 text-sm sm:text-base">Key Insight:</p>
                  <p className="text-teal-700 leading-relaxed text-sm sm:text-base">{currentAlgorithmStep.insight}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900">Algorithm Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <Badge className="bg-indigo-100 text-indigo-800 mb-2 px-4 py-2 text-sm sm:text-base">Forward Pass</Badge>
              <p className="text-sm sm:text-base text-gray-700">Compute predictions from inputs using current parameters</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <Badge className="bg-amber-100 text-amber-800 mb-2 px-4 py-2 text-sm sm:text-base">Backward Pass</Badge>
              <p className="text-sm sm:text-base text-gray-700">Calculate gradients using chain rule and error propagation</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <Badge className="bg-teal-100 text-teal-800 mb-2 px-4 py-2 text-sm sm:text-base">Parameter Update</Badge>
              <p className="text-sm sm:text-base text-gray-700">Adjust weights using gradient descent optimization</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Process Flow:</p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Input → Forward Propagation → Cost Calculation → Backward Propagation → Parameter Update → Convergence Check
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}