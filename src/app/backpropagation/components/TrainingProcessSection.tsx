import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrainingProcessSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <CardTitle className="text-lg sm:text-xl font-bold">
              Training Process: Putting It All Together
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              During each iteration (epoch), we perform forward propagation to
              compute outputs and backward propagation to compute errors. One
              complete iteration is known as an epoch. It&apos;s common to
              report evaluation metrics after each epoch to watch the evolution
              of the neural network as it trains.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: 1,
                    title: "Forward Pass",
                    description:
                      "Compute network output using current parameters and calculate cost function",
                    color: "bg-blue-600",
                  },
                  {
                    step: 2,
                    title: "Backward Pass",
                    description:
                      "Propagate errors backward and compute gradients for all parameters",
                    color: "bg-yellow-600",
                  },
                  {
                    step: 3,
                    title: "Update",
                    description:
                      "Apply gradient descent to update all parameters and repeat until convergence",
                    color: "bg-green-600",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    className="text-center p-4 rounded-xl bg-white shadow-sm"
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl`}
                    >
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 hover:shadow-md transition-all duration-300">
              <p className="font-semibold text-green-800 mb-2">
                Convergence Criteria:
              </p>
              <p className="text-green-700 text-sm sm:text-base">
                Training continues until the cost function reaches a minimum
                threshold, gradients become very small, or a maximum number of
                epochs is reached. The network has then learned to map inputs to
                desired outputs.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
