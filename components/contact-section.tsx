"use client"

import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import ContactForm from "./contact-form"

export default function ContactSection() {
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
    <section ref={ref} className="py-24 bg-warmWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-50 rounded-full mb-6 border border-primary-100">
            <span className="text-primary-700 font-medium text-sm">Get Started</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-darkGray mb-6">Ready to Transform Your Sales Outreach?</h2>
          <p className="text-xl text-mediumGray">
            Request a demo today and see how Obsidian AI can help your team save time and boost results.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
