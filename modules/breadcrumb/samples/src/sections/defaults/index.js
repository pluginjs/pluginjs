import { html as render, query, queryAll } from '@pluginjs/dom'
import html from './index.html'
import Breadcrumb from '@pluginjs/breadcrumb'

const elements = queryAll('.breadcrumb', render(html, query('#defaults')))
elements.forEach(element =>
  Breadcrumb.of(element, {
    /** options **/
  })
)
