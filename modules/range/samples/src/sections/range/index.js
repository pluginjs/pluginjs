import { query } from '@pluginjs/dom'
import Range from '@pluginjs/range'

const element = query('#range .example-range')

let instance = Range.of(element, {
  range: true
})

const instances = {
  init() {
    if (!instance.plugin) {
      instance = Range.of(element, {
        range: true
      })
    }
  },
  get() {
    console.info(instance.get())
  },
  set() {
    instance.set([50, 100])
  },
  val() {
    console.info(instance.val())
  },
  valSet() {
    instance.val('20-80')
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

query('#range .api').addEventListener('click', event => {
  const el = event.target
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  if (!el.matches('[data-api]')) {
    return
  }

  instances[el.dataset.api]()
})
