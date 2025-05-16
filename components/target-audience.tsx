"use client"

import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { Users, Briefcase, LineChart, Building2 } from "lucide-react"

export default function TargetAudience() {
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

  const audiences = [
    {
      icon: <Users className="h-12 w-12 text-primary-500" />,
      title: "Sales Development Representatives (SDRs) & BDRs",
      description: "Who need to research prospects quickly and craft personalized outreach at scale.",
      delay: 0,
    },
    {
      icon: <Briefcase className="h-12 w-12 text-primary-500" />,
      title: "Account Executives (AEs)",
      description: "Focused on outbound prospecting and personalized follow-ups with key accounts.",
      delay: 150,
    },
    {
      icon: <LineChart className="h-12 w-12 text-primary-500" />,
      title: "Sales Managers & Leaders",
      description: "Looking to boost team efficiency and improve outreach performance metrics.",
      delay: 300,
    },
    {
      icon: <Building2 className="h-12 w-12 text-primary-500" />,
      title: "B2B Companies",
      description: "Especially SaaS, Agencies, and Tech firms doing outbound prospecting or account-based selling.",
      delay: 450,
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-pureWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
            <span className="text-primary-700 font-medium text-sm">Ideal For</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">
            Obsidian AI is Built For High-Performing Sales Teams
          </h2>
          <p className="text-xl text-mediumGray">
            Perfect for teams doing outbound prospecting, account-based selling, or looking to deeply personalize
            follow-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${audience.delay}ms` }}
            >
              <div className="flex items-start gap-6 group">
                <div className="bg-primary-50 p-4 rounded-2xl flex-shrink-0 border border-primary-100 group-hover:border-primary-300 shadow-soft group-hover:shadow-[0_10px_30px_rgba(255,92,53,0.15)] transition-all duration-300">
                  {audience.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-darkGray group-hover:text-primary-500 transition-colors duration-300">
                    {audience.title}
                  </h3>
                  <p className="text-mediumGray leading-relaxed">{audience.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
