"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BackgroundBeams({ className, ...props }: BackgroundBeamsProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background", className)}
      {...props}
    >
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
        style={{
          transform: `translate(${mousePosition.x / 25}px, ${mousePosition.y / 25}px)`,
        }}
      />
      <div
        className="absolute left-[calc(50%-25rem)] top-0 aspect-square w-[50rem] rounded-full bg-primary/40 opacity-50 blur-[100px]"
        style={{
          transform: `translate(${mousePosition.x / 15}px, ${mousePosition.y / 15}px)`,
        }}
      />
      <div
        className="absolute right-[calc(50%-25rem)] bottom-0 aspect-square w-[50rem] rounded-full bg-primary/20 opacity-50 blur-[100px]"
        style={{
          transform: `translate(${-mousePosition.x / 15}px, ${-mousePosition.y / 15}px)`,
        }}
      />
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  )
}

