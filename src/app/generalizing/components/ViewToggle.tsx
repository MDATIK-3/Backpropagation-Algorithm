import { Button } from "../../../components/ui/button";
import { Calculator, GitBranch } from "lucide-react";
type ViewToggleProps = {
  currentView: "network" | "gradients";
  setCurrentView: (view: "network" | "gradients") => void;
};
export default function ViewToggle({
  currentView,
  setCurrentView,
}: ViewToggleProps) {
  return (
    <section>
      <div className="flex justify-center space-x-4">
        <Button
          variant={currentView === "network" ? "default" : "outline"}
          onClick={() => setCurrentView("network")}
          className="flex items-center"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Weight Matrix Controls
        </Button>
        <Button
          variant={currentView === "gradients" ? "default" : "outline"}
          onClick={() => setCurrentView("gradients")}
          className="flex items-center"
        >
          <GitBranch className="w-4 h-4 mr-2" />
          Multi-Path Gradients
        </Button>
      </div>
    </section>
  );
}
