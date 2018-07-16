import { queryAll } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

queryAll('#positions [data-toggle="popover"]').map(element =>
  Popover.of(element, {
    /** options **/
    hideOutClick: false
  })
)
