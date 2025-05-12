"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

export default function Footer() {
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
    <footer ref={ref} className="bg-warmWhite text-darkGray py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your sales outreach?</h2>
            <p className="text-mediumGray text-lg mb-8 leading-relaxed">
              Join hundreds of sales teams already using LeadSpark AI to boost their productivity and results.
            </p>
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
          </div>

          <div
            className={`bg-pureWhite p-10 rounded-2xl shadow-card border border-lightGray transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 text-darkGray">Stay updated with our latest features</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-warmWhite border-lightGray text-darkGray h-12 focus:border-primary-500 focus:ring-primary-500/20"
              />
              <Button className="bg-primary-500 hover:bg-primary-600 h-12 whitespace-nowrap shadow-button transition-all duration-300 hover:translate-y-[-2px]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-lightGray pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">OB</span>
                </div>
                <p className="text-xl font-bold">Obsidian AI</p>
              </div>
              <p className="text-mediumGray">© 2025 Obsidian AI. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-mediumGray hover:text-primary-500 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-mediumGray hover:text-primary-500 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-mediumGray hover:text-primary-500 transition-colors duration-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
