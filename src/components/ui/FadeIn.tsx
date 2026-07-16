"use client"
import { motion, type Variants } from "framer-motion"
import type { CSSProperties, ElementType, ReactNode, Ref } from "react"

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  as?: ElementType
}

/** Fades + slides an element up once it scrolls into view. */
export function FadeIn({ children, className, delay = 0, amount = 0.3, as = "div" }: FadeInProps) {
  const MotionTag = motion(as) as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeUpVariants}
      custom={delay}
    >
      {children}
    </MotionTag>
  )
}

interface FadeInStaggerProps {
  children: ReactNode
  className?: string
  amount?: number
  style?: CSSProperties
  as?: ElementType
  ref?: Ref<HTMLDivElement>
  [key: string]: unknown
}

/** Wraps a group of FadeInItem children and reveals them staggered once in view. */
export function FadeInStagger({ children, className, amount = 0.2, style, as = "div", ref, ...rest }: FadeInStaggerProps) {
  const MotionTag = motion(as) as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

interface FadeInItemProps {
  children: ReactNode
  className?: string
  as?: ElementType
  [key: string]: unknown
}

export function FadeInItem({ children, className, as = "div", ...rest }: FadeInItemProps) {
  const MotionTag = motion(as) as typeof motion.div

  return (
    <MotionTag className={className} variants={fadeUpItem} {...rest}>
      {children}
    </MotionTag>
  )
}
