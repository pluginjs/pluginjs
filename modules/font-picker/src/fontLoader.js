import { each } from '@pluginjs/utils'
import { intersectionObserverPolyfill } from '@pluginjs/polyfills'

intersectionObserverPolyfill()

export default class FontLoader {
  constructor(instance) {
    this.instance = instance

    this.createObserver()
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      (changes, observer) => {
        changes.forEach(change => {
          if (change.isIntersecting) {
            const $item = change.target

            observer.unobserve($item)
            this.load($item)
          }
        })
      },
      {
        root: this.instance.$main
      }
    )
  }

  observe(items) {
    each(items, (k, item) => {
      if (item.$dom.dataset.loaded !== true) {
        this.observer.observe(item.$dom)
      }
    })
  }

  load($item) {
    $item.dataset.loaded = true

    const source = this.instance.getSource($item.dataset.source)
    source.load($item, $item.dataset.value, $item.innerText)
  }

  reset() {
    this.observer.disconnect()
    this.createObserver()
  }
}
