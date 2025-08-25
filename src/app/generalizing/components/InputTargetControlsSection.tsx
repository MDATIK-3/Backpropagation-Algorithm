import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Slider } from "../../../components/ui/slider";

export default function InputTargetControlsSection({
  networkParams,
  setNetworkParams,
  a3,
  cost,
}) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Input & Target Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Input x₁: {networkParams.inputs[0].toFixed(3)}
                </label>
                <Slider
                  value={[networkParams.inputs[0]]}
                  onValueChange={(value) =>
                    setNetworkParams((prev) => ({
                      ...prev,
                      inputs: [value[0], prev.inputs[1]],
                    }))
                  }
                  max={2}
                  min={-2}
                  step={0.1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Input x₂: {networkParams.inputs[1].toFixed(3)}
                </label>
                <Slider
                  value={[networkParams.inputs[1]]}
                  onValueChange={(value) =>
                    setNetworkParams((prev) => ({
                      ...prev,
                      inputs: [prev.inputs[0], value[0]],
                    }))
                  }
                  max={2}
                  min={-2}
                  step={0.1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Target y₁: {networkParams.targets[0].toFixed(3)}
                </label>
                <Slider
                  value={[networkParams.targets[0]]}
                  onValueChange={(value) =>
                    setNetworkParams((prev) => ({
                      ...prev,
                      targets: [value[0], prev.targets[1]],
                    }))
                  }
                  max={1}
                  min={0}
                  step={0.1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Target y₂: {networkParams.targets[1].toFixed(3)}
                </label>
                <Slider
                  value={[networkParams.targets[1]]}
                  onValueChange={(value) =>
                    setNetworkParams((prev) => ({
                      ...prev,
                      targets: [prev.targets[0], value[0]],
                    }))
                  }
                  max={1}
                  min={0}
                  step={0.1}
                />
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-center">
              <p className="font-semibold text-sm mb-2">Network Outputs:</p>
              <div className="space-y-1 text-xs font-mono">
                <p>y₁ = {a3[0].toFixed(4)}</p>
                <p>y₂ = {a3[1].toFixed(4)}</p>
                <p>Cost = {cost.toFixed(6)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
