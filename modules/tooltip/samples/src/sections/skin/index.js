import { html as render, query, queryAll } from '@pluginjs/dom'
import html from './index.html'
import Tooltip from '@pluginjs/tooltip'

queryAll('[data-toggle="tooltip"]', render(html, query('#skin'))).map(element =>
  Tooltip.of(element, {
    /** options **/
  })
)
