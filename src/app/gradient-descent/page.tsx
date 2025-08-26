"use client";

import PageLayout from "@/app/components/shared/page-layout";
import GradientDescentIntro from "./components/GradientDescentIntro";
import GradientDescentKeyComponents from "./components/GradientDescentKeyComponents";
import GradientDescentLearningRateEffects from "./components/GradientDescentLearningRateEffects";
import GradientDescentSimulatorSection from "./components/GradientDescentSimulatorSection";
import GradientDescentVariantsComparison from "./components/GradientDescentVariantsComparison";
import GradientDescentChainRuleSection from "./components/GradientDescentChainRuleSection";
import GradientDescentDerivationSection from "./components/GradientDescentDerivationSection";
import GradientDescentOutcomesSection from "./components/GradientDescentOutcomesSection";

export default function GradientDescentPage() {
  return (
    <PageLayout
      title="Gradient Descent"
      description="Master the optimization algorithm that powers machine learning through interactive visualizations, mathematical foundations, and practical insights."
    >
      <div className="space-y-16">
        <GradientDescentIntro />
        <GradientDescentKeyComponents />
        <GradientDescentLearningRateEffects />
        <GradientDescentSimulatorSection />
        <GradientDescentVariantsComparison />
        <GradientDescentChainRuleSection />
        <GradientDescentDerivationSection />
        <GradientDescentOutcomesSection />
      </div>
    </PageLayout>
  );
}
