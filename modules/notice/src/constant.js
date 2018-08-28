export const namespace = 'notice'

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
  LOCATION: '{namespace}-{location}',
  CONTENT: '{namespace}-content',
  CONTENTLOCATION: '{namespace}-content-{location}',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  CLOSE: '{namespace}-close',
  CONTAINER: '{namespace}-container',
  BUTTON: '{namespace}-btn',
  BUTTONS: '{namespace}-buttons',
  BUTTONSLOCATION: '{namespace}-buttons-{location}',
  POSITION: '{namespace}-position',
  BACKGROUND: '{namespace}-with-bg',
  XS: '{namespace}-xs',
  SM: '{namespace}-sm',
  MD: '{namespace}-md',
  LG: '{namespace}-lg',
  XL: '{namespace}-xl'
}

export const defaults = {
  theme: null,
  template() {
    return (
      '<div class="{classes.NAMESPACE}">' +
      '{close}' +
      '<div class="{classes.CONTAINER}">' +
      '{content}' +
      '<div class="{classes.POSITION}">' +
      '{buttons}' +
      '</div>' +
      '</div>' +
      '</div>'
    )
  },
  templates: {
    close() {
      return '<button class="{classes.CLOSE}" aria-label="Close"></button>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    buttons() {
      return '<div class="{classes.BUTTONS}">{buttons}</div>'
    },
    button() {
      return '<div class="{classes.BUTTON} {btnClass}" data-btnType={key}>{title}</div>'
    }
  },
  locale: 'en',
  html: true,
  localeFallbacks: true,
  content: '',
  contentAlignment: 'center',
  allowClose: true,
  closeBottonColor: '',
  backgroundColor: null,
  backgroundImage: null,
  fontColor: null,
  buttons: {
    ok: {
      title: 'OK',
      class: 'pj-btn pj-btn-primary'
    }
  },
  buttonAlign: 'center',
  timeout: 5000,
  fixedWidth: false,
  layout: 'top' // 'bottom'
}
