import { query, queryAll, getData } from '@pluginjs/dom'
import ScrollTop from '@pluginjs/scroll-top'

const example = query('#default')
const easing = query('[data-option="easing"]', example)
const duration = query('[data-option="duration"]', example)
const theme = query('[data-option="theme"]', example)
const color = query('[data-option="color"]', example)
const animation = query('[data-option="animation"]', example)

let instance = ScrollTop.of({
  theme: theme.value,
  easing: easing.value,
  duration: duration.value,
  animation: animation.value
})

queryAll('[data-api]').forEach(el =>
  el.addEventListener('click', target => {
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
      theme:
        color.value === 'default'
          ? theme.value
          : `${theme.value} ${color.value}`,
      easing: easing.value,
      duration: duration.value,
      animation: animation.value,
      color: color.value === 'custom' ? '#fff' : null,
      background:
        color.value === 'custom'
          ? 'linear-gradient(45deg, #215fdb, #2feffd)'
          : null
    })
  })
)

color.addEventListener('change', () => {
  const value = color.value

  if (value === 'default') {
    example.style.background = '#fff'
  } else {
    example.style.background = '#333'
  }
})
