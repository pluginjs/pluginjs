export const namespace = 'timeline'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  HORIZONTAL: '{namespace}-horizontal',
  LIST: '{namespace}-list',
  ITEM: '{namespace}-item',
  MARK: '{namespace}-mark',
  CONTENT: '{namespace}-content',
  BUTTON: '{namespace}-button',
  PREV: '{namespace}-button-prev',
  NEXT: '{namespace}-button-next'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  visibleItems: 4,
  breakpoint: 'md' // xs, sm, md, lg, xl
}

export const dependencies = []
