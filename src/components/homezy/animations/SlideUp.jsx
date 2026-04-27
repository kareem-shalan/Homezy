import useInViewAnimation from '../../../hooks/homezy/useInViewAnimation'

const SlideUp = ({ children, className = '', delay = 0, duration = 700, distance = 'translate-y-5', triggerOnce = true }) => {
  const { ref, isInView } = useInViewAnimation({ triggerOnce })

  return (
    <div
      ref={ref}
      className={[
        'transition-[opacity,transform] ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        isInView ? 'translate-y-0 opacity-100' : `${distance} opacity-0`,
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

export default SlideUp
