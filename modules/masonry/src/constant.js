export const namespace = 'masonry'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  RESIZE: 'resize',
  FILTER: 'filter',
  SORT: 'sort',
  REVERSE: 'reverse'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  INNER: '{namespace}-inner',
  THEME: '{namespace}--{theme}',
  CHUNK: '{namespace}-chunk',
  IMGWRAPPER: '{namespace}-image-wrapper',
  IMAGELOADING: '{namespace}-image-loading',
  IMAGELOADED: '{namespace}-image-loaded',
  IMAGEERROR: '{namespace}-image-error',
  TOOLBAR: '{namespace}-toolbar',
  FILTERS: '{namespace}-filters',
  FILTER: '{namespace}-filter',
  SORT: '{namespace}-sort',
  SORTINNER: '{namespace}-sort-inner',
  REVERSE: '{namespace}-reverse',
  REVERSEMIN: '{namespace}-reverse-min'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'add',
  'getHeight',
  'getWidth'
]

export const defaults = {
  theme: null,
  itemSelector: null, // [selector / null] null => select children of the element.
  maxColumn: 5, // set the max column number
  minWidth: 200, // item min width, unit: px
  gutter: 0,
  delay: 60, // chunk animating delay for each of list. unit: ms.
  duration: 800, // The animation duration. unit: ms.
  direction: 'topLeft', // the chunks arrangement origin. ["topLeft", "topRight","bottomLeft","bottomRight"]
  animate: 'fadeInUp', // fadeInUp, fadeInDown, fadeInLeft, fadeInRight, zoomIn, zoomOut, bounce, bounceIn, flip, calendar, cards, fan
  effects: {}, // set custom effects.
  toolbar: {
    filters: false,
    sort: false,
    reverse: false
  },
  filters: [],
  filtertheme: 'group',
  sortby: '',
  sortDirection: 'max', // min && max
  imageLoader: true,
  loader: {
    theme: 'snake',
    color: '#000000',
    size: 'lg'
  }, // false, options
  templates: {
    chunk() {
      return '<div class="{class} {classes.CHUNK}">{html}</div>'
    },
    toolbar() {
      return `<div class="{classes.TOOLBAR}">
                {filters}
                {sort}
                {reverse}
              </div>`
    },
    filters() {
      return '<div class="{classes.FILTERS}"></div>'
    },
    sort() {
      return '<div class="{classes.SORT}"><button class="{classes.SORTINNER} pj-btn"></button></div>'
    },
    reverse() {
      return '<div class="{classes.REVERSE}"><button class="pj-btn pj-btn-icon"><i class="pj-icon pj-icon-angle-down"></i></button></div>'
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
