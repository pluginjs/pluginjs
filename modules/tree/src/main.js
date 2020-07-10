import Component from '@pluginjs/component'
import { isArray } from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { queryAll, setData, getData, children } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import DataParser from './dataParser'
import Node from './node'
import HtmlParser from './htmlParser'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Tree extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    this.DATAPARSER = new DataParser(this.options, this)
    this.HTMLPARSER = new HtmlParser(this.options, this)
    this.EVENTS = EVENTS

    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.dataFromHtml === true) {
      this.createFromHtml()
    } else {
      this.createFromData()
    }

    const root =
      this.element.nodeName.toLowerCase() === 'ul'
        ? this.element
        : queryAll('ul', this.element)[0]

    this.root = getData('node', root)

    if (this.options.multiSelect) {
      this.selected = []
    } else {
      this.selected = null
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    // if (!this.options.tabindex && Number.isNaN(Number(this.options.tabindex))) {
    //
    // }

    this.autoOpen()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    bindEvent(this.eventName('click'), this.click.bind(this), this.element)
    // this.$element.on({ click: $.proxy(this.click, this) })

    if (this.options.keyboard) {
      const keyCodeDir = {
        38: 'top',
        40: 'down',
        37: 'left',
        39: 'right'
      }

      const selectNext = node => {
        const position = node.position()
        let index = position.pop()
        const parent = node.parents()[0]
        // let parentChildren = parent.children()
        if (parent.children().length > index) {
          index += 1
          position.push(index)
          this.select(position)
        } else if (parent.type !== 'root') {
          selectNext(parent)
        }
      }

      const selectPre = node => {
        const children = node.children()
        if (children.length) {
          const lastChildren = children[children.length - 1]
          if (lastChildren.type === 'branch' && lastChildren.isOpened()) {
            selectPre(lastChildren)
          } else {
            lastChildren.select()
          }
        }
      }

      const keydownCallback = {
        top() {
          const selected = this.getSelected()
          const position = selected.position()
          const parent = selected.parents()[0]
          let index = position.pop()
          if (index > 1) {
            index -= 1
            position.push(index)
            const preNode = this.get(position)
            if (preNode.type === 'branch' && preNode.isOpened()) {
              selectPre(preNode)
            } else {
              this.select(position)
            }
          } else if (parent.type !== 'root') {
            this.select(position)
          }
        },
        down() {
          const selected = this.getSelected()
          if (selected.type === 'branch' && selected.isOpened()) {
            if (selected.children().length) {
              const p = selected.position()
              p.push(1)
              this.select(p)
            }
          } else {
            selectNext(selected)
          }
        },
        left() {
          const selected = this.getSelected()
          const position = selected.position()
          const parent = selected.parents()[0]
          let index = position.pop()
          if (selected.isOpened()) {
            selected.toggleOpen()
            return
          }
          if (index > 1) {
            index -= 1
            position.push(index)
            const preNode = this.get(position)
            if (preNode.type === 'branch' && preNode.isOpened()) {
              selectPre(preNode)
            } else {
              this.select(position)
            }
          } else if (parent.type !== 'root') {
            this.select(position)
          }
        },
        right() {
          const selected = this.getSelected()
          if (selected.type === 'branch') {
            if (selected.isOpened()) {
              if (selected.children().length) {
                const p = selected.position()
                p.push(1)
                this.select(p)
              }
            } else {
              selected.toggleOpen()
            }
          } else {
            selectNext(selected)
          }
        }
      }

      bindEvent(
        this.eventName('keydown'),
        e => {
          if (this.options.multiSelect) {
            return
          }
          const dir = keyCodeDir[e.keyCode]
          if (dir) {
            keydownCallback[dir].call(this)
          } else {
            return
          }
        },
        this.element
      )
    }
  }

  unbind() {
    removeEvent(this.eventName('click'), this.element)

    if (this.options.keyboard) {
      removeEvent(this.eventName('keydown'), this.element)
    }
  }

  getBranchHtml(data, content) {
    const { tabindex } = this.options
    const toggler = template.render(this.options.templates.toggler.call(this), {
      classes: this.classes
    })
    const branchContent = content || this.options.templates.branchContent(data)
    const branchHtml = template.render(
      this.options.templates.branch.call(this),
      {
        classes: this.classes,
        tabindex,
        toggler,
        branchContent
      }
    )
    return branchHtml
  }

  createFromHtml() {
    const tree =
      this.element.nodeName.toLowerCase() === 'ul'
        ? this.element
        : queryAll('ul', this.element)[0]

    this.HTMLPARSER.renderTree(tree, true, this)
    this.attach(tree, true, this)
  }

  createFromData() {
    let html = ''
    if (this.options.data) {
      html = this.DATAPARSER.getTree(this.options.data, true)
    }
    this.element.innerHTML = html
    this.attach(children('ul', this.element)[0], true, this)
  }

  click(e) {
    const target = e.target
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector;
    }

    if (!Element.prototype.closest)
      Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement;
        } while (el !== null);
        return null;
    };

    const nodeEl = target.closest('li')
    if (!nodeEl) {
      return
    }
    const node = getData('node', nodeEl)

    if (target.classList.contains(this.classes.TOGGLER)) {
      node.toggleOpen()
    } else {
      node.toggleSelect()
    }
  }

  attach(node, isRoot, api) {
    setData('node', new Node(node, isRoot, api), node)
    let childrenEl
    if (isRoot) {
      childrenEl = node
    } else {
      childrenEl = children('ul', node)[0]
    }

    if (childrenEl) {
      // has child
      const iterate = tree => {
        children('li', tree).forEach(node => {
          this.attach(node, false, api)
        })
      }
      iterate(childrenEl)
    }
  }

  open(position, iterate) {
    const node = this.get(position)
    if (node) {
      node.open(iterate)
    }
    return this
  }

  close(position, iterate) {
    const node = this.get(position)
    if (node) {
      node.close(iterate)
    }
    return this
  }

  select(position) {
    const node = this.get(position)
    if (node) {
      node.select()
    }
    return this
  }

  unselect(position) {
    const node = this.get(position)
    if (node) {
      node.unselect()
    }
    return this
  }

  get(position) {
    if (this.is('disabled')) {
      return null
    }
    if (!isArray(position)) {
      position = []
    }

    try {
      const iterate = (node, index) => getData('node', node.subelements[index])

      let node = this.root
      for (let i = 0; i < position.length; i++) {
        node = iterate(node, position[i] - 1)
      }
      return node
    } catch (e) {
      return null
    }
  }

  getRoot() {
    if (this.is('disabled')) {
      return null
    }
    return this.root
  }

  getSelected() {
    if (this.is('disabled')) {
      return null
    }
    return this.selected
  }

  autoOpen() {
    const root = this.root.dom

    switch (typeof this.options.autoOpen) {
      case 'boolean': {
        queryAll('li', root).forEach(item => {
          const node = getData('node', item)
          if (this.options.autoOpen === true && node.type === 'branch') {
            node.open()
          }
        })
        break
      }
      case 'number': {
        queryAll('li', root).forEach(item => {
          const node = getData('node', item)
          if (node.type === 'branch' && node.level <= this.options.autoOpen) {
            node.open()
          }
        })
        break
      }
      case 'object': {
        if (isArray(this.options.autoOpen)) {
          this.get(this.options.autoOpen).open(true)
        }
        break
      }
      default: {
        break
      }
    }
  }

  append(position, data) {
    const node = this.get(position)
    if (node) {
      node.append(data)
    }
    return this
  }

  prepend(position, data) {
    const node = this.get(position)
    if (node) {
      node.prepend(data)
    }
    return this
  }

  after(position, data) {
    const node = this.get(position)
    if (node) {
      node.after(data)
    }
    return this
  }

  before(position, data) {
    const node = this.get(position)
    if (node) {
      node.before(data)
    }
    return this
  }

  remove(position) {
    const node = this.get(position)
    if (node) {
      if(isIE() || isIE11()) {
        node.removeNode(true);
      } else {
        node.remove()
      }
    }
    return this
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.leave('initialized')
    }

    if (this.options.theme) {
      removeClass(this.getThemeClass(), this.element)
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Tree
