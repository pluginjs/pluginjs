export const namespace = 'grids'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGED: 'changed',
  RESIZED: 'resized',
  FILTER: 'filter',
  SORT: 'sort',
  REVERSE: 'reverse',
  CHUNKCLICK: 'chunkClick',
  DRAGSTART: 'dragStart',
  DRAGEND: 'dragEnd',
  MOVEEND: 'moveEnd'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  MASK: '{namespace}-mask',
  WRAP: '{namespace}-wrap',
  INNER: '{namespace}-inner',
  INNERSHOW: '{namespace}-inner-show',
  LOADER: '{namespace}-loader',
  LOADERSHOW: '{namespace}-loader-show',
  LOADERINNER: '{namespace}-loader-inner',
  HOVEROVERLAY: '{namespace}-overlay',
  ICON: '{namespace}-icon',
  CONTAINER: '{namespace}-container',
  FILTERBAR: '{namespace}-filterbar',
  FILTERS: '{namespace}-filterbar-filters',
  SORT: '{namespace}-filterbar-sort',
  REVERSE: '{namespace}-filterbar-reverse',
  REVERSEMIN: '{namespace}-filterbar-reverse-min',
  CHUNK: '{namespace}-chunk',
  CHUNKINNER: '{namespace}-chunk-inner',
  CHUNKACTIVE: '{namespace}-chunk-active',
  SHOW: '{namespace}-show',
  HIDE: '{namespace}-hide',
  GRIDMODEL: '{namespace}-grid-model',
  MASONRYMODEL: '{namespace}-masonry-model',
  JUSTIFIEDMODEL: '{namespace}-justified-model',
  NESTEDMODEL: '{namespace}-nested-model',
  CAROUSEL: '{namespace}-carousel',
  CAROUSELCENTER: '{namespace}-carousel-center',
  CAROUSELARROWS: '{namespace}-carousel-arrows',
  CAROUSELPREV: '{namespace}-carousel-prev',
  CAROUSELNEXT: '{namespace}-carousel-next',
  CAROUSELDOTS: '{namespace}-carousel-dots',
  CAROUSELDOTSITEM: '{namespace}-carousel-dots-item',
  DRAG: '{namespace}-drag'
}

export const methods = [
  'value',
  'enable',
  'disable',
  'destroy',
  'filter',
  'sort',
  'reverse',
  'getChunks',
  'getModel',
  'getWidth'
]

export const defaults = {
  theme: null,
  wrapSelector: null,
  itemSelector: 'figure', // [selector / null] // select the grids item element. if not, select children of the wraper.
  imgSelector: null, // [selector / null] If there is any image in item, the grid will select an IMG element marked by Imgselector
  model: 'grid', // select model
  maxColumn: 5, // [number] set the max column number.
  gutter: 0,
  minHeight: 100, // item min height. unit: px.
  minWidth: 200, // item min width. unit: px.
  aspectRatio: null, // 'Width:Height' global items aspect ratio. item own aspect ratio can be replaced by it. item own aspect ratio > global aspect ratio > item own size
  delay: 60, // chunk animating delay for each of list. unit: ms.
  duration: 800, // The animation duration. unit: ms.
  moveDuration: 800, // the carousel move duration. unit: ms
  direction: 'topLeft', // the chunks arrangement origin. ["topLeft", "topRight","bottomLeft","bottomRight"]
  filters: [],
  filterbar: {
    filters: false,
    sort: false,
    reverse: false
  },
  hoverOverlay: true,
  hoverPrimary: false,
  icon: 'icon-search',
  sortby: '',
  sortDirection: 'max', // min && max
  carousel: false,
  /*
    carousel opts: {
      arrows: false,
      pagination: false,
      drag: true,
      center: false,
      dragFree: false,
      power: 2,
      group: false,
      multiple: false,
      defaultActive: 0,
      justifiedResponsive: ['1920:300', '1240:260', '720:200', '480:150'] // [justified mode] => 'clientWidth:chunkHeight'
    }
  */
  animate: 'fadeInUp', // fadeInUp,fadeInDown, fadeInLeft, fadeInRight, zoomIn, zoomOut, bounce, bounceIn, flip, calendar, cards, fan
  effects: {}, // set custom effects.
  // threshold: 0.3,
  // nestedConfig: {
  //   width: 100,
  //   height: 100
  // },
  templates: {
    loader() {
      return '<div class="{class.LOADERINNER}"></div>'
    },
    overlay() {
      return '<div class="{classes.HOVEROVERLAY}"><i class="{classes.ICON} {iconClass}"></i></div>'
    }
  },
  sort(key, chunks) {
    if (!key) {
      return chunks
    }
    chunks = [].concat(chunks)

    chunks.sort((prev, next) => {
      if (!prev.sort || !next.sort) {
        return 0
      }

      let prevVal = prev.sort[key]
      let nextVal = next.sort[key]

      if (key === 'date') {
        prevVal = new Date(prevVal)
        nextVal = new Date(nextVal)
      }

      if (prevVal < nextVal) {
        return -1
      }

      if (prevVal > nextVal) {
        return 1
      }

      return 0
    })

    if (this.options.sortDirection === 'max') {
      chunks.reverse()
    }

    return chunks
  },
  // mode: 'grid' // grid display mode. grid && carousel && justified && masonry && nested
  // advanced: {
  //   // enterOrigin: [100, 100], // The origin when the animation begins to move in the wrap.
  //   origin: 'topLeft', // the chunks arrangement origin.
  // }
  parseTagsStr(str) {
    if (!str) {
      return false
    }

    if (typeof str !== 'string') {
      return [str]
    }

    return str.split(',')
  }
}

export const dependencies = [
  'anime',
  'dots',
  'arrows',
  'Hammer',
  'filters',
  'swipe',
  'image-loader'
]

export const info = { version: '0.0.1' }

/* chunks options */
/*
  {
    id: 'A',
    sizeX:1,
    sizeY:1,
    tags: ['a', 'b', 'c'], // Array && string
    template(){
      return `<article class='{class}'></article>`  // chunk templates
    },
    sort: {
      createDate: '1970-01-01'
    }
  }

*/
