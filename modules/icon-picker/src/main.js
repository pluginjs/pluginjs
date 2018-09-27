import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { isEmptyObject } from '@pluginjs/is'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import {
  query,
  parent,
  parentWith,
  parseHTML,
  getData,
  children,
  insertBefore,
  insertAfter,
  wrap,
  attr,
  append,
  unwrap,
  setData,
  queryAll,
  prev,
  next
} from '@pluginjs/dom'
import { setStyle, hideElement, showElement } from '@pluginjs/styled'
import Dropdown from '@pluginjs/dropdown'
import Select from '@pluginjs/select'
import Scrollable from '@pluginjs/scrollable'
import Tooltip from '@pluginjs/tooltip'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
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
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class IconsPicker extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()

    this.data = DATA
    this.$icon = null

    this.setupStates()
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
      target: next(this.$iconPicker),
      hideOnSelect: false,
      templates: {
        panel() {
          return `<div class=${that.classes.PANEL}></div>`
        }
      },
      onClick: () => {
        return
      },
      onHide: () => {
        removeClass(this.classes.SEARCHOWNDATA, this.$search)
        query('input', this.$panel).value = ''
        this.searching('')
      }
    })
    children(this.$dropdown.$dropdown).map(el => el.remove())
    this.$dropdown.$dropdown.append(this.$empty)
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
    insertAfter(`<div class=${this.classes.PANEL}></div>`, this.$iconPicker)
    setStyle('display', 'none', this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$iconPicker)
    }

    if (!this.data || isEmptyObject(this.data)) {
      this.initEmpty()
    } else {
      this.$dropdown = this.initDropdown()
      this.$panel = this.$dropdown.$dropdown
      this.$packages = children(this.$panel).filter(el =>
        el.matches(`.${this.classes.PACKAGE}`)
      )
      this.packages = this.compilePackages()

      this.initCategories()
      this.$icons = this.compileIcons(this.packages)
      const packagesWrap = parseHTML(
        `<div class=${this.classes.PACKAGESWRAP}></div>`
      )
      this.$packages.forEach(append(packagesWrap))
      append(packagesWrap, this.$panel)

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
            }><i class='pj-icon pj-icon-setting'></i>${text}</div>`
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
        Scrollable.of(parentWith(hasClass(this.classes.PACKAGEBODY), el))
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
      this.val(inputVal, false)
    }
  }

  bind() {
    if (this.is('disabled')) {
      return
    }
    const that = this

    if (this.options.keyboard) {
      const addTabindexToAttr = attr({
        tabindex: 1
      })
      compose(
        bindEvent(this.eventName('focus'), () => {
          bindEvent(
            this.eventName('keydown'),
            e => {
              if (e.keyCode === 13) {
                this.$dropdown.show()
              }
            },
            this.$iconPicker
          )
        }),
        bindEvent(this.eventName('blur'), () => {
          removeEvent(this.eventName('keydown'), this.$iconPicker)
        })
      )(addTabindexToAttr(this.$iconPicker))
      addTabindexToAttr(query('input', this.$search))
      children(this.$controller).map(addTabindexToAttr)
      this.$packages.map(
        compose(
          bindEvent(this.eventName('focus'), ({ target: $this }) =>
            compose(
              bindEvent(this.eventName('keydown'), e => {
                if (e.keyCode === 13 && e.which === 13) {
                  that.KEYBOARD.init($this)
                  that.open($this)
                }
                removeEvent(this.eventName('focus'), $this)
              }),
              bindEvent(this.eventName('blur'), () => {
                if (that.is('keyboard')) {
                  that.KEYBOARD.unbind()
                  that.close($this)
                }
                if (that.is('searching')) {
                  return
                }
              })
            )($this)
          ),
          addTabindexToAttr
        )
      )
      if (this.options.manage) {
        compose(
          bindEvent(this.eventName('focus'), ({ target }) =>
            bindEvent(
              this.eventName('keydown'),
              e => { if (e.keyCode === 13 && e.which === 13) { /* eslint-disable-line */
                } /* eslint-disable-line */
              },
              target
            )
          ),
          bindEvent(this.eventName('blur'), ({ target }) =>
            removeEvent(this.eventName('keydown'), target)
          )
        )(query(`.${this.classes.MANAGE}`, this.$controller))
      }

      compose(
        bindEvent(this.eventName('focus'), ({ target }) => {
          let $selectItem = children(this.$selectorPanel.$dropdown).find(el =>
            el.matches('.pj-dropdown-active')
          )
          bindEvent(
            this.eventName('keydown'),
            e => {
              if (e.keyCode === 13 && e.which === 13) {
                if (that.is('selectorPanelOn')) {
                  const val = getData('value', $selectItem)
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
            },
            target
          )
        }),
        bindEvent(this.eventName('blur'), ({ target }) =>
          removeEvent(this.eventName('keydown'), target)
        )
      )(this.$selector)
    }

    bindEvent(
      this.eventName('click'),
      `.${this.classes.PACKAGETITLE}`,
      ({ target }) => {
        const _package = parent(target)
        if (getData('open', _package)) {
          that.close(_package)
        } else {
          that.open(_package)
        }
      },
      this.$panel
    )

    // clear search input
    bindEvent(
      this.eventName('click'),
      `.${this.classes.SEARCHCLOSE}`,
      () => {
        removeClass(this.classes.SEARCHOWNDATA, this.$search)
        query('input', this.$panel).value = ''
        this.searching('')
      },
      this.$panel
    )
    this.$packages.map(
      bindEvent(
        this.eventName('click'),
        `.${this.classes.ICON}`,
        ({ target }) => {
          that.select(parentWith(hasClass(this.classes.ICON), target))
          that.$dropdown.hide()
        }
      )
    )

    bindEvent(
      this.eventName('input'),
      'input',
      ({ target }) => {
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
      },
      this.$search
    )
    bindEvent(
      this.eventName('blur'),
      () => {
        this.leave('searching')
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

    // console.log()
    this.$packages.forEach(v => {
      const $this = v
      const title = getData('value', $this)
      let info = null
      for (const index in data) {
        if (data[index].title === title) {
          info = data[index]
          info.name = index
        }
      }

      setData('name', info.name, $this)
      setData('title', info.title, $this)
      setData('count', info.count, $this)
      setData('prefix', info.prefix, $this)
      setData('base', info.class, $this)
      setData('classifiable', info.classifiable, $this)
      setData('icons', info.icons, $this)
      setData('$icons', [], $this)
      setData('categories', info.categories, $this)
      setData('hasUl', false, $this)
      setData('open', false, $this)
      setData('show', true, $this)
      setData('searchedIconCount', 0, $this)
      // if(getData('categories', $this)!= null){
      //   setData('group', info.categories, $this)
      // }
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
      const icons = getData('icons', $package)
      // console.log(getData('group', $package))
      const categories = getData('group', $package)
        ? getData('categories', $package)
        : null
      const packageName = getData('name', $package)

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
        font: getData('base', _package),
        iconName: `${getData('prefix', _package)}${icon}`
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

    getData('$icons', _package).push($icon)
    setData('package', packageName, $icon)
    setData('prefix', getData('prefix', _package), $icon)
    setData('baseClass', getData('base', _package), $icon)
    setData('categories', group, $icon)
    setData('title', icon, $icon)
    setData('tip', iconName ? iconName : icon, $icon)

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
      target: next(this.$iconPicker),
      hideOnSelect: false,
      width: 260,
      value: data[0].label,
      templates: {
        panel() {
          return `<div class=${that.classes.PANEL}></div>`
        },
        item() {
          return `<div class="{that.classes.ITEM} ${
            that.classes.PACKAGE
          }" data-value="{item.label}"><div class=${
            that.classes.PACKAGETITLE
          }>{item.label} <span class='${
            that.classes.PACKAGETIP
          }'></span> <i class='pj-icon pj-icon-chevron-down'></i></div><div class='${
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
      if (getData('classifiable', _package)) {
        for (const name in getData('categories', _package)) {
          if ({}.hasOwnProperty.call(getData('categories', _package), name)) {
            const $categories = parseHTML(
              template.compile(this.options.templates.categories())({
                categoriesName: name,
                classes: this.classes,
                title: name.toLocaleUpperCase()
              })
            )

            setData('title', name, $categories)
            setData('hasUl', false, $categories)
            group[name] = $categories
            append($categories, query(`.${this.classes.PACKAGEBODY}`, _package))
          }
        }
        setData('group', group, _package)
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
      data.push({ label: getData('title', v), value: getData('title', v) })
    })

    data.push({
      label: this.translate('allIcons'),
      value: this.translate('allIcons')
    })
    this.$panel.append(this.$controller)
    this.$selector = query(`.${this.classes.SELECTOR}`, this.$controller)
    this.$elSelect = query(`.${this.classes.ELSELECTOR}`, this.$controller)
    this.$selectorPanel = Select.of(this.$elSelect, {
      dropdown: {
        placement: 'top-center'
      },
      reference: this.$selector,
      source: data,
      value: data[data.length - 1].value,
      onChange: val => {
        this.togglePackage(val)
      }
    })
  }

  initScrollable() {
    queryAll(`.${this.classes.PACKAGEBODY}`, this.$panel).forEach(packageBody =>
      Scrollable.of(packageBody)
    )
  }

  fillIcons() {
    this.$icons.forEach(icon => {
      if (getData('categories', icon)) {
        this.packages.forEach(_package => {
          const $categories = getData('group', _package)
          /* eslint-disable no-undefined */
          if ($categories !== undefined) {
            Object.entries($categories).forEach(([name, categorie]) => {
              if (getData('categories', icon) === name) {
                if (!getData('hasUl', categorie)) {
                  categorie.append(parseHTML('<ul></ul>'))
                  setData('hasUl', true, categorie)
                }
                append(icon, query('ul', categorie))
              }
            })
          }
        })
      } else {
        this.packages.forEach(_package => {
          if (getData('package', icon) === getData('name', _package)) {
            if (!getData('hasUl', _package)) {
              append(
                parseHTML('<ul></ul>'),
                query(`.${this.classes.PACKAGEBODY}`, _package)
              )
              setData('hasUl', true, _package)
            }
            append(icon, query('ul', _package))
          }
        })
      }

      // handle tooltip
      Tooltip.of(icon, {
        title: getData('tip', icon),
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
      if (getData('title', $icon).indexOf(val) >= 0) {
        addClass(this.classes.SEARCHED, $icon)
        searchedIcons.push($icon)
      } else if (hasClass(this.classes.SEARCHED, $icon)) {
        removeClass(this.classes.SEARCHED, $icon)
      }
    })

    if (val.length <= 0) {
      query(`.${this.classes.PACKAGETIP}`, this.$panel).innerHTML = ''
      this.packages.forEach(_package => {
        const group = getData('group', _package)
        if (group) {
          Object.values(group).forEach(showElement)
        }
      })
      return false
    }

    // set searched icon's count
    this.packages.forEach(_package => {
      setData('searchedIconCount', 0, _package)
      query(`.${this.classes.PACKAGETIP}`, _package).innerHTML = '(0 founded)'
      if (getData('classifiable', _package)) {
        Object.values(getData('group', _package)).forEach(categorie => {
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
      const key = getData('package', v)

      this.packages.forEach(_package => {
        if (getData('name', _package) === key) {
          let count = getData('searchedIconCount', _package)
          count++
          setData('searchedIconCount', count, _package)
        }

        query(`.${this.classes.PACKAGETIP}`, _package).innerHTML = `(${getData(
          'searchedIconCount',
          _package
        )} ${localeFounded})`
      })
    })

    this.packages.forEach(_package => {
      if (!getData('searchedIconCount', _package)) {
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
      if (!(getData('title', v) === name)) {
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
    setData('open', true, el)
    this.$scrollable.find(plugin => el.contains(plugin.element)).enable()
    this.$scrollable.find(plugin => el.contains(plugin.element)).update()
  }
  close(el) {
    removeClass(this.classes.PACKAGEOPEN, el)
    setData('open', false, el)
  }

  select($target, trigger = true) {
    this.$icon = $target

    this.$icons.forEach(icon => {
      removeClass(this.classes.ACTIVE, icon)
    })
    const targetData = $target.__pluginjsData
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
    $selected.innerHTML = `<i class="${getData(
      'baseClass',
      $target
    )} ${value}"></i>${value}`

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.val())
    }
  }

  get() {
    if (this.$icon && typeof this.$icon !== 'undefined') {
      const data = {
        package: getData('package', this.$icon),
        categories: getData('categories', this.$icon),
        title: getData('title', this.$icon)
      }
      return data
    }
    return null
  }
  set(value, trigger = true) {
    if (typeof value === 'undefined') {
      return
    }
    if (typeof this.$icons !== 'undefined') {
      this.$icons.forEach($icon => {
        const data = $icon.__pluginjsData
        if (data.package === value.package && data.title === value.title) {
          this.select($icon, trigger)
        }
      })
    }
  }

  setData(data) {
    this.data = data
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value), trigger)
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
        removeClass(this.getThemeClass(), this.$iconPicker)
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
