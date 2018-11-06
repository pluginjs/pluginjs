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
  TYPE: '{namespace}-{type}',
  LOCATION: '{namespace}-{location}',
  CONTENT: '{namespace}-content',
  CONTENTLOCATION: '{namespace}-content-{location}',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  CLOSE: '{namespace}-close',
  CLOSEABLE: '{namespace}-closeable',
  CONTAINER: '{namespace}-container',
  BUTTON: '{namespace}-btn',
  BUTTONS: '{namespace}-buttons',
  ACTIONSLOCATION: '{namespace}-actions-{location}',
  ACTIONS: '{namespace}-actions',
  BACKGROUND: '{namespace}-with-bg',
  FIXED: '{namespace}-fixed',
  RESPONSIVE: '{namespace}-responsive'
}

export const defaults = {
  theme: null,
  type: 'default', // default, primary, success, info, warning, danger
  template() {
    return `<div class="{classes.NAMESPACE}">
              {close}
              <div class="{classes.CONTAINER}">
                {content}
                <div class="{classes.ACTIONS}">
                  {buttons}
                </div>
              </div>
            </div>`
  },
  templates: {
    close() {
      return '<button class="{classes.CLOSE}" aria-label="Close"><i class="pj-icon pj-icon-remove"></i></button>'
    },
    content() {
      return '<div class="{classes.CONTENT}"></div>'
    },
    buttons() {
      return '<div class="{classes.BUTTONS}">{buttons}</div>'
    },
    button() {
      return '<button type="button" class="{classes.BUTTON} {custom}" data-action={action}>{label}</button>'
    }
  },
  locale: 'en',
  html: true,
  localeFallbacks: true,
  content: '',
  contentAlignment: 'center',
  closeable: false,
  textColor: null,
  backgroundColor: null,
  backgroundImage: null,
  buttons: [
    {
      action: 'ok',
      label: 'OK',
      classes: 'pj-btn pj-btn-primary'
    }
  ],
  actionsAlign: 'center',
  duration: false, // notice duration(ms)
  fixedWidth: false,
  layout: 'top', // 'bottom'
  breakpoint: 'lg' // xs, sm, md, lg, xl
}
