"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-background/80 backdrop-blur-sm border border-primary-200/20 px-3 py-2 rounded-md text-sm">
      Current theme: <span className="font-bold">{theme}</span>
    </div>
  )
}
