"use client";

import { useState } from "react";
import PageLayout from "@/app/components/shared/page-layout";
import IntroductionSection from "./components/IntroductionSection";
import MathematicalFoundationSection from "./components/MathematicalFoundationSection";
import ViewToggleSection from "./components/ViewToggleSection";
import MainContentSection from "./components/MainContentSection";
import TrainingProcessSection from "./components/TrainingProcessSection";
import MasteringBackpropagationSection from "./components/MasteringBackpropagationSection";

export default function BackpropagationPage() {
  const [currentView, setCurrentView] = useState("algorithm");
  return (
    <PageLayout title="Backpropagation Algorithm">
      <IntroductionSection />
      <MathematicalFoundationSection />
      <ViewToggleSection
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <MainContentSection currentView={currentView} />
      <TrainingProcessSection />
      <MasteringBackpropagationSection />
    </PageLayout>
  );
}
