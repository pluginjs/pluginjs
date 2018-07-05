import { query } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

const element = query('#hide-out-click [data-toggle="popover"]')
Popover.of(element, {
  /** options **/
})
