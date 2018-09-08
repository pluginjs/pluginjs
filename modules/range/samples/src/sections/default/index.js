import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#default .example-default')

let instance = Range.of(element, {})

const instances = {
  init() {
    if (!instance.plugin) {
      instance = Range.of(element, {})
    }
  },
  get() {
    console.info(instance.get())
  },
  set() {
    instance.set(50)
  },
  val() {
    console.info(instance.val())
  },
  valSet() {
    instance.val(100)
  },
  destroy() {
    instance.destroy()
  },
  enable() {
    instance.enable()
  },
  disable() {
    instance.disable()
  }
}

query('#default .api').addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }

  instances[el.dataset.api]()
})
