"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, TrendingDown } from "lucide-react"
import BellCurveGradient from "./bell-curve-gradient"

interface HistoryPoint {
  epoch: number
  position: number
  cost: number
}

export default function GradientDescentSimulator() {
  const [isRunning, setIsRunning] = useState(false)
  const [learningRate, setLearningRate] = useState([0.1])
  const [currentPosition, setCurrentPosition] = useState(1.5)
  const [epochs, setEpochs] = useState(0)
  const [currentCost, setCurrentCost] = useState(0)
  const [history, setHistory] = useState<HistoryPoint[]>([])

  const calculateCost = useCallback((pos: number) => 1 - Math.exp(-0.5 * pos * pos), [])
  const calculateGradient = useCallback((pos: number) => pos * Math.exp(-0.5 * pos * pos), [])

  useEffect(() => setCurrentCost(calculateCost(currentPosition)), [currentPosition, calculateCost])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setCurrentPosition((prevPos) => {
        const grad = calculateGradient(prevPos)
        const newPos = prevPos - learningRate[0] * grad

        setEpochs((prev) => prev + 1)
        setHistory((prev) => [...prev.slice(-49), { epoch: epochs + 1, position: newPos, cost: calculateCost(newPos) }])

        if (Math.abs(newPos) <= 0.01) setIsRunning(false)
        return newPos
      })
    }, 200)
    return () => clearInterval(interval)
  }, [isRunning, learningRate, calculateGradient, calculateCost, epochs])

  const reset = () => {
    setIsRunning(false)
    setCurrentPosition(1.5)
    setEpochs(0)
    setHistory([])
  }
  const startStop = () => setIsRunning((prev) => !prev)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <CardTitle className="flex items-center text-lg sm:text-xl font-bold">
              <TrendingDown className="w-5 h-5 mr-2" />
              Interactive Gradient Descent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            <div>
              <label className="block text-sm font-medium mb-2">Learning Rate (η): {learningRate[0].toFixed(3)}</label>
              <Slider
                value={learningRate}
                onValueChange={setLearningRate}
                min={0.01}
                max={0.5}
                step={0.01}
              />
              <p className="text-xs text-gray-500 mt-1">Higher rates converge faster but may overshoot.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Starting Position: {currentPosition.toFixed(3)}</label>
              <Slider
                value={[currentPosition]}
                onValueChange={(v) => !isRunning && setCurrentPosition(v[0])}
                min={-3}
                max={3}
                step={0.1}
                disabled={isRunning}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <Button
                onClick={startStop}
                className={`flex-1 flex items-center justify-center ${isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}
                disabled={Math.abs(currentPosition) <= 0.01}
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="flex-1 flex items-center justify-center border-gray-300 hover:bg-gray-100"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <Badge variant="secondary" className="px-4 py-2">Epochs: {epochs}</Badge>
              <Badge variant="secondary" className="px-4 py-2">Cost: {currentCost.toFixed(4)}</Badge>
              <Badge variant="secondary" className="px-4 py-2">Position: {currentPosition.toFixed(3)}</Badge>
            </div>

            <div className="text-center">
              {Math.abs(currentPosition) <= 0.01 ? (
                <Badge className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">✓ Converged to Global Minimum!</Badge>
              ) : (
                <Badge variant="outline" className="px-4 py-2 rounded-lg">Distance: {Math.abs(currentPosition).toFixed(4)}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-400 text-white">
            <CardTitle className="text-lg sm:text-xl font-bold">Bell Curve Cost Function</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-lg shadow-inner">
              <BellCurveGradient
                currentPosition={currentPosition}
                learningRate={learningRate[0]}
                isAnimating={isRunning}
                width={400}
                height={300}
              />
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-xl border shadow-sm text-center">
              <p className="font-semibold mb-2">Update Rule</p>
              <div className="inline-block bg-white px-4 py-2 rounded-lg border shadow-sm">
                <code className="text-sm font-mono">θ := θ - η × ∇J(θ)</code>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                <p>Gradient: {calculateGradient(currentPosition).toFixed(4)}</p>
                <p>Next: {(currentPosition - learningRate[0] * calculateGradient(currentPosition)).toFixed(4)}</p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
