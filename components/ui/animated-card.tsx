"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const AnimatedCard = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Card>>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card ref={ref} className={cn("transition-all duration-200", className)} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  },
)
AnimatedCard.displayName = "AnimatedCard"

export { AnimatedCard }

