import { queryAll } from '@pluginjs/dom'
import DynamicNumber from '@pluginjs/dynamic-number'

const element = queryAll('#options .dynamic-number')

element.forEach(element =>
  DynamicNumber.of(element, {
    /** options **/
  }).start()
)
