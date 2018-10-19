import { query, queryAll, getData } from '@pluginjs/dom'
import Breadcrumb from '@pluginjs/breadcrumb'

const element = query('#interactive .breadcrumb')
let instance

queryAll('[data-api]').forEach(el =>
  el.addEventListener('click', e => {
    const api = getData('api', e.target)
    if (api === 'init') {
      instance = Breadcrumb.of(element, {
        /** options **/
      })
    } else {
      instance[api]()
    }
  })
)
