import { query, queryAll, getData } from '@pluginjs/dom'
import ScrollTop from '@pluginjs/scroll-top'

const example = query('#default')
const easing = query('[data-option="easing"]', example)
const duration = query('[data-option="duration"]', example)
const type = query('[data-option="type"]', example)
const color = query('[data-option="color"]', example)
const animation = query('[data-option="animation"]', example)

let instance = ScrollTop.of({
  type: type.value,
  easing: easing.value,
  duration: duration.value,
  animation: animation.value
})

queryAll('[data-api]').forEach(el =>
  el.addEventListener('click', e => {
    const api = getData('api', e.target)
    if (api === 'init') {
      instance = ScrollTop.of({
        type: type.value,
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
      type:
        color.value === 'default' ? type.value : `${type.value} ${color.value}`,
      easing: easing.value,
      duration: duration.value,
      animation: animation.value,
      color: color.value === 'custom' ? '#fff' : null,
      background: null
    })
    console.log('instance', instance)
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
