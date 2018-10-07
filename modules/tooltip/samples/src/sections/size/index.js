import { queryAll } from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'

queryAll('#size [data-toggle="tooltip"]').map(element =>
  Tooltip.of(element, {})
)
