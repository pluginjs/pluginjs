import { curry } from '@pluginjs/utils'

export const fade = curry((type, { duration, callback }, element) => {
  const isIn = type === 'in'
  let opacity = isIn ? 0 : 1
  let start = null

  if (isIn) {
    if (element.style.display === 'none') {
      element.style.display = 'inline'
    }
    element.style.opacity = opacity
  }

  function step(timestamp) {
    if (!start) {
      start = timestamp
    }
    const progress = timestamp - start
    const percent = progress / duration
    opacity = isIn ? opacity + percent : opacity - percent
    element.style.opacity = opacity

    if (opacity <= 0) {
      element.style.display = 'none'
    }

    if (progress < duration) {
      window.requestAnimationFrame(step)
    } else if (callback) {
      callback()
    }
  }

  window.requestAnimationFrame(step)
})

export const fadeOut = fade('out')
export const fadeIn = fade('in')
