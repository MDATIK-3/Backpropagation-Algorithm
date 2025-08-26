"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { motion } from "framer-motion";

export default function WeightMatrixSection() {
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-purple-800">
            Understanding Weight Matrices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-purple-700 mb-3">
                Layer 1 Weight Matrix
              </h3>
              <p className="text-gray-700 mb-4">
                In a neural network with multiple neurons, weights are organized
                in matrices. For layer 1, the weight matrix Θ¹ looks like this:
              </p>
              <motion.div
                className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-mono text-purple-800 text-center whitespace-pre-wrap leading-loose">
                  {`Θ¹ = ⎡ θ₁₁  θ₁₂ ⎤
     ⎢ θ₂₁  θ₂₂ ⎥
     ⎣          ⎦

     where:
     θ₁₁ = 0.2    θ₁₂ = 0.8
     θ₂₁ = 0.4    θ₂₂ = 0.6`}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-semibold text-purple-800 mb-2">
                      Connection Details:
                    </p>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• θ₁₁ connects Input 1 → Hidden 1 (0.2)</li>
                      <li>• θ₁₂ connects Input 2 → Hidden 1 (0.8)</li>
                      <li>• θ₂₁ connects Input 1 → Hidden 2 (0.4)</li>
                      <li>• θ₂₂ connects Input 2 → Hidden 2 (0.6)</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-semibold text-purple-800 mb-2">
                      Matrix Structure:
                    </p>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• First row: weights to Hidden 1</li>
                      <li>• Second row: weights to Hidden 2</li>
                      <li>• First column: from Input 1</li>
                      <li>• Second column: from Input 2</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-purple-700 mb-3">
                Using the Weight Matrix
              </h3>
              <p className="text-gray-700 mb-4">
                To calculate hidden layer values, we multiply the weight matrix
                by the input vector:
              </p>
              <motion.div
                className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-mono text-indigo-800 text-center whitespace-pre-wrap leading-loose">
                  {`z² = Θ¹ × ⎡x₁⎤
         ⎣x₂⎦

Hidden 1 = (θ₁₁ × x₁) + (θ₁₂ × x₂)
Hidden 2 = (θ₂₁ × x₁) + (θ₂₂ × x₂)`}
                </div>
                <p className="text-sm text-indigo-700 mt-4">
                  This matrix multiplication combines inputs with their
                  respective weights to compute the values that will go into
                  each hidden neuron.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
