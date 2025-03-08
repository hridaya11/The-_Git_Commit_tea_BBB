"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string
    description: string
    icon?: React.ReactNode
  }[]
}

export function HoverEffect({ className, items, ...props }: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)} {...props}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group block p-6 bg-background border rounded-lg shadow-sm"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <div className="relative z-10">
            <div className="p-2 mb-2 w-fit rounded-lg bg-primary/10">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
          <div
            className={cn(
              "absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              hoveredIndex === idx ? "opacity-100" : "opacity-0",
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}

