"use client"

import { AlertTriangle, Clock, Search, UserMinus, FileSearch } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

export default function Problem() {
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

  const problems = [
    {
      icon: <Clock className="h-8 w-8 text-primary-500" />,
      title: "Hours Wasted Daily",
      description: "Reps spending 20-40% of their time on manual research instead of engaging prospects.",
      bgColor: "bg-primary-50",
      delay: 0,
    },
    {
      icon: <Search className="h-8 w-8 text-primary-500" />,
      title: "Inconsistent Personalization",
      description: "Outreach quality varies, leading to missed opportunities and lower conversion rates.",
      bgColor: "bg-primary-50",
      delay: 150,
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-primary-500" />,
      title: "Low Reply Rates",
      description: "Generic messages fail to cut through the noise, tanking your engagement metrics.",
      bgColor: "bg-primary-50",
      delay: 300,
    },
    {
      icon: <UserMinus className="h-8 w-8 text-primary-500" />,
      title: "SDR Burnout",
      description: "Repetitive, low-value tasks lead to frustration and decreased morale among team members.",
      bgColor: "bg-primary-50",
      delay: 450,
    },
    {
      icon: <FileSearch className="h-8 w-8 text-primary-500" />,
      title: "Missed Intel",
      description: "Critical buying signals and personalization opportunities buried in online noise.",
      bgColor: "bg-primary-50",
      delay: 600,
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-pureWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
            <span className="text-primary-700 font-medium text-sm">The Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">The Problem with Manual Lead Research</h2>
          <p className="text-xl text-mediumGray">
            Sales development representatives spend hours on research instead of doing what they do best: connecting
            with prospects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${problem.delay}ms` }}
            >
              <Card className="bg-pureWhite shadow-card border-lightGray hover:border-primary-300 transition-all duration-300 h-full overflow-hidden group">
                <CardContent className="p-8">
                  <div
                    className={`mb-6 ${problem.bgColor} p-4 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    {problem.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-darkGray">{problem.title}</h3>
                  <p className="text-mediumGray leading-relaxed">{problem.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
