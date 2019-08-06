import { query, queryAll, parent, getData } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import sectionScroll from '@pluginjs/section-scroll'

const element = query('#stack .section-container')
const $nav = query('#stack #main-header')
const $sections = queryAll('li', $nav)
const API = sectionScroll.of(element, {
  /** options **/
  itemSelector: '.section',
  titleSelector: '.section-title',
  animation: 'stack',
  easing: 'ease-in-out',
  dots: {
    vertical: true
  },
  loop: false,
  onChange(val) {
    $sections.forEach(section => {
      removeClass('active', section)
    })
    $sections.forEach(section => {
      const href = getData('href', section)
      if (href === val) {
        addClass('active', section)
      }
    })
  }
})

$sections.forEach(section => {
  section.addEventListener('click', e => {
    const pa = parent(e.target)
    const href = getData('href', pa)
    API.goTo(href)
    removeClass('active', section)
    addClass('active', pa)
  })
})
