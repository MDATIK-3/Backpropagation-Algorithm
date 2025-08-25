import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  currentView: "algorithm" | "training" | (string & {});
  setCurrentView: (view: "algorithm" | "training") => void;
}

export default function ViewToggleSection({
  currentView,
  setCurrentView,
}: Props) {
  return (
    <section>
      <div className="flex flex-wrap justify-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant={currentView === "algorithm" ? "default" : "outline"}
            onClick={() => setCurrentView("algorithm")}
            className="flex items-center"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Algorithm Breakdown
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant={currentView === "training" ? "default" : "outline"}
            onClick={() => setCurrentView("training")}
            className="flex items-center"
          >
            <Play className="w-4 h-4 mr-2" />
            Interactive Training
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
