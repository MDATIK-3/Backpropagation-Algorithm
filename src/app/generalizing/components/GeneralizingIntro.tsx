"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import MathEquation from "../../components/shared/math-equation.jsx";
import { motion, Variants } from "framer-motion";

export default function GeneralizingIntro() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-8"
    >
      <Card className="shadow-lg border border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-700 text-2xl font-bold">
            <span>Generalization in Neural Networks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                What is Generalization?
              </h3>
              <p className="text-gray-700 mb-2">
                Generalization is the ability of a neural network to perform
                well on unseen data, not just the data it was trained on. It is
                a key measure of a model&apos;s real-world usefulness.
              </p>
              <motion.div 
                className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation
                  equation="\text{Generalization Error} = \mathbb{E}_{x \sim \mathcal{D}}[L(f(x), y)]"
                  inline={false}
                />
                <p className="text-xs text-blue-700 mt-2 text-center">
                  Expected loss on new data distribution
                </p>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Why is Generalization Important?
              </h3>
              <p className="text-gray-700 mb-2">
                A model that memorizes training data but fails on new data is
                said to overfit. Generalization ensures the model captures
                underlying patterns, not just noise.
              </p>
              <motion.div 
                className="bg-white p-4 rounded-lg border-l-4 border-green-400 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation
                  equation="L_{\text{train}} \ll L_{\text{test}} \implies \text{Overfitting}"
                  inline={false}
                />
                <p className="text-xs text-green-700 mt-2 text-center">
                  Overfitting: low training loss, high test loss
                </p>
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                How to Improve Generalization?
              </h3>
              <p className="text-gray-700 mb-2">
                Techniques such as regularization, dropout, and data
                augmentation help neural networks generalize better:
              </p>
              <motion.div 
                className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 flex flex-col items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MathEquation
                  equation="J(\theta) = J(\theta) + \lambda \|\theta\|^2"
                  inline={false}
                />
                <p className="text-xs text-yellow-700 mt-2 text-center">
                  Regularization: penalizing large weights
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
