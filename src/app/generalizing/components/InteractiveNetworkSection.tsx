import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import dynamic from "next/dynamic";

const MultiLayerNetwork = dynamic(
  () => import("../../../components/visualizations/multi-layer-network"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full text-center py-8 text-gray-400">
        Loading network visualization...
      </div>
    ),
  }
) as React.ComponentType<any>;

export default function InteractiveNetworkSection({
  networkParams,
  animationStep,
  isAnimating,
  startAnimation,
  resetAnimation,
}) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Multi-Layer Network Architecture
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={startAnimation}
                disabled={isAnimating}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Play className="w-4 h-4 mr-1" />
                Animate
              </Button>
              <Button size="sm" variant="outline" onClick={resetAnimation}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-[600px] mx-auto p-2 flex justify-center items-center">
            <MultiLayerNetwork
              inputs={networkParams.inputs}
              weightsLayer1={networkParams.weightsLayer1}
              weightsLayer2={networkParams.weightsLayer2}
              targets={networkParams.targets}
              animationStep={animationStep}
              isAnimating={isAnimating}
              style={{ width: "100%", height: "auto", maxWidth: "600px" }}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
