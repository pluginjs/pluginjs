import { query } from '@pluginjs/dom'
import ScrollTop from '@pluginjs/scroll-top'

const root = query('#default')
const easing = query('.easing', root)
const duration = query('.duration', root)
const theme = query('.theme', root)
const animation = query('.animation', root)

let instance

const handler = ({ target }) => {
  if (target.matches('.api-init')) {
    instance = ScrollTop.of(document.body, {
      theme: theme.value,
      easing: easing.value,
      duration: duration.value,
      animation: animation.value
    })
  }

  if (target.matches('.api-destroy')) {
    instance.destroy()
  }

  if (target.matches('.api-enable')) {
    instance.enable()
  }

  if (target.matches('.api-disable')) {
    instance.disable()
  }
}
root.addEventListener('click', handler)
root.addEventListener('change', () => {
  if (instance.is('initialized')) {
    instance.destroy()
  }

  instance = ScrollTop.of(document.body, {
    theme: theme.value,
    easing: easing.value,
    duration: duration.value,
    animation: animation.value
  })
})
