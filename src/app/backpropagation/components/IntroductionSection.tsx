import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

export default function IntroductionSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-red-600" />
            <span className="text-lg sm:text-xl">
              The Complete Backpropagation Algorithm
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-gray-700 leading-relaxed">
                Backpropagation is the cornerstone algorithm for training neural
                networks. It efficiently computes gradients by propagating
                errors backward through the network, enabling gradient descent
                optimization of all parameters simultaneously.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-semibold text-red-800 mb-2">Key Insight:</p>
                <p className="text-red-700 text-sm">
                  Backpropagation is simply a method for calculating partial
                  derivatives of the cost function with respect to all
                  parameters. The actual optimization is done by gradient
                  descent.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center">
              <Badge className="bg-blue-100 text-blue-800 w-full justify-center py-2">
                Forward Propagation
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">
                Error Calculation
              </Badge>
              <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">
                Backward Propagation
              </Badge>
              <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                Parameter Updates
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
