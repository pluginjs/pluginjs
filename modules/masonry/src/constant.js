export const namespace = 'masonry'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize',
  REVERSE: 'reverse',
  ADD: 'add',
  IMAGELOADED: 'imageLoaded',
  IMAGEERROR: 'imageError'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  CHUNK: '{namespace}-chunk',
  IMAGEWRAP: '{namespace}-image-wrap',
  IMAGELOADING: '{namespace}-image-loading',
  IMAGELOADED: '{namespace}-image-loaded',
  IMAGEERROR: '{namespace}-image-error'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'add',
  'getHeight',
  'getWidth',
  'getColWidth'
]

export const defaults = {
  theme: null,
  itemSelector: null, // selector / null: select children of the element.

  colWidth: null, // custom value / base: the width of the block with baseClass / null: the width of the first item,
  baseClass: '.masonry-base', // custom the base block class
  gutter: 0,

  animate: 'fadeInUp', // fadeInUp, fadeInDown, fadeInLeft, fadeInRight, zoomIn, zoomOut, bounce, bounceIn, cards, unfold, fan
  duration: 300, // The animation duration. unit: ms.
  delay: 20, // chunk animating delay for each of list. unit: ms.

  imageLoader: true,
  loader: {
    theme: 'snake',
    color: '#000000',
    size: 'lg'
  }, // false / options{}
  onImageLoaded: null,
  onImageError: null
}

export const dependencies = ['anime', 'image-loader', 'loader']
