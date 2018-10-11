// import { isString } from '@pluginjs/is'
// import { bindEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import {
  append,
  parseHTML,
  // parent,
  children,
  prepend,
  query,
  // attr,
  // parentWith,
  // wrap,
  // unwrap,
  setData
  // getData,
  // empty
} from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'
import Scrollable from '@pluginjs/scrollable'

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
    // })

    // init scrollable
    const $scorllWrap = parseHTML(
      `<div class='${
        this.classes.COLLECTIONSCROLLWRAP
      }'><div><div></div></div></div>`
    )
    prepend($scorllWrap, this.element)
    const scrollWrapChildren = children($scorllWrap)
      .filter(el => el.tagName === 'DIV')
      .map(el =>
        children(el)
          .filter(el => el.tagName === 'DIV')
          .reduce((a, b) => a.concat(b))
      )
    scrollWrapChildren.map(append(this.selectorList))

    this.scrollable = Scrollable.of($scorllWrap, {
      contentSelector: '>',
      containerSelector: '>'
    })

    return null
  }

  createCollectionItem() {
    this.selectorList = query(`.${this.classes.SCHEME}`, this.element)
    Object.entries(this.instance.imgs).forEach(([i, v]) => {
      const $item = this.instance.createEl('collectionItem', {
        classes: this.classes
      })

      // set tooltip
      Tooltip.of($item, {
        title: i.replace(/^[a-zA-Z]?/g, char => char.toLocaleUpperCase()),
        placement: 'right',
        trigger: 'hover'
      })

      // set BgColor and Data val
      setStyle('background', v, $item)
      const info = {
        name: i,
        'background-color': this.bgColor,
        // make '#' to '%23', fixed svg data image not working on FireFox.
        'background-image': v.replace(/\#+/g, '%23') /* eslint-disable-line */
      }
      setData('info', info, $item)
      // append to group list
      append($item, this.selectorList)
    })
  }

  setCollection(colorName) {
    console.log(12)
    Object.entries(this.instance.data).forEach(([, v]) => {
      Object.entries(v).forEach(([name, dataColor]) => {
        if (colorName.toLowerCase() === name.toLowerCase()) {
          if (dataColor.indexOf('gradient') > -1) {
            // this.instance.info.gradient = dataColor
            this.instance.GRADIENTPICKER.set(dataColor)
          } else {
            // this.instance.info.solid = dataColor
            this.instance.COLORPICKER.set(dataColor)
          }

          this.instance.setInput(name)
          this.instance.PREVIEW.update(dataColor)
        }
      })
    })
  }
}

export default Collection
