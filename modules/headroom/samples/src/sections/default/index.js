import { query, queryAll, parent } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import HeardRoom from '@pluginjs/headroom'

const element = query('#default .fixed-header')
const $sections = queryAll('li', element)
HeardRoom.of(element, {
  /** options **/
  type: 'stick'
})

$sections.forEach(section => {
  section.addEventListener('click', e => {
    $sections.forEach(section => {
      removeClass('active', section)
    })
    addClass('active', parent(e.target))
  })
})
