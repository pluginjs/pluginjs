export const namespace = 'paginator'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize',
  CHANGE: 'change'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  ELEMENT: '{namespace}',
  THEME: '{namespace}-{theme}',
  LINK: '{namespace}-link',
  ITEM: '{namespace}-item',
  ACTIVE: '{namespace}-active',
  JUMPER: '{namespace}-jumper',
  DISABLED: '{namespace}-disabled',
  PREV: '{namespace}-prev',
  NEXT: '{namespace}-next'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'first',
  'last',
  'next',
  'prev',
  'goTo',
  'update'
]

export const defaults = {
  totalItems: 100,
  currentPage: 1,
  itemsPerPage: 10,
  layout: 'total, prev, list, next', // , list'

  theme: null,

  components: {
    first: {},
    prev: {},
    next: {},
    last: {},
    list: {},
    jumper: {}
  },
  // translations
  // locale: 'en',

  // callback function
  onInit: null,
  onReady: null,
  onChange: null // function(page) {}
}

export const translations = {}
