import { query } from '@pluginjs/dom'
import DynamicNumber from '@pluginjs/dynamic-number'

const element = query('#basic .dynamic-number')
DynamicNumber.of(element, {
  /** options **/
}).start()
