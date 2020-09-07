export const namespace = 'grids'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize',
  REVERSE: 'reverse',
  IMAGELOADED: 'imageLoaded',
  IMAGEERROR: 'imageError',
  ADD: 'add'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  IMAGELOADING: '{namespace}-image-loading',
  IMAGELOADED: '{namespace}-image-loaded',
  IMAGEERROR: '{namespace}-image-error',
  LOADED: '{namespace}-loaded',
  REVERSE: '{namespace}-reverse',
  CHUNK: '{namespace}-chunk',
  IMAGE: '{namespace}-image',
  GRIDMODEL: '{namespace}-grid',
  JUSTIFIEDMODEL: '{namespace}-justified'
}

export const methods = [
  'value',
  'enable',
  'disable',
  'destroy',
  'reverse',
  'add',
  'getModel',
  'getWidth',
  'getChunks'
]

export const defaults = {
  theme: null,
  itemSelector: null, // [selector / null] null => select children of the element.
  imgSelector: null, // [selector / null] If there is any image in item, the grid will select an IMG element marked by Imgselector
  model: 'grid', // grid /justified
  background: true,
  column: {
    desktop: 5,
    tablet: 3,
    mobile: 1
  }, // [number] set the column number / [object] desktop column, tablet column, mobile column.
  gutter: 0, // [number] set the gutter number / [object] desktop gutter, tablet gutter, mobile gutter.
  rowHeight: {
    desktop: 300,
    tablet: 200,
    mobile: 150
  }, // item min height. unit: px.
  aspectRatio: '1:1', // 'Width:Height' items aspect ratio.
  delay: 20, // chunk animating delay for each of list. unit: ms.
  duration: 300, // The animation duration. unit: ms.
  animate: 'fadeInUp', // fadeInUp, fadeInDown, fadeInLeft, fadeInRight, zoomIn, zoomOut, bounce, bounceIn, unfold, cards, fan
  imageLoader: true,
  lazyload: false,
  loader: {
    theme: 'snake',
    color: '#000000',
    size: 'lg'
  } // false, options
}

export const dependencies = ['anime', 'breakpoints', 'image-loader', 'loader']
