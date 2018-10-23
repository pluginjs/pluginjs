export const namespace = 'toast'

export const events = {
  SHOW: 'show',
  HIDE: 'hide',
  DESTROY: 'destroy',
  READY: 'ready'
}

export const methods = ['show', 'hide', 'destroy']

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  TYPE: '{namespace}-{type}',
  THEME: '{namespace}--{theme}',
  CONTENT: '{namespace}-content',
  CLOSE: '{namespace}-close',
  CLOSEABLE: '{namespace}-closeable',
  WRAP: '{namespace}-wrap',
  ICON: '{namespace}-icon',
  TITLE: '{namespace}-title',
  POSITION: '{namespace}-{position}',
  BUTTON: '{namespace}-btn',
  BUTTONS: '{namespace}-buttons',
  LOADER: '{namespace}-loader',
  LOADERBAR: '{namespace}-loader-bar',
  OUT: '{namespace}-out',
  ONLYTITLE: '{namespace}-only-title',
  HASICON: '{namespace}-has-icon'
}

export const defaults = {
  theme: null,

  html: true,
  content: '',
  title: 'This is Title',
  buttons: null,

  effect: 'fade',
  duration: 3000,

  stack: 6,
  position: 'bottom-right',

  closeable: true,

  type: 'success',

  types: {
    success: 'pj-icon pj-icon-check-circle',
    info: 'pj-icon pj-icon-info-circle',
    warning: 'pj-icon pj-icon-waring-circle',
    error: 'pj-icon pj-icon-close-circle'
  },

  loader: true,

  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '{close}' +
      '{loader}' +
      '{icon}' +
      '{title}' +
      '{content}' +
      '{buttons}' +
      '</div>'
    )
  },
  templates: {
    close() {
      return '<button class="pj-icon pj-icon-close {classes.CLOSE}" aria-label="Close"></button>'
    },
    title() {
      return '<div class="{classes.TITLE}">{icon}</div>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    icon() {
      return '<i class="{classes.ICON} {iconClass}"></i>'
    },
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    buttons() {
      return '<div class="{classes.BUTTONS}">{buttons}</div>'
    },
    button() {
      return '<button type="button" class="{classes.BUTTON} {custom}" data-action="{action}">{label}</button>'
    },
    loader() {
      return '<div class="{classes.LOADER}"><div class="{classes.LOADERBAR}"></div></div>'
    }
  }
}
