import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import MathEquation from "../../../components/shared/math-equation.jsx";
import { Badge } from "../../../components/ui/badge";

export default function CostFunctionSection({ cost, errors }) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Mean Squared Error for Multiple Outputs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              With multiple outputs, we use the mean squared error across all
              output neurons:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <MathEquation equation="J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (y_i - a_i^{(3)})^2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Badge className="bg-blue-100 text-blue-800 mb-2">
                  Current Cost
                </Badge>
                <p className="font-mono text-lg">{cost.toFixed(6)}</p>
              </div>
              <div>
                <Badge className="bg-green-100 text-green-800 mb-2">
                  Output 1 Error
                </Badge>
                <p className="font-mono text-lg">{errors[0].toFixed(4)}</p>
              </div>
              <div>
                <Badge className="bg-red-100 text-red-800 mb-2">
                  Output 2 Error
                </Badge>
                <p className="font-mono text-lg">{errors[1].toFixed(4)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
