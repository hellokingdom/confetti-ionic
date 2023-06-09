import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

const MIN_DURATION = 1
const MAX_DURATION = 1


function PointsCounter({
  from,
  to,
  play = true,
  onAnimationComplete,
}: {
  from: number
  to: number
  play?: boolean
  onAnimationComplete?: () => void
  }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    // If the previous value was higher we have lost points so we don't want to animate or celebrate.
    if (!play) {
      return
    }
    const controls = animate(from, to, {
      duration: clamp((to - from) / 500, MIN_DURATION, MAX_DURATION),
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString()
      },
      onComplete() {
        onAnimationComplete && onAnimationComplete()
      },
    })

    return () => controls.stop()
  }, [from, to, onAnimationComplete, play])

  return <span ref={nodeRef}>{from.toLocaleString()}</span>
}


export default PointsCounter;