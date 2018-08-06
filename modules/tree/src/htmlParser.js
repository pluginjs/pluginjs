import { addClass } from '@pluginjs/classes'
import { query, insertAfter, children } from '@pluginjs/dom'

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
    let nodes

    if (isRoot) {
      nodes = node
      addClass(this.classes.TREE, node)
    } else {
      nodes = children('ul', node)[0]
    }

    if (nodes) {
      // has child
      addClass(this.classes.BRANCH, node)

      const privateIterate = tree => {
        children('li', tree).forEach(node => {
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
      privateIterate(nodes)
    }
  }
}

export default HtmlParser
