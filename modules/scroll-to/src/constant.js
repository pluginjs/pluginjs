export const namespace = 'scrollTo'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  JUMP: 'jump',
  DONE: 'done'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ACTIVE: '{namespace}-active',
  ANIMATING: '{namespace}-animating'
}

export const methods = ['jump', 'enable', 'disable', 'destroy']

export const defaults = {
  selector: {
    type: 'tagName',
    value: 'li'
  },
  href: 'data-scrollto',
  duration: 500,
  easing: 'ease',
  offsetTop: 50,
  mobile: {
    width: 768,
    duration: 500,
    easing: 'ease'
  }
}

export const dependencies = ['scroll']

export const translations = {}
