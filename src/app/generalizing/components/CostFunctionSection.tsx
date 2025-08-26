"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import MathEquation from "../../components/shared/math-equation";
import { Badge } from "../../../components/ui/badge";
import { motion, Variants } from "framer-motion";

interface CostFunctionSectionProps {
  cost: number;
  errors: [number, number];
}

export default function CostFunctionSection({
  cost,
  errors,
}: CostFunctionSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Mean Squared Error for Multiple Outputs</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <p className="text-gray-700">
                With multiple outputs, we use the mean squared error across all
                output neurons:
              </p>
              <motion.div
                className="bg-gray-50 p-4 rounded-lg flex justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* <MathEquation
                  equation="J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (y_i - a_i^{(3)})^2"
                  inline={false}
                /> */}
                <div className="font-mono text-red-600 text-center whitespace-pre-wrap leading-loose">
                  {`J(θ) = (1 / 2m) Σᵢ₌₁ᵐ (yᵢ - aᵢ^(3))²`}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-blue-100 text-blue-800 mb-2">
                  Current Cost
                </Badge>
                <p className="font-mono text-lg">{cost.toFixed(6)}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-green-100 text-green-800 mb-2">
                  Output 1 Error
                </Badge>
                <p className="font-mono text-lg">{errors[0].toFixed(4)}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-red-100 text-red-800 mb-2">
                  Output 2 Error
                </Badge>
                <p className="font-mono text-lg">{errors[1].toFixed(4)}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
