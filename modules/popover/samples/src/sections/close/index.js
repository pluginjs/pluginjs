import { queryAll } from '@pluginjs/dom'
import Popover from '@pluginjs/popover'

queryAll('#close [data-toggle="popover"]').map(element =>
  Popover.of(element, {})
)
