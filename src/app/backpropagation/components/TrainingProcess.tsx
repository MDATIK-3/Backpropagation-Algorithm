import React from "react";
import { motion } from "framer-motion";

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

export default function TrainingProcess() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-12"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6">Training Process</h2>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-6">
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3">Forward Propagation</h3>
          <motion.div
            className="bg-blue-50 p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                Input values are propagated through the network layer by layer
              </li>
              <li>
                Each neuron computes its weighted sum and applies the activation
                function
              </li>
              <li>The process continues until reaching the output layer</li>
              <li>
                The network produces predictions that are compared with actual
                targets
              </li>
            </ol>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3">Error Calculation</h3>
          <motion.div
            className="bg-red-50 p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                The difference between predictions and targets forms the error
              </li>
              <li>Error is used to compute the loss function value</li>
              <li>The goal is to minimize this loss through training</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3">Backward Propagation</h3>
          <motion.div
            className="bg-green-50 p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Error is propagated backwards through the network</li>
              <li>
                Gradients are computed for each parameter using chain rule
              </li>
              <li>Parameters are updated using gradient descent algorithm</li>
              <li>Process is repeated for multiple epochs until convergence</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3">Parameter Updates</h3>
          <motion.div
            className="bg-yellow-50 p-6 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Learning rate controls the size of parameter updates</li>
              <li>Weights and biases are adjusted to minimize the loss</li>
              <li>
                Updates continue until the model converges or reaches max epochs
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
