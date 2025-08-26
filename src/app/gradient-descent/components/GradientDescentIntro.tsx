import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calculator } from "lucide-react";
import MathEquation from "@/app/components/shared/math-equation";

export default function GradientDescentIntro() {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-slate-50 to-blue-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-xl">
          <BookOpen className="w-6 h-6 mr-3" />
          What is Gradient Descent?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Gradient descent is a{" "}
            <strong className="text-blue-700">
              first-order iterative optimization algorithm
            </strong>{" "}
            for finding a local minimum of a differentiable function. It&apos;s
            the backbone of machine learning model training, powering everything
            from linear regression to deep neural networks.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
            <p className="font-bold text-blue-800 mb-3 text-lg">
              🎯 Core Intuition:
            </p>
            <p className="text-blue-700 leading-relaxed">
              Imagine you&apos;re hiking down a mountain in thick fog. You can
              only feel the slope beneath your feet. Gradient descent works
              similarly - it uses the gradient (slope) to determine the steepest
              downhill direction, then takes steps in that direction to reach
              the valley (minimum cost).
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
            <h4 className="font-bold text-emerald-800 mb-4 text-lg flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Mathematical Foundation:
            </h4>
            <div className="mb-4 text-center bg-white p-4 rounded-lg shadow-sm">
              <MathEquation equation="\theta_{new} = \theta_{old} - \eta \nabla J(\theta)" />
            </div>
            <div className="text-emerald-700 leading-relaxed">
              <p className="mb-3 font-semibold">Parameter Breakdown:</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-emerald-800">η (eta)</p>
                  <p className="text-sm">Learning rate - controls step size</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-emerald-800">∇J(θ)</p>
                  <p className="text-sm">
                    Gradient - direction of steepest ascent
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-emerald-800">θ</p>
                  <p className="text-sm">Model parameters to optimize</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
