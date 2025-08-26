import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Badge } from "lucide-react";
import MathEquation from "@/app/components/shared/math-equation";

export default function GradientDescentChainRuleSection() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Univariate Chain Rule Foundation
      </h2>
      <div className="grid lg:grid-cols-2 gap-10">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold flex items-center">
              <Brain className="w-6 h-6 mr-3" />
              Chain Rule Intuition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              If <strong className="text-indigo-700">f(x)</strong> and{" "}
              <strong className="text-indigo-700">x(t)</strong> are univariate
              functions, the derivative of their composition follows the chain
              rule:
            </p>
            <div className="bg-white p-6 rounded-xl border-2 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <MathEquation
                equation="\\frac{d}{dt}f(x(t)) = \\frac{df}{dx} \\cdot \\frac{dx}{dt}"
                inline={false}
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-200 hover:shadow-md transition-all duration-300">
              <p className="text-yellow-800 font-semibold mb-2">
                🔗 Chain Rule Analogy:
              </p>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Think of it as a relay race where each runner (function) passes
                the derivative &ldquo;baton&ldquo; to the next runner. The final
                speed depends on how fast each runner passes the baton through
                the entire chain.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
              <p className="text-purple-800 font-semibold mb-2">
                💡 Key Insight:
              </p>
              <p className="text-purple-700 text-sm leading-relaxed">
                This rule breaks complex derivatives into manageable steps,
                making it possible to compute gradients in deep neural networks
                with hundreds of layers through backpropagation.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold flex items-center">
              <Target className="w-6 h-6 mr-3" />
              Logistic Model Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                A univariate logistic regression model transforms input{" "}
                <strong className="text-green-700">x</strong>
                into a prediction <strong className="text-green-700">
                  y
                </strong>{" "}
                through three key stages:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <MathEquation
                    equation="z = \\theta_1 x + \\theta_2"
                    inline={false}
                  />
                  <div className="flex items-center justify-center mt-3">
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                      Linear Combination
                    </Badge>
                  </div>
                  <p className="text-xs text-blue-700 text-center mt-2">
                    Weighted input plus bias
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <MathEquation
                    equation="y = \\sigma(z) = \\frac{1}{1 + e^{-z}}"
                    inline={false}
                  />
                  <div className="flex items-center justify-center mt-3">
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">
                      Sigmoid Activation
                    </Badge>
                  </div>
                  <p className="text-xs text-green-700 text-center mt-2">
                    Squashes output to [0,1] range
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <MathEquation
                    equation="J(\\theta) = \\frac{1}{2}(y - t)^2"
                    inline={false}
                  />
                  <div className="flex items-center justify-center mt-3">
                    <Badge className="bg-red-100 text-red-800 px-3 py-1">
                      Mean Squared Error
                    </Badge>
                  </div>
                  <p className="text-xs text-red-700 text-center mt-2">
                    Measures prediction accuracy
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                <p className="text-purple-800 font-semibold mb-2">
                  🏗️ Architecture Flow:
                </p>
                <p className="text-purple-700 text-sm leading-relaxed">
                  Input → Linear Transformation → Activation Function → Cost
                  Calculation → Gradient Computation → Parameter Update
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
