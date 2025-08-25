import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MasteringBackpropagationSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <CardTitle className="text-center text-lg sm:text-xl font-bold">
              Mastering Backpropagation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  badge: "Mathematical Foundation",
                  badgeClass: "bg-blue-100 text-blue-800",
                  text: "Chain rule enables systematic computation of gradients through composite functions in neural networks.",
                },
                {
                  badge: "Efficient Algorithm",
                  badgeClass: "bg-yellow-100 text-yellow-800",
                  text: "Backpropagation computes all gradients in a single backward pass, making training computationally efficient.",
                },
                {
                  badge: "Scalable Solution",
                  badgeClass: "bg-green-100 text-green-800",
                  text: "The algorithm scales to networks of any size and complexity, enabling deep learning applications.",
                },
                {
                  badge: "Universal Method",
                  badgeClass: "bg-purple-100 text-purple-800",
                  text: "Backpropagation is the foundation for training virtually all modern neural network architectures.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.badge}
                  className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge
                    className={
                      item.badgeClass + " mb-3 px-4 py-2 text-sm font-medium"
                    }
                  >
                    {item.badge}
                  </Badge>
                  <p className="text-center text-sm sm:text-base text-gray-700">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
