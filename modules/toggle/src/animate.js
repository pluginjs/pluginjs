import { curry } from '@pluginjs/utils'

const toggleAnimation = curry((action, options, toggler) => {
  const { duration } = options
  const moveStart = parseFloat(window.getComputedStyle(toggler).marginLeft)
  const moveEnd = parseFloat(action.marginLeft)
  const step = curry((start, timestamp) => {
    if (!start) {
      start = timestamp
    }
    const progress = Math.min((timestamp - start) / duration, 1)
    const nextStep = (moveEnd - moveStart) * progress
    toggler.style.marginLeft = `${moveStart + nextStep}px`
    if (progress < 1) {
      return window.requestAnimationFrame(step(start))
    }
    return null
  })
  return window.requestAnimationFrame(step(null))
})

export default toggleAnimation
