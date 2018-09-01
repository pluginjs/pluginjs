import Tooltip from '@pluginjs/tooltip'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'popover'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  HIDE: 'hide',
  HIDDEN: 'hidden',
  SHOW: 'show',
  SHOWN: 'shown',
  INSERTED: 'inserted'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  POPOVER: '{namespace}',
  CONTENT: '{namespace}-content',
  TITLE: '{namespace}-title',
  CLOSE: '{namespace}-close',
  SHOW: '{namespace}-show',
  FADE: '{namespace}-fade',
  ARROW: '{namespace}-arrow',
  DISABLED: '{namespace}-disabled',
  PLACEMENT: '{namespace}-{placement}'
}

export const methods = [
  'show',
  'hide',
  'toggle',
  'enable',
  'disable',
  'destroy'
]

export const defaults = deepMerge(Tooltip.defaults, {
  template() {
    return (
      '<div class="{classes.POPOVER}" role="tooltip">' +
      '{arrow}' +
      '{close}' +
      '{title}' +
      '{content}' +
      '</div>'
    )
  },
  templates: {
    close() {
      return '<i class="pj-icon pj-icon-close {classes.CLOSE}"></i>'
    },
    title() {
      return '<h3 class="{classes.TITLE}"></h3>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    arrow() {
      return '<div class="{classes.ARROW}"></div>'
    }
  },
  content: '',
  html: true,
  arrow: true,
  close: false,
  trigger: 'click', // hover focus, click, manual
  hideOutClick: true, // When clicking outside of the popover, trigger hide event
  placement: 'right' // top, bottom, left, right, top-start, top-end, bottom-start, bottom-end, left-start, left-end, right-start, right-end
})

export const dependencies = ['tooltip']
