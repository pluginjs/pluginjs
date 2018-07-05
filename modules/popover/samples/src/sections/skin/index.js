import { query } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

const element = query('#skin [data-toggle="popover"]')
Popover.of(element, {
  /** options **/
})
