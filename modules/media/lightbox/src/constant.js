export const namespace = 'lightbox'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  // element  class
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  OVERLAY: '{namespace}-overlay',
  WRAP: '{namespace}-wrap',
  // footer el
  FOOTER: '{namespace}-footer',
  CAPTION: '{namespace}-caption',
  TITLE: '{namespace}-title',
  THUMBNAILS: '{namespace}-thumbnails',
  INNER: '{namespace}-thumbnails-inner',
  THUMB: '{namespace}-thumb',
  THUMBBG: '{namespace}-thumb-bg',

  // slide el
  SLIDE: '{namespace}-slide',
  ITEM: '{namespace}-item',
  ITEMINNER: '{namespace}-item-inner',
  LOADER: '{namespace}-loader',
  CONTENT: '{namespace}-content',
  IMAGE: '{namespace}-image',
  VIDEO: '{namespace}-video',
  PLAY: '{namespace}-play',
  LOADING: '{namespace}-loading',
  MAP: '{namespace}-map',
  IFRAME: '{namespace}-iframe',
  INLINE: '{namespace}-inline',
  AJAX: '{namespace}-ajax',
  // arrows
  ARROW: '{namespace}-arrow',

  // effect  class
  READY: '{namespace}-ready',

  // style  class
  OVERFLOWHIDE: '{namespace}-overflow-hide',
  SLIDEBOTTOM: '{namespace}-slide-bottom',
  SLIDELEFT: '{namespace}-slide-left',
  SLIDERIGHT: '{namespace}-slide-right',
  SLIDETOP: '{namespace}-slide-top',
  THUMBACTIVE: '{namespace}-thumb-active',
  THUMBSTRANSITION: '{namespace}-thumbs-transition',
  SLIDETRANSITION: '{namespace}-slide-transition',
  VERTICALCENTER: '{namespace}-vertical-center',
  LOADED: '{namespace}-loaded',
  HIDE: '{namespace}-hide',

  // topBar
  TOPBAR: '{namespace}-topBar',
  COUNTER: '{namespace}-counter',
  SHARE: '{namespace}-share',
  DOWNLOAD: '{namespace}-download',
  FULLSCREEN: '{namespace}-fullScreen',
  PLAY: '{namespace}-play',
  CLOSE: '{namespace}-close',

  // theme
  WHITE: '{namespace}-theme-white',
  BLACK: '{namespace}-theme-black'
}

export const methods = ['value', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  delegate: null,
  clickBgClose: true,
  clickImageClose: true,
  effect: 'zoom',
  thumbs: true,
  title: true,
  templates: {
    close() {
      return '<button type="button" class="{classes.CLOSE}" aria-label="Close"></button>'
    },
    overlay() {
      return '<div class="{classes.OVERLAY}"></div>'
    },
    wrap() {
      return '<div class="{classes.WRAP}"></div>'
    },
    // // footer
    footer() {
      return '<div class="{classes.FOOTER}"></div>'
    },
    thumbnails() {
      return (
        '<div class="{classes.THUMBNAILS}">' +
        '<div class="{classes.INNER}">' +
        '</div>' +
        '</div>'
      )
    },
    thumb() {
      return (
        '<div class="{classes.THUMB}">' +
        '<div class="{classes.THUMBBG} pj-lightbox-loaded">' +
        '</div>' +
        '</div>'
      )
    },
    // // slide
    slide() {
      return '<div class="{classes.SLIDE}"></div>'
    },
    item() {
      return (
        '<div class="{classes.ITEM}">' +
        '<div class="{classes.ITEMINNER}">' +
        '<div class="{classes.LOADER}"></div>' +
        '</div>' +
        '</div>'
      )
    },
    title() {
      return '<div class="{classes.TITLE}"></div>'
    },
    content() {
      return '<div class="{classes.CONTENT} {classes.VERTICALCENTER}"></div>'
    },
    image() {
      return '<img class="{classes.IMAGE} {classes.VERTICALCENTER}">'
    },
    video() {
      return '<div class="{classes.VIDEO} {classes.VERTICALCENTER}">'
    },
    map() {
      return '<iframe class="{classes.MAP} {classes.VERTICALCENTER}" src="//about:blank" frameborder="0" allowfullscreen></iframe>'
    },
    iframe() {
      return '<iframe class="{classes.IFRAME} {classes.VERTICALCENTER}" src="//about:blank" frameborder="0" allowfullscreen></iframe>'
    },
    inline() {
      return '<div class="{classes.INLINE} {classes.VERTICALCENTER}">'
    },
    inline() {
      return '<div class="{classes.AJAX} {classes.VERTICALCENTER}">'
    },
    // arrow
    arrow() {
      return (
        '<div title="{title}" class="{classes.ARROW} {classes.NAMESPACE}-arrow-{dir}">' +
        '<i class="icon-chevron-{dir}" aria-hidden="true"></i>' +
        '</div>'
      )
    },
    // topBar
    topBar() {
      return (
        '<div class="{classes.TOPBAR}">' +
        '<div id="{classes.COUNTER}"></div>' +
        '<span id="{classes.CLOSE}" class="icon-close"></span>' +
        '<span id="{classes.SHARE}" class="icon-share"></span>' +
        '<span id="{classes.DOWNLOAD}" class="icon-download"></span>' +
        '<span id="{classes.FULLSCREEN}" class="icon-full-screen"></span>' +
        '<span id="{classes.PLAY}" class="icon-play-circle"></span>' +
        '</div>'
      )
    }
  }
}

export const translations = {
  en: {
    hello: 'Hello world',
    greeting: 'Hello {name}!',
    plurals: ['{count} product', '{count} products', 'no product']
  },
  zh: {
    hello: '世界你好',
    greeting: '{name} 你好!',
    plurals: '{count} 个产品'
  }
}

export const dependencies = ['video']

export const info = { version: '0.0.1' }
