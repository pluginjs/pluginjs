import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#build-from-array .js-arrows')
const $jsArrow = Arrows.of(element, {
  default: null,
  prev: {
    text: 'Previous',
    href: '#prev'
  },
  next: {
    text: 'Next',
    href: '#next'
  },
  onNext(value) {
    console.info('next:')
    console.info(value)
  },
  onPrev(value) {
    console.info('prev:')
    console.info(value)
  },
  valueFrom: 'data-href', // text or data-attr
  templates: {
    prev() {
      return '<a class="{classes.PREV}" data-href="{href}" alt="{text}"><i class="{classes.ICON} icon-chevron-left"></i></a>'
    },
    next() {
      return '<a class="{classes.NEXT}" data-href="{href}" alt="{text}"><i class="{classes.ICON} icon-chevron-right"></i></a>'
    }
  }
})
document.querySelector('.js-api-load').addEventListener('click', () => {
  console.info('load')
  $jsArrow.load(
    {
      text: 'Previous',
      href: '#previous'
    },
    {
      text: 'Next',
      href: '#next'
    }
  )
})

document.querySelector('.js-api-empty').addEventListener('click', () => {
  console.log('empty')
  $jsArrow.empty()
})
