import { useEffect, useRef, useState } from 'react'

export const useInViewAnimation = ({
  threshold = 0.16,
  rootMargin = '0px 0px -10% 0px',
  triggerOnce = true,
  disabled = false,
} = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (disabled || prefersReducedMotion || !('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setIsInView(true))
      return () => {
        cancelAnimationFrame(frame)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.unobserve(entry.target)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [disabled, rootMargin, threshold, triggerOnce])

  return { ref, isInView }
}

export default useInViewAnimation
