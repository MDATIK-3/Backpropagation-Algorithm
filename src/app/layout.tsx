import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "./components/shared/Navigation"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "CSE 411: Understanding Backpropagation - Machine Learning Visualization",
  description:
    "Interactive visualization of backpropagation, gradient descent, and neural network concepts for machine learning education.",
  keywords: "backpropagation, machine learning, neural networks, gradient descent, CSE 411, Green University",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"
          integrity="sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx"
          crossOrigin="anonymous"
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"
          integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="font-sans antialiased">
        <main>
          <Navigation />
          <div className="mt-10">
            {children}
          </div>
          <div className="space-y-4 py-2">
            <p className="text-sm sm:text-base text-gray-500 text-center">
              Dr. Muhammad Abul Hasan • Green University of Bangladesh • Fall 2023
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}
