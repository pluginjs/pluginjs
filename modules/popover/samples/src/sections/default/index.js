import { query } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

const element = query('#default [data-toggle="popover"]')
Popover.of(element, {
  /** options **/
  arrow: true
})
