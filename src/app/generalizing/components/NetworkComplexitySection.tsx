"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Network } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function NetworkComplexitySection() {
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
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="w-6 h-6 mr-3 text-purple-600" />
            Multi-Layer Networks: Scaling Up Complexity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
            <motion.div className="md:col-span-2 flex flex-col gap-4" variants={itemVariants}>
              <p className="text-gray-700 leading-relaxed mb-4">
                Moving beyond the simple toy example, we now explore networks
                with multiple neurons in each layer. This introduces weight
                matrices, multiple gradient paths, and the need to sum gradients
                from different routes through the network.
              </p>
              <motion.div 
                className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-semibold text-purple-800 mb-2">
                  New Challenges:
                </p>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Weight matrices instead of individual weights</li>
                  <li>
                    • Multiple paths from each weight to the cost function
                  </li>
                  <li>• Matrix notation for efficient computation</li>
                  <li>• Mean squared error for multiple outputs</li>
                </ul>
              </motion.div>
            </motion.div>
            <motion.div className="flex flex-col gap-3 items-center justify-center" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-green-100 text-green-800 w-full justify-center py-2">
                  2 Input Neurons
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-yellow-100 text-yellow-800 w-full justify-center py-2">
                  2 Hidden Neurons
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">
                  2 Output Neurons
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Badge className="bg-purple-100 text-purple-800 w-full justify-center py-2">
                  8 Parameters
                </Badge>
              </motion.div>
              {/* Network visualization */}
              <motion.div 
                className="w-full bg-white p-6 rounded-xl shadow-lg mt-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  viewBox="0 0 400 250"
                  className="w-full h-auto"
                  style={{ maxWidth: "400px" }}
                >
                  {/* Input Layer */}
                  <g>
                    <circle cx="50" cy="80" r="15" fill="#86efac" /> {/* Green */}
                    <circle cx="50" cy="170" r="15" fill="#86efac" />
                    <text x="20" y="40" className="text-sm font-semibold" fill="#166534">Input Layer</text>
                  </g>

                  {/* Hidden Layer */}
                  <g>
                    <circle cx="200" cy="80" r="15" fill="#fde047" /> {/* Yellow */}
                    <circle cx="200" cy="170" r="15" fill="#fde047" />
                    <text x="165" y="40" className="text-sm font-semibold" fill="#854d0e">Hidden Layer</text>
                  </g>

                  {/* Output Layer */}
                  <g>
                    <circle cx="350" cy="80" r="15" fill="#fca5a5" /> {/* Red */}
                    <circle cx="350" cy="170" r="15" fill="#fca5a5" />
                    <text x="320" y="40" className="text-sm font-semibold" fill="#991b1b">Output Layer</text>
                  </g>

                  {/* Connections from input to hidden layer */}
                  <g stroke="#94a3b8" strokeWidth="2" opacity="0.5">
                    <line x1="65" y1="80" x2="185" y2="80" />
                    <line x1="65" y1="80" x2="185" y2="170" />
                    <line x1="65" y1="170" x2="185" y2="80" />
                    <line x1="65" y1="170" x2="185" y2="170" />
                  </g>

                  {/* Connections from hidden to output layer */}
                  <g stroke="#94a3b8" strokeWidth="2" opacity="0.5">
                    <line x1="215" y1="80" x2="335" y2="80" />
                    <line x1="215" y1="80" x2="335" y2="170" />
                    <line x1="215" y1="170" x2="335" y2="80" />
                    <line x1="215" y1="170" x2="335" y2="170" />
                  </g>
                </svg>
                <div className="text-center mt-2 text-sm text-gray-600">
                  Network Architecture: 2-2-2
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
