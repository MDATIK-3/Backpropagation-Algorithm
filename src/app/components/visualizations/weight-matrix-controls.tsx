"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import MathEquation from "@/app/components/shared/math-equation"
import { CodeIcon as Matrix, Layers } from "lucide-react"

interface WeightMatrixControlsProps {
  weightsLayer1: [[number, number], [number, number]]
  weightsLayer2: [[number, number], [number, number]]
  onWeightsLayer1Change: (weights: [[number, number], [number, number]]) => void
  onWeightsLayer2Change: (weights: [[number, number], [number, number]]) => void
}

export default function WeightMatrixControls({
  weightsLayer1,
  weightsLayer2,
  onWeightsLayer1Change,
  onWeightsLayer2Change,
}: WeightMatrixControlsProps) {
  const updateWeight1 = (i: number, j: number, value: number) => {
    const newWeights = weightsLayer1.map((row, rowIndex) =>
      row.map((weight, colIndex) => (rowIndex === i && colIndex === j ? value : weight)),
    ) as [[number, number], [number, number]]
    onWeightsLayer1Change(newWeights)
  }

  const updateWeight2 = (i: number, j: number, value: number) => {
    const newWeights = weightsLayer2.map((row, rowIndex) =>
      row.map((weight, colIndex) => (rowIndex === i && colIndex === j ? value : weight)),
    ) as [[number, number], [number, number]]
    onWeightsLayer2Change(newWeights)
  }

  return (
    <div className="space-y-6">
      {/* Layer 1 Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Matrix className="w-5 h-5 mr-2 text-blue-600" />
            Layer 1 Weight Matrix θ⁽¹⁾
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">Matrix notation:</p>
              <MathEquation equation="\\Theta^{(1)} = \\begin{bmatrix} \\theta^{(1)}_{11} & \\theta^{(1)}_{12} \\\\ \\theta^{(1)}_{21} & \\theta^{(1)}_{22} \\end{bmatrix}" />
              <p className="text-xs text-blue-700 text-center mt-2">θ⁽¹⁾ᵢⱼ: weight from input j to hidden neuron i</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {weightsLayer1.map((row, i) =>
                row.map((weight, j) => (
                  <div key={`${i}-${j}`}>
                    <label className="block text-sm font-medium mb-2">
                      θ⁽¹⁾{i + 1}
                      {j + 1}: {weight.toFixed(3)}
                    </label>
                    <Slider
                      value={[weight]}
                      onValueChange={(value) => updateWeight1(i, j, value[0])}
                      max={2}
                      min={-2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>-2.0</span>
                      <span>2.0</span>
                    </div>
                  </div>
                )),
              )}
            </div>

            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              <div className="grid grid-cols-2 gap-2 text-center">
                <Badge variant="outline" className="justify-center">
                  {weightsLayer1[0][0].toFixed(3)}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {weightsLayer1[0][1].toFixed(3)}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {weightsLayer1[1][0].toFixed(3)}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {weightsLayer1[1][1].toFixed(3)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layer 2 Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="w-5 h-5 mr-2 text-purple-600" />
            Layer 2 Weight Matrix θ⁽²⁾
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800 mb-2">Matrix notation:</p>
              <MathEquation equation="\\Theta^{(2)} = \\begin{bmatrix} \\theta^{(2)}_{11} & \\theta^{(2)}_{12} \\\\ \\theta^{(2)}_{21} & \\theta^{(2)}_{22} \\end{bmatrix}" />
              <p className="text-xs text-purple-700 text-center mt-2">
                θ⁽²⁾ᵢⱼ: weight from hidden neuron j to output i
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {weightsLayer2.map((row, i) =>
                row.map((weight, j) => (
                  <div key={`${i}-${j}`}>
                    <label className="block text-sm font-medium mb-2">
                      θ⁽²⁾{i + 1}
                      {j + 1}: {weight.toFixed(3)}
                    </label>
                    <Slider
                      value={[weight]}
                      onValueChange={(value) => updateWeight2(i, j, value[0])}
                      max={2}
                      min={-2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>-2.0</span>
                      <span>2.0</span>
                    </div>
                  </div>
                )),
              )}
            </div>

            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              <div className="grid grid-cols-2 gap-2 text-center">
                <Badge variant="outline" className="justify-center">
                  {weightsLayer2[0][0].toFixed(3)}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {weightsLayer2[0][1].toFixed(3)}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {weightsLayer2[1][0].toFixed(3)}
                </Badge>
                <Badge variant="outline" className="justify-center">
                  {weightsLayer2[1][1].toFixed(3)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
