import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, AlertTriangle, CheckCircle, Info } from "lucide-react";

const learningRateEffects = [
  {
    rate: "Too High (η > 1.0)",
    effect: "Overshooting",
    description: "May miss the minimum or cause divergence",
    color: "bg-red-100 border-red-300 text-red-800",
    icon: AlertTriangle,
  },
  {
    rate: "Optimal (0.01 - 0.1)",
    effect: "Balanced",
    description: "Steady convergence with good stability",
    color: "bg-green-100 border-green-300 text-green-800",
    icon: CheckCircle,
  },
  {
    rate: "Too Low (η < 0.001)",
    effect: "Slow Progress",
    description: "Very slow convergence, may get stuck",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    icon: Info,
  },
];

export default function GradientDescentLearningRateEffects() {
  return (
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
              <div
                key={index}
                className={`p-3 rounded-lg border-2 ${item.color} hover:shadow-md transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex items-start space-x-2">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-xs">{item.rate}</p>
                    <p className="font-semibold text-xs">{item.effect}</p>
                    <p className="text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
