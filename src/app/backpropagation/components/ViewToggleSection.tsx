import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  currentView: "algorithm" | "training" | (string & {});
  setCurrentView: (view: "algorithm" | "training") => void;
}

export default function ViewToggleSection({
  currentView,
  setCurrentView,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <Button
              variant={currentView === "algorithm" ? "default" : "outline"}
              onClick={() => setCurrentView("algorithm")}
              className="flex items-center relative overflow-hidden"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
              </motion.div>
              Algorithm Breakdown
              {currentView === "algorithm" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="underline"
                />
              )}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <Button
              variant={currentView === "training" ? "default" : "outline"}
              onClick={() => setCurrentView("training")}
              className="flex items-center relative overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-4 h-4 mr-2" />
              </motion.div>
              Interactive Training
              {currentView === "training" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="underline"
                />
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
