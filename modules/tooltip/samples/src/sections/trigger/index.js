import { queryAll } from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'

queryAll('#trigger [data-toggle="tooltip"]').map(element =>
  Tooltip.of(element, {
    /** options **/
  })
)
