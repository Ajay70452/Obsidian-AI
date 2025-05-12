"use client"

import { Clock, BarChart2, Calendar, Target, Sparkles, DollarSign } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

export default function Benefits() {
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

  const benefits = [
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: "Save 15+ Hours Weekly",
      description:
        "Eliminate manual research and free up your SDRs to focus on meaningful conversations with prospects.",
      delay: 0,
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary-500" />,
      title: "3x Higher Reply Rates",
      description: "Personalized outreach hooks based on relevant insights generate significantly higher engagement.",
      delay: 100,
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary-500" />,
      title: "More Booked Meetings",
      description: "Convert more prospects into scheduled meetings with personalized, relevant outreach.",
      delay: 200,
    },
    {
      icon: <Target className="h-10 w-10 text-primary-500" />,
      title: "Improved Targeting",
      description: "Identify the most promising prospects based on AI-powered insights and engagement patterns.",
      delay: 300,
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary-500" />,
      title: "Consistent Quality",
      description: "Maintain high-quality outreach across your entire team, regardless of experience level.",
      delay: 400,
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary-500" />,
      title: "Increased ROI",
      description:
        "Maximize your sales team's efficiency and effectiveness, leading to higher conversion rates and revenue.",
      delay: 500,
    },
  ]

  return (
    <section ref={ref} className="py-32 bg-pureWhite relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
            <span className="text-primary-700 font-medium text-sm">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">Benefits of Obsidian AI</h2>
          <p className="text-xl text-mediumGray">
            Transform your sales outreach with AI-powered insights and personalization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${benefit.delay}ms` }}
            >
              <div className="flex flex-col items-center text-center group">
                <div className="mb-8 bg-primary-50 p-6 rounded-2xl w-24 h-24 flex items-center justify-center border border-primary-100 group-hover:border-primary-300 shadow-soft group-hover:shadow-[0_10px_30px_rgba(255,92,53,0.15)] transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-darkGray group-hover:text-primary-500 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-mediumGray leading-relaxed max-w-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
