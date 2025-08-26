import dynamic from "next/dynamic";
const WeightMatrixControls = dynamic(
  () => import("@/app/components/visualizations/weight-matrix-controls"),
  { ssr: false }
);
const MultiPathGradients = dynamic(
  () => import("@/app/components/visualizations/multi-path-gradients"),
  { ssr: false }
);
type NetworkParams = {
  inputs: [number, number];
  weightsLayer1: [[number, number], [number, number]];
  weightsLayer2: [[number, number], [number, number]];
  targets: [number, number];
};
type ViewContentProps = {
  currentView: "network" | "gradients";
  networkParams: NetworkParams;
  setNetworkParams: React.Dispatch<React.SetStateAction<NetworkParams>>;
};
export default function ViewContent({
  currentView,
  networkParams,
  setNetworkParams,
}: ViewContentProps) {
  if (currentView === "network") {
    return (
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Interactive Weight Matrix Controls
        </h2>
        <WeightMatrixControls
          weightsLayer1={networkParams.weightsLayer1}
          weightsLayer2={networkParams.weightsLayer2}
          onWeightsLayer1Change={(weights) =>
            setNetworkParams((prev: NetworkParams) => ({
              ...prev,
              weightsLayer1: weights,
            }))
          }
          onWeightsLayer2Change={(weights) =>
            setNetworkParams((prev: NetworkParams) => ({
              ...prev,
              weightsLayer2: weights,
            }))
          }
        />
      </section>
    );
  }
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">
        Multi-Path Gradient Calculations
      </h2>
      <MultiPathGradients
        inputs={networkParams.inputs}
        weightsLayer1={networkParams.weightsLayer1}
        weightsLayer2={networkParams.weightsLayer2}
        targets={networkParams.targets}
      />
    </section>
  );
}
