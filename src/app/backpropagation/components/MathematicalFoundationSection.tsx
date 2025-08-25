import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MathEquation from "@/app/components/shared/math-equation";

export default function MathematicalFoundationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Mathematical Foundation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <p className="text-gray-700 mb-4">
                The general formula for computing gradients in layer l combines
                δ terms from the next layer with activations from the current
                layer:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center">
                <MathEquation equation="\frac{\partial J(\theta)}{\partial \theta^{(l)}_{ij}} = (\delta^{(l+1)})^T a^{(l)}" />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Where δ<sup>(l+1)</sup> represents the error terms from layer
                  l+1 and a<sup>(l)</sup> are the activations from layer l
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-800 mb-2">
                  Forward Pass:
                </p>
                <div className="space-y-2 text-sm">
                  <MathEquation equation="z^{(l)} = \theta^{(l)} a^{(l-1)}" />
                  <MathEquation equation="a^{(l)} = \sigma(z^{(l)})" />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-semibold text-red-800 mb-2">
                  Backward Pass:
                </p>
                <div className="space-y-2 text-sm">
                  <MathEquation equation="\delta^{(l)} = (\theta^{(l+1)})^T \delta^{(l+1)} \odot \sigma'(z^{(l)})" />
                  <MathEquation equation="\frac{\partial J}{\partial \theta^{(l)}} = \delta^{(l+1)} (a^{(l)})^T" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
