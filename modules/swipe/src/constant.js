export const namespace = 'swipe'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize',
  UPDATE: 'update',
  NEXT: 'next',
  PREV: 'prev'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  CONTAINER: '{namespace}-container',
  WRAPPER: '{namespace}-wrapper',
  INNER: '{namespace}-inner',
  ITEM: '{namespace}-item',
  ACTIVE: '{namespace}-active',
  OUTSIDE: '{namespace}-outside',
  PAGINATION: '{namespace}-pagination',
  PAGINATIONITEM: '{namespace}-pagination-item',
  PREV: '{namespace}-prev',
  NEXT: '{namespace}-next',
  CLONED: '{namespace}-cloned',
  CLONEDACTIVE: '{namespace}-cloned-active',
  CLONEDPREV: '{namespace}-cloned-prev',
  CLONEDNEXT: '{namespace}-cloned-next'
}

export const methods = ['update', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  containerSelector: null,
  wrapperSelector: null,
  innerSelector: null,
  itemSelector: null,
  desktopColumn: 3,
  tabletColumn: 2,
  mobileColumn: 1,
  duration: 300,
  arrows: {
    type: 'lg'
  },
  outside: true,
  pagination: {
    type: 'square light'
  },
  swipeable: true,
  group: false,
  loop: false,
  multiple: false,
  center: false,
  gutter: 0,
  active: 0,
  autoplay: false,
  playCycle: 4000,
  templates: {
    container() {
      return '<div class="{classes.CONTAINER}"></div>'
    },
    wrapper() {
      return '<div class="{classes.WRAPPER}"></div>'
    },
    inner() {
      return '<div class="{classes.INNER}"></div>'
    },
    pagination() {
      return '<ul class="{classes.PAGINATION}"></ul>'
    }
  }
}

export const dependencies = ['arrows', 'dots']
