import SERVICES from './services'
import { getData, setData } from '@pluginjs/dom'
import { openPopup, makeUrl, createTempLink } from './utils'

class Share {
  constructor(element) {
    this.element = element

    this.detectService()
  }

  detectService() {
    let service = getData('service', this.element)

    if (!service) {
      service = Object.keys(SERVICES).filter(service => {
        return this.element.className.indexOf(service) >= 0
      })[0]
    }

    if (service) {
      this.service = service

      setData('service', service, this.element)
    }
  }

  click(metadata, options) {
    const service = SERVICES[this.service]
    if (service.click.call(this)) {
      const url = makeUrl(service.url, metadata.getAll(this.service))

      if (service.qrcode === true) {
        return false
      }

      if (service.popup === false) {
        createTempLink(url)
        return false
      }

      openPopup(
        url,
        options.prefix + this.service,
        service.width,
        service.height
      )
    }

    return false
  }
}

export default Share
