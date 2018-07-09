import { query } from '@pluginjs/dom'
import DynamicNumber from '@pluginjs/dynamic-number'

const element = query('#update .dynamic-number')
DynamicNumber.of(element, {
  /** options **/
  onUpdate(n) {
    if (n > 75) {
      this.element.style.color = 'red'
    } else if (n < 40) {
      this.element.style.color = 'green'
    } else {
      this.element.style.color = 'orange'
    }
  }
}).start()
