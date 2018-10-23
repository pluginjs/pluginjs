export const namespace = 'modal'

export const events = {
  OPEN: 'open',
  CLOSE: 'close',
  DESTROY: 'destroy',
  READY: 'ready'
}

export const methods = ['destroy']

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ELEMENT: '{namespace}',
  THEME: '{namespace}--{theme}',
  CLOSE: '{namespace}-close',
  CONTENT: '{namespace}-content',
  CONTENTLOCATION: '{namespace}-content-{contentLocation}',
  TITLE: '{namespace}-title',
  TITLELOCATION: '{namespace}-title-{location}',
  DISABLED: '{namespace}-disabled',
  CONTAINER: '{namespace}-container',
  HEADER: '{namespace}-header',
  BUTTONS: '{namespace}-buttons',
  OVERLAY: '{namespace}-overlay',
  FADEIN: '{namespace}--fadeIn',
  OPEN: '{namespace}-open',
  IN: '{namespace}-in',
  BUTTON: '{namespace}-btn',
  ICON: '{namespace}-icon',
  ICONTITLE: '{namespace}-title-icon'
}

export const defaults = {
  theme: null,
  template() {
    return `<div class="{classes.NAMESPACE}">
              {overlay}
              <div class="{classes.CONTAINER}" role="document">
                {close}
                {title}
                {content}
                {buttons}
              </div>
            </div>`
  },
  templates: {
    close() {
      return '<button type="button" class="pj-icon pj-icon-close {classes.CLOSE}" aria-label="Close"></button>'
    },
    title() {
      return '<div class="{classes.TITLE}"></div>'
    },
    icon() {
      return '<i class="{classes.ICON} {iconClass}"></i>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    buttons() {
      return '<div class="{classes.BUTTONS}"></div>'
    },
    overlay() {
      return '<div class="{classes.OVERLAY}"></div>'
    },
    button() {
      return '<button class="{classes.BUTTON} {custom}" data-action={action} type="button">{label}</button>'
    }
  },
  autoDestroy: true, // not used in static method
  title: '',
  content: '',
  html: true,
  close: true,
  locale: 'en',
  localeFallbacks: true,
  buttons: null,
  overlay: true,
  overlayCloseOnClick: true,
  appendTo: 'body',
  effect: 'fadeScale',
  contentAlignment: '',
  buttonAlignment: '',
  titleAlignment: '',
  defaultButtonClass: 'pj-btn pj-btn-primary',
  icon: '',
  icons: {
    success: ['pj-icon pj-icon-check-circle', '#215fdb'],
    info: ['pj-icon pj-icon-info-circle', '#f4b066'],
    error: ['pj-icon pj-icon-close-circle', '#f96868']
  },
  iconColor: '',
  iconClass: ''
}

export const translations = {
  en: {
    Cancel: 'Cancel',
    Yes: 'Yes'
  },
  zh: {
    Cancel: '取消',
    Yes: '确定'
  }
}
