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
    const $collection = this.instance.createEl('collection', {
      classes: this.classes,
      manageText: this.instance.translate('manage'),
      favoritesText: this.instance.translate('colorInScheme'),
      schemeText: this.instance.translate('myColors')
    })

    this.element.append(...$collection)
    // create favorite item
    Object.keys(this.instance.data).forEach(groupName => {
      const $groupList = query(
        `.${this.classes.NAMESPACE}-${groupName} .${this.classes.GROUPLIST}`,
        this.instance.$panel
      )
      this.createCollectionItem(groupName, $groupList)
    })

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
    scrollWrapChildren.map(
      append(query(`.${this.classes.SCHEME}`, this.element))
    )
    scrollWrapChildren.map(
      append(query(`.${this.classes.FAVORITES}`, this.element))
    )

    this.scrollable = Scrollable.of($scorllWrap, {
      contentSelector: '>',
      containerSelector: '>'
    })

    return null
  }

  createCollectionItem(groupName, groupList) {
    Object.entries(this.instance.data[groupName]).forEach(([i, v]) => {
      const $item = this.instance.createEl('collectionItem', {
        classes: this.classes
      })

      // set tooltip
      Tooltip.of($item, {
        title: i.replace(/^[a-zA-Z]?/g, char => char.toLocaleUpperCase()),
        placement: 'right'
      })

      // set BgColor and Data val
      setStyle('background', v, $item)
      setData('info', { title: i, color: v }, $item)
      // append to group list
      append($item, groupList)
    })
  }

  setCollection(colorName) {
    Object.entries(this.instance.data).forEach(([, v]) => {
      Object.entries(v).forEach(([name, dataColor]) => {
        if (colorName.toLowerCase() === name.toLowerCase()) {
          if (
            dataColor.indexOf('gradient') > -1 &&
            this.instance.hasModule('gradient')
          ) {
            this.instance.info.gradient = dataColor
            this.instance.GRADIENT.setGradient(dataColor)
          } else if (this.instance.hasModule('solid')) {
            this.instance.info.solid = dataColor
            this.instance.SOLID.setSolid(dataColor)
          }

          this.instance.setInput(name)
          this.instance.PREVIEW.update(dataColor)
        }
      })
    })
  }
}

export default Collection
