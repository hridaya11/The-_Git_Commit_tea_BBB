"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypewriterEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}

export function TypewriterEffect({ words, className, cursorClassName, ...props }: TypewriterEffectProps) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)

      const wordsArray = words.map((word) => word.text)
      const textToType = wordsArray.join(" ")

      const animation = async () => {
        await animate(
          "span",
          {
            opacity: 1,
          },
          {
            duration: 0.01,
            delay: stagger(0.1),
          },
        )

        await animate(
          "span:last-child",
          {
            opacity: 1,
          },
          {
            duration: 0.1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
        )
      }

      animation()
    }
  }, [isInView, started, animate, words])

  const renderWords = () => {
    return (
      <div className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span initial={{ opacity: 0 }} key={`char-${index}`} className={cn(word.className)}>
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={scope} className={cn("text-center font-bold", className)} {...props}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        className={cn("inline-block rounded-sm w-[4px] h-[24px] md:h-[34px] bg-primary", cursorClassName)}
      ></motion.span>
    </div>
  )
}

