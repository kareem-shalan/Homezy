import useInViewAnimation from '../../../hooks/homezy/useInViewAnimation'

const FadeIn = ({ children, className = '', delay = 0, duration = 700, triggerOnce = true }) => {
  const { ref, isInView } = useInViewAnimation({ triggerOnce })

  return (
    <div
      ref={ref}
      className={[
        'transition-opacity ease-out motion-reduce:opacity-100 motion-reduce:transition-none',
        isInView ? 'opacity-100' : 'opacity-0',
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

export default FadeIn
