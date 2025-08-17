"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Settings, Play, Pause, RotateCcw, BarChart3, TrendingDown, Activity, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler, Legend, Tooltip } from "chart.js"
import MathEquation from "@/app/components/shared/math-equation"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Legend, Tooltip)

interface TrainingState {
  epoch: number
  weights: { theta1: number; theta2: number }
  cost: number
  gradients: { dTheta1: number; dTheta2: number }
  output: number
  error: number
  accuracy: number
}

interface TrainingParams {
  input: number
  target: number
  initialWeights: { theta1: number; theta2: number }
  learningRate: number
}

export function GradientDescentSimulator() {
  const [trainingParams, setTrainingParams] = useState<TrainingParams>({
    input: 0.5,
    target: 0.8,
    initialWeights: { theta1: 0.5, theta2: -0.5 },
    learningRate: 0.1,
  })

  const { input, target, initialWeights, learningRate } = trainingParams
  
  const [isTraining, setIsTraining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentState, setCurrentState] = useState<TrainingState>({
    epoch: 0,
    weights: { ...initialWeights },
    cost: 0,
    gradients: { dTheta1: 0, dTheta2: 0 },
    output: 0,
    error: 0,
    accuracy: 0,
  })
  const [history, setHistory] = useState<TrainingState[]>([])
  const [showMetrics, setShowMetrics] = useState<"cost" | "accuracy" | "both">("both")
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isTrainingRef = useRef(isTraining)
  
  const convergenceThreshold = 0.0001
  const trainingInterval = 200

  const forwardPass = useCallback((weights: { theta1: number; theta2: number }) => {
    try {
      const normalizedInput = Math.max(-10, Math.min(10, input))
      const z = weights.theta1 * normalizedInput + weights.theta2
      const output = Number.isFinite(z) ? 1 / (1 + Math.exp(-z)) : z > 0 ? 1 : 0
      const errorValue = output - target
      const cost = 0.5 * errorValue * errorValue
      const accuracy = 100 - Math.abs(errorValue * 100)
      
      if (!Number.isFinite(cost)) throw new Error("Cost is not finite.")
      
      return { output, error: errorValue, cost, accuracy }
    } catch (err) {
      setError("Error in forward pass. Check for extreme parameter values.")
      return { output: 0, error: 0, cost: Infinity, accuracy: 0 }
    }
  }, [input, target])

  const backwardPass = useCallback((output: number, error: number) => {
    try {
      const sigmoidDerivative = output * (1 - output)
      const normalizedInput = Math.max(-10, Math.min(10, input))
      const dTheta1 = error * sigmoidDerivative * normalizedInput
      const dTheta2 = error * sigmoidDerivative

      if (!Number.isFinite(dTheta1) || !Number.isFinite(dTheta2)) {
        throw new Error("Gradients are not finite.")
      }

      return { dTheta1, dTheta2 }
    } catch (err) {
      setError("Error in backward pass. Check for extreme parameter values.")
      return { dTheta1: 0, dTheta2: 0 }
    }
  }, [input])

  const trainStep = useCallback(() => {
    if (!isTrainingRef.current) {
      return
    }

    setCurrentState(prevState => {
      if (!isTrainingRef.current) return prevState

      try {
        const { output, error, cost, accuracy } = forwardPass(prevState.weights)

        if (!Number.isFinite(cost)) {
          setIsTraining(false)
          isTrainingRef.current = false
          setError("Training diverged! Adjust parameters and reset.")
          return prevState
        }

        const gradients = backwardPass(output, error)
        const newWeights = {
          theta1: Math.max(-10, Math.min(10, prevState.weights.theta1 - learningRate * gradients.dTheta1)),
          theta2: Math.max(-10, Math.min(10, prevState.weights.theta2 - learningRate * gradients.dTheta2)),
        }

        const newState: TrainingState = {
          epoch: prevState.epoch + 1,
          weights: newWeights, cost, gradients, output, error, accuracy,
        }

        setHistory(prevHist => [...prevHist, newState].slice(-100))
        return newState
      } catch (err) {
        setError("A critical error occurred during the training step. Please reset.")
        setIsTraining(false)
        isTrainingRef.current = false
        return prevState
      }
    })
  }, [learningRate, forwardPass, backwardPass])

  const resetTraining = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsTraining(false)
    isTrainingRef.current = false
    setError(null)
    const initialState = {
      epoch: 0,
      weights: { ...initialWeights },
      cost: 0,
      gradients: { dTheta1: 0, dTheta2: 0 },
      output: 0,
      error: 0,
      accuracy: 0,
    }
    setCurrentState(initialState)
    setHistory([])
  }, [initialWeights])

  // CHANGED: This is the definitive, corrected toggle function.
  const toggleTraining = useCallback(() => {
    const currentlyTraining = isTrainingRef.current;

    if (currentlyTraining) {
      // --- STOP LOGIC ---
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isTrainingRef.current = false;
      setIsTraining(false);
    } else {
      // --- START LOGIC ---
      setError(null);
      isTrainingRef.current = true;
      setIsTraining(true);

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(trainStep, trainingInterval);
    }
  }, [trainStep, trainingInterval]);


  // CHANGED: The useEffect to sync the ref is no longer needed and has been removed.

  useEffect(() => {
    resetTraining()
  }, [input, target, initialWeights, learningRate, resetTraining])

  useEffect(() => {
    if (isTrainingRef.current && currentState.cost < convergenceThreshold) {
      toggleTraining()
    }
  }, [currentState.cost, toggleTraining])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
  
  // (The rest of the component&apos;s UI code remains the same as before)
  const getTrainingInsight = useCallback(() => {
    if (error) {
      return { message: error, color: "bg-rose-50 text-rose-700 border-rose-500" }
    }
    if (currentState.cost < convergenceThreshold && currentState.epoch > 0) {
        return { message: "Convergence achieved! The model has learned.", color: "bg-teal-50 text-teal-700 border-teal-500" }
    }
    if (isTraining && (Math.abs(currentState.gradients.dTheta1) > 10 || Math.abs(currentState.gradients.dTheta2) > 10)) {
        return { message: "Exploding gradients! Lower the learning rate or reset.", color: "bg-rose-50 text-rose-700 border-rose-500" }
    }
    if (isTraining && currentState.cost > 0.1 && currentState.epoch > 50) {
        return { message: "Convergence is slow. Try increasing the learning rate.", color: "bg-amber-50 text-amber-700 border-amber-500" }
    }
    if (!isTraining && history.length > 0 && !(currentState.cost < convergenceThreshold)) {
        return { message: "Training paused. Press Start to resume.", color: "bg-sky-50 text-sky-700 border-sky-500"}
    }
    return { message: "Ready to train. Adjust parameters and press Start.", color: "bg-gray-100 text-gray-700 border-gray-400" }
  }, [currentState, error, convergenceThreshold, isTraining, history])

  const insight = getTrainingInsight()

  const chartData = useMemo(() => ({
    data: {
      labels: history.map((h) => h.epoch),
      datasets: [
        ...(showMetrics === "cost" || showMetrics === "both"
          ? [{
              label: "Cost",
              data: history.map((h) => h.cost),
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              fill: true,
              tension: 0.4,
            }]
          : []),
        ...(showMetrics === "accuracy" || showMetrics === "both"
          ? [{
              label: "Accuracy (%)",
              data: history.map((h) => h.accuracy),
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              fill: true,
              tension: 0.4,
            }]
          : []),
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" as const }, tooltip: { mode: "index" as const, intersect: false } },
      scales: { x: { title: { display: true, text: "Epoch" } }, y: { title: { display: true, text: "Value" }, beginAtZero: true } },
    },
  }), [history, showMetrics])
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Training Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button onClick={toggleTraining} className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white ${isTraining ? "animate-pulse" : ""}`} aria-label={isTraining ? "Pause training" : "Start training"}>
                    {isTraining ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isTraining ? "Pause" : "Start"}
                  </Button>
                  <Button variant="outline" onClick={resetTraining} className="border-indigo-500 text-indigo-600 hover:bg-indigo-50" aria-label="Reset training">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  <Stat label="Epoch" value={currentState.epoch} />
                  <Stat label="Cost" value={currentState.cost.toFixed(6)} color={currentState.cost > 0.01 ? "red" : "green"} />
                  <Stat label="Output (ŷ)" value={currentState.output.toFixed(4)} />
                  <Stat label="Error" value={currentState.error.toFixed(4)} />
                  <Stat label="Accuracy" value={`${currentState.accuracy.toFixed(2)}%`} color="blue" />
                </div>
              </CardContent>
            </Card>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg sm:text-xl">
                            <BarChart3 className="w-5 h-5 mr-2 text-teal-600" /> Training Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Button variant={showMetrics === "both" ? "default" : "outline"} onClick={() => setShowMetrics("both")} size="sm">Both</Button>
                            <Button variant={showMetrics === "cost" ? "default" : "outline"} onClick={() => setShowMetrics("cost")} size="sm">Cost</Button>
                            <Button variant={showMetrics === "accuracy" ? "default" : "outline"} onClick={() => setShowMetrics("accuracy")} size="sm">Accuracy</Button>
                        </div>
                        {history.length > 1 ? (
                            <Line data={chartData.data} options={chartData.options} />
                        ) : (
                            <p className="text-gray-500 text-center py-10">Start training to see progress.</p>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg sm:text-xl">
                            <AlertTriangle className="w-5 h-5 mr-2 text-rose-600" /> Training Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <div className={`${insight.color} p-4 rounded-lg border-l-4`}>
                            <p>{insight.message}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Settings className="w-5 h-5 mr-2 text-indigo-600" />
                  Hyperparameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div>
                  <label className="block font-medium mb-2" htmlFor="lr-slider">Learning Rate (η): {learningRate.toFixed(2)}</label>
                  <Slider id="lr-slider" value={[learningRate]} onValueChange={(v) => setTrainingParams(p => ({ ...p, learningRate: v[0] }))} max={1} min={0.01} step={0.01} />
                </div>
                <div>
                  <label className="block font-medium mb-2" htmlFor="input-slider">Input (x): {input.toFixed(2)}</label>
                  <Slider id="input-slider" value={[input]} onValueChange={(v) => setTrainingParams(p => ({ ...p, input: v[0] }))} max={2} min={-2} step={0.1} />
                </div>
                <div>
                  <label className="block font-medium mb-2" htmlFor="target-slider">Target (t): {target.toFixed(2)}</label>
                  <Slider id="target-slider" value={[target]} onValueChange={(v) => setTrainingParams(p => ({ ...p, target: v[0] }))} max={1} min={0} step={0.05} />
                </div>
                <div>
                  <label className="block font-medium mb-2" htmlFor="theta1-slider">Initial θ₁: {initialWeights.theta1.toFixed(2)}</label>
                  <Slider id="theta1-slider" value={[initialWeights.theta1]} onValueChange={(v) => setTrainingParams(p => ({ ...p, initialWeights: { ...p.initialWeights, theta1: v[0] } }))} max={2} min={-2} step={0.1} />
                </div>
                <div>
                  <label className="block font-medium mb-2" htmlFor="theta2-slider">Initial θ₂: {initialWeights.theta2.toFixed(2)}</label>
                  <Slider id="theta2-slider" value={[initialWeights.theta2]} onValueChange={(v) => setTrainingParams(p => ({ ...p, initialWeights: { ...p.initialWeights, theta2: v[0] } }))} max={2} min={-2} step={0.1} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg backdrop-blur-sm bg-white/80 border border-gray-200 rounded-xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Model Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                 <Param name="θ₁ (Weight)" value={currentState.weights.theta1} gradient={currentState.gradients.dTheta1} />
                 <Param name="θ₂ (Bias)" value={currentState.weights.theta2} gradient={currentState.gradients.dTheta2} />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string | number; color?: string }) {
  const colorMap: Record<string, string> = {
    red: "bg-rose-100 text-rose-800",
    green: "bg-teal-100 text-teal-800",
    blue: "bg-indigo-100 text-indigo-800",
  }
  return (
    <div className="text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <Badge variant="secondary" className={`w-full py-2 text-sm font-bold ${color ? colorMap[color] : "bg-gray-100 text-gray-800"}`}>
        {value}
      </Badge>
    </div>
  )
}

function Param({ name, value, gradient }: { name: string; value: number; gradient: number }) {
  return (
    <div className="p-3 rounded-lg border bg-gray-50 border-gray-200 space-y-1">
        <div className="flex justify-between items-center font-semibold text-gray-700">
            <span>{name}</span>
            <Badge className="bg-indigo-100 text-indigo-800">{value.toFixed(4)}</Badge>
        </div>
        <div className="text-xs text-gray-600">
            <p>Gradient (∂J/∂θ): <span className="font-mono">{gradient.toExponential(2)}</span></p>
        </div>
    </div>
  )
}