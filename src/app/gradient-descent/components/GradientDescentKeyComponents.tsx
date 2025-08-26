import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingDown, Zap, Brain } from "lucide-react";

export default function GradientDescentKeyComponents() {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <span className="inline-flex items-center">
            <Calculator className="w-5 h-5 mr-2" /> Key Components
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
            <Calculator className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Cost Function J(θ)</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Quantifies prediction error and guides optimization direction
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
            <TrendingDown className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Gradient ∇J(θ)</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vector pointing toward steepest increase in cost
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
            <Zap className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Learning Rate η</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Controls step size and convergence behavior
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
            <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Parameters θ</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Model weights and biases being optimized
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
