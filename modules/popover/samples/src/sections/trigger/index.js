import { queryAll } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

queryAll('#trigger [data-toggle="popover"]').map(element =>
  Popover.of(element, {
    /** options **/
  })
)
