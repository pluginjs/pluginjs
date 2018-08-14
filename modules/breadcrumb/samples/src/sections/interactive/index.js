import { query, getData } from '@pluginjs/dom'
import Breadcrumb from '@pluginjs/breadcrumb'
import Interactive from './Interactive'

const root = query('#interactive')
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
  interactiveConsole[getData('api', el)]()
})
