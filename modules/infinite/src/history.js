import { scrollParent } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'

export default class History {
  constructor(instance) {
    this.mode = instance.options.history
    if (!['push', 'replace'].includes(this.mode)) {
      this.mode = 'push'
    }

    this.instance = instance
    this.$parent = scrollParent(this.instance.element)
    this.cache = {}
    this.defaultUrl = window.location.href
    this.setCacheState(this.defaultUrl, document.title)

    bindEvent(
      instance.eventName('popstate'),
      ({ state }) => {
        let url
        if (state && state.url) {
          url = state.url
        } else if (window.location.href === this.defaultUrl) {
          url = this.defaultUrl
        }
        if (url) {
          this.restoreState(url)
        }
      },
      window
    )
  }

  restoreState(url) {
    const state = this.getCacheState(url)
    if (!state) {
      return
    }

    if (state.title) {
      this.updateTitle(state.title)
    }
    if (state.offset) {
      this.restoreOffset(state.offset)
    }
  }

  setCacheState(url, title) {
    this.cache[url] = {
      title,
      offset: this.getOffset()
    }
  }

  getCacheState(url) {
    return this.cache[url]
  }

  getOffset() {
    if (this.$parent === document.documentElement) {
      return {
        y: window.pageYOffset,
        x: window.pageXOffset
      }
    }
    return {
      y: this.$parent.scrollTop,
      x: this.$parent.scrollLeft
    }
  }

  restoreOffset(offset) {
    if (this.$parent === document.documentElement) {
      if (this.instance.horizontal) {
        window.pageXOffset = offset.x
      } else {
        window.pageYOffset = offset.y
      }
    } else if (this.instance.horizontal) {
      this.$parent.scrollLeft = offset.x
    } else {
      this.$parent.scrollTop = offset.y
    }
  }

  updateState(url, $context) {
    const $link = this.getLink(url)

    if ($link.origin !== location.origin) {
      return
    }
    const title = $context.title ? $context.title : null
    this.updateTitle(title)
    const state = {
      url: $link.href
    }
    if (this.mode === 'push') {
      this.setCacheState($link.href, title)
      window.history.pushState(state, title, url)
    } else {
      window.history.replaceState(state, title, url)
    }
  }

  updateTitle(title) {
    document.title = title
  }

  destory() {
    removeEvent(this.eventName('popstate'), window)
    removeEvent(this.eventName(), this.$parent)
  }

  getLink(url) {
    if (!this.$a) {
      this.$a = document.createElement('a')
    }
    this.$a.href = url
    return this.$a
  }
}
