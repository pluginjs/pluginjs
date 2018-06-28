import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dots from '@pluginjs/dots'

const element = query('.js-dots', render(html, query('#build-from-array')))
const $jsDot = Dots.of(element, {
  default: null,
  items: [
    {
      text: 'Portfolio',
      href: '#portfolio'
    },
    {
      text: 'Blog',
      href: '#blog'
    },
    {
      text: 'Contact',
      href: '#contact'
    },
    {
      text: 'About',
      href: '#about'
    }
  ],
  valueFrom: 'data-href', // text or data-attr
  template: {
    item(css) {
      return `<li class="${css}" data-href="{href}"><a href="javascript:void(0);">{text}</a></li>`
    }
  },
  onChange(val) {
    console.info(`select: ${val}`)
  }
})
document.querySelector('.js-api-append').addEventListener('click', () => {
  console.info('append')
  $jsDot.append([
    {
      text: 'Products',
      href: '#products'
    }
  ])
})

document.querySelector('.js-api-prepend').addEventListener('click', () => {
  console.info('prepend')
  $jsDot.prepend([
    {
      text: 'Home',
      href: '#home'
    }
  ])
})

document.querySelector('.js-api-add').addEventListener('click', () => {
  console.info('add')
  $jsDot.add({
    text: 'Office',
    href: '#office'
  })
})

document.querySelector('.js-api-remove').addEventListener('click', () => {
  console.info('remove')
  $jsDot.remove('#office')
})

document.querySelector('.js-api-empty').addEventListener('click', () => {
  console.info('empty')
  $jsDot.empty()
})

document.querySelector('.js-api-load').addEventListener('click', () => {
  console.info('load')
  $jsDot.load([
    {
      text: 'Portfolio',
      href: '#portfolio'
    },
    {
      text: 'Blog',
      href: '#blog'
    },
    {
      text: 'Contact',
      href: '#contact'
    },
    {
      text: 'About',
      href: '#about'
    }
  ])
})

document.querySelector('.js-api-get').addEventListener('click', () => {
  console.info('get')
  console.info(`current value is ${$jsDot.get()}`)
})

document.querySelector('.js-api-set').addEventListener('click', () => {
  console.info('set')
  $jsDot.set('#blog')
})
