import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import {
  query,
  parent,
  parseHTML,
  getObjData,
  children,
  insertBefore,
  insertAfter,
  wrap,
  attr,
  append,
  closest,
  unwrap,
  setObjData,
  queryAll,
  prev,
  next
} from '@pluginjs/dom'
import { setStyle, hideElement, showElement } from '@pluginjs/styled'
import Dropdown from '@pluginjs/dropdown'
import Scrollable from '@pluginjs/scrollable'
import Tooltip from '@pluginjs/tooltip'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import Keyboard from './keyboard'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

let DATA = null

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class IconsPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)
    this.setupI18n()

    this.data = DATA
    this.$icon = null

    this.initStates()
    this.initialize()
  }

  initEmpty() {
    const that = this
    const data = [{ label: 'empty' }]

    this.$empty = parseHTML(
      template.compile(this.options.templates.empty())({
        classes: this.classes,
        title: this.translate('emptyTitle'),
        linkTitle: this.translate('emptyLinkTitle')
      })
    )

    this.$dropdown = Dropdown.of(this.$iconTrigger, {
      data,
      hideOnSelect: false,
      width: 260,
      // select: data[0].label,
      templates: {
        panel() {
          return `<div class=${that.classes.PANEL}></div>`
        }
      }
    })
    children(this.$dropdown.$panel).map(el => el.remove())
    // console.log(children(this.$dropdown.panel).map(el => el.remove()))
    this.$dropdown.$panel.append(this.$empty)
  }

  initialize() {
    this.$iconPicker = addClass(
      this.classes.ELEMENT,
      parseHTML(
        template.compile(this.options.templates.trigger())({
          trigger: this.classes.ELEMENT
        })
      )
    )
    this.$iconTrigger = query('.pj-dropdown-trigger', this.$iconPicker)
    insertAfter(this.$iconPicker, this.element)
    wrap(`<div class="${this.classes.WRAP}"></div>`, this.$iconPicker)

    setStyle({ display: 'none' }, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$iconPicker)
    }

    if (!this.data || is.emptyObject(this.data)) {
      this.initEmpty()
    } else {
      this.$dropdown = this.initDropdown()
      this.$panel = this.$dropdown.$panel
      this.$packages = children(this.$panel).filter(el =>
        el.matches(`.${this.classes.PACKAGE}`)
      )
      this.packages = this.compilePackages()
      this.$icons = this.compileIcons(this.packages)
      const packagesWrap = parseHTML(
        `<div class=${this.classes.PACKAGESWRAP}></div>`
      )
      this.$packages.forEach(append(packagesWrap))
      append(packagesWrap, this.$panel)
      this.initCategories()
      this.fillIcons()
      this.initController()
      this.initScrollable()
      append(
        parseHTML(`<span>${this.options.placehoder}</span>`),
        query('.pj-dropdown-trigger', this.$iconPicker)
      )

      if (this.options.manage) {
        const text = this.translate('manage')
        this.$controller.append(
          parseHTML(
            `<div class=${
              this.classes.MANAGE
            }><i class='icon-cog'></i>${text}</div>`
          )
        )
      }

      this.handleSearch()

      if (this.options.keyboard) {
        this.KEYBOARD = new Keyboard(this)
      }

      this.$selectorList = queryAll(
        `.${this.classes.PACKAGEBODY} ul`,
        this.panel
      )
      this.$scrollable = this.$selectorList.map(el =>
        window.Pj.instances.scrollable.find(
          plugin =>
            plugin.element === closest(`.${this.classes.PACKAGEBODY}`, el)
        )
      )

      // init by element value
      this.initData()
      this.bind()
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    const inputVal = this.element.value.trim()
    if (inputVal !== '') {
      this.val(inputVal)
    }
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
      // hideElement(this.$selectorPanel.element)
      removeClass(this.classes.SEARCHOWNDATA, this.$search)
      query('input', this.$panel).value = ''
      this.searching('')
    }

    this.$selectorPanel.options.onChange = val => {
      this.togglePackage(val.dataset.value)
    }

    if (this.options.keyboard) {
      const addTabindexToAttr = attr({
        tabindex: 1
      })
      compose(
        bindEvent({
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
              this.$iconPicker
            )
          }
        }),
        bindEvent({
          type: 'blur',
          handler: () => {
            removeEvent('keydown', this.$iconPicker)
          }
        })
      )(addTabindexToAttr(this.$iconPicker))
      addTabindexToAttr(query('input', this.$search))
      children(this.$controller).map(addTabindexToAttr)
      this.$packages.map(
        compose(
          bindEvent({
            type: 'focus',
            handler: ({ target: $this }) =>
              compose(
                bindEvent({
                  type: 'keydown',
                  handler: e => {
                    if (e.keyCode === 13 && e.which === 13) {
                      that.KEYBOARD.init($this)
                      that.open($this)
                    }
                    removeEvent('focus', $this)
                  }
                }),
                bindEvent({
                  type: 'blur',
                  handler: () => {
                    if (that.is('keyboard')) {
                      that.KEYBOARD.unbind()
                      that.close($this)
                    }
                    if (that.is('searching')) {
                      return
                    }
                  }
                })
              )($this)
          }),
          addTabindexToAttr
        )
      )
      compose(
        bindEvent({
          type: 'focus',
          handler: ({ target }) =>
            bindEvent(
              {
                type: 'keydown',
                handler: e => {
                  if (e.keyCode === 13 && e.which === 13) {
                    // console.log('manage enter');
                  }
                }
              },
              target
            )
        }),
        bindEvent({
          type: 'blur',
          handler: ({ target }) => removeEvent('keydown', target)
        })
      )(query(`.${this.classes.MANAGE}`))

      compose(
        bindEvent({
          type: 'focus',
          handler: ({ target }) => {
            let $selectItem = this.$selectorPanel.$items.find(el =>
              el.matches('.pj-dropdown-active')
            )
            bindEvent(
              {
                type: 'keydown',
                handler: e => {
                  if (e.keyCode === 13 && e.which === 13) {
                    if (that.is('selectorPanelOn')) {
                      const val = $selectItem.dataset.value
                      that.$selectorPanel.set(val)
                      that.$selectorPanel.hide()
                      that.leave('selectorPanelOn')
                    } else {
                      that.$selectorPanel.show()
                      that.enter('selectorPanelOn')
                    }
                  }
                  if (
                    e.keyCode === 38 &&
                    e.which === 38 &&
                    prev($selectItem).length
                  ) {
                    $selectItem = compose(
                      addClass('pj-dropdown-active'),
                      prev,
                      removeClass('pj-dropdown-active')
                    )($selectItem)
                  }
                  if (e.keyCode === 40 && e.which === 40 && next($selectItem)) {
                    $selectItem = compose(
                      addClass('pj-dropdown-active'),
                      next,
                      removeClass('pj-dropdown-active')
                    )($selectItem)
                  }

                  if (e.keyCode === 9 && e.which === 9) {
                    return
                  }
                  e.preventDefault()
                }
              },
              target
            )
          }
        }),
        bindEvent({
          type: 'blur',
          handler: ({ target }) => removeEvent('keydown', target)
        })
      )(query(`.${this.classes.SELECTOR}`))
    }

    bindEvent(
      {
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.PACKAGETITLE}`
        },
        handler: ({ target }) => {
          const _package = parent(target)
          if (getObjData('open', _package)) {
            that.close(_package)
          } else {
            that.open(_package)
          }
        }
      },
      this.$panel
    )

    // clear search input
    bindEvent(
      {
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.SEARCHCLOSE}`
        },
        handler: () => {
          removeClass(this.classes.SEARCHOWNDATA, this.$search)
          query('input', this.$panel).value = ''
          this.searching('')
        }
      },
      this.$panel
    )
    this.$packages.map(
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.ICON}`
        },
        handler: ({ target }) => {
          that.select(closest(`.${this.classes.ICON}`, target))
          that.$dropdown.hide()
        }
      })
    )

    bindEvent(
      {
        type: this.eventName('input'),
        identity: {
          type: 'selector',
          value: 'input'
        },
        handler: ({ target }) => {
          if (!this.is('searching')) {
            // this.packages.forEach((v) => {
            //   this.open(v)
            // })
            addClass(this.classes.SEARCHING, this.$panel)
          }
          this.enter('searching')

          const val = target.value
          if (val.length === 0) {
            removeClass(this.classes.SEARCHOWNDATA, this.$search)
          } else {
            addClass(this.classes.SEARCHOWNDATA, this.$search)
          }
          this.searching(val)
        }
      },
      this.$search
    )
    bindEvent(
      {
        type: 'blur',
        handler: () => {
          this.leave('searching')
        }
      },
      query('input', this.$search)
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$iconPicker)
  }

  compilePackages() {
    /*
      package.data();
      {
        name: string,
        title: string,
        count: number,
        prefix: string,
        base: string,
        classifiable: boolean,
        icons: array | object,
        categories: object,
        hasUl: boolean,
        open: boolean,
        show: boolean,
        searchedIconCount: 0
      }
    */
    const data = Object.assign({}, this.data)
    const arr = []

    this.$packages.forEach(v => {
      const $this = v
      const title = $this.dataset.value
      let info = null
      for (const index in data) {
        if (data[index].title === title) {
          info = data[index]
          info.name = index
        }
      }
      setObjData('name', info.name, $this)
      setObjData('title', info.title, $this)
      setObjData('count', info.count, $this)
      setObjData('prefix', info.prefix, $this)
      setObjData('base', info.base, $this)
      setObjData('classifiable', info.classifiable, $this)
      setObjData('icons', info.icons, $this)
      setObjData('$icons', [], $this)
      setObjData('categories', info.categories, $this)
      setObjData('hasUl', false, $this)
      setObjData('open', false, $this)
      setObjData('show', true, $this)
      setObjData('searchedIconCount', 0, $this)
      // this.showPackages.push($this);
      arr.push($this)
    })

    return arr
  }

  compileIcons(packages) {
    const that = this
    const arr = []

    packages.forEach(v => {
      const $package = v
      const icons = getObjData('icons', $package)
      const categories = getObjData('group', $package)
        ? getObjData('categories', $package)
        : null
      const packageName = getObjData('name', $package)

      if (Array.isArray(icons)) {
        icons.forEach(icon => {
          const $icon = that.handleIcon($package, packageName, categories, icon)
          arr.push($icon)
        })
      } else {
        for (const name in icons) {
          if ({}.hasOwnProperty.call(icons, name)) {
            const $icon = that.handleIcon(
              $package,
              packageName,
              categories,
              name,
              icons[name]
            )
            arr.push($icon)
          }
        }
      }
    })
    return arr
  }

  handleIcon(_package, packageName, categories, icon, iconName = null) {
    /*
      icon.data();
      {
        title: string,
        tip: string,
        categories: string,
        package: string,
        prefix: string,
        baseClass: string
      }
    */

    const $icon = parseHTML(
      template.compile(this.options.templates.icon())({
        classes: this.classes,
        font: getObjData('base', _package),
        iconName: `${getObjData('prefix', _package)}${icon}`
      })
    )
    let group = null

    if (categories) {
      for (const name in categories) {
        if (categories[name].indexOf(icon) >= 0) {
          group = name
        }
      }
    }

    getObjData('$icons', _package).push($icon)
    setObjData('package', packageName, $icon)
    setObjData('prefix', getObjData('prefix', _package), $icon)
    setObjData('baseClass', getObjData('base', _package), $icon)
    setObjData('categories', group, $icon)
    setObjData('title', icon, $icon)
    setObjData('tip', iconName ? iconName : icon, $icon)

    return $icon
  }

  initDropdown() {
    const that = this
    const data = []
    for (const i in this.data) {
      if ({}.hasOwnProperty.call(this.data, i)) {
        data.push({ label: this.data[i].title })
      }
    }

    return Dropdown.of(this.$iconTrigger, {
      data,
      hideOnSelect: false,
      width: 260,
      select: data[0].label,
      templates: {
        panel() {
          return `<div class=${that.classes.PANEL}></div>`
        },
        item() {
          return `<div class="{that.classes.ITEM} ${
            that.classes.PACKAGE
          }" data-{that.options.itemValueAttr}="{item.label}"><div class=${
            that.classes.PACKAGETITLE
          }>{item.label} <span class='${
            that.classes.PACKAGETIP
          }'></span> <i class='icon-chevron-down'></i></div><div class='${
            that.classes.PACKAGEBODY
          }'></div></div>`
        }
      }
    })
  }

  initCategories() {
    // let groups = [];
    this.packages.forEach(_package => {
      const group = {}

      if (getObjData('classifiable', _package)) {
        for (const name in getObjData('categories', _package)) {
          if (
            {}.hasOwnProperty.call(getObjData('categories', _package), name)
          ) {
            const $categories = parseHTML(
              template.compile(this.options.templates.categories())({
                categoriesName: name,
                classes: this.classes,
                title: name.toLocaleUpperCase()
              })
            )

            setObjData('title', name, $categories)
            setObjData('hasUl', false, $categories)
            group[name] = $categories
            append($categories, query(`.${this.classes.PACKAGEBODY}`, _package))
          }
        }
        setObjData('group', group, _package)
      }
    })
  }

  initController() {
    const data = []

    this.$controller = parseHTML(
      template.compile(this.options.templates.controller())({
        classes: this.classes
      })
    )

    this.packages.forEach(v => {
      data.push({ label: getObjData('title', v) })
    })
    data.push({ label: this.translate('allIcons') })

    this.$panel.append(this.$controller)
    this.$selector = query(`.${this.classes.SELECTOR}`, this.$controller)
    this.$selectorTrigger = query('.pj-dropdown-trigger', this.$selector)
    this.$selectorPanel = Dropdown.of(this.$selectorTrigger, {
      placement: 'top-center',
      data,
      // keyboard: true,
      imitateSelect: true,
      offset: '8px 0',
      select: data[data.length - 1].label,
      width: this.$selector,
      exclusive: false,
      icon: 'icon-char icon-chevron-down',
      classes: { panel: `${this.classes.SELECTORPANEL} pj-dropdown-panel` }
    })
  }

  initScrollable() {
    queryAll(`.${this.classes.PACKAGEBODY}`, this.$panel).forEach(packageBody =>
      Scrollable.of(packageBody)
    )
  }

  fillIcons() {
    this.$icons.forEach(icon => {
      if (getObjData('categories', icon)) {
        this.packages.forEach(_package => {
          const $categories = getObjData('group', _package)

          Object.entries($categories).forEach(([name, categorie]) => {
            if (getObjData('categories', icon) === name) {
              if (!getObjData('hasUl', categorie)) {
                categorie.append(parseHTML('<ul></ul>'))
                setObjData('hasUl', true, categorie)
              }
              append(icon, query('ul', categorie))
            }
          })
        })
      } else {
        this.packages.forEach(_package => {
          if (getObjData('package', icon) === getObjData('name', _package)) {
            if (!getObjData('hasUl', _package)) {
              append(
                parseHTML('<ul></ul>'),
                query(`.${this.classes.PACKAGEBODY}`, _package)
              )
              setObjData('hasUl', true, _package)
            }
            append(icon, query('ul', _package))
          }
        })
      }

      // handle tooltip
      Tooltip.of(icon, {
        title: getObjData('tip', icon),
        placement: 'right'
      })
    })
  }

  handleSearch() {
    this.$search = parseHTML(
      template.compile(this.options.templates.search())({
        classes: this.classes,
        placeholder: this.translate('searchText')
      })
    )
    insertBefore(this.$search, children(this.$panel)[0])
  }

  searching(val) {
    const searchedIcons = []
    this.$icons.forEach($icon => {
      if (getObjData('title', $icon).indexOf(val) >= 0) {
        addClass(this.classes.SEARCHED, $icon)
        searchedIcons.push($icon)
      } else if (hasClass(this.classes.SEARCHED, $icon)) {
        removeClass(this.classes.SEARCHED, $icon)
      }
    })

    if (val.length <= 0) {
      query(`.${this.classes.PACKAGETIP}`, this.$panel).innerHTML = ''
      this.packages.forEach(_package => {
        const group = getObjData('group', _package)
        if (group) {
          Object.values(group).forEach(showElement)
        }
      })
      return false
    }

    // set searched icon's count
    this.packages.forEach(_package => {
      setObjData('searchedIconCount', 0, _package)
      query(`.${this.classes.PACKAGETIP}`, _package).innerHTML = '(0 founded)'
      if (getObjData('classifiable', _package)) {
        Object.values(getObjData('group', _package)).forEach(categorie => {
          if (!query(`.${this.classes.SEARCHED}`, categorie)) {
            hideElement(categorie)
          } else {
            showElement(categorie)
          }
        })
      }
    })

    const localeFounded = this.translate('founded')

    searchedIcons.forEach(v => {
      const key = getObjData('package', v)

      this.packages.forEach(_package => {
        if (getObjData('name', _package) === key) {
          let count = getObjData('searchedIconCount', _package)
          count++
          setObjData('searchedIconCount', count, _package)
        }

        query(
          `.${this.classes.PACKAGETIP}`,
          _package
        ).innerHTML = `(${getObjData(
          'searchedIconCount',
          _package
        )} ${localeFounded})`
      })
    })

    this.packages.forEach(_package => {
      if (!getObjData('searchedIconCount', _package)) {
        hideElement(_package)
      } else {
        showElement(_package)
      }
    })
    return null
  }

  togglePackage(name) {
    const localeAllIcons = this.translate('allIcons')
    if (name === localeAllIcons) {
      this.packages.forEach(v => {
        removeClass(this.classes.PACKAGEHIDE, v)
        this.close(v)
      })
      return false
    }

    this.packages.forEach(v => {
      if (!(getObjData('title', v) === name)) {
        addClass(this.classes.PACKAGEHIDE, v)
      } else {
        removeClass(this.classes.PACKAGEHIDE, v)
        this.open(v)
      }
    })
    return null
  }

  open(el) {
    this.$packages.forEach(v => {
      this.close(v)
    })

    addClass(this.classes.PACKAGEOPEN, el)
    setObjData('open', true, el)
    this.$scrollable.find(plugin => el.contains(plugin.element)).enable()
    this.$scrollable.find(plugin => el.contains(plugin.element)).update()
  }
  close(el) {
    removeClass(this.classes.PACKAGEOPEN, el)
    setObjData('open', false, el)
  }

  select($target) {
    this.$icon = $target

    this.$icons.forEach(icon => {
      removeClass(this.classes.ACTIVE, icon)
    })
    const targetData = $target.objData
    const value = `${targetData.prefix}${targetData.title}`
    const { prefix, categories, title, baseClass } = targetData

    const info = {
      prefix,
      categories,
      title,
      baseClass
    }

    info.package = targetData.package

    const $selected = query('.pj-dropdown-trigger span', this.$iconPicker)

    addClass(this.classes.ACTIVE, $target)
    this.element.setAttribute('value', this.options.process(info))
    $selected.innerHTML = `<i class="${getObjData(
      'baseClass',
      $target
    )} ${value}"></i>${value}`

    this.trigger(EVENTS.CHANGE, this.$icon)
  }

  get() {
    if (this.$icon && !is.undefined(this.$icon)) {
      const data = {
        package: getObjData('package', this.$icon),
        categories: getObjData('categories', this.$icon),
        title: getObjData('title', this.$icon)
      }

      return data
    }
    return null
  }

  set(value) {
    if (is.undefined(value)) {
      return
    }
    if (this.$icons !== undefined) {
      this.$icons.forEach($icon => {
        const data = $icon.objData
        if (data.package === value.package && data.title === value.title) {
          this.select($icon)
        }
      })
    }
  }

  setData(data) {
    this.data = data
  }

  val(value) {
    if (is.undefined(value)) {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value))
    return null
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$iconPicker)
      this.$dropdown.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$iconPicker)
      this.$dropdown.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.ELEMENT, this.$iconPicker)
      if (this.options.theme) {
        this.$this.options.theme.removeClass(this.getThemeClass())
      }

      showElement(this.element)
      this.$dropdown.destroy()
      if (this.$selectorPanel) {
        this.$selectorPanel.destroy()
      }

      unwrap(this.$iconPicker)
      this.$iconPicker.remove()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static setData(data) {
    DATA = data
  }
}

export default IconsPicker
