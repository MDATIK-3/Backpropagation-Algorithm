import GradientDescentSimulator from "@/app/components/visualizations/gradient-descent-simulator";

export default function GradientDescentSimulatorSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Interactive Bell Curve Visualization
      </h2>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <GradientDescentSimulator />
      </div>
    </section>
  );
}
