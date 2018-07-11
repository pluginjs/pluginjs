import Component from '@pluginjs/component'
import {
  register
} from '@pluginjs/pluginjs'

const NAMESPACE = 'sample'
const DEFAULTS = {
  value: 'world'
}

@register(NAMESPACE, {
  defaults: DEFAULTS
})
class Sample extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = {
      ...DEFAULTS,
      ...options,
      ...this.getDataOptions()
    }

    this.initialize()
  }

  initialize() {
    this.element.setAttribute('hello', this.options.value)
  }
}

export default Sample
