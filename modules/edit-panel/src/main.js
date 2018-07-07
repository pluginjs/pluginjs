import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  append,
  wrap,
  query,
  unwrap,
  insertBefore,
  parent,
  parseHTML
} from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import Modal from '@pluginjs/modal'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  }
)
class EditPanel extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    // this.element.wrap(`<div class='${this.classes.WRAP}'></div>`);
    addClass(this.classes.NAMESPACE, this.element)

    this.MODAL = null
    this.disableSelector = false

    // this.contentHeader = `<div class='${this.classes.SELECTORCONTENTTITLE}'>${this.options.selector.contentTitle}</div>`
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.enter('first')

    this.build()
    this.bind()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }
  build() {
    // this.buildData();
    // this.$wrap = this.element.parent();
    this.buildWrap()
    this.buildInit()
    this.buildInfo()
    this.buildPanel()
    if (this.options.hasSelector) {
      this.buildSelector()
    }

    this.registerComponent()
  }

  buildWrap() {
    const $wrap = this.createElement(this.options.templates.wrap(), {
      class: this.classes.WRAP
    })
    wrap($wrap, this.element)
    this.$wrap = parent(this.element)
  }
  // buildData() {
  //   this.$data = this.createElement(this.options.templates.data(), {
  //     class: this.classes.DATA
  //   });

  //   this.$wrap.prepend(this.$data);
  // }

  buildInit() {
    const icon = this.options.init.icon
    const text = this.options.init.text
    this.$init = this.createElement(this.options.templates.init(), {
      class: this.classes.INIT,
      icon,
      text
    })

    append(this.$init, this.$wrap)
  }

  buildInfo() {
    this.$info = this.createElement(this.options.templates.info(), {
      class: this.classes.INFO,
      content: this.classes.INFOCONTENT
    })

    const $action = this.createElement(this.options.templates.infoAction(), {
      class: this.classes.ACTION
    })
    append(append($action, this.$info), this.$wrap)
  }

  buildPanel() {
    // const btns = [];

    this.$panel = this.createElement(this.options.templates.panel(), {
      class: this.classes.PANEL,
      preview: this.classes.PREVIEW
    })
    const $content = this.createElement(
      this.options.templates.previewContent(),
      { class: this.classes.PREVIEWCONTENT }
    )
    const $action = this.createElement(this.options.templates.panelAction(), {
      class: this.classes.ACTION
    })

    for (const key in this.options.action.panel) {
      if ({}.hasOwnProperty.call(this.options.action.panel, key)) {
        const panel = this.options.action.panel
        let $btn
        if (key === 'cancel') {
          $btn = parseHTML(
            `<button type='button' class='${
              this.classes.CANCEL
            } pj-btn pj-btn-transparent ${panel[key].class}'>${
              panel[key].title
            }</button>`
          )
          append($btn, $action)
        } else if (key === 'save') {
          $btn = parseHTML(
            `<button type='button' class='${
              this.classes.SAVE
            } pj-btn pj-btn-primary ${panel[key].class}'>${
              panel[key].title
            }</button>`
          )
          append($btn, $action)
        } else {
          $btn = parseHTML(
            `<button type='button' class='${panel[key].class}'>${
              panel[key].title
            }</button>`
          )
          append($btn, $action)
        }
      }
    }
    const preview = query(`.${this.classes.PREVIEW}`, this.$panel)
    append($action, this.$panel)
    if (Array.isArray($content)) {
      $content.forEach(el => append(el, preview))
    } else {
      append($content, preview)
    }
    append(this.$panel, this.$wrap)
  }

  buildSelector() {
    const that = this
    const title = this.options.selector.title

    const $list = this.createElement(this.options.templates.selectorList(), {
      class: this.classes.SELECTORLIST
    })

    this.modalOptions = {
      fixed: true,
      title,
      content: `${$list.outerHTML}`,
      // overlay: false,
      buttons: {
        cancel: {
          title: this.options.action.selector.cancel.title,
          class: `${this.classes.CANCEL} ${
            this.options.action.selector.cancel.class
          } pj-btn pj-btn-transparent`,
          close: true,
          fn() {
            // console.info('click cancel');
          }
        },
        active: {
          title: this.options.action.selector.save.title,
          class: `${this.classes.SAVE} ${
            this.options.action.selector.save.class
          } pj-btn pj-btn-primary`,
          close: true,
          fn() {
            // console.info('editor panel change');
            that.trigger(EVENTS.CHANGE)
          }
        }
      },
      template() {
        return `<div class="{classes.NAMESPACE} ${
          that.classes.SELECTORWRAP
        } {classes.ACTIVE}">
          {overlay}
          <div class="{classes.CONTAINER} ${
            that.classes.SELECTOR
          } " role="document">
          {close}
          {title}
          {content}
          {buttons}
          </div>
          </div>`
      },
      templates: {
        title() {
          return `<div class="{classes.TITLE} ${
            that.classes.SELECTORTITLE
          }"></div>`
        },
        content() {
          return `<div class="{classes.CONTENT} ${
            that.classes.SELECTORCONTENT
          }"></div>`
        },
        buttons() {
          return `<div class="{classes.BUTTONS} ${that.classes.ACTION}"></div>`
        }
      }
    }
    this.MODAL = Modal.init(this.modalOptions)
  }

  registerComponent() {
    this.components = this.options.components
    this.components.forEach(v => {
      const title = v.title
      const $el = v.element
      const $wrap = this.createElement(this.options.templates.component(), {
        class: this.classes.COMPONENT,
        titleClass: this.classes.COMPONENTTITLE,
        title,
        contentClass: this.classes.COMPONENTCONTENT
      })
      append($el, query(`.${this.classes.COMPONENTCONTENT}`, $wrap))
            insertBefore($wrap, query(`.${this.classes.ACTION}`, this.$panel))

      const pluginStore = window.Pj.plugins
      if (v.type && v.type.length > 0) {
        if (!pluginStore[v.type]) {
          throw new Error(`${v.type} plugin must be required!`)
        }
        const options = v.options
        if ($wrap.contains($el)) {
          pluginStore[v.type].of($el, options)
        }
      }
    })
  }
  bind() {
    // panel events
    compose(
      bindEvent({
        type: this.eventName('click'),
        identity: { type: 'selector', value: `.${this.classes.INIT}` },
        handler: () => {
          if (this.is('disabled')) {
            return
          }

          this.openPanel()
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.PANEL} .${this.classes.CANCEL}`
        },
        handler: () => {
          this.closePanel()
          // this.closeSelector()
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.PANEL} .${this.classes.SAVE}`
        },
        handler: e => {
          e.preventDefault()
          e.stopPropagation()

          this.trigger(EVENTS.UPDATE)
        }
      })
    )(this.$wrap)

    // selector events
    if (this.options.hasSelector) {
      bindEvent(
        {
          type: this.eventName('click'),
          identity: { type: 'selector', value: `.${this.classes.PREVIEW}` },
          handler: () => {
            this.openSelector()
          }
        },
        this.$wrap
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
  }

  openPanel() {
    if (!this.is('panelOpen')) {
      addClass(this.classes.SHOW, this.$wrap)
      this.enter('panelOpen')
    }

    this.trigger(EVENTS.OPENPANEL)
  }

  closePanel() {
    if (this.is('panelOpen')) {
      removeClass(this.classes.SHOW, this.$wrap)
      this.leave('panelOpen')
    }

    this.trigger(EVENTS.CLOSEPANEL)
  }

  openSelector() {
    if (!this.options.hasSelector || this.disableSelector) {
      return false
    }

    this.MODAL.open()

    this.trigger(EVENTS.OPENSELECTOR)

    return null
  }

  closeSelector() {
    if (!this.options.hasSelector) {
      return false
    }

    this.MODAL.close()

    this.trigger(EVENTS.CLOSESELECTOR)

    return null
  }

  disabledSelector() {
    this.disableSelector = true
  }

  enabledSelector() {
    this.disableSelector = false
  }

  createElement(templateData, options) {
    return parseHTML(template.compile(templateData)(options))
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.NAMESPACE, this.element)
      unwrap(this.element)
      this.$init.remove()
      this.$info.remove()
      this.$panel.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default EditPanel
