import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MathEquation from "@/app/components/shared/math-equation";

export default function MathematicalFoundationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="shadow-lg">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle>Mathematical Foundation</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <p className="text-gray-700 mb-4">
                The general formula for computing gradients in layer l combines
                δ terms from the next layer with activations from the current
                layer:
              </p>
              <motion.div
                className="bg-gray-50 p-6 rounded-lg flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation equation="\frac{\partial J(\theta)}{\partial \theta^{(l)}_{ij}} = (\delta^{(l+1)})^T a^{(l)}" />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Where δ<sup>(l+1)</sup> represents the error terms from layer
                  l+1 and a<sup>(l)</sup> are the activations from layer l
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <motion.div
                className="bg-blue-50 p-4 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-semibold text-blue-800 mb-2">
                  Forward Pass:
                </p>
                <div className="space-y-2 text-sm">
                  <MathEquation equation="z^{(l)} = \theta^{(l)} a^{(l-1)}" />
                  <MathEquation equation="a^{(l)} = \sigma(z^{(l)})" />
                </div>
              </motion.div>
              <motion.div
                className="bg-red-50 p-4 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-semibold text-red-800 mb-2">
                  Backward Pass:
                </p>
                <div className="space-y-2 text-sm">
                  <MathEquation equation="\delta^{(l)} = (\theta^{(l+1)})^T \delta^{(l+1)} \odot \sigma'(z^{(l)})" />
                  <MathEquation equation="\frac{\partial J}{\partial \theta^{(l)}} = \delta^{(l+1)} (a^{(l)})^T" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
