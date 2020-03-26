import { setStyle } from '@pluginjs/styled'
import { append, query, setData, wrap } from '@pluginjs/dom'
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

    if (this.instance.options.manageButton) {
      const $manage = this.instance.createEl('manage', {
        classes: this.classes,
        manageText: this.instance.translate('manage')
      })
      this.element.append($scheme, $manage)
    } else {
      this.element.append($scheme)
    }

    // create favorite item
    Object.keys(this.instance.data).forEach(groupName => {
      const $List = query(`.${this.classes.SCHEME}`, this.instance.$panel)
      this.createCollectionItem(groupName, $List)
    })

    return null
  }

  createCollectionItem(groupName, groupList) {
    Object.entries(this.instance.data[groupName]).forEach(([i, v]) => {
      const $item = this.instance.createEl('collectionItem', {
        classes: this.classes
      })

      const $itemwrap = wrap(
        `<div class="${this.classes.COLLECTIONITEMWRAP}"></div>`,
        $item
      )

      // set tooltip
      Tooltip.of($item, {
        title: i.replace(/^[a-zA-Z]?/g, char => char.toLocaleUpperCase()),
        placement: 'bottom',
        trigger: 'hover'
      })

      // set BgColor and Data val
      setStyle('background', v, $item)
      setData('info', { title: i, color: v }, $item)
      // append to group list
      append($itemwrap, groupList)
    })
  }

  setCollection(colorName) {
    Object.entries(this.instance.data).forEach(([, v]) => {
      Object.entries(v).forEach(([name, dataColor]) => {
        if (colorName.toLowerCase() === name.toLowerCase()) {
          if (
            dataColor.indexOf('gradient') > -1 &&
            this.instance.options.gradient
          ) {
            this.instance.GRADIENTPICKER.set(dataColor)
          } else {
            this.instance.COLORPICKER.set(dataColor)
          }

          this.instance.setInput(dataColor)
          this.instance.PREVIEW.update(dataColor)
        }
      })
    })
  }
}

export default Collection
