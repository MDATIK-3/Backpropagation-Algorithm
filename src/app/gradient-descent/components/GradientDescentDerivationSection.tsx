import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepByStepDerivation from "@/app/components/shared/step-by-step-derivation";

const chainRuleSteps = [
  {
    title: "Define the Cost Function",
    equation:
      "J(\\theta) = \\frac{1}{2}(\\sigma(\\theta_1 x + \\theta_2) - t)^2",
    explanation:
      "The cost function quantifies the squared error between the model's prediction \\(\\sigma(\\theta_1 x + \\theta_2)\\) and the target \\(t\\). Our goal is to minimize this error by adjusting parameters \\(\\theta_1\\) and \\(\\theta_2\\) using gradient descent.",
  },
  {
    title: "Chain Rule for \\(\\theta_1\\)",
    equation:
      "\\frac{\\partial J(\\theta)}{\\partial \\theta_1} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial \\theta_1}",
    explanation:
      "The chain rule decomposes the gradient of the cost \\(J\\) with respect to \\(\\theta_1\\) through intermediate variables \\(y = \\sigma(z)\\) and \\(z = \\theta_1 x + \\theta_2\\), tracing the effect of \\(\\theta_1\\) on the cost.",
  },
  {
    title: "Compute \\(\\partial J / \\partial y\\)",
    equation:
      "\\frac{\\partial J}{\\partial y} = \\frac{\\partial}{\\partial y} [ \\frac{1}{2}(y - t)^2 ] = y - t",
    explanation:
      "Differentiating the squared error term with respect to the output \\(y\\) gives the prediction error \\(y - t\\), indicating how sensitive the cost is to changes in the prediction.",
  },
  {
    title: "Compute \\(\\partial y / \\partial z\\)",
    equation:
      "\\frac{\\partial y}{\\partial z} = \\frac{\\partial \\sigma(z)}{\\partial z} = \\sigma(z)(1 - \\sigma(z)) = y(1 - y)",
    explanation:
      "The derivative of the sigmoid function \\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\) simplifies to \\(y(1 - y)\\), which is used in the gradient computation.",
  },
  {
    title: "Compute \\(\\partial z / \\partial \\theta_1\\)",
    equation:
      "\\frac{\\partial z}{\\partial \\theta_1} = \\frac{\\partial}{\\partial \\theta_1} (\\theta_1 x + \\theta_2) = x",
    explanation:
      "The linear combination \\(z = \\theta_1 x + \\theta_2\\) has a derivative of \\(x\\) with respect to \\(\\theta_1\\), showing the direct influence of the input \\(x\\).",
  },
  {
    title: "Gradient for \\(\\theta_1\\)",
    equation:
      "\\frac{\\partial J(\\theta)}{\\partial \\theta_1} = (y - t) \\cdot y(1 - y) \\cdot x",
    explanation:
      "Multiplying all chain rule components gives the gradient for \\(\\theta_1\\), guiding the parameter update in gradient descent.",
  },
  {
    title: "Chain Rule for \\(\\theta_2\\)",
    equation:
      "\\frac{\\partial J(\\theta)}{\\partial \\theta_2} = \\frac{\\partial J}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial \\theta_2}",
    explanation:
      "Similarly, the gradient for \\(\\theta_2\\) is computed by tracing its effect through \\(y\\) and \\(z\\).",
  },
  {
    title: "Compute \\(\\partial z / \\partial \\theta_2\\)",
    equation:
      "\\frac{\\partial z}{\\partial \\theta_2} = \\frac{\\partial}{\\partial \\theta_2} (\\theta_1 x + \\theta_2) = 1",
    explanation:
      "Differentiating \\(z\\) with respect to \\(\\theta_2\\) gives 1, as \\(\\theta_2\\)&apos;s coefficient is constant.",
  },
  {
    title: "Gradient for \\(\\theta_2\\)",
    equation:
      "\\frac{\\partial J(\\theta)}{\\partial \\theta_2} = (y - t) \\cdot y(1 - y)",
    explanation:
      "Combining the terms yields the gradient for \\(\\theta_2\\), used to update the parameter and reduce the cost function.",
  },
];

export default function GradientDescentDerivationSection() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-2xl">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Mathematical Derivation
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <StepByStepDerivation
          steps={chainRuleSteps}
          title="Computing ∂J/∂θ₁ and ∂J/∂θ₂ using Chain Rule"
        />
      </div>
    </section>
  );
}
