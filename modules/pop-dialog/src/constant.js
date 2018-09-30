import Popover from '@pluginjs/popover'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'popDialog'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  SHOW: 'show'
}

export const classes = deepMerge(Popover.classes, {
  NAMESPACE: 'pj-popover',
  THEME: '{namespace}--{theme}',
  POPDIALOG: '{namespace}-dialog',
  POPOVER: '{namespace}',
  CONTENT: '{namespace}-content',
  TITLE: '{namespace}-title',
  CLOSE: '{namespace}-close',
  SHOW: '{namespace}-show',
  FADE: '{namespace}-fade',
  BUTTON: '{namespace}-btn',
  BUTTONCOLOR: 'pj-btn-{color}',
  BUTTONS: '{namespace}-btns',
  DISABLED: '{namespace}-disabled',
  ARROW: '{namespace}-arrow',
  PLACEMENT: '{namespace}-{placement}'
})

export const methods = ['do']

export const defaults = deepMerge(Popover.defaults, {
  hideOutClick: true,
  offset: '0,20',
  placement: 'left',
  arrow: false,
  template() {
    return (
      '<div class="{classes.POPOVER} {classes.POPDIALOG}" role="tooltip">' +
      '{close}' +
      '{title}' +
      '{content}' +
      '{buttons}' +
      '</div>'
    )
  },
  templates: {
    close() {
      return '<button type="button" class="pj-icon pj-icon-close {classes.CLOSE}"></button>'
    },
    title() {
      return '<h3 class="{classes.TITLE}"></h3>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    button() {
      return '<button type="button" class="pj-btn {classes.BUTTON} {colorClass} {custom}" data-action="{action}">{label}</button>'
    },
    buttons() {
      return '<div class="{classes.BUTTONS}">{buttons}</div>'
    }
  },
  buttons: {
    cancel: { label: 'Dismiss' }
  }
})

export const dependencies = ['popover', 'tooltip']
