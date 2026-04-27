import { useEffect, useState } from 'react'

const PageTransition = ({ children, className = '', delay = 0, duration = 450 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true))

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className={[
        'transition-[opacity,transform] ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className,
      ].join(' ')}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default PageTransition
