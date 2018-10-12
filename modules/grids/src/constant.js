export const namespace = 'grids'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGED: 'changed',
  RESIZE: 'resize',
  FILTER: 'filter',
  SORT: 'sort',
  REVERSE: 'reverse',
  CHUNKCLICK: 'chunkClick'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  MASK: '{namespace}-mask',
  WRAP: '{namespace}-wrap',
  INNER: '{namespace}-inner',
  INNERSHOW: '{namespace}-inner-show',
  LOADED: '{namespace}-loaded',
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
  GRIDMODEL: '{namespace}-grid',
  MASONRYMODEL: '{namespace}-masonry',
  JUSTIFIEDMODEL: '{namespace}-justified',
  NESTEDMODEL: '{namespace}-nested'
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
  imgSelector: 'img', // [selector / null] If there is any image in item, the grid will select an IMG element marked by Imgselector
  model: 'grid', // select model
  maxColumn: 5, // [number] set the max column number.
  gutter: 0,
  minHeight: 100, // item min height. unit: px.
  minWidth: 200, // item min width. unit: px.
  aspectRatio: null, // 'Width:Height' global items aspect ratio. item own aspect ratio can be replaced by it. item own aspect ratio > global aspect ratio > item own size
  delay: 60, // chunk animating delay for each of list. unit: ms.
  duration: 800, // The animation duration. unit: ms.
  direction: 'topLeft', // the chunks arrangement origin. ["topLeft", "topRight","bottomLeft","bottomRight"]
  filters: [],
  filterbar: {
    filters: false,
    sort: false,
    reverse: false
  },
  sortby: '',
  sortDirection: 'max', // min && max
  animate: 'fadeInUp', // fadeInUp,fadeInDown, fadeInLeft, fadeInRight, zoomIn, zoomOut, bounce, bounceIn, flip, calendar, cards, fan
  effects: {}, // set custom effects.
  loader: {
    theme: 'snake',
    color: '#000000',
    size: 'lg'
  }, // false, options
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
  // mode: 'grid' // grid display mode. grid && justified && masonry && nested
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

export const dependencies = ['anime', 'filters', 'image-loader', 'loader']

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
