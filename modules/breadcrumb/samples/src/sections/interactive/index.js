import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Breadcrumb from '@pluginjs/breadcrumb'
import Interactive from './Interactive'

const root = render(html, query('#interactive'))
const interactiveConsole = new Interactive(() => {
  const element = query('.breadcrumb', root)
  return Breadcrumb.of(element, {
    /** options **/
  })
})
query('.api', root).addEventListener('click', event => {
  const el = event.target
  if (!el.matches('[data-api]')) {
    return
  }
  interactiveConsole[el.dataset.api]()
})
