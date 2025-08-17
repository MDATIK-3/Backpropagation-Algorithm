"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, Network, Zap } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      title: "Gradient Descent",
      desc: "Optimization algorithm fundamentals with bell curve visualizations",
      icon: BookOpen,
      href: "/gradient-descent",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Toy Exercise",
      desc: "Simple neural network example with interactive animations",
      icon: Brain,
      href: "/toy-exercise",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Generalizing",
      desc: "Multi-layer network concepts and mathematical derivations",
      icon: Network,
      href: "/generalizing",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Backpropagation",
      desc: "Complete error propagation algorithm with step-by-step breakdown",
      icon: Zap,
      href: "/backpropagation",
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="py-16 sm:py-20 text-center px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Understanding Backpropagation
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Interactive visualization of machine learning concepts from CSE 411
          </p>

          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12 border-l-4 border-blue-500">
            <p className="text-lg sm:text-xl italic text-gray-700">
              &ldquo;A journey of a thousand miles begins with a single step.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">— Lao Tzu</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {features.map((item, index) => (
              <Link key={index} href={item.href} className="group">
                <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col">
                  <CardHeader className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-center">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow justify-between">
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex justify-center mt-4">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Course Overview
          </h2>
          <div className="grid gap-8 md:grid-cols-2 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-600">
                What You&rsquo;ll Learn
              </h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Mathematical foundations of gradient descent",
                  "Chain rule applications in neural networks",
                  "Forward and backward propagation algorithms",
                  "Multi-layer network parameter optimization",
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-green-600">
                Interactive Features
              </h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  "Real-time parameter adjustment with sliders",
                  "Animated neural network visualizations",
                  "Step-by-step mathematical derivations",
                  "Bell curve gradient descent visualizations",
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}