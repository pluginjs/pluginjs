export const namespace = 'toast'

export const events = {
  SHOW: 'show',
  HIDE: 'hide',
  DESTROY: 'destroy',
  READY: 'ready'
}

export const methods = ['destroy']

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  CONTENT: '{namespace}-content',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  CLOSE: '{namespace}-close',
  WRAP: '{namespace}-wrap',
  ICON: '{namespace}-icon',
  TITLE: '{namespace}-title',
  POSITION: '{namespace}-{position}',
  BUTTON: '{namespace}-btn',
  BUTTONS: '{namespace}-buttons',
  LOADER: '{namespace}-loader',
  STRIPED: '{namespace}-loader-striped'
}

export const defaults = {
  theme: null,
  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '{close}' +
      '{loader}' +
      // '{icon}' +
      '{title}' +
      '{content}' +
      '{buttons}' +
      '</div>'
    )
  },
  templates: {
    close() {
      return '<button class="{classes.CLOSE}" aria-label="Close"></button>'
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
      return '<div class="{classes.BUTTONS}">' + '{button}' + '</div>'
    },
    button() {
      return '<div class="{classes.BUTTON} {btnClass}" data-btntype={key}>{title}</div>'
    },
    loader() {
      return '<div class="{classes.LOADER}"></div>'
    }
  },
  locale: 'en',
  html: true,
  localeFallbacks: true,
  content: '',
  title: 'This is Title',
  titleColor: '',
  contentColor: '',
  closeBtnColor: '',
  effect: 'fade',
  allowClose: true,
  duration: 3000,
  stack: 6,
  position: 'bottom-right',
  icon: 'success',
  icons: {
    success: ['icon-check-circle', '#4be1ab'],
    info: ['icon-exclamation-circle', '#4c93d9'],
    warning: ['icon-exclamation-triangle', '#dabd49'],
    danger: ['icon-times-circle', '#f86b67']
  },
  iconColor: '',
  iconClass: '',
  bgColor: null,
  buttons: null,
  loader: true,
  loaderBgColor: ''
}
