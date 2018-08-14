import { query, getData } from '@pluginjs/dom'
import ScrollProgress from '@pluginjs/scroll-progress'

let instance

const apisHandler = ({ target }) => {
  // const { api } = target.dataset
  const api = getData('api', target)
  console.log(api)
  if (api === 'init') {
    instance = ScrollProgress.of('.apiExample', {
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
