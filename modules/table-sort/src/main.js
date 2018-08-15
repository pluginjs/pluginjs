import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import { compose, curry } from '@pluginjs/utils'
import { attr, append, children, query, getData, setData } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import { floatCompare, intCompare, stringCompare } from './baseCompareFunction'

const Store = class {
  constructor(store = {}) {
    this.__store = store
  }

  set(key, value) {
    this.__store[key] = value
  }

  get(key) {
    return this.__store[key]
  }

  static of(store) {
    return new Store(store)
  }
}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class TableSort extends Component {
  beforeSort = []
  afterSore = []
  _compare = false

  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    addClass(this.classes.NAMESPACE, this.element)
    this.initStates()
    this.initialize()
  }

  get data() {
    return this._data
  }

  set data(value) {
    this.render(value)
    this._data = value
  }

  initialize() {
    this.initState()
    if (this.options.icons) {
      const createIconElement = iconName =>
        attr({ class: iconName }, document.createElement('i'))
      this.hashMap
        .get('keyNode')
        .map(el => append(createIconElement(this.options.icons.sort), el))
    }
    this.initEvent()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initState() {
    const element = this.element
    const hashMap = Store.of()
    const keyNode = children(query('thead > tr', element))
    // const keyNode = [...element.querySelector('thead > tr').children]
    const keys = keyNode.map(node => node.textContent)
    // const types = keyNode.map(data('type'))
    const types = keyNode.map(node => getData('type', node))

    hashMap.set('keys', keys)
    hashMap.set('keyNode', keyNode)
    hashMap.set('types', types)
    // const data = [...element.querySelector('tbody').children].map(
    const data = children(query('tbody', element)).map((tr, index) => {
      const subDom = children(tr)
      // const subDom = [...tr.children]
      hashMap.set(index, subDom)
      return subDom
    })
    this.hashMap = hashMap
    this._data = data
  }

  initEvent() {
    this.hashMap.get('keyNode').map((node, index) => {
      // if (node.dataset.type) {
      //   return node.addEventListener('click', () => this.sort({ index }))
      // }
      if (getData('type', node)) {
        return bindEvent('click', () => this.sort({ index }), node)
      }
      return false
    })
  }

  render(nextData) {
    const oldChildren = this.element.querySelector('tbody')
    const newChildren = document.createElement('tbody')
    for (const childrens of nextData) {
      const item = document.createElement('tr')
      for (const children of childrens) {
        item.appendChild(children)
      }
      newChildren.appendChild(item)
    }
    this.element.replaceChild(newChildren, oldChildren)
  }

  format(data, config) {
    if (typeof config === 'function') {
      const customCompareFn = config
      return data.sort(customCompareFn)
    }
    const { key, direction } = config
    const getType = key => this.hashMap.get('types')[key]
    const getCompareByDirection = curry((direction, fn) => {
      if (direction === 'desc') {
        return (a, b) => fn(b, a)
      }
      return fn
    })
    const getCompareByKey = key => {
      const type = getType(key)
      switch (type) {
        case 'string':
          return stringCompare(key)
        case 'int':
          return intCompare(key)
        case 'float':
          return floatCompare(key)
        default:
          return false
      }
    }
    const getCompare = compose(
      getCompareByDirection(direction),
      getCompareByKey
    )
    const result = data.sort(getCompare(key))
    return result
  }

  sort(config) {
    const Dataset = class {
      constructor(eles) {
        this.childrens = eles
      }

      static of(eles) {
        return new Dataset(eles)
      }

      map(direction, key) {
        const eles = this.childrens
        const node = eles[key]
        // node.dataset.direction = direction
        setData('direction', direction, node)
        return Dataset.of(eles)
      }

      clear() {
        const eles = this.childrens
        for (const ele of eles) {
          ele.dataset.direction = ''
        }
        return Dataset.of(eles)
      }
    }
    const columnNameList = this.hashMap.get('keyNode')
    const isDesc = node => getData('direction', node) === 'desc'
    if (typeof config === 'object') {
      const index = config.index
      const direction =
        config.direction || isDesc(columnNameList[index]) ? 'asc' : 'desc'
      this.data = this.format(this.data, { key: index, direction })
      Dataset.of(columnNameList)
        .clear()
        .map(direction, index)
      if (this.options.icons) {
        columnNameList[index]
          .querySelector('i')
          .setAttribute('class', this.options.icons[direction])
      }
    } else if (typeof config === 'function') {
      const customCompareFn = config
      this.data = this.format(this.data, customCompareFn)
      Dataset.of(columnNameList).clear()
    }
  }

  setCompare(fn) {
    this._compare = fn
  }

  append(data) {
    // const length = this.element.querySelector('tbody').children.length
    const length = children(query('tbody', this.element)).length
    const mapper = this.mapJsonToData(data)
    mapper.map((column, index) => this.hashMap.set(length + index, column))
    const nextData = [...this.data, ...mapper]
    this.data = nextData
  }

  replace(data) {
    const mapper = this.mapJsonToData(data)
    mapper.map((column, index) => this.hashMap.set(index, column))
    this.data = mapper
  }

  mapJsonToData(data) {
    const keys = this.hashMap.get('keys')
    return data.map(column =>
      Object.entries(column).reduce((initState, [key, value]) => {
        const index = keys.indexOf(key)
        const dom = document.createElement('td')
        if (value instanceof HTMLElement) {
          dom.appendChild(value)
        } else {
          dom.textContent = value
        }
        const nextState = initState
        nextState[index] = dom
        return nextState
      }, [])
    )
  }

  bind() {
    bindEvent(this.eventName('click touch'), () => false, this.element)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
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

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default TableSort
