import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
  primary: 'bg-[var(--accent)] text-white hover:opacity-90 shadow-lg hover:shadow-[var(--accent-glow)]',
  secondary: 'bg-[var(--surface-2)] text-[var(--fg)] hover:bg-[var(--border)]',
  ghost: 'text-[var(--fg)] hover:bg-[var(--surface-2)]',
  outline: 'border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
