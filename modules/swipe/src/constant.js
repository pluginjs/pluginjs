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
  DRAGSTART: 'dragStart',
  DRAGEND: 'dragEnd',
  MOVEEND: 'moveEnd',
  RESIZE: 'resize'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAPPER: '{namespace}-wrapper',
  CONTAINER: '{namespace}-container',
  ITEM: '{namespace}-item',
  PAGINATION: '{namespace}-pagination',
  PAGINATIONITEM: '{namespace}-pagination-item',
  ACTIVE: '{namespace}-active'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  locale: 'en',
  wrapperSelector: null,
  containerSelector: null,
  itemSelector: 'div',
  // data: null, // [Array] item => {'title':'','el':[HTML element]}
  arrows: false,
  arrowConfig: false,
  pagination: false,
  dotConfig: false,
  drag: true,
  dragFree: false,
  power: 2,
  group: false,
  loop: false,
  multiple: false,
  center: false, // center model
  itemNums: 1, // Number of swipe per column
  gutter: 0, // [number|string]  '10px 10px' => 'top&bottom left&right', 10 => top&bottom&left&right
  height: '100%', // set swipe height
  advanced: {
    getItemInstances: null, // [function] handle items array. => this.itemInstances
    computeItemLocation: null, // [function] compute items position.
    computeWidthResize: null // [function] compute when window resize
  },
  defaultActive: 0, // default active item
  duration: 300,
  templates: {
    // wrapper() {
    //   return '<div class="{class}"></div>'
    // },
    container() {
      return '<div class="{classes.CONTAINER}"></div>'
    },
    pagination() {
      return '<ul class="{classes.PAGINATION}"></ul>'
    },
    arrow: {
      prev() {
        return '<a class="{classes.PREV}" href="{href}" alt="{text}"><i class="{classes.ICON} icon-chevron-left"></i></a>'
      },
      next() {
        return '<a class="{classes.NEXT}" href="{href}" alt="{text}"><i class="{classes.ICON} icon-chevron-right"></i></a>'
      }
    }
  }
}

export const dependencies = ['arrows', 'dots', 'Hammer']
