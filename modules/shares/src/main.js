/* Credit to https://github.com/ilyabirman/Likely MIT */
import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { children, getData } from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'
import Share from './share'
import Metadata from './Metadata'
import SERVICES from './services'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Shares extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    this.metadata = new Metadata(this.options)
    this.shares = this.getShares()

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  getShares() {
    if (this.shares) {
      return this.shares
    }
    const $shares = children(`.${this.classes.SHARE}`, this.element)
    const shares = {}

    $shares.forEach($share => {
      const share = new Share($share)

      if (share.service) {
        shares[share.service] = share

        if (SERVICES[share.service].qrcode) {
          this.createQrcode(this.metadata.getUrl(), $share)
        }
      }
    })

    return shares
  }

  createQrcode(url, element) {
    const qrcode = `<img width="180" height="180" src="http://qr.topscan.com/api.php?text=${url}">`
    // attr('data-content', qrcode, element)
    element.classList.add(this.classes.TOOLTIP)

    Tooltip.of(element, {
      title: qrcode,
      html: true,
      placement: 'auto',
      trigger: 'hover',
      ...this.options.tooltip
    })
  }

  getShare(service) {
    if (Object.hasOwnProperty.call(this.shares, service)) {
      return this.shares[service]
    }

    return null
  }

  bind() {
    /* eslint consistent-this: "off"*/
    const self = this
    bindEvent(
      this.eventName('click'),
      `.${this.classes.SHARE}`,
      function() {
        if (self.is('disabled')) {
          return false
        }
        const service = getData('service', this)
        if (service) {
          const share = self.getShare(service)

          share.click(self.metadata, self.options)
        }

        return false
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerService(name, service) {
    SERVICES[name] = service
  }
}

export default Shares
