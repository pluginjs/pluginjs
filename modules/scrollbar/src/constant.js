export const namespace = 'scrollbar'

export const events = {
  READY: 'ready',
  HOVER: 'hover',
  HOVERED: 'hovered',
  DRAG: 'drag',
  DRAGGED: 'dragged',
  CHANGE: 'change',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  VERTICAL: '{namespace}-vertical',
  HORIZONTAL: '{namespace}-horizontal',
  CONTAINER: '{namespace}',
  HANDLE: '{namespace}-handle',

  DISABLED: '{namespace}-disabled',
  DRAGGING: '{namespace}-dragging',
  HOVERING: '{namespace}-hovering'
}

export const methods = ['enable', 'disable', 'destroy', 'moveBy', 'moveTo']

export const defaults = {
  theme: null,
  handleSelector: null,
  handleTemplate: '<div class="{handle}"></div>',

  barClass: null,
  handleClass: null,

  direction: 'vertical',

  barLength: null,
  handleLength: null,

  minHandleLength: 30,
  maxHandleLength: null,

  mouseDrag: true,
  touchDrag: true,
  pointerDrag: true,
  clickMove: true,
  clickMoveStep: 0.3, // 0 - 1
  mousewheel: true,
  mousewheelSpeed: 50,

  keyboard: true,

  useCssTransforms3D: true,
  useCssTransforms: true,
  useCssTransitions: true,

  duration: '500',
  easing: 'ease' // linear, ease-in, ease-out, ease-in-out
}

