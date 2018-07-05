import { queryAll } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

queryAll('#layout [data-toggle="popover"]').map(element =>
  Popover.of(element, {
    /** options **/
  })
)
