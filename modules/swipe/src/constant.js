export const namespace = 'swipe'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  NEXT: 'next',
  PREV: 'prev',
  DRAGSTART: 'dragstart',
  DRAGSNAIL: 'dragsnail',
  DRAGDECAY: 'dragdecay',
  DRAGTHROW: 'dragthrow',
  MOVEEND: 'moveend',
  RESIZE: 'resize'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAPPER: '{namespace}-wrapper',
  INNER: '{namespace}-inner',
  ITEM: '{namespace}-item',
  CLONED: '{namespace}-cloned',
  PAGINATION: '{namespace}-pagination',
  PAGINATIONITEM: '{namespace}-pagination-item',
  IMG: '{namespace}-img',
  LOADED: '{namespace}-loaded',
  ACTIVE: '{namespace}-active'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  locale: 'en',
  wrapperSelector: null,
  innerSelector: null,
  itemSelector: 'div',
  imgSelector: 'img',
  imgContainer: 'div',
  arrows: false, // false, options
  pagination: false, // false, options
  group: false,
  loop: false,
  multiple: false,
  decay: false,
  center: false, // center model
  itemNums: 1, // Number of swipe per column
  gutter: 0, // [number|string]  '10px 10px' => 'top&bottom left&right', 10 => top&bottom&left&right
  height: null, // set swipe height
  defaultActive: 0, // default active item
  duration: 300,
  loader: {
    theme: 'circle',
    color: '#000000',
    size: 'lg'
  }, // false, options
  templates: {
    inner() {
      return '<div class="{classes.INNER}"></div>'
    },
    pagination() {
      return '<ul class="{classes.PAGINATION}"></ul>'
    }
  }
}

export const dependencies = ['arrows', 'dots', 'Hammer']
