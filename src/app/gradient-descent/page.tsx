"use client"

import PageLayout from "@/app/components/shared/page-layout"
import MathEquation from "@/app/components/shared/math-equation"
import StepByStepDerivation from "@/app/components/shared/step-by-step-derivation"
import GradientDescentSimulator from "@/app/components/visualizations/gradient-descent-simulator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calculator, TrendingDown, Zap, Brain, Target, Layers, AlertTriangle, CheckCircle, Info } from "lucide-react"

export default function GradientDescentPage() {
  const chainRuleSteps = [
    {
      title: "Define the Cost Function",
      equation: "J(\\theta) = \\frac{1}{2}(\\sigma(\\theta_1 x + \\theta_2) - t)^2",
      explanation: "The cost function quantifies the squared error between the model&apos;s prediction \\(\\sigma(\\theta_1 x + \\theta_2)\\) and the target \\(t\\). Our goal is to minimize this error by adjusting parameters \\(\\theta_1\\) and \\(\\theta_2\\) using gradient descent."
    },
    {
      title: "Chain Rule for \\(\\theta_1\\)",
      equation: "\\frac{\\partial J(\\theta)}{\\partial \\theta_1} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial \\theta_1}",
      explanation: "The chain rule decomposes the gradient of the cost \\(J\\) with respect to \\(\\theta_1\\) through intermediate variables \\(y = \\sigma(z)\\) and \\(z = \\theta_1 x + \\theta_2\\), tracing the effect of \\(\\theta_1\\) on the cost."
    },
    {
      title: "Compute \\(\\partial J / \\partial y\\)",
      equation: "\\frac{\\partial J}{\\partial y} = \\frac{\\partial}{\\partial y} \\left[ \\frac{1}{2}(y - t)^2 \\right] = y - t",
      explanation: "Differentiating the squared error term with respect to the output \\(y\\) gives the prediction error \\(y - t\\), indicating how sensitive the cost is to changes in the prediction."
    },
    {
      title: "Compute \\(\\partial y / \\partial z\\)",
      equation: "\\frac{\\partial y}{\\partial z} = \\frac{\\partial \\sigma(z)}{\\partial z} = \\sigma(z)(1 - \\sigma(z)) = y(1 - y)",
      explanation: "The derivative of the sigmoid function \\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\) simplifies to \\(y(1 - y)\\), which is used in the gradient computation."
    },
    {
      title: "Compute \\(\\partial z / \\partial \\theta_1\\)",
      equation: "\\frac{\\partial z}{\\partial \\theta_1} = \\frac{\\partial}{\\partial \\theta_1} (\\theta_1 x + \\theta_2) = x",
      explanation: "The linear combination \\(z = \\theta_1 x + \\theta_2\\) has a derivative of \\(x\\) with respect to \\(\\theta_1\\), showing the direct influence of the input \\(x\\)."
    },
    {
      title: "Gradient for \\(\\theta_1\\)",
      equation: "\\frac{\\partial J(\\theta)}{\\partial \\theta_1} = (y - t) \\cdot y(1 - y) \\cdot x",
      explanation: "Multiplying all chain rule components gives the gradient for \\(\\theta_1\\), guiding the parameter update in gradient descent."
    },
    {
      title: "Chain Rule for \\(\\theta_2\\)",
      equation: "\\frac{\\partial J(\\theta)}{\\partial \\theta_2} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial \\theta_2}",
      explanation: "Similarly, the gradient for \\(\\theta_2\\) is computed by tracing its effect through \\(y\\) and \\(z\\)."
    },
    {
      title: "Compute \\(\\partial z / \\partial \\theta_2\\)",
      equation: "\\frac{\\partial z}{\\partial \\theta_2} = \\frac{\\partial}{\\partial \\theta_2} (\\theta_1 x + \\theta_2) = 1",
      explanation: "Differentiating \\(z\\) with respect to \\(\\theta_2\\) gives 1, as \\(\\theta_2\\)&apos;s coefficient is constant."
    },
    {
      title: "Gradient for \\(\\theta_2\\)",
      equation: "\\frac{\\partial J(\\theta)}{\\partial \\theta_2} = (y - t) \\cdot y(1 - y)",
      explanation: "Combining the terms yields the gradient for \\(\\theta_2\\), used to update the parameter and reduce the cost function."
    }
  ]


  const learningRateEffects = [
    {
      rate: "Too High (η > 1.0)",
      effect: "Overshooting",
      description: "May miss the minimum or cause divergence",
      color: "bg-red-100 border-red-300 text-red-800",
      icon: AlertTriangle
    },
    {
      rate: "Optimal (0.01 - 0.1)",
      effect: "Balanced",
      description: "Steady convergence with good stability",
      color: "bg-green-100 border-green-300 text-green-800",
      icon: CheckCircle
    },
    {
      rate: "Too Low (η < 0.001)",
      effect: "Slow Progress",
      description: "Very slow convergence, may get stuck",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      icon: Info
    }
  ];

  const algorithmVariants = [
    {
      name: "Batch Gradient Descent",
      equation: "\\theta = \\theta - \\eta \\frac{1}{m} \\sum_{i=1}^{m} \\nabla J(\\theta, x^{(i)}, y^{(i)})",
      description: "Uses entire dataset for each update. Most stable but computationally expensive.",
      pros: ["Guaranteed convergence", "Stable updates", "Smooth loss curve"],
      cons: ["Slow for large datasets", "Memory intensive", "May get stuck in local minima"]
    },
    {
      name: "Stochastic Gradient Descent",
      equation: "\\theta = \\theta - \\eta \\nabla J(\\theta, x^{(i)}, y^{(i)})",
      description: "Updates parameters using one sample at a time. Fast but noisy.",
      pros: ["Fast updates", "Can escape local minima", "Online learning capable"],
      cons: ["Noisy convergence", "May overshoot minimum", "Requires careful tuning"]
    },
    {
      name: "Mini-Batch Gradient Descent",
      equation: "\\theta = \\theta - \\eta \\frac{1}{|B|} \\sum_{i \\in B} \\nabla J(\\theta, x^{(i)}, y^{(i)})",
      description: "Balances batch and stochastic approaches using small batches.",
      pros: ["Good balance of speed/stability", "Efficient GPU utilization", "Reduced variance"],
      cons: ["Requires batch size tuning", "Still some noise", "Memory considerations"]
    }
  ];

  return (
    <PageLayout
      title="Gradient Descent"
      description="Master the optimization algorithm that powers machine learning through interactive visualizations, mathematical foundations, and practical insights."
    >
      <div className="space-y-16">
        <section>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
                      Gradient descent is a <strong className="text-blue-700">first-order iterative optimization algorithm</strong> for finding a
                      local minimum of a differentiable function. It&apos;s the backbone of machine learning model training,
                      powering everything from linear regression to deep neural networks.
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
                      <p className="font-bold text-blue-800 mb-3 text-lg">🎯 Core Intuition:</p>
                      <p className="text-blue-700 leading-relaxed">
                        Imagine you&apos;re hiking down a mountain in thick fog. You can only feel the slope beneath your feet.
                        Gradient descent works similarly - it uses the gradient (slope) to determine the steepest downhill direction,
                        then takes steps in that direction to reach the valley (minimum cost).
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
                            <p className="text-sm">Gradient - direction of steepest ascent</p>
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
            </div>

            <div className="space-y-6">
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                  <CardTitle className="text-lg flex items-center">
                    <Layers className="w-5 h-5 mr-2" />
                    Key Components
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <Calculator className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-800">Cost Function J(θ)</p>
                        <p className="text-sm text-gray-600 leading-relaxed">Quantifies prediction error and guides optimization direction</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <TrendingDown className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-800">Gradient ∇J(θ)</p>
                        <p className="text-sm text-gray-600 leading-relaxed">Vector pointing toward steepest increase in cost</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <Zap className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-800">Learning Rate η</p>
                        <p className="text-sm text-gray-600 leading-relaxed">Controls step size and convergence behavior</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-800">Parameters θ</p>
                        <p className="text-sm text-gray-600 leading-relaxed">Model weights and biases being optimized</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="text-lg flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Learning Rate Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {learningRateEffects.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className={`p-3 rounded-lg border-2 ${item.color} hover:shadow-md transition-all duration-300 transform hover:scale-105`}>
                          <div className="flex items-start space-x-2">
                            <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-xs">{item.rate}</p>
                              <p className="font-semibold text-xs">{item.effect}</p>
                              <p className="text-xs leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Interactive Bell Curve Visualization</h2>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <GradientDescentSimulator />
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 sm:mb-10 lg:mb-12 text-gray-900 tracking-tight">
            Algorithm Variants Comparison
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {algorithmVariants.map((variant, index) => (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card
                  className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden"
                  aria-label={`Comparison of ${variant.name}`}
                >
                  <CardHeader
                    className={`bg-gradient-to-r ${index === 0 ? "from-indigo-600 to-blue-600" : index === 1 ? "from-teal-600 to-green-600" : "from-violet-600 to-purple-600"
                      } text-white p-4 sm:p-5 flex items-center justify-between`}
                  >
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-bold">{variant.name}</CardTitle>
                    <Badge
                      className={`${index === 0 ? "bg-indigo-200 text-indigo-900" : index === 1 ? "bg-teal-200 text-teal-900" : "bg-violet-200 text-violet-900"
                        } px-2 py-1 text-xs font-semibold`}
                    >
                      {index === 0 ? "Stable" : index === 1 ? "Fast" : "Balanced"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 max-w-full overflow-x-auto">
                        <MathEquation
                          equation={variant.equation}
                          className="text-sm sm:text-base md:text-lg w-full min-w-[200px]"
                          aria-describedby={`equation-desc-${index}`}
                        />
                        <span id={`equation-desc-${index}`} className="sr-only">{`Mathematical equation for ${variant.name}`}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">{variant.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <h4 className="font-bold text-green-700 mb-2 text-xs sm:text-sm lg:text-base flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Advantages
                          </h4>
                          <ul className="space-y-1">
                            {variant.pros.map((pro, i) => (
                              <li key={i} className="text-xs sm:text-sm text-green-600 leading-relaxed flex items-start">
                                <span className="mr-1">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-700 mb-2 text-xs sm:text-sm lg:text-base flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Disadvantages
                          </h4>
                          <ul className="space-y-1">
                            {variant.cons.map((con, i) => (
                              <li key={i} className="text-xs sm:text-sm text-red-600 leading-relaxed flex items-start">
                                <span className="mr-1">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <style jsx>{`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
  `}</style>
        </section>


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
                  If <strong className="text-indigo-700">f(x)</strong> and <strong className="text-indigo-700">x(t)</strong> are univariate functions,
                  the derivative of their composition follows the chain rule:
                </p>

                <div className="bg-white p-6 rounded-xl border-2 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <MathEquation equation="\frac{d}{dt}f(x(t)) = \frac{df}{dx} \cdot \frac{dx}{dt}" />
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-200 hover:shadow-md transition-all duration-300">
                  <p className="text-yellow-800 font-semibold mb-2">🔗 Chain Rule Analogy:</p>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    Think of it as a relay race where each runner (function) passes the derivative &ldquo;baton&ldquo; to the next runner.
                    The final speed depends on how fast each runner passes the baton through the entire chain.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                  <p className="text-purple-800 font-semibold mb-2">💡 Key Insight:</p>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    This rule breaks complex derivatives into manageable steps, making it possible to compute gradients
                    in deep neural networks with hundreds of layers through backpropagation.
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
                    A univariate logistic regression model transforms input <strong className="text-green-700">x</strong>
                    into a prediction <strong className="text-green-700">y</strong> through three key stages:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <MathEquation equation="z = \theta_1 x + \theta_2" />
                      <div className="flex items-center justify-center mt-3">
                        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">Linear Combination</Badge>
                      </div>
                      <p className="text-xs text-blue-700 text-center mt-2">Weighted input plus bias</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <MathEquation equation="y = \sigma(z) = \frac{1}{1 + e^{-z}}" />
                      <div className="flex items-center justify-center mt-3">
                        <Badge className="bg-green-100 text-green-800 px-3 py-1">Sigmoid Activation</Badge>
                      </div>
                      <p className="text-xs text-green-700 text-center mt-2">Squashes output to [0,1] range</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <MathEquation equation="J(\theta) = \frac{1}{2}(y - t)^2" />
                      <div className="flex items-center justify-center mt-3">
                        <Badge className="bg-red-100 text-red-800 px-3 py-1">Mean Squared Error</Badge>
                      </div>
                      <p className="text-xs text-red-700 text-center mt-2">Measures prediction accuracy</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                    <p className="text-purple-800 font-semibold mb-2">🏗️ Architecture Flow:</p>
                    <p className="text-purple-700 text-sm leading-relaxed">
                      Input → Linear Transformation → Activation Function → Cost Calculation → Gradient Computation → Parameter Update
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Mathematical Derivation</h2>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <StepByStepDerivation
              steps={chainRuleSteps}
              title="Computing ∂J/∂θ₁ and ∂J/∂θ₂ using Chain Rule"
            />
          </div>
        </section>

        <section>
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-gray-100">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-gray-700 text-white rounded-t-lg">
              <CardTitle className="text-center text-2xl font-bold">🎓 Key Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 mb-4 px-6 py-2 text-lg font-semibold">Mathematical Foundation</Badge>
                  <p className="text-gray-700 leading-relaxed">
                    Master the chain rule to compute gradients through composite functions systematically,
                    enabling optimization of complex neural network architectures.
                  </p>
                </div>

                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 mb-4 px-6 py-2 text-lg font-semibold">Optimization Process</Badge>
                  <p className="text-gray-700 leading-relaxed">
                    Understand how gradient descent iteratively moves parameters toward the global minimum,
                    balancing convergence speed with stability through careful learning rate selection.
                  </p>
                </div>

                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 mb-4 px-6 py-2 text-lg font-semibold">Practical Application</Badge>
                  <p className="text-gray-700 leading-relaxed">
                    Apply gradient descent variants (batch, stochastic, mini-batch) effectively based on dataset size,
                    computational constraints, and convergence requirements.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">Next Steps in Your ML Journey</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-2">Advanced Topics to Explore:</h4>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>• Adaptive learning rates (Adam, RMSprop)</li>
                      <li>• Momentum and acceleration techniques</li>
                      <li>• Second-order optimization methods</li>
                      <li>• Regularization and overfitting prevention</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-700 mb-2">Practical Applications:</h4>
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
      </div>
    </PageLayout>
  )
}