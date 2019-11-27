export const namespace = 'swipe'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  WRAPPER: '{namespace}-wrapper',
  INNER: '{namespace}-inner',
  ITEM: '{namespace}-item',
  ACTIVE: '{namespace}-active',
  PAGINATION: '{namespace}-pagination',
  PAGINATIONITEM: '{namespace}-pagination-item',
  PREV: '{namespace}-prev',
  NEXT: '{namespace}-next',
  CLONED: '{namespace}-cloned',
  CLONEDACTIVE: '{namespace}-cloned-active',
  CLONEDPREV: '{namespace}-cloned-prev',
  CLONEDNEXT: '{namespace}-cloned-next',
  MULTIPLE: '{namespace}-multiple'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  wrapperSelector: null,
  innerSelector: null,
  itemSelector: null,
  itemNums: 1,
  arrows: false,
  pagination: false,
  swipeable: true,
  group: false,
  loop: false,
  multiple: false,
  center: false,
  gutter: 0,
  defaultActive: 0,
  duration: 300,
  templates: {
    pagination() {
      return '<ul class="{classes.PAGINATION}"></ul>'
    }
  }
}

export const dependencies = ['arrows', 'dots']
