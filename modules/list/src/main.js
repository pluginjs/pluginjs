import Component from '@pluginjs/component'
import {
  parseHTML,
  parentWith,
  wrap,
  parent,
  insertAfter,
  dataset,
  children,
  queryAll,
  query,
  insertBefore,
  getObjData,
  unwrap
} from '@pluginjs/dom'
import { deepMerge } from '@pluginjs/utils'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hasClass, addClass, removeClass } from '@pluginjs/classes'
import PopDialog from '@pluginjs/pop-dialog'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import Sortable from 'sortablejs'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class List extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)

    this.initStates()
    this.initClasses(CLASSES)
    this.setupI18n()

    this.data = []
    this.sortable = null

    addClass(this.classes.SOTRE, this.element)

    const $wrapper = parseHTML(`<div class="${this.classes.NAMESPACE}"></div>`)

    wrap($wrapper, this.element)

    this.$wrapper = parent(this.element)

    this.$list = parseHTML(
      template.compile(this.options.templates.container())({
        classes: this.classes
      })
    )
    insertAfter(this.$list, this.element)

    this.actions = this.options.actions.map(action => {
      if (!action.init) {
        return {
          ...action,
          init(instance, $action, contentTitle, cancelTitle, deleteTitle) {
            return new PopDialog($action, {
              placement: 'bottom',
              content: contentTitle,
              buttons: {
                cancel: { label: cancelTitle },
                delete: {
                  label: deleteTitle,
                  color: 'danger',
                  fn(resolve) {
                    if (hasClass(instance.classes.ITEM, $action)) {
                      $action.remove()
                    } else {
                      parentWith(
                        hasClass(instance.classes.ITEM),
                        $action
                      ).remove()
                    }
                    resolve()
                  }
                }
              },
              template() {
                return (
                  '<div class="{classes.POPOVER} {classes.POPDIALOG} pj-list-pop" role="tooltip">' +
                  '{close}' +
                  '{title}' +
                  '{content}' +
                  '{buttons}' +
                  '</div>'
                )
              }
            })
          }
        }
      }
      return action
    })

    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrapper)
    }

    this.initData()
    // if(this.$element.val()){
    // }else{
    //   this.initList();
    //   this.$element.val(this.val());
    // }

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initList() {
    this.data.forEach(item => {
      const $item = this.buildItem(item)

      $item.append(this.buildActions())
      this.$list.append($item)
    })
    this.sortable = Sortable.create(this.$list, {
      animation: 150,
      handle: `.${this.classes.HANDLE}`,
      onUpdate: evt => {
        this.sort(evt.oldIndex, evt.newIndex)
      }
    })

    /* fixed when drag complete, Firefox broswer will open a new Tab and searching problem. */
    document.body.ondrop = e => {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  initData() {
    const val = this.element.value
    if (val) {
      this.val(val)
    } else {
      this.set(this.options.data)
    }
  }

  getItems() {
    return queryAll(`.${this.classes.ITEM}`, this.$wrapper)
  }

  buildActions() {
    const $actions = parseHTML(
      template.compile(this.options.templates.actions())({
        classes: this.classes
      })
    )

    this.actions.forEach(v => {
      let $action = null
      if (!Object.hasOwnProperty.call(v, 'attrs')) {
        v.attrs = ''
      }
      if (v.tagName === 'input') {
        $action = parseHTML(`<${v.tagName} class='${v.trigger}' ${v.attrs}/>`)
      } else {
        $action = parseHTML(
          `<${v.tagName} class='${v.trigger}' ${v.attrs}></${v.tagName}>`
        )
      }

      $actions.append($action)
      if (v.init) {
        v.init(
          this,
          $action,
          this.translate('deleteTitle'),
          this.translate('cancel'),
          this.translate('delete')
        )
      }
    })

    return $actions
  }

  bind() {
    if (this.is('empty')) {
      return false
    }

    this.actions.forEach(v => {
      let className = ''
      v.trigger.split(' ').forEach(v => {
        className += `.${v}`
      })

      if (v.callback) {
        bindEvent(
          {
            type: this.eventName(v.event),
            identity: `${className}`,
            handler: ({ target }) => {
              if (this.is('disabled')) {
                return
              }
              const $item = parentWith(hasClass(this.classes.ITEM), target)
              v.callback(
                this,
                $item,
                dataset('index', $item),
                dataset('options', $item)
              )
            }
          },
          this.$list
        )
      }
    })
    bindEvent(
      {
        type: this.eventName('click'),
        identity: `${this.classes.ITEM}`,
        handler: ({ target }) => {
          if (this.is('disabled')) {
            return
          }
          const $item = hasClass(this.classes.ITEM)
            ? target
            : parentWith(hasClass(this.classes.ITEM), target)
          const index = children(parent($item)).indexOf($item)

          this.trigger(EVENTS.CLICKITEM, this.get(index), index)
        }
      },
      this.$list
    )

    return true
  }

  unbind() {
    // unbind
    removeEvent(this.eventName(), this.$list)
  }

  buildItem(item) {
    return parseHTML(
      template.compile(this.options.templates.item())({
        classes: this.classes,
        label: this.getLabel(item)
      })
    )
  }

  getLabel(item) {
    return this.options.label(item)
  }

  remove(index) {
    this.data.splice(index, 1)
    this.getItems()[index].remove()

    this.element.value = this.val()
  }

  sort(startIndex, endIndex = -1) {
    /* sort the list and reset index */
    const startItem = this.data[startIndex]
    if (endIndex > -1) {
      if (startIndex > endIndex) {
        this.data.splice(endIndex, 0, startItem)
        this.data.splice(startIndex + 1, 1)
      } else {
        this.data.splice(endIndex + 1, 0, startItem)
        this.data.splice(startIndex, 1)
      }
    } else {
      endIndex = this.data.length - 1
    }

    // [startIndex, endIndex] = [startIndex, endIndex].sort();
    this.element.value = this.val()
  }

  insert(item) {
    if (is.string(item)) {
      this.enter('simple')
    }

    const index = !is.undefined(item.index) && item.index >= 0 ? item.index : -1
    const $items = this.getItems()
    const $item = this.buildItem(item)

    $item.append(this.buildActions())
    delete item.index

    if (index < 0 || index >= this.data.length) {
      if (!this.data) {
        this.data = []
      }
      this.$list.append($item)
      if (this.is('simple')) {
        item = this.getLabel(item)
      }
      this.data.push(item)
    } else {
      insertBefore($item, $items[index])

      if (this.is('simple')) {
        item = this.getLabel(item)
      }

      this.data.push(item)
      this.sort(this.data.length - 1, index)
    }

    addClass(this.classes.CLONEANIMATE, $item)
    setTimeout(() => {
      removeClass(this.classes.CLONEANIMATE, $item)
    }, 1000)

    this.element.value = this.val()

    this.trigger(EVENTS.ADD)
  }

  set(data) {
    this.clear()

    this.data = data
    this.leave('simple')

    if (!this.data || this.data.length < 1) {
      this.enter('empty')
      return false
    }
    this.data.forEach(item => {
      if (is.string(item)) {
        this.enter('simple')
      }
    })

    if (this.is('simple')) {
      const data = []
      this.data.forEach(item => {
        data.push(this.getLabel(item))
      })

      this.data = data
    }

    this.initList()
    this.element.value = this.val()
    return null
  }

  get(index) {
    if (index >= 0) {
      if (index < this.data.length) {
        return this.data[index]
      }
    } else {
      return this.data
    }
    return null
  }

  val(data) {
    if (is.undefined(data)) {
      return this.options.process.call(this, this.get())
    }

    if (is.string(data)) {
      data = this.options.parse.call(this, data)
      this.set(data)
    }

    return true
  }

  edit(index, data) {
    const detail = this.data[index]

    if (!is.undefined(detail)) {
      const $item = this.$list.children()[index]
      this.data[index] = deepMerge(detail, data)

      query(`.${this.classes.LABEL}`, $item).textContent(this.data[index].title)
      this.trigger(EVENTS.EDITED)
    }
  }

  enable() {
    if (this.is('disabled')) {
      if (this.sortable) {
        this.sortable.option('disabled', false)
      }

      queryAll(`.${this.classes.ACTIONS} i`, this.$list).forEach(v => {
        const api = getObjData('popDialog', v)
        if (api) {
          api.enable()
        }
      })

      removeClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      if (this.sortable) {
        this.sortable.option('disabled', true)
      }

      queryAll(`.${this.classes.ACTIONS} i`, this.$list).forEach(v => {
        const api = getObjData('popDialog', v)
        if (api) {
          api.disable()
        }
      })

      addClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  init() {
    this.initStates()
    this.initialize()
  }

  clear() {
    if (this.sortable) {
      this.sortable.destroy()
      this.sortable = null
    }

    this.element.value = ''
    children(this.$list).map(el => el.remove())
    this.data = []

    this.trigger(EVENTS.CLEAR)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrapper)
      }
      unwrap(this.element)
      removeClass(this.classes.SOTRE, this.element)
      this.$list.remove()

      this.clear()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default List
