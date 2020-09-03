export const namespace = 'grids'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGED: 'changed',
  RESIZE: 'resize',
  REVERSE: 'reverse',
  IMAGELOADED: 'imageLoaded',
  IMAGEERROR: 'imageError'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  MASK: '{namespace}-mask',
  IMAGELOADING: '{namespace}-image-loading',
  IMAGELOADED: '{namespace}-image-loaded',
  IMAGEERROR: '{namespace}-image-error',
  LOADED: '{namespace}-loaded',
  REVERSE: '{namespace}-reverse',
  REVERSEMIN: '{namespace}-reverse-min',
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
  'getChunks',
  'getModel',
  'getWidth'
]

export const defaults = {
  theme: null,
  itemSelector: null, // [selector / null] null => select children of the element.
  imgSelector: 'img', // [selector / null] If there is any image in item, the grid will select an IMG element marked by Imgselector
  model: 'grid', // grid /justified
  column: {
    desktop: 5,
    tablet: 3,
    mobile: 1
  }, // [number] set the column number / [object] desktop column, tablet column, mobile column.
  gutter: 0, // [number] set the gutter number / [object] desktop gutter, tablet gutter, mobile gutter.
  rowHeight: {
    desktop: 200,
    tablet: 200,
    mobile: 150
  }, // item min height. unit: px.
  aspectRatio: '1:1', // 'Width:Height' items aspect ratio.
  delay: 35, // chunk animating delay for each of list. unit: ms.
  duration: 300, // The animation duration. unit: ms.
  animate: 'fadeInUp', // fadeInUp, fadeInDown, fadeInLeft, fadeInRight, zoomIn, zoomOut, bounce, bounceIn, unfold, cards, fan
  imageLoader: true,
  lazyload: true,
  loader: {
    theme: 'snake',
    color: '#000000',
    size: 'lg'
  }, // false, options
  templates: {
    chunk() {
      return '<div class="{class} {classes.CHUNK}">{html}</div>'
    },
    sort() {
      return '<div class="{classes.SORT}"><button class="{classes.SORTINNER} pj-btn"></button></div>'
    },
    reverse() {
      return '<div class="{classes.REVERSE}"><button class="pj-btn pj-btn-icon"><i class="pj-icon pj-icon-angle-down"></i></button></div>'
    }
  }
}

export const dependencies = ['anime', 'image-loader', 'loader']
