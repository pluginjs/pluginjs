import { query, queryAll, getData } from '@pluginjs/dom'
import ScrollTop from '@pluginjs/scroll-top'

const root = query('#default')
const easing = query('[data-option="easing"]', root)
const duration = query('[data-option="duration"]', root)
const theme = query('[data-option="theme"]', root)
const animation = query('[data-option="animation"]', root)

let instance = ScrollTop.of({
  theme: theme.value,
  easing: easing.value,
  duration: duration.value,
  animation: animation.value
})

queryAll('[data-api]').forEach(el =>
  el.addEventListener('click', ({ target }) => {
    const api = getData('api', target)
    if (api === 'init') {
      instance = ScrollTop.of({
        theme: theme.value,
        easing: easing.value,
        duration: duration.value,
        animation: animation.value
      })
    } else {
      instance[api]()
    }
  })
)

queryAll('[data-option]').forEach(el =>
  el.addEventListener('change', () => {
    if (instance.is('initialized')) {
      instance.destroy()
    }

    instance = ScrollTop.of({
      theme: theme.value,
      easing: easing.value,
      duration: duration.value,
      animation: animation.value
    })
  })
)
