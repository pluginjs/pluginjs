import { query } from '@pluginjs/dom'
import Units from '@pluginjs/units'

const element = query('#default .example-default')
let instance = Units.of(element, {
  onChange(val) {
    console.info(val)
  }
})

const instances = {
  init() {
    if (!instance.plugin) {
      instance = Units.of(element, {})
    }
  },
  get() {
    console.info(instance.get())
  },
  set() {
    instance.set({
      input: 50,
      unit: 'px'
    })
  },
  setStatic() {
    instance.set('inherit')
  },
  val() {
    console.info(instance.val())
  },
  valSet() {
    instance.val('100%')
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
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  if (!el.matches('[data-api]')) {
    return
  }

  instances[el.dataset.api]()
})
