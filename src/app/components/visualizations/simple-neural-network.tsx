"use client"

import { useEffect, useRef } from "react"

interface NetworkNode {
  x: number
  y: number
  label: string
  type: "input" | "linear" | "activation" | "output"
  value: number
  radius: number
}

interface NetworkConnection {
  from: number
  to: number
  weight: string
  value?: number
  color: string
}

interface SimpleNeuralNetworkProps {
  input: number
  theta1: number
  theta2: number
  target: number
  animationStep: number
  isAnimating: boolean
  width?: number
  height?: number
}

export default function SimpleNeuralNetwork({
  input,
  theta1,
  theta2,
  target,
  animationStep,
  isAnimating,
  width = 600,
  height = 400,
}: SimpleNeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size for high DPI
    canvas.width = width * 2
    canvas.height = height * 2
    ctx.scale(2, 2)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate intermediate values
    const z2 = theta1 * input + theta2
    const a2 = 1 / (1 + Math.exp(-z2))
    const z3 = a2 // For simplicity, assume weight = 1 from hidden to output
    const y = 1 / (1 + Math.exp(-z3))
    const error = y - target
    const cost = 0.5 * error * error

    // Define network nodes with calculated values
    const nodes: NetworkNode[] = [
      { x: 80, y: height / 2, label: "x", type: "input", value: input, radius: 25 },
      { x: 200, y: height / 2 - 60, label: "z⁽²⁾", type: "linear", value: z2, radius: 30 },
      { x: 200, y: height / 2 + 60, label: "a⁽²⁾", type: "activation", value: a2, radius: 30 },
      { x: 350, y: height / 2 - 60, label: "z⁽³⁾", type: "linear", value: z3, radius: 30 },
      { x: 350, y: height / 2 + 60, label: "y", type: "output", value: y, radius: 30 },
      { x: 500, y: height / 2, label: "J(θ)", type: "output", value: cost, radius: 25 },
    ]

    // Define connections
    const connections: NetworkConnection[] = [
      { from: 0, to: 1, weight: "θ₁", value: theta1, color: "#3b82f6" },
      { from: 1, to: 2, weight: "σ", color: "#10b981" },
      { from: 2, to: 3, weight: "1", value: 1, color: "#3b82f6" },
      { from: 3, to: 4, weight: "σ", color: "#10b981" },
      { from: 4, to: 5, weight: "½(y-t)²", color: "#ef4444" },
    ]

    // Add bias connection
    connections.push({ from: -1, to: 1, weight: "θ₂", value: theta2, color: "#8b5cf6" })

    // Draw connections
    connections.forEach((conn, idx) => {
      if (conn.from === -1) {
        // Bias connection
        const toNode = nodes[conn.to]
        const biasX = toNode.x - 50
        const biasY = toNode.y - 80

        // Draw bias node
        ctx.beginPath()
        ctx.arc(biasX, biasY, 15, 0, 2 * Math.PI)
        ctx.fillStyle = "#8b5cf6"
        ctx.fill()
        ctx.strokeStyle = "#7c3aed"
        ctx.lineWidth = 2
        ctx.stroke()

        // Bias label
        ctx.fillStyle = "white"
        ctx.font = "bold 12px serif"
        ctx.textAlign = "center"
        ctx.fillText("1", biasX, biasY + 4)

        // Connection line
        const isActive = isAnimating && animationStep >= idx
        ctx.strokeStyle = isActive ? "#fbbf24" : conn.color
        ctx.lineWidth = isActive ? 4 : 2
        ctx.beginPath()
        ctx.moveTo(biasX + 12, biasY + 12)
        ctx.lineTo(toNode.x - toNode.radius, toNode.y - 15)
        ctx.stroke()

        // Weight label
        const midX = (biasX + toNode.x) / 2
        const midY = (biasY + toNode.y) / 2 - 10
        ctx.fillStyle = conn.color
        ctx.font = "bold 14px serif"
        ctx.textAlign = "center"
        ctx.fillText(conn.weight, midX, midY)

        if (conn.value !== undefined) {
          ctx.font = "10px monospace"
          ctx.fillText(`(${conn.value.toFixed(2)})`, midX, midY + 15)
        }
      } else {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        const isActive = isAnimating && animationStep >= idx
        ctx.strokeStyle = isActive ? "#fbbf24" : conn.color
        ctx.lineWidth = isActive ? 4 : 2

        // Calculate connection points
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
        ctx.stroke()

        // Arrow head for activation functions
        if (conn.weight === "σ") {
          const arrowSize = 8
          const angle = Math.atan2(dy, dx)
          ctx.beginPath()
          ctx.moveTo(endX, endY)
          ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6))
          ctx.moveTo(endX, endY)
          ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6))
          ctx.stroke()
        }

        // Weight labels
        const midX = (startX + endX) / 2
        const midY = (startY + endY) / 2 - 15
        ctx.fillStyle = conn.color
        ctx.font = "bold 14px serif"
        ctx.textAlign = "center"
        ctx.fillText(conn.weight, midX, midY)

        if (conn.value !== undefined) {
          ctx.font = "10px monospace"
          ctx.fillText(`(${conn.value.toFixed(2)})`, midX, midY + 15)
        }
      }
    })

    // Draw nodes
    nodes.forEach((node, idx) => {
      const isActive = isAnimating && animationStep >= idx

      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)

      // Node colors based on type
      let fillColor = "#6b7280"
      if (node.type === "input") fillColor = "#10b981"
      else if (node.type === "linear") fillColor = "#8b5cf6"
      else if (node.type === "activation") fillColor = "#f59e0b"
      else if (node.type === "output") fillColor = "#ef4444"

      if (isActive) {
        fillColor = "#fbbf24"
      }

      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.strokeStyle = "#374151"
      ctx.lineWidth = 2
      ctx.stroke()

      // Node labels
      ctx.fillStyle = "white"
      ctx.font = "bold 14px serif"
      ctx.textAlign = "center"
      ctx.fillText(node.label, node.x, node.y + 4)

      // Value labels below nodes
      ctx.fillStyle = "#374151"
      ctx.font = "12px monospace"
      ctx.fillText(node.value.toFixed(4), node.x, node.y + node.radius + 20)

      // Add pulsing effect for active nodes
      if (isActive) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 5, 0, 2 * Math.PI)
        ctx.strokeStyle = "#fbbf24"
        ctx.lineWidth = 3
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])
      }
    })

    // Add target value display
    ctx.fillStyle = "#374151"
    ctx.font = "14px serif"
    ctx.textAlign = "left"
    ctx.fillText(`Target (t): ${target.toFixed(3)}`, 20, height - 40)
    ctx.fillText(`Error: ${error.toFixed(4)}`, 20, height - 20)

    // Add layer labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px serif"
    ctx.textAlign = "center"
    ctx.fillText("Input", 80, 30)
    ctx.fillText("Hidden Layer", 200, 30)
    ctx.fillText("Output Layer", 350, 30)
    ctx.fillText("Cost", 500, 30)
  }, [input, theta1, theta2, target, animationStep, isAnimating, width, height])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg bg-white shadow-sm"
      />
      <div className="mt-4 text-sm text-gray-600 text-center max-w-lg">
        <p className="font-semibold mb-1">Simple Neural Network Architecture</p>
        <p className="text-xs">
          One input neuron → One hidden layer neuron → One output neuron. Values shown below each node represent current
          computations.
        </p>
      </div>
    </div>
  )
}
