import type React from "react"
import Navigation from "./Navigation"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
}

export default function PageLayout({ children, title, description, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${className}`}>
      <Navigation />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              {description && <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">{description}</p>}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
