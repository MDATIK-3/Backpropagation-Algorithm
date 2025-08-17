"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MathEquation from "@/app/components/shared/math-equation"
import { ArrowLeft, Link } from "lucide-react"

interface BackpropChainRuleProps {
  input: number
  theta1: number
  theta2: number
  target: number
}

export default function BackpropChainRule({ input, theta1, theta2, target }: BackpropChainRuleProps) {
  // Calculate forward pass values
  const z2 = theta1 * input + theta2
  const a2 = 1 / (1 + Math.exp(-z2))
  const y = a2 // Simplified: assuming direct connection to output
  const error = y - target

  // Calculate gradients
  const dJ_dy = error
  const dy_dz2 = a2 * (1 - a2) // sigmoid derivative
  const dz2_dtheta1 = input
  const dz2_dtheta2 = 1

  const dJ_dtheta1 = dJ_dy * dy_dz2 * dz2_dtheta1
  const dJ_dtheta2 = dJ_dy * dy_dz2 * dz2_dtheta2

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2 text-red-600" />
            Backpropagation Chain Rule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            To update our parameters, we need to compute how the cost function changes with respect to each weight.
            We&apos;ll use the chain rule to trace the error backward through the network.
          </p>
        </CardContent>
      </Card>

      {/* Chain rule for theta1 */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Link className="w-5 h-5 mr-2 text-blue-600" />
            Computing ∂J/∂θ₁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Chain Rule Structure:</p>
              <MathEquation equation="\\frac{\\partial J}{\\partial \\theta_1} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z^{(2)}} \\cdot \\frac{\\partial z^{(2)}}{\\partial \\theta_1}" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-100 p-3 rounded">
                <p className="font-semibold text-red-800 text-sm mb-1">∂J/∂y</p>
                <MathEquation equation="\\frac{\\partial J}{\\partial y} = y - t" inline />
                <p className="text-xs text-red-700 mt-1">= {dJ_dy.toFixed(4)}</p>
              </div>

              <div className="bg-yellow-100 p-3 rounded">
                <p className="font-semibold text-yellow-800 text-sm mb-1">∂y/∂z⁽²⁾</p>
                <MathEquation equation="\\frac{\\partial y}{\\partial z^{(2)}} = y(1-y)" inline />
                <p className="text-xs text-yellow-700 mt-1">= {dy_dz2.toFixed(4)}</p>
              </div>

              <div className="bg-green-100 p-3 rounded">
                <p className="font-semibold text-green-800 text-sm mb-1">∂z⁽²⁾/∂θ₁</p>
                <MathEquation equation="\\frac{\\partial z^{(2)}}{\\partial \\theta_1} = x" inline />
                <p className="text-xs text-green-700 mt-1">= {dz2_dtheta1.toFixed(4)}</p>
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="font-semibold mb-2">Final Result:</p>
              <MathEquation equation="\\frac{\\partial J}{\\partial \\theta_1} = (y - t) \\cdot y(1-y) \\cdot x" />
              <p className="text-center font-mono text-lg mt-2">= {dJ_dtheta1.toFixed(6)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chain rule for theta2 */}
      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Link className="w-5 h-5 mr-2 text-purple-600" />
            Computing ∂J/∂θ₂
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Chain Rule Structure:</p>
              <MathEquation equation="\\frac{\\partial J}{\\partial \\theta_2} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z^{(2)}} \\cdot \\frac{\\partial z^{(2)}}{\\partial \\theta_2}" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-100 p-3 rounded">
                <p className="font-semibold text-red-800 text-sm mb-1">∂J/∂y</p>
                <p className="text-xs text-red-700">Same as above</p>
                <p className="text-xs text-red-700 mt-1">= {dJ_dy.toFixed(4)}</p>
              </div>

              <div className="bg-yellow-100 p-3 rounded">
                <p className="font-semibold text-yellow-800 text-sm mb-1">∂y/∂z⁽²⁾</p>
                <p className="text-xs text-yellow-700">Same as above</p>
                <p className="text-xs text-yellow-700 mt-1">= {dy_dz2.toFixed(4)}</p>
              </div>

              <div className="bg-green-100 p-3 rounded">
                <p className="font-semibold text-green-800 text-sm mb-1">∂z⁽²⁾/∂θ₂</p>
                <MathEquation equation="\\frac{\\partial z^{(2)}}{\\partial \\theta_2} = 1" inline />
                <p className="text-xs text-green-700 mt-1">= {dz2_dtheta2.toFixed(4)}</p>
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="font-semibold mb-2">Final Result:</p>
              <MathEquation equation="\\frac{\\partial J}{\\partial \\theta_2} = (y - t) \\cdot y(1-y) \\cdot 1" />
              <p className="text-center font-mono text-lg mt-2">= {dJ_dtheta2.toFixed(6)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gradient descent update */}
      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="text-lg text-green-700">Parameter Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">Using gradient descent with learning rate η, we update our parameters:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">θ₁ Update:</p>
                <MathEquation equation="\\theta_1^{new} = \\theta_1^{old} - \\eta \\frac{\\partial J}{\\partial \\theta_1}" />
                <p className="text-sm text-gray-600 mt-2">Current gradient: {dJ_dtheta1.toFixed(6)}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">θ₂ Update:</p>
                <MathEquation equation="\\theta_2^{new} = \\theta_2^{old} - \\eta \\frac{\\partial J}{\\partial \\theta_2}" />
                <p className="text-sm text-gray-600 mt-2">Current gradient: {dJ_dtheta2.toFixed(6)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
