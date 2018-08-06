import Component from '@pluginjs/component'
import { isArray } from '@pluginjs/is'
import { debounce, compose } from '@pluginjs/utils'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  parseHTML,
  query,
  queryAll,
  insertBefore,
  insertAfter,
  getObjData,
  setObjData,
  append,
  prepend,
  children,
  parent,
  parentWith,
  wrap,
  wrapAll,
  clone,
  closest
} from '@pluginjs/dom'
import {
  setStyle,
  getStyle,
  hideElement,
  showElement,
  contentHeight
} from '@pluginjs/styled'
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
// import Webfontloader from 'webfontloader';
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import Dropdown from '@pluginjs/dropdown'
import Scrollable from '@pluginjs/scrollable'

let DATA = {}
let ACTIVATED = {}

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
class FontPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.setupI18n()

    this.$fontPicker = addClass(
      this.classes.ELEMENT,
      parseHTML(
        templateEngine.compile(this.options.templates.trigger())({
          classes: this.classes
        })
      )
    )
    this.fontTrigger = query('.pj-dropdown-trigger', this.$fontPicker)
    insertAfter(this.$fontPicker, this.element)
    wrap(`<div class='${this.classes.WRAP}'></div>`, this.$fontPicker)
    insertBefore(this.element, this.$fontPicker)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$fontPicker)
    }

    this.activated = ACTIVATED
    this.sources = DATA

    this.scrollLength = 0
    this.$font = null
    this.$fonts = []
    this.categoriesHeight = null

    this.$sources = {}

    // this.setupI18n();

    this.initStates()
    this.initialize()
  }

  initialize() {
    // const that = this;
    this.$dropdown = this.initDropdown()

    this.$panel = this.$dropdown.$panel
    this.$activated = queryAll(`.${this.classes.FONT}`, this.$panel)
    this.$activatedPackage = wrapAll(
      parseHTML(`<div class=${this.classes.ACTIVATED}></div>`),
      this.$activated
    )
    this.$packagesWrap = wrap(
      parseHTML(`<div class=${this.classes.PACKAGESWRAP}></div>`),
      this.$activatedPackage
    )

    if (!Object.keys(this.activated)) {
      this.initEmpty()
    } else {
      this.initActivated()
      this.$activated = children(this.$activatedPackage)
      const $activatedLastElement = this.$activated[this.$activated.length - 1]
      this.$searchList = children(query('ul', $activatedLastElement))
      // Scrollable.of($activatedLastElement)
    }
    this.initSources()
    this.initController()
    this.handleSearch()
    this.initScrollable()

    this.wrapHeight = parseFloat(getStyle('height', this.$packagesWrap))

    this.itemHeight =
      parseInt(
        getStyle('height', query(`.${this.classes.FONT}`, this.$panel)),
        10
      ) +
      parseInt(
        getStyle('marginTop', query(`.${this.classes.FONT}`, this.$panel)),
        10
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

    if (this.options.keyboard) {
      this.$fontPicker.setAttribute('tabindex', 0)
      query('input', this.$search).setAttribute('tabindex', 0)
      query(`.${this.classes.PACKAGETITLE}`, this.$panel).setAttribute(
        'tabindex',
        0
      )
      query(`.${this.classes.FONT}`).setAttribute('tabindex', 0)
      query(`.${this.classes.MANAGE}`, this.$controller).setAttribute(
        'tabindex',
        0
      )

      this.KEYBOARD = new Keyboard(this)
    }

    if (this.element.value) {
      this.val(this.element.value)
    } else {
      query('.pj-dropdown-trigger', this.$fontPicker).append(
        parseHTML(`<span>${this.options.placeholder}</span>`)
      )
    }

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initEmpty() {
    this.$empty = parseHTML(
      templateEngine.compile(this.options.templates.empty())({
        classes: this.classes,
        title: this.translate('emptyTitle'),
        linkTitle: this.translate('emptyLinkTitle')
      })
    )

    children(this.$activatedPackage).forEach(el => el.remove())
    // this.$dropdown.$panel.children().remove();
    this.$activatedPackage.append(this.$empty)
  }

  bind() {
    if (this.is('disabled')) {
      return
    }
    const that = this

    // selected activated font
    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.ACTIVATED} .${this.classes.FONT}`,
        handler: e => {
          const $el = e.target
          this.setValue($el)
        }
      },
      this.$panel
    )

    this.$dropdown.options.onHide = () => {
      this.$activated.forEach(v => {
        this.close(v)
      })
      this.$selectorPanel.hide()
      if (this.is('searchReady')) {
        removeClass(this.classes.SEARCHREADY, this.$panel)
        query('input', this.$search).value = ''
        this.leave('searchReady')
      }

      if (this.is('keyboard')) {
        this.KEYBOARD.unbind()
      }
    }

    this.$dropdown.options.onShow = () => {
      this.categoriesHeight = contentHeight(parent(this.$activated[0]))
      if (this.$font) {
        const $selectedPackage = parentWith(
          hasClass(this.classes.PACKAGE),
          this.$font
        )
        if (!$selectedPackage) {
          return
        }
        const $source = closest(
          `.${this.classes.SOURCES}-${this.$font.dataset.source}`,
          this.$font
        )
        this.$selectorPanel.set(this.$font.dataset.source)
        this.toggleSources($source)
        this.$selectorPanel.set(getObjData('title', $source))
        this.open($selectedPackage)

        // count scrollTop number
        let scrollLength = 0  /* eslint-disable-line */
        getObjData('$fonts', $source).forEach(v => {
          if (v.dataset.categorie === this.$font.dataset.categorie) {
            if (v.dataset.value === this.$font.dataset.value) {
              // parent(this.$font).scrollT op(scrollLength)
              return
            }
            scrollLength += this.itemHeight
          }
        })
      }
      return
    }

    this.$selectorPanel.options.onChange = val => {
      const $source = val
      const sourceName = $source.dataset.source
      // const sourceName = getObjData('source', $source)
      this.toggleSources($source)
      this.categoriesHeight = contentHeight(parent(this.$activated[0]))
      if (this.sources[sourceName]) {
        prepend(
          parseHTML(
            `<i class="${this.classes.SOURCEICON} ${this.getIconName(
              sourceName
            )}"></i>`
          ),
          query('.pj-dropdown-trigger', this.$selector)
        )
      }
    }

    /*
      toggle package listener
    */
    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.PACKAGETITLE}`,
        handler: ({ target }) => {
          const $package = parent(target)
          if ($package.dataset.open === 'true') {
            this.close($package)
            removeEvent(this.eventName(), this.$packagesWrap)
          } else {
            this.open($package)
            // that.scrollLength = query('ul', $package).scrollTop()
          }
        }
      },
      this.$panel
    )

    /*
      set font listener
    */
    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.FONT}`,
        handler: ({ target: $this }) => {
          if (that.$font) {
            removeClass(that.classes.ACTIVE, that.$font)
          }

          if (that.is('searching')) {
            removeClass(that.classes.SEARCHING, that.$panel)
            that.leave('searching')
          }

          that.setValue($this)
          that.$dropdown.hide()
        }
      },
      this.$panel
    )

    /*
      lazy loading listener
    */
    queryAll('.pj-scrollable-container', this.$packagesWrap).map(
      bindEvent({
        type: this.eventName('scroll'),
        handler: ({ target: $this }) => {
          if (hasClass(that.classes.SEARCHLIST, parent($this))) {
            const $searchList = that.$activated[that.$activated.length - 1]

            // that.scrollLength = $this.scrollTop()
            if (!that.is('listenScrollStop')) {
              let fontList = query(`.${that.classes.FONT}`, $searchList)
              if (that.is('searchReady') && that.is('searching')) {
                fontList = query(`.${that.classes.SEARCHED}`, $searchList)
              }
              that.isStopScroll($searchList.dataset.sourceName, 0, fontList)
            }
            return
          }
          const $categorie = parentWith(hasClass(that.classes.PACKAGE), $this)
          const $source = parent($categorie)

          const sourceName = $source.dataset.source
          // const sourceName = getObjData('source', $source)
          const categorieName = $categorie.dataset.value
          let index = 0

          Object.entries(that.sources[sourceName].fonts).forEach(([i, v]) => {
            if (i === categorieName) {
              return
            }
            index += v.length
            return
          })

          // that.scrollLength = $this.scrollTop()
          if (!that.is('listenScrollStop')) {
            that.isStopScroll(sourceName, index)
          }
          return
        }
      })
    )

    /*
      keyboard listener
    */
    if (this.options.keyboard) {
      bindEvent(
        {
          type: this.eventName('keydown'),
          handler: e => {
            if (e.keyCode === 13 && e.which === 13) {
              this.$dropdown.show()
            }

            if (e.keyCode === 27 && e.which === 27) {
              this.$dropdown.hide()
            }
          }
        },
        this.$fontPicker
      )

      bindEvent(
        {
          type: this.eventName('focus'),
          handler: () => {
            if (that.is('keyboard')) {
              return
            }
            // let $this = $(this);
            that.KEYBOARD.init(that.$searchList)
          }
        },
        query('input', this.$search)
      )

      compose(
        bindEvent({
          type: this.eventName('keydown'),
          handler: e => {
            const code = e.keyCode
            const which = e.which
            const $this = parent(e.target)

            if (code === 13 && which === 13) {
              if (!$this.dataset.open && $this.dataset.open === 'false') {
                that.open($this)
                that.KEYBOARD.init(query(`.${that.classes.FONT}`, $this), true)
              } else {
                that.close($this)
                that.KEYBOARD.unbind()
              }

              e.stopPropagation()
              return false
            }
            return true
          }
        }),
        bindEvent({
          type: this.eventName('focus'),
          handler: e => {
            const $this = parent(e.target)

            if ($this.dataset.open === 'true' && !that.is('keyboard')) {
              that.KEYBOARD.init(query(`.${that.classes.FONT}`, $this), true)
            }
          }
        })
      )(query(`.${this.classes.PACKAGETITLE}`, this.$panel))
      bindEvent(
        {
          type: this.eventName('keydown'),
          identity: `.${this.classes.FONT}`,
          handler: e => {
            const $this = e.target
            const code = e.keyCode
            const which = e.which

            if (code === 13 && which === 13) {
              that.setValue($this)
              that.$dropdown.hide()
              that.KEYBOARD.unbind()
              e.stopPropagation()
              return false
            }
            return true
          }
        },
        this.$packagesWrap
      )
    }

    /*
      search listener
    */
    compose(
      bindEvent({
        type: this.eventName('input'),
        handler: e => {
          if (!that.is('searching')) {
            addClass(that.classes.SEARCHING, that.$panel)
          }
          that.enter('searching')

          const val = e.target.value
          debounce(that.searching(val), 1000)
        }
      }),
      bindEvent({
        type: this.eventName('focus'),
        handler: () => {
          addClass(that.classes.SEARCHREADY, that.$panel)
          that.enter('searchReady')
        }
      })
    )(query('input', this.$search))

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          query('input', this.$search).value = ''
          removeClass(this.classes.SEARCHREADY, this.$panel)
          this.leave('searchReady')
        }
      },
      query(`.${this.classes.SEARCH}-close`, this.$search)
    )
  }

  unbind() {
    const removeEventByThisEventName = removeEvent(this.eventName())
    return [this.element, this.$fontPicker, this.$panel].forEach(
      removeEventByThisEventName
    )
    // removeEvent(this.eventName(), this.element)
    // removeEvent(this.eventName(), this.$fontPicker)
    // removeEvent(this.eventName(), this.$panel)
  }

  initActivated() {
    /*
      this.$activatedPackage.data() = {
        $fonts: [Array] // all of $selectedPackage's fonts
      }

      $font.data() = {
        value: [String], // font name
        source: [String], // source name
        categorie: [String], // categorie name
      }

      $searchFont.data() = {
        mapping: [jQery Object] // mapping the source font
      }
    */
    const that = this
    const $searchList = parseHTML(
      `<div class='${this.classes.SEARCHLIST}'><div><ul></ul></div></div>`
    )

    this.$activated.forEach($this => {
      const fontName = $this.dataset.value
      // let $sourceIcon = $(`<i class='${that.classes.SOURCEICON} icon-close'></i>`)

      Object.entries(that.activated).forEach(([sourceName, fonts]) => {
        if (fonts.indexOf(fontName) > -1) {
          $this.dataset.source = sourceName
          // getObjData('source', sourceName, $this)

          const $sourceIcon = parseHTML(
            `<i class='${that.classes.SOURCEICON} ${that.getIconName(
              sourceName
            )}'></i>`
          )
          $this.append($sourceIcon)
          return
        }
      })

      const $searchFont = setObjData(
        'mapping',
        $this,
        parseHTML(
          templateEngine.compile(that.options.templates.font())({
            font: that.classes.FONT,
            fontName
          })
        )
      )

      query('ul', $searchList).append($searchFont)
      that.$fonts.push($searchFont)
    })

    setObjData('$fonts', this.$fonts, this.$activatedPackage)
    setObjData('$fonts', this.$fonts, $searchList)
    this.$activatedPackage.append($searchList)
  }

  initSources() {
    /*
      this.$sources = {
        sourceName: $sourcePackage
      }

      $sourcePackage.data() = {
        value: [String], // source name
        $fonts: [Array] // all of this $sourcePackage's fonts
      }
    */
    Object.entries(this.sources).forEach(([sourceName, source]) => {
      const $sourcePackage = parseHTML(
        `<div class='${this.classes.SOURCES} ${
          this.classes.SOURCES
        }-${sourceName}'></div>`
      )
      const fonts = []
      const $searchList = parseHTML(
        `<div class='${this.classes.SEARCHLIST}'><div><ul></ul></div></div>`
      )

      if (isArray(source.fonts)) {
        const $fontsWrap = parseHTML(
          `<div class='${this.classes.FONTWRAP}'><div><ul></ul></div></div>`
        )
        source.fonts.forEach(fontName => {
          const $font = parseHTML(
            templateEngine.compile(this.options.templates.font())({
              font: this.classes.FONT,
              fontName
            })
          )
          $font.dataset.source = sourceName

          query('ul', $fontsWrap).append($font)
          fonts.push($font)
        })

        append($fontsWrap, $sourcePackage)
        hideElement($sourcePackage)
        append($sourcePackage, this.$packagesWrap)
        setObjData('$fonts', fonts, $sourcePackage)
        $sourcePackage.dataset.source = sourceName
        // setObjData('source', sourceName, $sourcePackage)
        this.$sources[sourceName] = $sourcePackage
        return
      }
      if (!source) {
        return
      }
      // handle categorie
      Object.entries(source.fonts).forEach(([categorieName, categorie]) => {
        const $categorie = parseHTML(
          templateEngine.compile(this.options.templates.categories())({
            classes: this.classes,
            categoriesName: categorieName,
            title: categorieName.replace(/^.?/g, match =>
              match.toLocaleUpperCase()
            )
          })
        )

        const $fontsWrap = parseHTML(
          `<div class='${this.classes.FONTWRAP}'><div><ul></ul></div></div>`
        )

        $categorie.dataset.source = sourceName
        // handle font
        categorie.forEach(fontName => {
          const $font = parseHTML(
            templateEngine.compile(this.options.templates.font())({
              classes: this.classes,
              fontName
            })
          )
          $font.dataset.source = sourceName
          setObjData('categorie', categorieName, $font)

          query('ul', $fontsWrap).append($font)
          append($fontsWrap, $categorie)
          fonts.push($font)

          const $searchFont = setObjData('mapping', $font, clone($font))
          query('ul', $searchList).append($searchFont)
        })
        $sourcePackage.append($categorie)

        $sourcePackage.dataset.source = sourceName
        $searchList.dataset.sourceName = sourceName
        // setObjData('source', sourceName, $sourcePackage)
        // setObjData('sourceName', sourceName, $searchList)

        setObjData('$fonts', fonts, $sourcePackage)
        setObjData('$fonts', fonts, $searchList)
      })

      setObjData('title', source.title, $sourcePackage)
      $sourcePackage.append($searchList)
      this.$packagesWrap.append(hideElement($sourcePackage))
      this.$sources[sourceName] = $sourcePackage

      this.setFontFamilies(
        $sourcePackage.dataset.source,
        // getObjData('source', $sourcePackage),
        0,
        query(`.${this.classes.FONT}`, $searchList)
      )
    })
  }

  initDropdown() {
    const that = this
    const data = []
    if (!Object.keys(this.activated).length) {
      data.push({ label: 'empty' })
    } else {
      Object.entries(this.activated).forEach(([, fonts]) => {
        fonts.forEach(font => {
          data.push({ label: font })
        })
      })
    }

    return Dropdown.of(this.fontTrigger, {
      theme: 'default',
      data,
      hideOnSelect: false,
      exclusive: false,
      width: 260,
      icon: 'icon-char icon-chevron-down',
      // list整条选项
      templates: {
        panel() {
          return `<div class=${that.classes.PANEL}></div>`
        },
        item() {
          return `<div class="{that.classes.ITEM} ${
            that.classes.FONT
          }" data-{that.options.itemValueAttr}="{item.label}">{item.label}</div>`
        }
      }
    })
  }

  initController() {
    const data = []
    const localeText = this.translate('activatedFonts')
    this.$controller = parseHTML(
      templateEngine.compile(this.options.templates.controller())({
        classes: this.classes
      })
    )

    Object.entries(this.sources).forEach(([, source]) => {
      data.push({ label: source.title })
    })

    data.push({ label: localeText })
    this.$panel.append(this.$controller)
    this.$selector = query(`.${this.classes.SELECTOR}`, this.$controller)
    this.selectTrigger = query('.pj-dropdown-trigger', this.$selector)
    this.$selectorPanel = Dropdown.of(this.selectTrigger, {
      placement: 'top-center',
      data,
      exclusive: false,
      keyboard: true,
      imitateSelect: true,
      select: data[data.length - 1].label,
      width: this.$selector,
      icon: 'icon-char icon-chevron-down',
      classes: { panel: `${this.classes.SELECTORPANEL} pj-dropdown-panel` }
    })
    // 选中的dropdown activated上面那块
    queryAll('li', this.$selectorPanel.$panel).forEach(el => {
      Object.entries(this.sources).forEach(([sourceName, source]) => {
        if (el.dataset.value === source.title) {
          el.dataset.source = sourceName
          // setObjData('source', sourceName, el)
          prepend(
            `<i class="${this.classes.SOURCEICON} ${this.getIconName(
              sourceName
            )}"></i>`,
            el
          )

          return
        }
      })
    })
  }

  initScrollable() {
    const $triggers = queryAll(`.${this.classes.FONTWRAP}`, this.$packagesWrap)

    const $searchList = queryAll(
      `.${this.classes.SEARCHLIST}`,
      this.$packagesWrap
    )

    $triggers.forEach($trigger => {
      Scrollable.of($trigger, {
        containerSelector: '>',
        contentSelector: '>'
      })
    })

    $searchList.forEach($trigger => {
      Scrollable.of($trigger, {
        containerSelector: '>',
        contentSelector: '>'
      })
    })
  }

  handleSearch() {
    this.$search = parseHTML(
      templateEngine.compile(this.options.templates.search())({
        classes: this.classes,
        placeholder: this.translate('searchText')
      })
    )

    insertBefore(this.$search, children(this.$panel)[0])
  }

  searching(val) {
    this.$showFonts = []
    val = val.toLowerCase()

    this.$searchList.forEach($font => {
      if ($font.dataset.value.toLowerCase().indexOf(val) >= 0) {
        addClass(this.classes.SEARCHED, $font)
        this.$showFonts.push($font)
      } else if (hasClass(this.classes.SEARCHED, $font)) {
        removeClass(this.classes.SEARCHED, $font)
      }
    })
    if (!this.$showFonts.length) {
      return
    }
    const $sourceFont = getObjData('mapping', this.$showFonts[0])
    if (!$sourceFont) {
      return
    }
    this.setFontFamilies($sourceFont.dataset.source, 0, this.$showFonts)
    this.trigger(EVENTS.SEARCHING)
  }

  isStopScroll(source, index, $fonts = this.$fonts) {
    let count = 0
    let temp = this.scrollLength

    const listenScrollStop = window.setInterval(() => {
      if (this.scrollLength === temp) {
        this.leave('listenScrollStop')
        window.clearInterval(listenScrollStop)
        let test = 0
        count = Math.floor(this.scrollLength / this.itemHeight)

        if (count === test) {
          return
        }
        this.setFontFamilies(source, index + count + test, $fonts)
        test = count
        return
      }
      temp = this.scrollLength

      return
    }, 500)

    this.enter('listenScrollStop')
  }

  toggleSources(val) {
    const name = val.dataset.source

    // const localeText = this.translate('activatedFonts')
    if (this.$sources[name]) {
      children(this.$packagesWrap).forEach(hideElement)
      showElement(this.$sources[name])

      this.$activated = children(this.$sources[name])
      this.$fonts = getObjData('$fonts', this.$sources[name])

      this.$searchList = children(
        query('ul', this.$activated[this.$activated.length - 1])
      )
      return
    }
    Object.entries(this.$sources).forEach(([, v]) => hideElement(v))

    showElement(this.$activatedPackage)

    this.$activated = children(this.$activatedPackage)
    this.$searchList = children(
      query('ul', this.$activated[this.$activated.length - 1])
    )
    this.$fonts = getObjData('$fonts', this.$activatedPackage)
    return

    // if (this.is('keyboard')) {
    //   this.KEYBOARD.unbind()
    // }
  }

  setFontFamilies(source, index, $fonts = this.$fonts) {
    if (!this.sources[source]) {
      return false
    }
    if (!Array.isArray($fonts)) {
      const $item = $fonts
      const fontFamily = $item.dataset.value
      this.sources[source].load($item, fontFamily, fontFamily)
    }
    for (let i = 0; i < this.options.lazyNumber; i++) {
      const $item = $fonts[index + i]
      if (!$item) {
        return false
      }
      const fontFamily = $item.dataset.value
      if (getStyle(fontFamily, $item) === fontFamily) {
        continue
      }
      this.sources[source].load($item, fontFamily, fontFamily)
    }
    return true
  }

  open($el) {
    const that = this
    if (!$el.dataset.open && $el.dataset.open === 'false') {
      this.close(query(`.${this.classes.PACKAGEOPEN}`, this.$packagesWrap))
    }
    const $fontsList = query(`.${this.classes.FONTWRAP}`, $el)
    setStyle(
      { height: `${this.wrapHeight - this.categoriesHeight}px` },
      $fontsList
    )
    const container = query('.pj-scrollable-container', $fontsList)
    setStyle({ height: `${contentHeight($fontsList)}px` }, container)

    $fontsList.style.display = 'block'
    // $fontsList.slideDown(this.options.delay)
    addClass(this.classes.PACKAGEOPEN, $el)
    $el.dataset.open = true

    const scrollableApi = Scrollable.findInstanceByElement($fontsList)
    scrollableApi.enable()
    setTimeout(() => {
      scrollableApi.update()
    }, 250)

    window.setTimeout(() => {
      let index = 0
      const name = $el.dataset.value
      const sourceName = $el.dataset.source

      Object.entries(this.sources[sourceName].fonts).forEach(([i, v]) => {
        if (i === name) {
          return
        }
        index += v.length
        return
      })

      that.setFontFamilies(parent($el).dataset.source.toLowerCase(), index)
    }, that.options.delay)
  }
  close($el) {
    if (!$el) {
      return
    }
    const $fontsList = query(`.${this.classes.FONTWRAP}`, $el)
    if ($fontsList) {
      $fontsList.style.display = 'none'
    }
    // $fontsList.slideUp(this.options.delay)

    removeClass(this.classes.PACKAGEOPEN, $el)
    $el.dataset.open = false
  }

  getIconName(sourceName) {
    const source = this.sources[sourceName.toLowerCase()]
    if (!source) {
      return ''
    }
    const icon = source.icon

    return icon ? icon : ''
  }

  setValue(val) {
    if (!this.$font) {
      if (this.element.value) {
        append('<span></span>', query('.pj-dropdown-trigger', this.$fontPicker))
      }
    } else {
      removeClass(this.classes.ACTIVE, this.$font)
    }

    this.$font = getObjData('mapping', val) ? getObjData('mapping', val) : val
    const fontFamily = this.$font.dataset.value
    const sourceName = this.$font.dataset.source
    const $preView = query('.pj-dropdown-trigger span', this.$fontPicker)
    addClass(this.classes.ACTIVE, this.$font)
    this.element.setAttribute('value', this.val())
    $preView.innerHTML = fontFamily
    $preView.dataset.value = fontFamily
    this.setFontFamilies(sourceName, 0, $preView)

    if (this.is('keyboard')) {
      this.KEYBOARD.unbind()
    }
    this.trigger(EVENTS.CHANGE, this.$font)
  }

  get() {
    return this.options.process({
      ...this.$font.dataset,
      ...this.$font.objData
    })
  }

  set(value) {
    if (typeof value === 'undefined') {
      return
    }

    const valueObj = this.options.parse(value)
    const $source = this.$sources[valueObj.source.toLowerCase()]
    if (!$source) {
      return
    }

    const $fonts = getObjData('$fonts', $source)

    $fonts.forEach(v => {
      if (v.dataset.value === valueObj.value) {
        this.setValue(v)
      } else {
        return
      }
      return
    })
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.get()
    }

    this.set(value)
    return false
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$fontPicker)
      this.$dropdown.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$fontPicker)
      this.$dropdown.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.ELEMENT, this.$fontPicker)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$fontPicker)
      }

      this.$dropdown.destroy()
      this.$selectorPanel.destroy()
      parentWith(hasClass(this.classes.WRAP), this.$fontPicker).remove()
      this.$fontPicker.remove()
      this.element.value = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static setData(data) {
    DATA = data
  }

  static registerSources(data) {
    Object.entries(data).forEach(([name, value]) => {
      FontPicker.registerSource(name, value)
    })
  }

  static registerSource(name, data) {
    DATA[name] = data
  }

  static setActivated(data) {
    ACTIVATED = data
  }
}

export default FontPicker
