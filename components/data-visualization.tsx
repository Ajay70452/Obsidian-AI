"use client"

import { useEffect, useRef } from "react"

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Particles array
    const particles: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
    }[] = []

    // Create particles
    const createParticles = () => {
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(
            Math.random() * 100 + 100,
          )}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.random() * 0.5 + 0.2})`,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
        })
      }
    }

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(100, 150, 255, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
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
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-3/4 h-3/4 opacity-70">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/2 right-1/3 w-12 h-12 bg-indigo-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-14 h-14 bg-cyan-500 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute w-40 h-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-blue-400 rounded-full animate-ping opacity-30"
            style={{ animationDuration: "3s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
