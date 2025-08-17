"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MathEquation from "@/app/components/shared/math-equation"
import { ArrowRight, Calculator, Zap } from "lucide-react"

interface ForwardPropagationStepsProps {
  input: number
  theta1: number
  theta2: number
  target: number
  currentStep: number
}

export default function ForwardPropagationSteps({
  input,
  theta1,
  theta2,
  target,
  currentStep,
}: ForwardPropagationStepsProps) {
  // Calculate intermediate values
  const z2 = theta1 * input + theta2
  const a2 = 1 / (1 + Math.exp(-z2))
  const z3 = a2 // Assuming weight = 1 from hidden to output
  const y = 1 / (1 + Math.exp(-z3))
  const error = y - target
  const cost = 0.5 * error * error

  const steps = [
    {
      title: "Step 1: Linear Combination",
      icon: Calculator,
      color: "border-purple-500 bg-purple-50",
      equation: "z^{(2)} = \\theta_1 x + \\theta_2",
      calculation: `z⁽²⁾ = ${theta1.toFixed(3)} × ${input.toFixed(3)} + ${theta2.toFixed(3)} = ${z2.toFixed(4)}`,
      explanation: "Compute the weighted sum of inputs plus bias term.",
      active: currentStep >= 0,
    },
    {
      title: "Step 2: Hidden Layer Activation",
      icon: Zap,
      color: "border-yellow-500 bg-yellow-50",
      equation: "a^{(2)} = \\sigma(z^{(2)}) = \\frac{1}{1 + e^{-z^{(2)}}}",
      calculation: `a⁽²⁾ = σ(${z2.toFixed(4)}) = ${a2.toFixed(4)}`,
      explanation: "Apply sigmoid activation function to the linear combination.",
      active: currentStep >= 1,
    },
    {
      title: "Step 3: Output Linear Combination",
      icon: Calculator,
      color: "border-blue-500 bg-blue-50",
      equation: "z^{(3)} = a^{(2)} \\cdot 1",
      calculation: `z⁽³⁾ = ${a2.toFixed(4)} × 1 = ${z3.toFixed(4)}`,
      explanation: "For simplicity, we assume unit weight from hidden to output layer.",
      active: currentStep >= 2,
    },
    {
      title: "Step 4: Output Activation",
      icon: Zap,
      color: "border-green-500 bg-green-50",
      equation: "y = \\sigma(z^{(3)}) = \\frac{1}{1 + e^{-z^{(3)}}}",
      calculation: `y = σ(${z3.toFixed(4)}) = ${y.toFixed(4)}`,
      explanation: "Apply sigmoid activation to get the final output prediction.",
      active: currentStep >= 3,
    },
    {
      title: "Step 5: Cost Calculation",
      icon: ArrowRight,
      color: "border-red-500 bg-red-50",
      equation: "J(\\theta) = \\frac{1}{2}(y - t)^2",
      calculation: `J(θ) = ½(${y.toFixed(4)} - ${target.toFixed(3)})² = ${cost.toFixed(6)}`,
      explanation: "Compute the squared error between prediction and target.",
      active: currentStep >= 4,
    },
  ]

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card
          key={index}
          className={`transition-all duration-300 ${step.color} ${
            step.active ? "ring-2 ring-blue-300 shadow-lg" : "opacity-60"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <step.icon className="w-5 h-5 mr-3" />
              {step.title}
              {step.active && <Badge className="ml-auto bg-blue-600">Active</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Mathematical equation */}
              <div className="bg-white p-3 rounded border">
                <MathEquation equation={step.equation} />
              </div>

              {/* Numerical calculation */}
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                <p className="font-semibold text-gray-800">{step.calculation}</p>
              </div>

              {/* Explanation */}
              <p className="text-sm text-gray-700 leading-relaxed">{step.explanation}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
