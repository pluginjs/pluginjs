import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, insertBefore } from '@pluginjs/dom'
import Base from './base'

class Ajax extends Base {
  constructor(instance) {
    super(instance)

    this.init()
  }

  init() {
    this.ajax = this.instance.getElement('ajax')
  }

  update(index) {
    const data = this.items[index]

    if (data.loadError) {
      this.updateStatus('error')
      return
    }

    this.updateStatus('loading')
    const opts = $.extend({
      url: data.href,
      success: (data, textStatus, jqXHR) => {
        const temp = {
          data,
          xhr: jqXHR
        }

        $(temp.data).appendTo(this.ajax)

        this.updateStatus('loaded')
      },

      error: () => {
        data.loadError = true

        this.updateStatus('error')
      }
    })

    $.ajax(opts)
  }

  updateStatus(status) {
    if (status === 'error') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'load Ajax Error'
      removeClass(this.classes.HIDE, this.loader)
      // todo   show  error tip
    } else if (status === 'loading') {
      removeClass(this.classes.LOADED, this.content)
      this.loader.innerHTML = 'loading'
      removeClass(this.classes.HIDE, this.loader)
      // todo    show loadind  tip
    } else if (status === 'loaded') {
      addClass(this.classes.LOADED, this.content)
      addClass(this.classes.HIDE, this.loader)
    }
  }

  appendTo(el) {
    append(this.ajax, el)
    this.loader = query(`.${this.classes.LOADER}`, el)
  }

  remove() {
    addClass(this.classes.HIDE, this.content)
    this.ajax.remove()
  }
}

export default Ajax
 Ajax
