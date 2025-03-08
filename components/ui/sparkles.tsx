"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Sparkles({ className, children, ...props }: SparklesProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateSparkle = () => {
      const id = Math.random()
      const rect = ref.current?.getBoundingClientRect()

      if (!rect) return null

      const x = Math.random() * rect.width
      const y = Math.random() * rect.height
      const size = Math.random() * 3 + 1

      return { id, x, y, size }
    }

    const interval = setInterval(() => {
      const newSparkle = generateSparkle()
      if (newSparkle) {
        setSparkles((current) => [...current, newSparkle])

        setTimeout(() => {
          setSparkles((current) => current.filter((s) => s.id !== newSparkle.id))
        }, 500)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...props}>
      {children}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute pointer-events-none text-primary"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

