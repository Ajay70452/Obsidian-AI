"use client"

import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Database, Search, Send } from "lucide-react"

export default function HowItWorks() {
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

  const steps = [
    {
      number: 1,
      title: "Input Your Lead",
      description: "Simply provide a company website URL (or upload your CSV list).",
      icon: <Database className="h-10 w-10 text-pureWhite" />,
      delay: 0,
    },
    {
      number: 2,
      title: "Obsidian AI Works Its Magic",
      description: "Our AI diligently researches, analyzes, and synthesizes critical information.",
      icon: <Search className="h-10 w-10 text-pureWhite" />,
      delay: 200,
    },
    {
      number: 3,
      title: "Get Actionable Outputs",
      description: "Receive a concise lead summary and multiple personalized outreach hooks, ready to use.",
      icon: <Send className="h-10 w-10 text-pureWhite" />,
      delay: 400,
    },
  ]

  return (
    <section ref={ref} className="py-28 bg-warmWhite relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
            <span className="text-primary-700 font-medium text-sm">Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">
            Supercharge Your Outreach in 3 Simple Steps
          </h2>
          <p className="text-xl text-mediumGray">
            Our AI-powered platform automates research and generates personalized outreach hooks in three simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-lightGray -translate-y-1/2 z-0 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${step.delay}ms` }}
              >
                <div className="bg-pureWhite p-8 rounded-2xl shadow-card border border-lightGray hover:border-primary-300 transition-all duration-300 h-full group">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-8 bg-gradient-to-br from-primary-400 to-primary-600 p-5 rounded-2xl w-24 h-24 flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-[0_8px_20px_rgba(255,92,53,0.3)] group-hover:shadow-[0_12px_28px_rgba(255,92,53,0.4)] transition-all duration-300 group-hover:scale-105">
                      {step.icon}
                    </div>
                    <div className="absolute -top-5 -right-5 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-darkGray">{step.title}</h3>
                    <p className="text-mediumGray leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
