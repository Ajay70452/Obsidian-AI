"use client"

import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import HeroAnimation from "@/components/hero-animation"
// No need to import Link from 'next/link' for external URLs

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  return (
    <section ref={ref} className="relative bg-warmWhite py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#212529"></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`max-w-xl transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
              <span className="text-primary-700 font-medium text-sm">AI-Powered Sales Enablement</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-darkGray leading-tight mb-6">
              Turn Cold Leads Into <span className="text-primary-500">Hot Opportunities</span>
            </h1>
            <p className="text-xl text-mediumGray mb-8 leading-relaxed">
              Obsidian AI researches your prospects and crafts personalized outreach hooks that get responses. Save
              hours of research time and boost your reply rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              {/* --- MODIFIED BUTTON --- */}
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-6 rounded-lg text-lg shadow-button transition-all duration-300 hover:translate-y-[-2px]"
                asChild // Add this prop
              >
                <a
                  href="https://forms.gle/ag176kaWkDC9Ve2P6"
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practice
                >
                  Request Demo
                </a>
              </Button>
              {/* --- END MODIFIED BUTTON --- */}
            </div>
          </div>
          <div
            className={`relative h-[500px] w-full transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  )
}