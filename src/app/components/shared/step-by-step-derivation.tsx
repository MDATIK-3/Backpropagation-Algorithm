"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MathEquation from "./math-equation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DerivationStep {
  title: string
  equation: string
  explanation: string
}

interface StepByStepDerivationProps {
  steps: DerivationStep[]
  title?: string
}

export default function StepByStepDerivation({ steps, title = "Step-by-Step Derivation" }: StepByStepDerivationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  // Utility to split text and render LaTeX inside \( ... \) using MathEquation
  const renderTextWithMath = (text: string) => {
    const parts = text.split(/(\\\(.*?\\\))/g) // split by \( ... \)
    return parts.map((part, idx) =>
      part.startsWith("\\(") && part.endsWith("\\)") ? (
        <MathEquation
          key={idx}
          equation={part.slice(2, -2)} // remove \( \)
          inline={true}
        />
      ) : (
        <span key={idx}>{part}</span>
      )
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <h4 className="font-semibold">{renderTextWithMath(steps[currentStep].title)}</h4>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <MathEquation equation={steps[currentStep].equation} />
          </div>
          <p className="text-gray-700 bg-blue-50 p-4 rounded-lg leading-relaxed">
            {renderTextWithMath(steps[currentStep].explanation)}
          </p>

          {/* Progress indicator */}
          <div className="flex space-x-1 justify-center mt-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer hover:scale-110 transform ${
                  index === currentStep ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
