import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, query, insertAfter, childrenSelect } from '@pluginjs/dom'

class HtmlParser {
  constructor(options, api) {
    this.templates = options.templates

    this.classes = api.classes
    this.options = api.options
    this.api = api
  }

  getLeaf(node) {
    return node.innerHTML
  }

  getBranch(node) {
    const b = query('div', node)
    if (b) {
      return b.innerHTML
    }
    return this.getLeaf(node)
  }

  renderTree(node, isRoot, api) {
    let children

    if (isRoot) {
      children = node
      addClass(this.classes.TREE, node)
    } else {
      children = childrenSelect('ul', node)[0]
    }

    if (children) {
      // has child
      addClass(this.classes.BRANCH, node)

      const privateIterate = tree => {
        childrenSelect('li', tree).map((node, i) => {
          const data = this.getBranch(node)
          const branchHtml = this.api.getBranchHtml(data)

          const div = query('div', node)
          if (div) {
            insertAfter(branchHtml, div)
            div.remove()
          } else {
            node.setAttribute('tabindex', this.api.options.tabindex)
          }

          this.renderTree(node, false, api)
        })
      }
      privateIterate(children)
    }
  }
}

export default HtmlParser
