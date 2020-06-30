import { query, getData } from '@pluginjs/dom'
import ScrollProgress from '@pluginjs/scroll-progress'

const element = query('#apis .apiExample')
let instance = ScrollProgress.of(element, {
  size: 10,
  innerColor: 'linear-gradient(120deg, rgb(132, 250, 176), rgb(143, 211, 244))'
})

const apisHandler = ({ target }) => {
  // const { api } = target.dataset
  const api = getData('api', target)
  if (api === 'init') {
    instance = ScrollProgress.of(element, {
      onReady() {
        console.log('ready', 'event')
      },
      onDestroy() {
        console.log('destroy', 'event')
      },
      onEnable() {
        console.log('enable', 'event')
      },
      onDisable() {
        console.log('disable', 'event')
      },
      onRefresh() {
        console.log('refresh', 'event')
      }
    })
  }

  if (api === 'destroy') {
    instance.destroy()
  }

  if (api === 'disable') {
    instance.disable()
  }

  if (api === 'enable') {
    instance.enable()
  }

  if (api === 'refresh') {
    instance.refresh()
  }
}

query('#apis,scroll-progress-apis').addEventListener('click', apisHandler)
