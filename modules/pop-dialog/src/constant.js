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
  INNER: '{namespace}-inner',
  CONTENT: '{namespace}-content',
  TITLE: '{namespace}-title',
  CLOSE: '{namespace}-close',
  SHOW: '{namespace}-show',
  FADE: '{namespace}-fade',
  BUTTON: '{namespace}-btn',
  BUTTONCOLOR: 'pj-btn-{color}',
  BUTTONS: '{namespace}-btns',
  DISABLED: '{namespace}-disabled',
  WITHARROW: '{namespace}-witharrow',
  ARROW: '{namespace}-arrow',
  PLACEMENT: '{namespace}-{placement}'
})

export const methods = ['do']

export const defaults = deepMerge(Popover.defaults, {
  hideOutClick: true,
  offset: '0,2',
  placement: 'left',
  arrow: true,
  template() {
    return `<div class="{classes.POPOVER} {classes.POPDIALOG}" role="tooltip">
        <div class="{classes.INNER}">
          {title}
          {content}
          {buttons}
        </div>
        {arrow}
        {close}
      </div>`
  },
  templates: {
    close() {
      return '<button type="button" class="pj-icon pj-icon-close {classes.CLOSE}"></button>'
    },
    arrow() {
      return '<div class="{classes.ARROW}"></div>'
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
  buttons: [
    {
      action: 'cancel',
      label: 'Dismiss'
    }
  ]
})

export const dependencies = ['popover', 'tooltip']
