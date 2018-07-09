import { query } from '@pluginjs/dom'
import DynamicNumber from '@pluginjs/dynamic-number'

const element = query('#custom-callback .dynamic-number')
DynamicNumber.of(element, {
  /** options **/
}).start()
