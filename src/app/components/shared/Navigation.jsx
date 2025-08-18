"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
    return () => { }
  }, [pathname])


  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled
            ? "bg-gray-800/95 backdrop-blur-lg shadow-lg border-b border-gray-700/50"
            : "bg-gray-900/90 backdrop-blur-md shadow-md"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex flex-col group hover:opacity-90 transition-opacity duration-200">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-200">
                Neural Networks
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400 -mt-1">
                Interactive Learning
              </p>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm xl:text-base transition-all duration-200 ease-in-out group ${isActive
                        ? "bg-blue-600/20 text-blue-300 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }`}
                  >
                    {item.label}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg border border-blue-500/30" />
                    )}
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-400 transition-all duration-200 ease-in-out ${isActive ? "w-3/4" : "group-hover:w-1/2"
                        }`}
                    />
                  </Link>
                )
              })}
            </nav>

            <button
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${isMenuOpen
                  ? "bg-gray-700 text-white scale-105"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105"
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
                <span
                  className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="bg-gray-800/95 backdrop-blur-lg border-t border-gray-700/50">
            <nav className="container mx-auto px-4 sm:px-6 py-4 space-y-1">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-in-out transform ${isActive
                        ? "bg-blue-600/20 text-blue-300 shadow-lg scale-[1.02]"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50 hover:translate-x-1"
                      } ${isMenuOpen ? "animate-slideIn" : ""}`}
                    style={{ animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms" }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="px-4 sm:px-6 pb-4 pt-2 border-t border-gray-700/30 text-center">
              <p className="text-xs text-gray-500">Interactive Neural Network Learning Platform</p>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ease-in-out"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="h-16 lg:h-20" />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-in-out forwards;
        }
      `}</style>
    </>
  )
}