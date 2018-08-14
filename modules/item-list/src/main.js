import templateEngine from '@pluginjs/template'
import { deepMerge, compose } from '@pluginjs/utils'
import { parent, parseHTML, parentWith, children, data } from '@pluginjs/dom'
import { removeClass, addClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import PopDialog from '@pluginjs/pop-dialog'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import List from '@pluginjs/list'

const optionsExtendList = deepMerge(List.defaults, DEFAULTS)
const defaultActions = [
  {
    tagName: 'i',
    trigger: 'icon-clone pj-itemList-item-clone',
    event: 'click',
    init: null
  },
  {
    tagName: 'i',
    trigger: 'icon-close pj-list-close',
    event: 'click',
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
                parentWith(hasClass(instance.classes.ITEM), $action)
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
]

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  defaults: optionsExtendList,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class ItemList extends List {
  constructor(element, options = {}) {
    const defaultOptions = deepMerge(optionsExtendList, options)
    super(element, defaultOptions)
    this.plugin = NAMESPACE
    this.options = deepMerge(
      defaultOptions,
      { actions: defaultActions },
      this.getDataOptions()
    )
    this.$wrapper = parent(this.element)

    this.initClasses(this.classes)
    this.setupI18n()

    this.init()
  }

  init() {
    this.initAddBtn()
    this.listener()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrapper)
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  initAddBtn() {
    this.$add = parseHTML(
      templateEngine.compile(this.options.templates.add())({
        // classes: this.classes
      })
    )

    this.$wrapper.append(this.$add)
  }

  listener() {
    compose(
      bindEvent(
        this.eventName('click'),
        `.${this.classes.CLONE}`,
        ({ target }) => {
          if (this.is('disabled')) {
            return
          }
          const $item = parentWith(hasClass(this.classes.ITEM), target)
          const index = children(parent($item)).indexOf($item)

          this.clone(index)
        }
      ),
      bindEvent(this.eventName('click'), '.pj-itemList-add', () => {
        if (this.is('disabled')) {
          return
        }
        this.trigger(EVENTS.CLICKADDBTN)
      })
    )(this.$wrapper)
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrapper)
  }

  clone(index) {
    let data

    if (typeof this.data[index] === 'string') {
      data = {
        title: this.data[index],
        index: index++
      }
    } else {
      data = deepMerge(this.data[index], { index: index + 1 })
    }

    this.insert(data)
    this.trigger(EVENTS.CLONE, data, index)
  }

  removeListener() {
    removeEvent(this.eventName(), this.$add)
  }

  destroy() {
    if (this.is('initialized')) {
      this.$add.remove()
      this.unbind()
      data({ itemList: null }, this.element)
    }

    super.destroy()
    this.trigger(EVENTS.DESTROY)
  }
}

export default ItemList
