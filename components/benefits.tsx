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
      title: "Save Valuable Hours Daily",
      description: "Free up your sales team to focus on selling, not searching. Cut research time by up to 70%.",
      delay: 0,
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary-500" />,
      title: "Skyrocket Reply Rates",
      description: "Engage prospects with hyper-personalized outreach that stands out from the competition.",
      delay: 100,
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary-500" />,
      title: "Book More Qualified Meetings",
      description: "Turn insights into conversations and opportunities with relevant, timely outreach.",
      delay: 200,
    },
    {
      icon: <Target className="h-10 w-10 text-primary-500" />,
      title: "Boost SDR Productivity & Morale",
      description: "Eliminate tedious tasks and empower your team with better tools and insights.",
      delay: 300,
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary-500" />,
      title: "Achieve Consistent Outreach Quality",
      description: "Ensure every prospect interaction is informed and relevant, regardless of rep experience.",
      delay: 400,
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary-500" />,
      title: "Scale Your Prospecting Efforts",
      description: "Handle more leads effectively without burning out your team or sacrificing quality.",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">
            Transform Your Sales Process with Obsidian AI
          </h2>
          <p className="text-xl text-mediumGray">
            Achieve tangible results and ROI with our AI-powered sales intelligence platform.
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
