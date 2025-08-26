"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MathEquation from "../../components/shared/math-equation.jsx";
import { motion, Variants } from "framer-motion";

export default function BackpropagationIntro() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-8"
    >
      <Card className="shadow-lg border border-red-200 bg-gradient-to-br from-white via-red-50 to-red-100">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className="flex items-center gap-3 text-red-700 text-2xl font-bold">
              <span>Backpropagation: The Heart of Deep Learning</span>
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                What is Backpropagation?
              </h3>
              <p className="text-gray-700 mb-2">
                Backpropagation is a mathematical algorithm for efficiently
                computing gradients in multi-layer neural networks. It leverages
                the chain rule of calculus to propagate errors backward,
                enabling precise updates to all weights and biases.
              </p>
              <motion.div
                className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation equation="\frac{\partial J}{\partial \theta} = \frac{\partial J}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial \theta}" />
                <p className="text-xs text-red-700 mt-2 text-center">
                  Gradient calculation using the chain rule
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Why is Backpropagation Needed?
              </h3>
              <p className="text-gray-700 mb-2">
                Training deep neural networks involves optimizing millions of
                parameters. Backpropagation makes this feasible by
                systematically calculating all required gradients for gradient
                descent:
              </p>
              <motion.div
                className="bg-white p-4 rounded-lg border-l-4 border-blue-400 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation equation="\theta := \theta - \eta \frac{\partial J}{\partial \theta}" />
                <p className="text-xs text-blue-700 mt-2 text-center">
                  Parameter update rule using gradients
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Previous Methods
              </h3>
              <p className="text-gray-700 mb-2">
                Earlier approaches like the perceptron learning rule and Hebbian
                learning were limited to shallow networks. They could not scale
                to deep architectures due to the lack of efficient gradient
                computation. Backpropagation revolutionized deep learning by
                enabling multi-layer networks to be trained:
              </p>
              <motion.div
                className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation equation="a^{(l)} = \sigma(z^{(l)})" />
                <MathEquation equation="z^{(l)} = \theta^{(l)} a^{(l-1)}" />
                <p className="text-xs text-yellow-700 mt-2 text-center">
                  Forward propagation equations for layer <i>l</i>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
