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
    },
    arrow: {
      prev() {
        return '<a class="{classes.PREV}" href="{href}" alt="{text}"><i class="{classes.ICON} pj-icon pj-icon-angle-left-mini"></i></a>'
      },
      next() {
        return '<a class="{classes.NEXT}" href="{href}" alt="{text}"><i class="{classes.ICON} pj-icon pj-icon-angle-right-mini"></i></a>'
      }
    }
  }
}

export const dependencies = ['arrows', 'dots', 'Hammer']
