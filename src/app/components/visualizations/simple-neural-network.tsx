import { useEffect, useRef, useCallback, useState } from "react"

interface NetworkNode {
  x: number
  y: number
  label: string
  type: "input" | "bias" | "linear" | "activation" | "output" | "cost"
  value: number
  radius: number
}

interface NetworkConnection {
  from: number
  to: number
  weight: string
  value?: number
  color: string
  type: "weight" | "activation" | "cost"
}

interface SimpleNeuralNetworkProps {
  input?: number
  theta1?: number
  theta2?: number
  target?: number
  animationStep?: number
  isAnimating?: boolean
  width?: number
  height?: number,
  onParamChange?: (params: { input: number; theta1: number; theta2: number; target: number }) => void;
}

export default function SimpleNeuralNetwork({
  input = 0.5,
  theta1 = 1.2,
  theta2 = -0.3,
  target = 0.8,
  animationStep = 0,
  isAnimating = false,
  width = 700,
  height = 450,
  onParamChange
}: SimpleNeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useState({ input, theta1, theta2, target })
  const [currentAnimationStep, setCurrentAnimationStep] = useState(animationStep)
  const [isPlaying, setIsPlaying] = useState(isAnimating)

  useEffect(() => {
    setParams({ input, theta1, theta2, target });
  }, [input, theta1, theta2, target]);

  const sigmoid = (x: number) => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))))

  const drawNetwork = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const canvasWidth = rect.width
    const canvasHeight = rect.height

    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const scaleX = canvasWidth / width
    const scaleY = canvasHeight / height
    const scale = Math.min(scaleX, scaleY)
    const offsetX = (canvasWidth - width * scale) / 2
    const offsetY = (canvasHeight - height * scale) / 2

    ctx.save()
    ctx.translate(offsetX, offsetY)
    ctx.scale(scale, scale)

    const baseRadius = 30
    const nodeRadius = baseRadius

    const x = params.input
    const w1 = params.theta1
    const b1 = params.theta2
    const z1 = w1 * x + b1
    const a1 = sigmoid(z1)

    const w2 = 1.0
    const b2 = 0.0
    const z2 = w2 * a1 + b2
    const y = sigmoid(z2)

    const t = params.target
    const error = y - t
    const cost = 0.5 * error * error

    const nodes: NetworkNode[] = [
      { x: 100, y: 225, label: "x", type: "input", value: x, radius: nodeRadius },
      { x: 100, y: 125, label: "1", type: "bias", value: 1, radius: nodeRadius * 0.7 },
      { x: 300, y: 175, label: "z₁", type: "linear", value: z1, radius: nodeRadius },
      { x: 300, y: 275, label: "a₁", type: "activation", value: a1, radius: nodeRadius },
      { x: 500, y: 175, label: "z₂", type: "linear", value: z2, radius: nodeRadius },
      { x: 500, y: 275, label: "y", type: "output", value: y, radius: nodeRadius },
      { x: 600, y: 225, label: "J", type: "cost", value: cost, radius: nodeRadius },
    ]

    const connections: NetworkConnection[] = [
      { from: 0, to: 2, weight: "θ₁", value: w1, color: "#3b82f6", type: "weight" },
      { from: 1, to: 2, weight: "θ₂", value: b1, color: "#8b5cf6", type: "weight" },
      { from: 2, to: 3, weight: "σ", color: "#10b981", type: "activation" },
      { from: 3, to: 4, weight: "w₂", value: w2, color: "#3b82f6", type: "weight" },
      { from: 4, to: 5, weight: "σ", color: "#10b981", type: "activation" },
      { from: 5, to: 6, weight: "½(y-t)²", color: "#ef4444", type: "cost" },
    ]

    const isHighlighted = (index: number) => isPlaying && currentAnimationStep >= index

    connections.forEach((conn, idx) => {
      const fromNode = nodes[conn.from]
      const toNode = nodes[conn.to]
      const highlighted = isHighlighted(idx)

      const dx = toNode.x - fromNode.x
      const dy = toNode.y - fromNode.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const unitX = dx / distance
      const unitY = dy / distance

      const startX = fromNode.x + unitX * fromNode.radius
      const startY = fromNode.y + unitY * fromNode.radius
      const endX = toNode.x - unitX * toNode.radius
      const endY = toNode.y - unitY * toNode.radius

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = highlighted ? "#fbbf24" : conn.color
      ctx.lineWidth = highlighted ? 4 : 2.5
      ctx.stroke()

      if (conn.type === "activation") {
        const arrowSize = 12
        const angle = Math.atan2(dy, dx)
        ctx.beginPath()
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle - Math.PI / 6),
          endY - arrowSize * Math.sin(angle - Math.PI / 6)
        )
        ctx.moveTo(endX, endY)
        ctx.lineTo(
          endX - arrowSize * Math.cos(angle + Math.PI / 6),
          endY - arrowSize * Math.sin(angle + Math.PI / 6)
        )
        ctx.strokeStyle = highlighted ? "#fbbf24" : conn.color
        ctx.lineWidth = highlighted ? 3 : 2
        ctx.stroke()
      }

      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      const labelWidth = 60
      const labelHeight = conn.value !== undefined ? 35 : 20
      ctx.fillRect(midX - labelWidth / 2, midY - labelHeight / 2 - 10, labelWidth, labelHeight)

      ctx.fillStyle = highlighted ? "#fbbf24" : conn.color
      ctx.font = "bold 16px serif"
      ctx.textAlign = "center"
      ctx.fillText(conn.weight, midX, midY - 5)

      if (conn.value !== undefined) {
        ctx.fillStyle = "#374151"
        ctx.font = "12px monospace"
        ctx.fillText(`(${conn.value.toFixed(2)})`, midX, midY + 12)
      }
    })

    nodes.forEach((node, idx) => {
      const highlighted = isHighlighted(idx)

      let fillColor = "#6b7280"
      let strokeColor = "#374151"

      switch (node.type) {
        case "input": fillColor = "#10b981"; break
        case "bias": fillColor = "#8b5cf6"; break
        case "linear": fillColor = "#3b82f6"; break
        case "activation": fillColor = "#f59e0b"; break
        case "output": fillColor = "#ef4444"; break
        case "cost": fillColor = "#dc2626"; break
      }

      if (highlighted) {
        fillColor = "#fbbf24"
        strokeColor = "#f59e0b"
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 3
      ctx.stroke()

      if (highlighted) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 8, 0, 2 * Math.PI)
        ctx.strokeStyle = "rgba(251, 191, 36, 0.4)"
        ctx.lineWidth = 6
        ctx.stroke()
      }

      ctx.fillStyle = "white"
      ctx.font = "bold 16px serif"
      ctx.textAlign = "center"
      ctx.fillText(node.label, node.x, node.y + 5)

      ctx.fillStyle = "#374151"
      ctx.font = "bold 14px monospace"
      const valueText = Math.abs(node.value) < 0.0001 ? "0.0000" : node.value.toFixed(4)
      ctx.fillText(valueText, node.x, node.y + node.radius + 20)
    })

    ctx.fillStyle = "#6b7280"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"

    ctx.fillText("Input Layer", 100, 50)
    ctx.fillText("Hidden Layer", 300, 50)
    ctx.fillText("Output Layer", 500, 50)
    ctx.fillText("Loss", 600, 50)

    ctx.fillStyle = "#374151"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "left"

    ctx.fillText(`Target: ${t.toFixed(3)}`, 50, height - 60)
    ctx.fillText(`Error: ${error.toFixed(4)}`, 50, height - 40)
    ctx.fillText(`Cost: ${cost.toFixed(6)}`, 50, height - 20)

    ctx.fillStyle = "#6b7280"
    ctx.font = "12px monospace"
    ctx.textAlign = "right"

    ctx.fillText(`z₁ = θ₁×x + θ₂ = ${z1.toFixed(3)}`, width - 50, height - 80)
    ctx.fillText(`a₁ = σ(z₁) = ${a1.toFixed(3)}`, width - 50, height - 60)
    ctx.fillText(`z₂ = w₂×a₁ = ${z2.toFixed(3)}`, width - 50, height - 40)
    ctx.fillText(`y = σ(z₂) = ${y.toFixed(3)}`, width - 50, height - 20)

    ctx.restore()
  }, [params, currentAnimationStep, isPlaying, width, height])

  useEffect(() => {
    drawNetwork()
  }, [drawNetwork])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentAnimationStep(prev => {
        if (prev >= 6) {
          setIsPlaying(false)
          return 0
        }
        return prev + 1
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleParamChange = (param: keyof typeof params, value: number) => {
    setParams((prev) => {
      const newParams = { ...prev, [param]: value };
      onParamChange?.(newParams);
      return newParams;
    });
  };

  const startAnimation = () => {
    setCurrentAnimationStep(0)
    setIsPlaying(true)
  }

  const resetAnimation = () => {
    setCurrentAnimationStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Simple Neural Network Visualization
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Interactive visualization of forward propagation in a single-layer neural network
        </p>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-[400px] border-2 border-gray-200 rounded-lg bg-gray-50 shadow-inner mb-6"
        style={{ maxWidth: `${width}px`, height: `${height}px` }}
      />

      <div className="w-full max-w-2xl space-y-4">
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {isPlaying ? "Playing..." : "Start Animation"}
          </button>
          <button
            onClick={resetAnimation}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Input (x): {params.input.toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={params.input}
              onChange={(e) => handleParamChange('input', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Weight θ₁: {params.theta1.toFixed(2)}
            </label>
            <input
              type="range"
              min="-3"
              max="3"
              step="0.01"
              value={params.theta1}
              onChange={(e) => handleParamChange('theta1', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Bias θ₂: {params.theta2.toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={params.theta2}
              onChange={(e) => handleParamChange('theta2', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Target (t): {params.target.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={params.target}
              onChange={(e) => handleParamChange('target', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend:</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Input</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Bias</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Linear</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Activation</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Output</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Cost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
