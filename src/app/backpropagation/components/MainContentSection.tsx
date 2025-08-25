import AlgorithmBreakdown from "@/app/components/visualizations/algorithm-breakdown";
import { GradientDescentSimulator as SimulatorPage } from "@/app/components/visualizations/training-simulator";
import { motion } from "framer-motion";

interface Props {
  currentView: "algorithm" | "training";
}

export default function MainContentSection({ currentView }: Props) {
  return currentView === "algorithm" ? (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlgorithmBreakdown />
      </motion.div>
    </section>
  ) : (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SimulatorPage />
      </motion.div>
    </section>
  );
}
