import { queryAll } from '@pluginjs/dom'
import DynamicNumber from '@pluginjs/dynamic-number'

const element = queryAll('#format .dynamic-number')

element.forEach(element =>
  DynamicNumber.of(element, {
    /** options **/
  }).start()
)
