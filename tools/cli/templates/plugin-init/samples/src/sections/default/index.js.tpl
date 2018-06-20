import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import {{Name}} from '@pluginjs/{{name}}'

const element = query('.{{name}}', render(html, query('#default')))
{{Name}}.of(element, {
  /** options **/
})
