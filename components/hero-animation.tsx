"use client"

import { useEffect, useRef } from "react"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()

    // Particles array
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      pulse: boolean
      pulseSpeed: number
    }[] = []

    // Create particles
    const createParticles = () => {
      const particleCount = 80
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 4 + 1
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: size,
          color: getRandomColor(),
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.5 + 0.2,
          pulse: Math.random() > 0.5,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(255, 92, 53, alpha)", // vibrant orange
        "rgba(255, 120, 80, alpha)", // lighter orange
        "rgba(230, 70, 30, alpha)", // darker orange
        "rgba(255, 150, 120, alpha)", // light orange
        "rgba(240, 100, 70, alpha)", // medium orange
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw connections
      ctx.strokeStyle = "rgba(255, 92, 53, 0.05)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const opacity = 0.15 * (1 - distance / 150)
            ctx.strokeStyle = `rgba(255, 92, 53, ${opacity})`
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        // Update opacity for pulsing effect
        if (particle.pulse) {
          particle.opacity += particle.pulseSpeed
          if (particle.opacity > 0.7 || particle.opacity < 0.2) {
            particle.pulseSpeed = -particle.pulseSpeed
          }
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("alpha", particle.opacity.toString())
        ctx.fill()

        // Add glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        gradient.addColorStop(0, particle.color.replace("alpha", (particle.opacity * 0.5).toString()))
        gradient.addColorStop(1, particle.color.replace("alpha", "0"))

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.offsetWidth) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.offsetHeight) {
          particle.speedY *= -1
        }
      })

      requestAnimationFrame(drawParticles)
    }

    // Initialize
    createParticles()
    drawParticles()

    // Handle resize
    const handleResize = () => {
      setCanvasDimensions()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-card bg-pureWhite border border-lightGray">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-3/4 h-3/4 opacity-80">
          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary-500 rounded-full animate-pulse-soft shadow-[0_0_30px_rgba(255,92,53,0.6)]"></div>

          {/* Orbiting nodes */}
          <div
            className="absolute top-1/4 left-1/4 w-10 h-10 bg-primary-400 rounded-full animate-float shadow-[0_0_20px_rgba(255,92,53,0.4)]"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-8 h-8 bg-primary-300 rounded-full animate-float shadow-[0_0_15px_rgba(255,92,53,0.3)]"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-primary-600 rounded-full animate-float shadow-[0_0_25px_rgba(255,92,53,0.5)]"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-9 h-9 bg-primary-500 rounded-full animate-float shadow-[0_0_18px_rgba(255,92,53,0.4)]"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Connection rings */}
          <div className="absolute w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-primary-500/20 rounded-full"></div>
          <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary-500/10 rounded-full"></div>
          <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary-500/5 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
