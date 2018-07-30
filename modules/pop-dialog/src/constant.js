import Popover from '@pluginjs/popover'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'popDialog'

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
  NAMESPACE: 'pj-popover',
  THEME: '{namespace}--{theme}',
  POPDIALOG: '{namespace}-dialog',
  POPOVER: '{namespace}',
  CONTENT: '{namespace}-content',
  TITLE: '{namespace}-title',
  CLOSE: '{namespace}-close',
  SHOW: '{namespace}-show',
  FADE: '{namespace}-fade',
  BUTTON: '{namespace}-button',
  BUTTONCOLOR: '{namespace}-button-{color}',
  BUTTONS: '{namespace}-buttons',
  DISABLED: '{namespace}-disabled'
}

export const methods = [
  'do',
  'show',
  'hide',
  'toggle',
  'enable',
  'disable',
  'destroy'
]

export const defaults = deepMerge(Popover.defaults, {
  hideOutClick: true,
  placement: 'left',
  trigger: 'click',
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
      return '<button type="button" class="icon-close-mini {classes.CLOSE}"></button>'
    },
    title() {
      return '<h3 class="{classes.TITLE}"></h3>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    button() {
      return '<button type="button" class="{classes.BUTTON}" data-color="{color}" data-action="{action}">{label}</button>'
    },
    buttons() {
      return '<div class="{classes.BUTTONS}">{buttons}</div>'
    }
  },
  buttons: {}
})

export const dependencies = ['popover', 'tooltip']
