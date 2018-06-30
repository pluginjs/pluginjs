import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import {
  parseHTML,
  wrap,
  unwrap,
  children,
  parent,
  query,
  queryAll,
  insertBefore,
  insertAfter,
  append,
  closest
} from '@pluginjs/dom'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { showElement, hideElement } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import Keyboard from './keyboard'
import Dropdown from '@pluginjs/dropdown'
import Scrollable from '@pluginjs/scrollable'

let DATA = null

@translateable(TRANSLATIONS)
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
  },
  INFO
)
class SvgPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)
    this.setupI18n()

    this.$svgPicker = addClass(
      this.classes.ELEMENT,
      parseHTML(
        template.compile(this.options.templates.trigger())({
          trigger: this.classes.ELEMENT
        })
      )
    )
    insertAfter(this.$svgPicker, this.element)
    wrap(`<div class="${this.classes.WRAP}"></div>`, this.$svgPicker)

    hideElement(this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$svgPicker)
    }

    this.data = DATA
    this.$dropdown = this.initDropdown()
    this.$panel = this.$dropdown.panel

    this.icon = null
    this.$icons = null
    this.$types = null

    this.$typeWrap = null
    this.icons = null

    this.initStates()
    this.initialize()
  }

  initialize() {
    if (!this.data || !this.data.length) {
      this.$empty = query(`.${this.classes.EMPTY}`, this.$panel)
    } else {
      this.add(this.data)
    }

    this.initManage()

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }

    append(
      `<span>${this.options.placehoder}</span>`,
      query('.pj-dropdown-label', this.$svgPicker)
    )

    if (this.element.value.trim() !== '' && this.data && this.data.length) {
      this.val(this.element.value)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    if (this.is('disabled')) {
      return
    }
    const that = this

    this.$dropdown.options.onClick = () => {
      return
    }

    this.$dropdown.options.onHide = () => {
      removeClass(this.classes.SEARCHOWNDATA, this.$search)
      query('input', this.$search).value = ''
      this.searching('')
    }

    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.TYPETITLE}`,
        handler: event => {
          const $type = parent(
            closest(`.${this.classes.TYPETITLE}`, event.target)
          )

          that.open($type)
          if ($type.dataset.open && $type.dataset.open === 'true') {
            // that.close($type)
          }
        }
      },
      this.$panel
    )

    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.ICON}`,
        handler: event => {
          const $this = closest(`.${this.classes.ICON}`, event.target)

          that.select($this)
          that.$dropdown.hide()
        }
      },
      this.$panel
    )

    bindEvent(
      {
        type: this.eventName('input'),
        identity: 'input',
        handler: ({ target: $this }) => {
          if (!that.is('searching')) {
            // that.$types.each(function () {
            //   that.open($(this))
            // })
            addClass(that.classes.SEARCHING, that.$panel)
          }
          that.enter('searching')

          const val = $this.value
          if (val.length === 0) {
            removeClass(that.classes.SEARCHOWNDATA, that.$search)
          } else {
            addClass(that.classes.SEARCHOWNDATA, that.$search)
          }
          that.searching(val)
        }
      },
      this.$search
    )

    bindEvent(
      {
        type: 'blur',
        identity: 'input',
        handler: () => {
          this.leave('searching')
        }
      },
      this.$search
    )

    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.SEARCHCLOSE}`,
        handler: () => {
          removeClass(this.classes.SEARCHOWNDATA, this.$search)
          query('input', this.$search).value = ''
          this.searching('')
        }
      },
      this.$search
    )

    if (this.options.keyboard) {
      this.$svgPicker.setAttribute('tabindex', 1)
      bindEvent(
        {
          type: 'focus',
          handler: () => {
            bindEvent(
              {
                type: 'keydown',
                handler: e => {
                  if (e.keyCode === 13) {
                    this.$dropdown.show()
                  }
                }
              },
              this.$svgPicker
            )
          }
        },
        this.$svgPicker
      )
      bindEvent(
        {
          type: 'blur',
          handler: () => {
            removeEvent('keydown', this.$svgPicker)
          }
        },
        this.$svgPicker
      )

      query('input', this.$search).setAttribute('tabindex', 1)
      this.$manage.setAttribute('tabindex', 1)
      this.$types.setAttribute('tabindex', 1)
      bindEvent(
        {
          type: 'focus',
          handler: ({ target: $this }) => {
            $this.one('keydown', e => {
              if (e.keyCode === 13 && e.which === 13) {
                that.KEYBOARD.init($this)
                that.open($this)
              }
            })
            $this.on('blur', () => {
              if (that.is('keyboard')) {
                that.KEYBOARD.unbind()
                that.close($this)
              }
              if (that.is('searching')) {
                return
              }
            })
          }
        },
        this.$types
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$element)
    removeEvent(this.eventName(), this.$svgPicker)
  }

  initDropdown() {
    const that = this

    const empty = template.compile(this.options.templates.empty())({
      add: this.classes.ADD,
      emptyText: this.translate('emptyText'),
      emptyHrefText: this.translate('emptyHrefText')
    })

    const data = [{ label: 'empty' }]

    function item() {
      return `<div class="{that.classes.ITEM} ${
        that.classes.EMPTY
      }" data-{that.options.itemValueAttr}="{item.label}">${empty}</div>`
    }
    return Dropdown.of(this.$svgPicker, {
      data,
      hideOnSelect: false,
      width: 260,
      select: data[0].label,
      templates: {
        panel() {
          return `<div class=${that.classes.PANEL}></div>`
        },
        item
      }
    })
  }

  initManage() {
    this.$manage = parseHTML(
      template.compile(this.options.templates.manage())({
        manage: this.classes.MANAGE,
        icon: this.classes.MANAGEICON,
        manageText: this.translate('manage')
      })
    )
    this.$panel.append(this.$manage)
  }

  handleIcons(type) {
    let icons = ''
    this.data.forEach(v => {
      if (v.type === type) {
        const icon = template.compile(this.options.templates.icon())({
          icon: this.classes.ICON,
          iconId: v.id,
          iconSvg: v.svg
        })

        icons += icon
      }
    })

    return icons
  }
  handleTypes() {
    let types = ''
    const typeArr = []

    this.data.forEach(v => {
      if (typeArr.indexOf(v.type) < 0) {
        typeArr.push(v.type)
        const icons = this.handleIcons(v.type)
        const type = template.compile(this.options.templates.type())({
          type: this.classes.TYPE,
          typeTitle: this.classes.TYPETITLE,
          iconWrap: this.classes.ICONWRAP,
          typeName: v.type,
          tip: this.classes.TYPETIP,
          icons
        })
        types += type
      }
    })

    this.$dropdown.update(types)
    this.$typeWrap = parseHTML(`<div class=${this.classes.TYPEWRAP}></div>`)
    this.$types = queryAll(`.${this.classes.TYPE}`, this.$panel)
    insertBefore(this.$typeWrap, this.$types[0])
    this.$typeWrap.append(...this.$types)
    this.$types.forEach(el => {
      el.dataset.count = 0
    })
    queryAll(`.${this.classes.ICONWRAP}`, this.$panel).map(el =>
      Scrollable.of(el)
    )
  }

  add(data = this.data) {
    this.data = data

    this.handleTypes()
    this.$icons = queryAll(`.${this.classes.ICON}`, this.$panel)

    // if (!this.$manage) {
    this.initManage()
    // } else {
    // this.$panel.append(this.$manage)
    // }

    this.handleSearch()

    this.formatData()
    this.bind()
  }
  formatData() {
    this.icons = {}
    this.data.forEach(v => {
      if (!is.array(this.icons[v.type])) {
        this.icons[v.type] = []
      }

      this.icons[v.type].push(v.id)
    })

    // console.log(this.icons);
  }

  handleSearch() {
    this.$search = parseHTML(
      template.compile(this.options.templates.search())({
        search: this.classes.SEARCH,
        close: this.classes.SEARCHCLOSE,
        placeholder: this.translate('searchText')
      })
    )
    insertBefore(this.$search, children(this.$panel)[0])
  }

  searching(val) {
    const searchedIcons = []

    this.$icons.forEach(v => {
      const $this = v
      const value = $this.dataset.value

      if (value.indexOf(val) >= 0) {
        addClass(this.classes.SEARCHED, $this)

        searchedIcons.push(value)
      } else if (hasClass(this.classes.SEARCHED, $this)) {
        removeClass(this.classes.SEARCHED, $this)
      }
    })

    if (val.length === 0) {
      this.$types.forEach(v => {
        showElement(v)
        query(`.${this.classes.TYPETIP}`, v).innerHTML = ''
      })
      return false
    }
    this.$types.forEach($this => {
      $this.dataset.count = 0
    })

    const localeFounded = this.translate('founded')
    this.$types.forEach(v => {
      const $this = v
      const $thisTip = query(`.${this.classes.TYPETIP}`, $this)
      const name = $this.dataset.value

      Object.entries(this.icons).forEach(([i, v]) => {
        if (i === name) {
          let count = 0
          v.forEach(value => {
            if (value.indexOf(val) > -1) {
              count++

              $this.dataset.count = count
            }
          })
          $thisTip.innerHTML = `(${$this.dataset.count} ${localeFounded})`
        }
      })

      if (!$this.dataset.count) {
        hideElement($this)
      } else {
        showElement($this)
      }
    })
    return undefined
  }

  open(el) {
    console.log(el)
    this.$types.forEach(v => {
      const $this = v
      removeClass(this.classes.TYPEOPEN, $this)
      $this.dataset.open = false
    })
    addClass(this.classes.TYPEOPEN, el)
    el.dataset.open = true
    const scrollableApi = window.Pj.instances.scrollable.find(
      plugin => plugin.element === query(`.${this.classes.ICONWRAP}`, el)
    )
    scrollableApi.update()
  }
  close(el) {
    removeClass(this.classes.TYPEOPEN, el)
    el.dataset.open = false
  }

  get() {
    return this.$icon ? this.getIconInfo(this.$icon.dataset.value) : null
  }

  select(item) {
    // if (!this.$icon) {
    //   this.$svgPicker.find('.pj-dropdown-label').append('<span></span>')
    // }
    this.$icon = item
    this.$icons.map(removeClass(this.classes.ACTIVE))

    const info = this.get()
    const { type, id } = info
    // const id = this.$icon.data('value');
    const value = this.getIconInfo(id).svg
    const $selected = query('.pj-dropdown-label span', this.$svgPicker)

    addClass(this.classes.ACTIVE, this.$icon)
    this.element.setAttribute(
      'value',
      this.options.process({
        type,
        id
      })
    )
    $selected.innerHTML = `${value} ${id}`

    this.trigger(EVENTS.CHANGE, this.$icon)
  }

  getItem(value) {
    let $item
    this.$icons.forEach($this => {
      if ($this.dataset.value === value) {
        $item = $this
      }
    })
    return $item
  }

  set(data) {
    if (!is.object(data)) {
      return
    }
    this.select(this.getItem(data.id))
  }

  val(value) {
    if (is.undefined(value)) {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value))
    return undefined
  }

  getIconInfo(id) {
    return this.data.find(v => v.id === id)
  }
  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$svgPicker)
      this.element.disabled = false
      this.$dropdown.enable()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$svgPicker)
      this.element.disabled = true
      this.$dropdown.disable()
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.ELEMENT, this.$svgPicker)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$svgPicker)
      }
      this.$dropdown.destroy()
      // this.$panel.remove()
      unwrap(this.$svgPicker)
      this.$svgPicker.remove()
      showElement(this.element)

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static setData(data) {
    DATA = data
  }
}

export default SvgPicker
