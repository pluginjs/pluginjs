import { setStyle } from '@pluginjs/styled'
import { append, query, setData } from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'

class Collection {
  constructor(instance, element) {
    this.instance = instance
    this.classes = this.instance.classes
    this.element = element
    this.init()
  }

  init() {
    // init Collection
    this.build()
  }

  build() {
    if (!this.instance.data) {
      return false
    }
    // create group
    const $scheme = this.instance.createEl('scheme', {
      classes: this.classes
    })
    const $manage = this.instance.createEl('manage', {
      classes: this.classes,
      manageText: this.instance.translate('manage')
    })
    this.element.append($scheme, $manage)
    this.createCollectionItem()

    return null
  }

  createCollectionItem() {
    this.$selectorList = query(`.${this.classes.SCHEME}`, this.element)
    Object.entries(this.instance.imgs).forEach(([i, v]) => {
      const $item = this.instance.createEl('collectionItem', {
        classes: this.classes
      })

      // set tooltip
      Tooltip.of($item, {
        title: i.replace(/^[a-zA-Z]?/g, char => char.toLocaleUpperCase()),
        placement: 'bottom',
        trigger: 'hover'
      })

      v = v.replace(/\"/g, "'") /* eslint-disable-line */
      const fillValue = v.match(/fill='(\S*)'/)
      const fillOpacity = v.match(/fill-opacity='(\S*)'/)
      const dRule = v.match(/\sd='([\s\S]*)'/)
      let bgValue = ''

      if (!fillOpacity && !fillValue && dRule) {
        v = v.replace(dRule[0], `${dRule[0]} fill-opacity='1' fill='%23000000'`)
      } else if (!fillOpacity && fillValue && dRule) {
        v = v.replace(dRule[0], `${dRule[0]} fill-opacity='1'`)
      } else if (fillOpacity && !fillValue && dRule) {
        v = v.replace(dRule[0], `${dRule[0]} fill='%23000000'`)
      }

      v = v.replace(/[\r\n]/g, '').replace(/\s+/g, ' ')

      if (v.match(/encoding='UTF-8'/)) {
        bgValue = `url(\"data:image/svg+xml,${v}\")` /* eslint-disable-line */
      } else {
        bgValue = `url(\"data:image/svg+xml,<?xml version='1.0' encoding='UTF-8' standalone='no'?>${v}\")` /* eslint-disable-line */
      }

      setStyle('background', bgValue, $item)

      const info = {
        name: i,
        'background-color': this.bgColor,
        // make '#' to '%23', fixed svg data image not working on FireFox.
        'background-image': bgValue.replace(/\#+/g, '%23') /* eslint-disable-line */
      }
      setData('info', info, $item)
      // append to group list
      append($item, this.$selectorList)
    })
  }
}
export default Collection
