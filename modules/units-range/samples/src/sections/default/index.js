import { query } from '@pluginjs/dom'
import UnitsRange from '@pluginjs/units-range'

const element = query('#default .example-default')

let instance = UnitsRange.of(element, {
  onChange(val) {
    console.info(val)
  }
})

const instances = {
  init() {
    if (!instance.plugin) {
      instance = UnitsRange.of(element, {})
    }
  },
  get() {
    console.info(instance.get())
  },
  set() {
    instance.set({
      input: 50,
      unit: '%'
    })
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
