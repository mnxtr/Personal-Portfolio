import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden ${
        hover ? 'transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow)] hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
