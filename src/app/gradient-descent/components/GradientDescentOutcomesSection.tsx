import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Zap } from "lucide-react";

export default function GradientDescentOutcomesSection() {
  return (
    <section>
      <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-gray-100">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-gray-700 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl font-bold">
            🎓 Key Learning Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-blue-100 text-blue-800 mb-4 px-6 py-2 text-lg font-semibold">
                Mathematical Foundation
              </Badge>
              <p className="text-gray-700 leading-relaxed">
                Master the chain rule to compute gradients through composite
                functions systematically, enabling optimization of complex
                neural network architectures.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-800 mb-4 px-6 py-2 text-lg font-semibold">
                Optimization Process
              </Badge>
              <p className="text-gray-700 leading-relaxed">
                Understand how gradient descent iteratively moves parameters
                toward the global minimum, balancing convergence speed with
                stability through careful learning rate selection.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-purple-100 text-purple-800 mb-4 px-6 py-2 text-lg font-semibold">
                Practical Application
              </Badge>
              <p className="text-gray-700 leading-relaxed">
                Apply gradient descent variants (batch, stochastic, mini-batch)
                effectively based on dataset size, computational constraints,
                and convergence requirements.
              </p>
            </div>
          </div>
          <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
            <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">
              Next Steps in Your ML Journey
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-700 mb-2">
                  Advanced Topics to Explore:
                </h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Adaptive learning rates (Adam, RMSprop)</li>
                  <li>• Momentum and acceleration techniques</li>
                  <li>• Second-order optimization methods</li>
                  <li>• Regularization and overfitting prevention</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700 mb-2">
                  Practical Applications:
                </h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Training deep neural networks</li>
                  <li>• Computer vision and image recognition</li>
                  <li>• Natural language processing</li>
                  <li>• Reinforcement learning algorithms</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
