import { addClass, removeClass } from '@pluginjs/classes'
import {
  append,
  parseHTML,
  queryAll,
  getObjData,
  insertBefore,
  insertAfter,
  childrenSelect,
  parentQuery,
  getSiblings
} from '@pluginjs/dom'

export default class Node {
  constructor(dom, isRoot, api) {
    this.dom = dom
    this.api = api
    this.classes = this.api.classes

    if (isRoot === null) {
      isRoot = false
    }

    if (isRoot) {
      this.type = 'root'
    } else {
      this.selected = false
      if (this.hasChildren()) {
        this.type = 'branch'
        this.opened = this.isOpened()
      } else {
        this.type = 'leaf'
      }
    }
    this.initialize()
  }

  initialize() {
    switch (this.type) {
      case 'root': {
        this.subelements = Array.from(this.dom.children)

        this.level = 0
        this.parent = null
        break
      }
      case 'branch':
      case 'leaf': {
        const childrenUl = childrenSelect('ul', this.dom)
        if (childrenUl.length > 0) {
          this.subelements = Array.from(childrenUl[0].children)
        } else {
          this.subelements = []
        }

        // this.$parent = this.dom.parents(`li.${this.classes.BRANCH}`).eq(0)
        this.$parent = parentQuery(
          {
            type: 'tagName',
            value: 'li',
            level: 1
          },
          this.dom
        )[0]

        if (!this.$parent) {
          this.$parent = this.dom.parentNode
        }

        this.parent = getObjData('node', this.$parent)
        // this.parent = this.$parent.data('node')
        this.level = this.parent.level + 1
        break
      }
      default: {
        break
      }
    }
  }

  // Retrieve the DOM elements matched by the Node object.
  get() {
    return this.dom
  }

  position() {
    const postions = []

    const iterate = node => {
      const index = Array.from(node.dom.parentNode.children).indexOf(node.dom)
      postions.push(index + 1)
      if (node.parent && node.parent.type !== 'root') {
        iterate(node.parent)
      }
    }
    iterate(this)

    return postions.reverse()
  }

  parents() {
    const parents = []

    const iterate = node => {
      if (node.parent !== null && node.parent !== false) {
        parents.push(node.parent)
        iterate(node.parent)
      }
    }
    iterate(this)
    return parents
  }

  children() {
    const children = []
    let node
    for (let i = 0; i < this.subelements.length; i++) {
      node = getObjData('node', this.subelements[i])
      if (node) {
        children.push(node)
      }
    }

    return children
  }

  siblings() {
    const siblings = []
    const $siblings = getSiblings(this.dom)
    let node

    for (let i = 0; i < $siblings.length; i++) {
      node = getObjData('node', $siblings[0])
      // node = $siblings.data('node')
      if (node) {
        siblings.push(node)
      }
    }
    return siblings
  }

  hasChildren() {
    const ul = childrenSelect('ul', this.dom)
    if (ul.length !== 0) {
      return childrenSelect('li', ul[0]).length !== 0
    }
    return false
  }

  isOpened() {
    if (typeof this.opened === 'undefined') {
      return this.dom.classList.contains(this.classes.OPEN)
    }
    return this.opened
  }

  open(iterate) {
    this.opened = true
    addClass(this.classes.OPEN, this.dom)

    // open parents nodes
    if (iterate) {
      const parents = this.parents()
      for (let i = 0; i < parents.length; i++) {
        if (parents[i].type !== 'root') {
          parents[i].open()
        }
      }
    }

    if (!this.api.options.multiSelect && this.hasChildrenSelect()) {
      removeClass(this.classes.CHILDRENSELECTED, this.dom)
    }

    this.api.trigger(this.api.EVENTS.OPEN, this)

    return this
  }

  close(iterate) {
    this.opened = false
    removeClass(this.classes.OPEN, this.dom)

    // close children nodes
    if (iterate) {
      const children = this.children()
      for (let i = 0; i < children.length; i++) {
        if (children[i].type === 'branch') {
          children[i].close(true)
        }
      }
    }

    if (!this.api.options.multiSelect && this.hasChildrenSelect()) {
      addClass(this.classes.CHILDRENSELECTED, this.dom)
    }

    this.api.trigger(this.api.EVENTS.CLOSE, this)

    return this
  }

  hasChildrenSelect() {
    return queryAll(`li.${this.classes.SELECTED}`, this.dom).length !== 0
  }

  hasChildrenSelectBranch() {
    return (
      queryAll(`li.${this.classes.CHILDRENSELECTED}`, this.api.element)
        .length !== 0
    )
  }

  toggleOpen() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
    return this
  }

  toggleSelect() {
    if (this.selected) {
      this.unselect()
    } else {
      this.select()
    }

    return this
  }

  select() {
    this.selected = true
    addClass(this.classes.SELECTED, this.dom)
    if (this.api.options.multiSelect) {
      this.api.selected.push(this)
    } else {
      if (this.api.selected) {
        this.api.selected.unselect(true)
      }
      this.api.selected = this
    }

    if (!this.api.options.multiSelect && this.hasChildrenSelectBranch()) {
      queryAll(`li.${this.classes.CHILDRENSELECTED}`, this.api.element).map(
        el => {
          return removeClass(this.classes.CHILDRENSELECTED, el)
        }
      )
    }

    this.api.trigger(this.api.EVENTS.SELECT, this)

    return this
  }

  unselect(force) {
    if (this.api.options.canUnselect || force) {
      this.selected = false
      removeClass(this.classes.SELECTED, this.dom)

      if (this.api.options.multiSelect) {
        this.api.selected = this.api.selected.filter(
          node => node.dom !== this.dom
        )
      } else {
        this.api.selected = null
      }

      this.api.trigger(this.api.EVENTS.UNSELECT, this)
    }
    return this
  }

  toBranch() {
    if (this.type === 'leaf') {
      const content = this.dom.innerHTML
      addClass(this.classes.BRANCH, this.dom)
      this.dom.setAttribute('tabindex', false)
      const branchHtml = this.api.getBranchHtml(false, content)
      this.dom.innerHTML = `${branchHtml}<ul></ul>`
    }
    return this
  }

  append(data) {
    if (this.type === 'leaf') {
      this.toBranch()
    }

    const html = this.api.DATAPARSER.getNode(data)
    const ul = childrenSelect('ul', this.dom)[0]
    const node = append(html, ul)

    if (this.type === 'leaf') {
      this.api.attach(this.dom, false, this.api)
    } else {
      this.api.attach(node, false, this.api)
    }

    return this
  }

  prepend(data) {
    if (this.type === 'leaf') {
      this.toBranch()
    }

    const html = this.api.DATAPARSER.getNode(data)
    const ul = childrenSelect('ul', this.dom)[0]
    const node = append(parseHTML(html), ul)

    if (this.type === 'leaf') {
      this.api.attach(this.dom, false, this.api)
    } else {
      this.api.attach(node, false, this.api)
    }

    return this
  }

  after(data) {
    const html = this.api.DATAPARSER.getNode(data)
    insertAfter(html, this.dom)

    const node = this.dom.nextElementSibling
    this.api.attach(node, false, this.api)
    return this
  }

  before(data) {
    const html = this.api.DATAPARSER.getNode(data)
    insertBefore(html, this.dom)

    const node = this.dom.previousElementSibling
    this.api.attach(node, false, this.api)
    return this
  }

  remove() {
    this.dom.remove()
    return this
  }
}
