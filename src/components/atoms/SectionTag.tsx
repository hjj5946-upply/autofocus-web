interface SectionTagProps {
  children: React.ReactNode
  variant?: 'light' | 'dark'
  className?: string
}

export function SectionTag({ children, variant = 'light', className = '' }: SectionTagProps) {
  const variants = {
    light: 'text-brand-accent',
    dark: 'text-blue-400',
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-6 h-px bg-brand-accent opacity-60" />
      <span
        className={`text-xs tracking-[0.2em] uppercase font-semibold ${variants[variant]}`}
      >
        {children}
      </span>
    </div>
  )
}
