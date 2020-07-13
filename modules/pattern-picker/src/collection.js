import { setStyle } from '@pluginjs/styled'
import { append, query, setData, wrap, parseHTML } from '@pluginjs/dom'
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

      append($scheme, this.element)
      append($manage, this.element)
    } else {
      append($scheme, this.element)
    }

    this.createCollectionItem()

    return null
  }

  createCollectionItem() {
    this.$selectorList = query(`.${this.classes.SCHEME}`, this.element)
    this.$selectorList.innerHTML = "";
    
    Object.entries(this.instance.imgs).forEach(([i, v]) => {
      const $item = this.instance.createEl('collectionItem', {
        classes: this.classes
      })

      const $itemwrap = wrap(
        `<div class="${this.classes.COLLECTIONITEMWRAP}"></div>`,
        $item
      )

      // set tooltip
      Tooltip.of($item, {
        title: v.name.replace(/^[a-zA-Z]?/g, char => char.toLocaleUpperCase()),
        placement: 'bottom',
        trigger: 'hover'
      })

      let pattern = v.pattern.replace(/\"/g, "'") /* eslint-disable-line */
      let patternHTML = parseHTML(pattern) /* eslint-disable-line */
      const fillValue = pattern.match(/fill='(.*?)'/)
      const fillOpacity = pattern.match(/fill-opacity='(.*?)'/)
  
      if(!fillValue) {
        patternHTML.setAttribute('fill', '');
      }

      if(!fillOpacity) {
        patternHTML.setAttribute('fill-opacity', '');
      }

      const div = document.createElement("div")
      div.appendChild(patternHTML)
      const str = div.innerHTML
      .replace(/[\r\n]/g,"")
      .replace(/#/g,'%23')
      .replace(/\"/g, "'")
      .replace(/</g,"%3C")
      .replace(/>/g,"%3E")
  
      let bgValue = ''
      let bgColor = ''
      if (v.backcolor) {
        bgColor = v.backcolor
      }

      if (pattern.match(/encoding='UTF-8'/)) {
        bgValue = `url(\"data:image/svg+xml,${str}\")` /* eslint-disable-line */
      } else {
        bgValue = `url(\"data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E${str}\")` /* eslint-disable-line */
      }

      setStyle('background', bgValue, $item)
      setStyle('background-color', bgColor, $item)

      const info = {
        name: i,
        'background-color': bgColor,
        // make '#' to '%23', fixed svg data image not working on FireFox.
        'background-image': bgValue.replace(/\#+/g, '%23') /* eslint-disable-line */
      }
      setData('info', info, $item)
      // append to group list
      append($itemwrap, this.$selectorList)
    })
  }
}
export default Collection
