import { cn } from '../utils/cn'

const Card = ({ children, className }) => {
  return <div className={cn('rounded-2xl bg-white shadow-card', className)}>{children}</div>
}

export default Card
