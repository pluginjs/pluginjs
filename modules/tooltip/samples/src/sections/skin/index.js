import { queryAll } from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'

queryAll('#skin [data-toggle="tooltip"]').map(element =>
  Tooltip.of(element, {
    /** options **/
  })
)
