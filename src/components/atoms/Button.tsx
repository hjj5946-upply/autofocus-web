interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline-light' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const variants = {
    primary:
      'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/8 dark:text-slate-300 dark:hover:bg-white/12 focus:ring-slate-400',
    'outline-light':
      'border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/35 hover:text-slate-900 dark:hover:text-white focus:ring-slate-400',
    ghost:
      'text-brand-accent hover:text-blue-600 hover:underline focus:ring-brand-accent',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
