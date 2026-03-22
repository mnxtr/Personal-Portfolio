interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)] ${className}`}
    >
      {children}
    </span>
  )
}
