import { query } from '@pluginjs/dom'
import ScrollSpy from '@pluginjs/scroll-spy'

const element = query('#navbar')
ScrollSpy.of(element, {
  itemSelector: 'a',
  activeClass: 'active',
  onReady() {
    console.info('ready')
  },
  onChange(value) {
    console.info('change', value)
  }
})
