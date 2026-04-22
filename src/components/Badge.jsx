import { cn } from '../utils/cn'

const variants = {
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-emerald-100 text-emerald-700',
  neutral: 'bg-neutral-100 text-neutral-700',
  dark: 'bg-neutral-900 text-white',
}

const Badge = ({ children, variant = 'neutral', className }) => {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}

export default Badge
