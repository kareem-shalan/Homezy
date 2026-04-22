import { cn } from '../utils/cn'

const Input = ({ label, id, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-neutral-700">
          {label}
        </label>
      ) : null}

      <input
        id={id}
        className={cn(
          'h-12 w-full rounded-md border bg-white px-4 text-sm text-neutral-800 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
          error ? 'border-error focus-visible:ring-error/20' : 'border-neutral-200',
          className,
        )}
        {...props}
      />

      {error ? <p className="mt-1 text-xs text-error">{error}</p> : null}
    </div>
  )
}

export default Input
