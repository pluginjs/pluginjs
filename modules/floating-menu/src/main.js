import Component from '@pluginjs/component'
import {
  query,
  children,
  insertBefore,
  appendTo,
  parseHTML
} from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import templateEngine from '@pluginjs/template'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
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
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class FloatingMenu extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.toggles = {}
    this.panels = {}
    this.activeId = null
    this.$activeToggle = null
    this.$activePanel = null
    this.initialize()
  }

  initialize() {
    if (this.options.type === 'data') {
      this.datas = this.options.data
      if (!this.datas) {
        this.enter('exit')
      }
      this.initDatas()
    } else {
      this.initElements()
    }

    if (this.is('exit')) {
      return
    }

    this.initMask()
    this.initId()
    this.leave('active')
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initDatas() {
    this.$wrapElement = this.element
    this.element = this.createElement('element', {
      classes: this.classes
    })
    this.$nav = query(`.${this.classes.NAV}`, this.element)
    this.$content = query(`.${this.classes.CONTENT}`, this.element)

    this.renderToggle()
    this.renderPanel()

    appendTo(this.element, this.$wrapElement)
  }

  renderToggle() {
    this.datas.toggle.forEach(toggle => {
      let iconTemplate = ''
      if (toggle.icon) {
        iconTemplate = this.renderElement('icon', {
          toggle
        })
      }
      const $toggle = this.createElement('toggle', {
        classes: this.classes,
        toggle,
        icon: iconTemplate
      })
      if (toggle.external) {
        $toggle.setAttribute('target', '_blank')
      }
      if (toggle.id) {
        $toggle.dataset.id = toggle.id
      }

      appendTo($toggle, this.$nav)
    })

    this.$toggles = children(this.$nav)
  }

  renderPanel() {
    if (!this.datas.panel) {
      this.$panels = null
      return
    }

    this.datas.panel.forEach(panel => {
      const $panel = this.createElement('panel', {
        classes: this.classes,
        panel
      })

      appendTo($panel, this.$content)
    })

    this.$panels = children(this.$content)
  }

  initElements() {
    this.$nav = children(this.element)[0]
    this.$content = this.$nav.nextElementSibling
    this.$toggles = children(this.$nav)
    this.$panels = this.$content ? children(this.$content) : null

    addClass(this.classes.NAMESPACE, this.element)
    addClass(this.classes.NAV, this.$nav)
    addClass(this.classes.CONTENT, this.$content)
    this.$toggles.forEach($toggle => {
      addClass(this.classes.TOGGLE, $toggle)
    })
    if (this.$panels) {
      this.$panels.forEach($panel => {
        addClass(this.classes.PANEL, $panel)
      })
    }
  }

  initMask() {
    this.$mask = insertBefore(
      this.createElement('mask', {
        classes: this.classes
      }),
      this.element
    )
  }

  initId() {
    this.$toggles.forEach($toggle => {
      const $id = $toggle.dataset.id
      if ($id) {
        this.toggles[$id] = $toggle
      }
    })

    if (this.$panels) {
      this.$panels.forEach($panel => {
        const $id = $panel.dataset.id
        if ($id) {
          this.panels[$id] = $panel
        }
      })
    }
  }

  bind() {
    this.$toggles.forEach($toggle => {
      if ($toggle.dataset.id && this.panels[$toggle.dataset.id]) {
        bindEvent(
          this.eventName('click'),
          () => {
            this.toggle($toggle.dataset.id)
          },
          $toggle
        )
      }
    })

    bindEvent(
      this.eventName('click'),
      () => {
        this.close()
      },
      this.$mask
    )
  }

  toggle($id) {
    if (!this.is('active')) {
      if (this.$activePanel && $id !== this.activeId) {
        removeClass(this.classes.ACTIVE, this.$activePanel)
        removeClass(this.classes.ACTIVE, this.$activeToggle)
      }

      this.updateActive($id)
      this.open()
    } else if ($id === this.activeId) {
      this.close()
    } else {
      removeClass(this.classes.ACTIVE, this.$activePanel)
      removeClass(this.classes.ACTIVE, this.$activeToggle)
      this.updateActive($id)
    }
  }

  open() {
    addClass(this.classes.LOCK, document.body)
    addClass(this.classes.ACTIVE, this.$mask)
    addClass(this.classes.ACTIVE, this.element)

    this.enter('active')
    this.trigger(EVENTS.OPEN)
  }

  close() {
    removeClass(this.classes.LOCK, document.body)
    removeClass(this.classes.ACTIVE, this.$mask)
    removeClass(this.classes.ACTIVE, this.$activeToggle)
    removeClass(this.classes.ACTIVE, this.element)
    this.leave('active')
    this.trigger(EVENTS.CLOSE)
  }

  updateActive($id) {
    this.activeId = $id
    this.$activePanel = this.panels[this.activeId]
    this.$activeToggle = this.toggles[this.activeId]
    addClass(this.classes.ACTIVE, this.$activePanel)
    addClass(this.classes.ACTIVE, this.$activeToggle)
  }

  unbind() {
    removeEvent(this.eventName(), this.$toggle)
    removeEvent(this.eventName(), this.$mask)
  }

  renderElement(name, options) {
    return templateEngine.compile(this.options.templates[name]())(options)
  }

  createElement(name, options) {
    return parseHTML(this.renderElement(name, options))
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

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default FloatingMenu
