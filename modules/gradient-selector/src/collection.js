import { setStyle } from '@pluginjs/styled'
import { wrap, append, parseHTML, prepend, query, setData } from '@pluginjs/dom'
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

    // init scrollable
    const $scorllWrap = parseHTML(
      `<div class='${this.classes.COLLECTIONSCROLLWRAP}'></div>`
    )
    prepend($scorllWrap, this.element)
    append(this.$selectorList, $scorllWrap)

    return null
  }

  createCollectionItem() {
    this.$selectorList = query(`.${this.classes.SCHEME}`, this.element)
    this.$selectorList.innerHTML = "";
    
    Object.entries(this.instance.colors).forEach(([i, v]) => {
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
   
      // set BgColor and Data val
      setStyle('background', v.gradient, $item)
      const info = {
        name: v.name,
        color: v.gradient
      }
      setData('info', info, $item)
      // append to group list
      append($itemwrap, this.$selectorList)
    })
  }
}

export default Collection
