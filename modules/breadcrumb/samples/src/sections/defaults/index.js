import { queryAll } from '@pluginjs/dom'
import Breadcrumb from '@pluginjs/breadcrumb'

const elements = queryAll('#defaults .breadcrumb')
elements.forEach(element =>
  Breadcrumb.of(element, {
    /** options **/
  })
)
