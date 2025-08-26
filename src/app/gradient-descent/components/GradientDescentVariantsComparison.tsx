import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const algorithmVariants = [
  {
    name: "Batch Gradient Descent",
    equation:
      "\\theta = \\theta - \\eta \\frac{1}{m} \\sum_{i=1}^{m} \\nabla J(\\theta, x^{(i)}, y^{(i)})",
    description:
      "Uses entire dataset for each update. Most stable but computationally expensive.",
    pros: ["Guaranteed convergence", "Stable updates", "Smooth loss curve"],
    cons: [
      "Slow for large datasets",
      "Memory intensive",
      "May get stuck in local minima",
    ],
  },
  {
    name: "Stochastic Gradient Descent",
    equation: "\\theta = \\theta - \\eta \\nabla J(\\theta, x^{(i)}, y^{(i)})",
    description:
      "Updates parameters using one sample at a time. Fast but noisy.",
    pros: [
      "Fast updates",
      "Can escape local minima",
      "Online learning capable",
    ],
    cons: [
      "Noisy convergence",
      "May overshoot minimum",
      "Requires careful tuning",
    ],
  },
  {
    name: "Mini-Batch Gradient Descent",
    equation:
      "\\theta = \\theta - \\eta \\frac{1}{|B|} \\sum_{i \\in B} \\nabla J(\\theta, x^{(i)}, y^{(i)})",
    description:
      "Balances batch and stochastic approaches using small batches.",
    pros: [
      "Good balance of speed/stability",
      "Efficient GPU utilization",
      "Reduced variance",
    ],
    cons: [
      "Requires batch size tuning",
      "Still some noise",
      "Memory considerations",
    ],
  },
];

export default function GradientDescentVariantsComparison() {
  return (
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
                className={`bg-gradient-to-r ${
                  index === 0
                    ? "from-indigo-600 to-blue-600"
                    : index === 1
                    ? "from-teal-600 to-green-600"
                    : "from-violet-600 to-purple-600"
                } text-white p-4 sm:p-5 flex items-center justify-between`}
              >
                <CardTitle className="text-base sm:text-lg lg:text-xl font-bold">
                  {variant.name}
                </CardTitle>
                <Badge
                  className={`${
                    index === 0
                      ? "bg-indigo-200 text-indigo-900"
                      : index === 1
                      ? "bg-teal-200 text-teal-900"
                      : "bg-violet-200 text-violet-900"
                  } px-2 py-1 text-xs font-semibold`}
                >
                  {index === 0 ? "Stable" : index === 1 ? "Fast" : "Balanced"}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-5">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 max-w-full overflow-x-auto">
                    {/* MathEquation component can be added here if needed */}
                    <span className="text-sm sm:text-base md:text-lg w-full min-w-[200px]">
                      {variant.equation}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                    {variant.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <h4 className="font-bold text-green-700 mb-2 text-xs sm:text-sm lg:text-base flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Advantages
                      </h4>
                      <ul className="space-y-1">
                        {variant.pros.map((pro, i) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm text-green-600 leading-relaxed flex items-start"
                          >
                            <span className="mr-1">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-700 mb-2 text-xs sm:text-sm lg:text-base flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Disadvantages
                      </h4>
                      <ul className="space-y-1">
                        {variant.cons.map((con, i) => (
                          <li
                            key={i}
                            className="text-xs sm:text-sm text-red-600 leading-relaxed flex items-start"
                          >
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
  );
}
