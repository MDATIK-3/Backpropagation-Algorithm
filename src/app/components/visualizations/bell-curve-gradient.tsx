"use client"

import { useEffect, useRef } from "react"

interface BellCurveGradientProps {
  currentPosition: number
  learningRate: number
  isAnimating: boolean
  width?: number
  height?: number
}

export default function BellCurveGradient({
  currentPosition,
  learningRate,
  isAnimating,
  width = 400,
  height = 300,
}: BellCurveGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width * 2
    canvas.height = height * 2
    ctx.scale(2, 2)
    ctx.clearRect(0, 0, width, height)

    const margin = 40
    const viewRange = 4
    const minX = -viewRange
    const maxX = viewRange
    const centerY = height - margin
    const maxY = margin

    const mapX = (theta: number) => {
      const clamped = Math.max(minX, Math.min(maxX, theta))
      return margin + ((clamped - minX) / (maxX - minX)) * (width - 2 * margin)
    }

    const mapY = (cost: number) => centerY - (centerY - maxY) * cost

    const xTicks = [-3, -2, -1, 0, 1, 2, 3]
    const yTicks = [0, 0.25, 0.5, 0.75, 1]

    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    xTicks.forEach((tick) => {
      const x = mapX(tick)
      ctx.beginPath()
      ctx.moveTo(x, maxY)
      ctx.lineTo(x, centerY)
      ctx.stroke()
    })

    yTicks.forEach((tick) => {
      const y = mapY(tick)
      ctx.beginPath()
      ctx.moveTo(margin, y)
      ctx.lineTo(width - margin, y)
      ctx.stroke()
    })

    const gradient = ctx.createLinearGradient(0, maxY, 0, centerY)
    gradient.addColorStop(0, "#ef4444")
    gradient.addColorStop(0.5, "#f59e0b")
    gradient.addColorStop(1, "#10b981")

    ctx.beginPath()
    for (let x = minX; x <= maxX; x += 0.01) {
      const canvasX = mapX(x)
      const y = 1 - Math.exp(-0.5 * x * x)
      const canvasY = mapY(y)
      if (x === minX) ctx.moveTo(canvasX, canvasY)
      else ctx.lineTo(canvasX, canvasY)
    }
    ctx.lineTo(mapX(maxX), centerY)
    ctx.lineTo(mapX(minX), centerY)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    for (let x = minX; x <= maxX; x += 0.01) {
      const canvasX = mapX(x)
      const y = 1 - Math.exp(-0.5 * x * x)
      const canvasY = mapY(y)
      if (x === minX) ctx.moveTo(canvasX, canvasY)
      else ctx.lineTo(canvasX, canvasY)
    }
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(margin, centerY)
    ctx.lineTo(width - margin, centerY)
    ctx.strokeStyle = "#1f2937"
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(margin, centerY)
    ctx.lineTo(margin, maxY)
    ctx.stroke()

    ctx.fillStyle = "#1f2937"
    ctx.font = "16px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    xTicks.forEach((tick) => {
      const x = mapX(tick)
      ctx.beginPath()
      ctx.moveTo(x, centerY)
      ctx.lineTo(x, centerY + 8)
      ctx.stroke()
      ctx.fillText(tick.toString(), x, centerY + 12)
    })

    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    yTicks.forEach((tick) => {
      const y = mapY(tick)
      ctx.beginPath()
      ctx.moveTo(margin - 8, y)
      ctx.lineTo(margin, y)
      ctx.stroke()
      ctx.fillText(tick.toFixed(2), margin - 12, y)
    })

    const currentX = mapX(currentPosition)
    const currentY = mapY(1 - Math.exp(-0.5 * currentPosition * currentPosition))
    ctx.beginPath()
    ctx.arc(currentX, currentY, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()
    ctx.strokeStyle = "#1e40af"
    ctx.lineWidth = 3
    ctx.stroke()

    if (isAnimating) {
      ctx.beginPath()
      ctx.arc(currentX, currentY, 12, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
      ctx.fill()
    }

    if (isAnimating && Math.abs(currentPosition) > 0.1) {
      const arrowLength = learningRate * 50
      const direction = currentPosition > 0 ? -1 : 1
      const arrowEndX = currentX + direction * arrowLength
      const arrowEndY = currentY - 20

      ctx.beginPath()
      ctx.moveTo(currentX, currentY - 10)
      ctx.lineTo(arrowEndX, arrowEndY)
      ctx.strokeStyle = "#dc2626"
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(arrowEndX, arrowEndY)
      ctx.lineTo(arrowEndX - direction * 8, arrowEndY - 5)
      ctx.lineTo(arrowEndX - direction * 8, arrowEndY + 5)
      ctx.closePath()
      ctx.fillStyle = "#dc2626"
      ctx.fill()
    }

    ctx.fillStyle = "#1f2937"
    ctx.font = "18px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("θ (Parameter)", width / 2, height - 20)

    ctx.save()
    ctx.translate(20, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("J(θ) (Cost)", 0, 0)
    ctx.restore()

    ctx.beginPath()
    ctx.arc(mapX(0), mapY(0), 4, 0, 2 * Math.PI)
    ctx.fillStyle = "#10b981"
    ctx.fill()
    ctx.strokeStyle = "#059669"
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = "#059669"
    ctx.font = "14px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "bottom"
    ctx.fillText("Global Minimum", mapX(0), mapY(0) - 10)
  }, [currentPosition, learningRate, isAnimating, width, height])

  return (
    <div className="flex flex-col items-center w-full">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg bg-white shadow-sm w-full max-w-[400px] sm:max-w-[500px]"
      />
      <div className="mt-2 text-sm text-gray-600 text-center">
        <p>Cost Function Landscape</p>
        <p className="text-xs">Blue dot: current position • Red arrow: gradient direction</p>
      </div>
    </div>
  )
}
