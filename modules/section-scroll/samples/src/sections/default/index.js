import { query, queryAll, parent } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import sectionScroll from '@pluginjs/section-scroll'

const element = query('#default .section-container')
const $nav = query('#default #main-header')
const $sections = queryAll('li', $nav)
const API = sectionScroll.of(element, {
  /** options **/
  itemSelector: '.section',
  titleSelector: '.section-title',
  skin: null,
  duration: 1000,
  easing: '',
  onChange(val) {
    // console.log(val)
    $sections.forEach(section => {
      removeClass('active', section)
    })
    $sections.forEach(section => {
      const href = section.dataset.href
      if (href === val) {
        addClass('active', section)
      }
    })
  }
})

$sections.forEach(section => {
  section.addEventListener('click', e => {
    const pa = parent(e.target)
    const href = pa.dataset.href
    API.goTo(href)
    removeClass('active', section)
    addClass('active', pa)
  })
})
