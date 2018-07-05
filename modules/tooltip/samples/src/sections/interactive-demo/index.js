import { query, queryAll } from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'

queryAll('[data-toggle="tooltip"]', query('#interactive-demo')).map(element =>
  Tooltip.of(element, {
    /** options **/
  })
)
