"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home } from "lucide-react"

const navigationItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "gradient-descent", label: "Gradient Descent", href: "/gradient-descent" },
  { id: "perceptron", label: "Perceptron", href: "/perceptron" },
  { id: "toy-exercise", label: "Toy Exercise", href: "/toy-exercise" },
  { id: "generalizing", label: "Generalizing", href: "/generalizing" },
  { id: "backpropagation", label: "Backpropagation", href: "/backpropagation" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 w-full bg-gray-900 text-white z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Home className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">Backpropagation</h1>
          </div>
        </Link>

        <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0">
          <nav className={`hidden md:flex space-x-6`}>
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${pathname === item.href
                    ? "bg-blue-800/30 text-blue-300 font-semibold"
                    : "hover:text-blue-300 hover:bg-gray-800"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 border-t border-gray-700 pt-4 transition-all duration-300">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === item.href
                    ? "bg-blue-800/30 text-blue-300 font-semibold"
                    : "hover:bg-gray-800 hover:text-blue-300"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
