import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

const directionVariants = {
  up: { y: 32, opacity: 0 },
  down: { y: -32, opacity: 0 },
  left: { x: -32, opacity: 0 },
  right: { x: 32, opacity: 0 },
  none: { opacity: 0 },
}

export function FadeIn({ children, delay = 0, direction = 'up', className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
