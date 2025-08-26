"use client";

import { useEffect, useRef, useState } from "react";

export default function MathEquation({
  equation,
  inline = true,
  className = "whitespace-nowrap overflow-auto",
}) {
  const spanRef = useRef(null);
  const [isKatexLoaded, setIsKatexLoaded] = useState(false);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.katex) {
      setIsKatexLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
    script.async = true;
    script.onload = () => setIsKatexLoaded(true);
    script.onerror = () => setRenderError(true);
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (!isKatexLoaded || !spanRef.current || !equation) return;

    try {
      spanRef.current.innerHTML = "";
      window.katex.render(equation, spanRef.current, {
        displayMode: !inline,
        throwOnError: false,
        trust: true,
        output: "html",
        strict: false,
        macros: {
          "\\RR": "\\mathbb{R}",
          "\\NN": "\\mathbb{N}",
          "\\ZZ": "\\mathbb{Z}",
        },
      });
      setRenderError(false);
    } catch {
      setRenderError(true);
      spanRef.current.textContent = equation;
    }
  }, [equation, inline, isKatexLoaded]);

  // Loading state
  if (!isKatexLoaded && !renderError) {
    return (
      <span
        className={`${
          inline ? "inline-block mx-1" : "block my-4 text-center"
        } ${className} text-gray-500 text-sm animate-pulse min-h-[2rem]`}
        aria-live="polite"
      >
        Loading equation...
      </span>
    );
  }

  // Error state
  if (renderError) {
    return (
      <span
        className={`${
          inline ? "inline-block mx-1" : "block my-4 text-center"
        } ${className} font-mono text-sm bg-rose-50 text-rose-700 px-3 py-1 rounded-md border border-rose-200 hover:bg-rose-100 transition-colors duration-200 min-h-[2rem]`}
        title="Failed to render equation"
        aria-label={`Equation: ${equation} (rendering failed)`}
      >
        {equation}
      </span>
    );
  }

  // Successfully rendered KaTeX
  return (
    <span
      ref={spanRef}
      className={`${
        inline ? "inline-block mx-1" : "block my-4 text-center"
      } ${className} hover:bg-gray-50 p-2 rounded-md transition-colors duration-200 min-h-[2rem]`}
      aria-label={`Mathematical equation: ${equation}`}
    />
  );
}
