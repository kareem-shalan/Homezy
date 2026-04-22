import { cn } from '../utils/cn'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800',
  secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
  outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50',
  disabled: 'bg-neutral-200 text-neutral-500',
}

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const effectiveDisabled = disabled || isLoading || variant === 'disabled'

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], className)}
      disabled={effectiveDisabled}
      {...props}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  )
}

export default Button
