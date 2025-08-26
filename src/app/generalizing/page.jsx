"use client";
import React, { useState } from "react";
import PageLayout from "@/app/components/shared/page-layout";
import GeneralizingIntro from "./components/GeneralizingIntro";
import CostFunctionSection from "./components/CostFunctionSection";
import InteractiveNetworkSection from "./components/InteractiveNetworkSection";
import InputTargetControlsSection from "./components/InputTargetControlsSection";
import NetworkComplexitySection from "./components/NetworkComplexitySection";
import WeightMatrixSection from "./components/WeightMatrixSection";
import ViewToggle from "./components/ViewToggle";
import ViewContent from "./components/ViewContent";
import SummarySection from "./components/SummarySection";

export default function GeneralizingPage() {
  const [networkParams, setNetworkParams] = useState({
    inputs: [1.0, 0.5],
    weightsLayer1: [
      [0.2, 0.8],
      [0.4, 0.6],
    ],
    weightsLayer2: [
      [0.3, 0.7],
      [0.5, 0.9],
    ],
    targets: [0.9, 0.1],
  });

  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentView, setCurrentView] = useState("network");

  const startAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(true);
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= 8) {
          setIsAnimating(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationStep(0);
  };

  const z2 = [
    networkParams.weightsLayer1[0][0] * networkParams.inputs[0] +
      networkParams.weightsLayer1[0][1] * networkParams.inputs[1],
    networkParams.weightsLayer1[1][0] * networkParams.inputs[0] +
      networkParams.weightsLayer1[1][1] * networkParams.inputs[1],
  ];

  const a2 = [1 / (1 + Math.exp(-z2[0])), 1 / (1 + Math.exp(-z2[1]))];

  const z3 = [
    networkParams.weightsLayer2[0][0] * a2[0] +
      networkParams.weightsLayer2[0][1] * a2[1],
    networkParams.weightsLayer2[1][0] * a2[0] +
      networkParams.weightsLayer2[1][1] * a2[1],
  ];

  const a3 = [1 / (1 + Math.exp(-z3[0])), 1 / (1 + Math.exp(-z3[1]))];

  const errors = [
    a3[0] - networkParams.targets[0],
    a3[1] - networkParams.targets[1],
  ];

  const cost = 0.5 * (errors[0] * errors[0] + errors[1] * errors[1]);

  return (
    <PageLayout
      title="Generalizing the Concept"
      description="Explore how backpropagation scales to multi-layer networks with multiple neurons per layer, featuring complex weight matrices and multi-path gradient calculations."
    >
      <div className="space-y-12">
        <GeneralizingIntro />
        <NetworkComplexitySection />
        <WeightMatrixSection />
        <CostFunctionSection cost={cost} errors={errors} />
        <InteractiveNetworkSection
          networkParams={networkParams}
          animationStep={animationStep}
          isAnimating={isAnimating}
          startAnimation={startAnimation}
          resetAnimation={resetAnimation}
        />
        <InputTargetControlsSection
          networkParams={networkParams}
          setNetworkParams={setNetworkParams}
          a3={a3}
          cost={cost}
        />
        <ViewToggle currentView={currentView} setCurrentView={setCurrentView} />
        <ViewContent
          currentView={currentView}
          networkParams={networkParams}
          setNetworkParams={setNetworkParams}
        />
        <SummarySection />
      </div>
    </PageLayout>
  );
}
