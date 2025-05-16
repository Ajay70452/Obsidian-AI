"use client"

import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Bot, FileText, MessageSquare, Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Solution() {
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

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary-500" />,
      title: "Automated Deep Research",
      description: "Uncover critical company insights, news, and signals without manual digging.",
      delay: 150,
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-500" />,
      title: "AI-Generated Lead Summaries",
      description: "Get concise, actionable summaries of each prospect at a glance.",
      delay: 300,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-500" />,
      title: "Personalized Outreach Hooks",
      description: "Instantly generate compelling, relevant hooks to grab attention and start conversations.",
      delay: 450,
    },
    {
      icon: <Upload className="h-8 w-8 text-primary-500" />,
      title: "Batch Processing via CSV",
      description: "Upload your lead lists and let Obsidian AI do the heavy lifting.",
      delay: 600,
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-warmWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
            <span className="text-primary-700 font-medium text-sm">Our Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">
            Introducing Obsidian AI: Your Intelligent Sales Research & Outreach Assistant
          </h2>
          <p className="text-xl text-mediumGray">
            Obsidian AI leverages advanced AI to automatically scour company websites and news sources, distilling
            complex information into concise lead summaries and crafting unique, personalized outreach hooks. We give
            your sales team the intelligence and the starting line they need to make every interaction count.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <Card className="bg-pureWhite shadow-card border-lightGray hover:border-primary-300 transition-all duration-300 h-full overflow-hidden group">
                <CardContent className="p-8">
                  <div
                    className={`mb-6 bg-primary-50 p-4 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-darkGray">{feature.title}</h3>
                  <p className="text-mediumGray leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
