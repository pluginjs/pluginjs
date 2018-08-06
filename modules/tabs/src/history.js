import { bindEvent } from '@pluginjs/events'
import { query } from '@pluginjs/dom'

class History {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    let count = 1

    if (
      !window.history ||
      !window.history.pushState ||
      !window.history.replaceState
    ) {
      return
    }

    if (this.instance.options.history === false) {
      return
    }

    if (this.instance.options.history) {
      const id = this.instance.element.id

      if (id) {
        this.instance.historyId = id
      } else {
        this.instance.historyId = `tabs_${count}`
        count++
      }
    } else {
      this.instance.historyId = this.instance.options.history
    }

    const MATCH = new RegExp(
      `[#&]*${this.instance.historyId}=([^&]*)`,
      'i'
    ).exec(window.location.hash)

    if (MATCH) {
      const slug = decodeURIComponent(MATCH[1].replace(/\+/g, ' '))
      const $tab = query(
        `${this.instance.options.historyAttr}="${slug}"`,
        this.instance.$nav
      )

      if ($tab.length >= 1) {
        this.instance.initialIndex = this.instance.$tabs.indexOf($tab)
      } else if (!isNaN(parseFloat(slug)) && isFinite(slug)) {
        this.instance.initialIndex = slug
      }
    }

    // window.onpopstate = event => {
    //   const state = window.history.state
    //   if (state && typeof state[this.instance.historyId] !== 'undefined') {
    //     if (state[this.instance.historyId].index) {
    //       this.instance.active(state[this.instance.historyId].index, false)
    //     }
    //     event.preventDefault()
    //   } else {
    //     this.instance.revert(false)
    //   }
    // }
    bindEvent(
      {
        type: this.instance.eventName('popstate'),
        handler: event => {
          const state = event.state
          if (state && typeof state[this.instance.historyId] !== 'undefined') {
            if (state[this.instance.historyId].index) {
              this.instance.active(state[this.instance.historyId].index, false)
            }
            event.preventDefault()
          } else {
            this.instance.revert(false)
          }
        }
      },
      window
    )
  }

  update() {
    if (
      this.instance.options.history === false ||
      typeof this.instance.historyId === 'undefined'
    ) {
      return
    }

    const current = this.instance.current
    const attr = this.instance.$tabs[current].getAttribute(
      this.instance.options.historyAttr
    )
    const REG = new RegExp(`#*${this.instance.historyId}=[^&]+`, 'i')
    const state = {
      index: current,
      slug: typeof attr === "undefined" && attr === null ? current : attr, /* eslint-disable-line */
      initial: current === this.instance.options.initialIndex
    }
    let url = window.location.hash

    if (url === '') {
      url = `#${this.instance.historyId}`
    }

    url = url.match(REG)
      ? url.replace(REG, `#${this.instance.historyId}=${state.slug}`)
      : `${url}=${state.slug}`

    let states = history.state
    if (!states) {
      states = {}
    }
    states[this.instance.historyId] = state

    url = url.replace(/^#&/, '#')
    window.history.pushState(states, '', url)
  }
}
export default History
