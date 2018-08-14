import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import { isString, isEmptyObject } from '@pluginjs/is'
import template from '@pluginjs/template'
import {
  wrap,
  unwrap,
  query,
  queryAll,
  parent,
  parentWith,
  parseHTML,
  insertAfter,
  append,
  prepend,
  insertBefore,
  setData,
  getData
} from '@pluginjs/dom'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { showElement, hideElement } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import PopDialog from '@pluginjs/pop-dialog'
import Dropdown from '@pluginjs/dropdown'
import Radio from '@pluginjs/radio'
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

const SOURCES = {}
const DATA = {}

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
class LinkPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initStates()
    this.initClasses(CLASSES)
    this.setupI18n()
    if (isEmptyObject(SOURCES)) {
      this.element.setAttribute('placeholder', 'register sources first.')
      return false
    }
    this.data = this.initData(deepMerge({}, SOURCES), deepMerge({}, DATA))
    this.sources = []

    Object.entries(this.data).forEach(([typeName]) => {
      this.sources.push(typeName)
    })

    this.source = this.sources[0]
    this.input = {}
    this.initialize()
  }

  initData(sources, data) {
    const newSources = {}

    const sourcesWithArrayFileds = Object.entries(sources).reduce(
      (result, [index, source]) => {
        if (data[index]) {
          return {
            ...result,
            [index]: {
              ...result[index],
              fields: source.fields(data[index])
            }
          }
        }
        return result
      },
      sources
    )

    if (!this.options.sources || this.options.sources.length < 1) {
      return sourcesWithArrayFileds
    }

    this.options.sources.forEach(sourceName => {
      newSources[sourceName] = sourcesWithArrayFileds[sourceName]
    })

    return newSources
  }

  initialize() {
    wrap(
      parseHTML(`<div class='${this.classes.NAMESPACE}'></div>`),
      addClass(this.classes.INPUT, this.element)
    )

    this.input = {}

    this.build()
    this.bind()

    const val = this.element.value
    if (val) {
      this.val(val)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    const that = this
    this.$wrap = parent(this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }
    this.$trigger = parseHTML(
      this.parseTemp('trigger', {
        classes: this.classes
      })
    )
    this.$empty = parseHTML(
      this.parseTemp('empty', {
        classes: this.classes,
        title: this.options.title
      })
    )
    this.$fill = parseHTML(
      this.parseTemp('fill', {
        classes: this.classes
      })
    )
    this.$action = parseHTML(
      this.parseTemp('action', {
        classes: this.classes
      })
    )
    this.$dropdown = parseHTML(
      this.parseTemp('dropdown', { classes: this.classes })
    )
    this.$dropdownAction = parseHTML(
      this.parseTemp('dropdownAction', {
        classes: this.classes,
        cancelTitle: this.translate('cancel'),
        saveTitle: this.translate('save')
      })
    )
    ;[this.$empty, this.$fill, this.$dropdown].map(el =>
      insertAfter(el, this.element)
    )

    this.$fill.append(this.$action)
    this.$dropdown.append(this.$dropdownAction)
    this.$trigger.append(this.$empty, this.$fill)
    this.$wrap.append(this.$trigger, this.$dropdown)

    this.buildTypes()
    // create pop
    this.pop = PopDialog.of(
      query(`.${this.classes.ACTIONREMOVE}`, this.$action),
      {
        content: this.translate('deleteTitle'),
        placement: 'bottom',
        buttons: {
          cancel: { label: this.translate('cancel') },
          delete: {
            label: this.translate('delete'),
            color: 'danger',
            fn(resolve) {
              that.clear()
              resolve()
            }
          }
        }
      }
    )
    this.initDropdown()

    // console.log($dropdown)
    // console.log(this.$empty)
  }

  initDropdown() {
    const dropdownConf = {
      theme: 'dafault',
      placement: 'bottom-left',
      imitateSelect: true,
      hideOutClick: false,
      constraintToScrollParent: false,
      templates: this.options.templates
    }
    Dropdown.of(this.$empty, dropdownConf)
  }

  buildTypes() {
    const that = this
    const typeData = []
    // parse data
    Object.entries(this.data).forEach(([type, details]) => {
      typeData.push({
        label: details.label,
        name: type
      })

      // build item to types
      this.buildTypeItem({
        type,
        details
      })
    })

    // create type dropdown
    const $types = parseHTML(
      this.parseTemp('item', {
        class: this.classes.ITEM,
        titleClass: this.classes.ITEMTITLE,
        title: this.source,
        body: this.classes.ITEMBODY
      })
    )
    append(
      parseHTML(
        `<div class='${
          this.classes.TYPESWITCH
        }'><span class="pj-dropdown-trigger"></span></div>`
      ),
      query(`.${this.classes.ITEMBODY}`, $types)
    )
    prepend($types, this.$dropdown)
    this.$typeDropdown = Dropdown.of(
      query('.pj-dropdown-trigger', this.$dropdown),
      {
        // theme: 'default',
        imitateSelect: true,
        constraintToScrollParent: false,
        icon: 'icon-char icon-chevron-down',
        data: typeData,
        width: query(`.${this.classes.TYPESWITCH}`, this.$dropdown),
        select: this.source,
        templates: {
          dropdown() {
            return `<ul class='${that.classes.TYPESPANEL}'></ul>`
          },
          item() {
            return '<li class="{that.classes.ITEM}" data-value="{item.name}">{item.label}</li>'
          }
        }
      }
    )

    this.swtichType()
  }

  buildTypeItem(options) {
    const type = options.type
    const details = options.details

    const $container = parseHTML(
      this.parseTemp('container', {
        class: this.classes.TYPESCONTAINER,
        type
      })
    )
    details.fields.forEach(item => {
      const $item = parseHTML(
        this.parseTemp('item', {
          class: this.classes.ITEM,
          itemTitle: this.classes.ITEMTITLE,
          title: item.label,
          body: this.classes.ITEMBODY,
          name: item.name
        })
      )

      // $item.dataset.name = item.name
      setData('name', item.name, $item)
      if (item.connect) {
        // $item.dataset.connect = item.connect
        setData('connect', item.connect, $item)
      }

      $container.append($item)

      const input = {
        source: type,
        item,
        parent: query(`.${this.classes.ITEMBODY}`, $item)
      }

      switch (item.type) {
        case 'dropdown':
          this.handleDropdownMode(input)
          break
        case 'radio':
          this.handleRadioMode(input)
          break
        case 'input':
          this.handleInputMode(input)
          break
        default:
          break
      }
    })
    insertBefore(
      $container,
      query(`.${this.classes.DROPDOWNACTION}`, this.$dropdown)
    )
  }

  handleInputMode(details) {
    const { item, parent, source } = details
    const { name, data, options } = item
    const placeholder = options.placeholder
    const $input = parseHTML(
      `<input class='pj-input ${
        this.classes.TYPESCOMPONENT
      }' placeholder="${placeholder}" type="text"/>`
    )

    parent.append($input)
    $input.value = data
    setData(
      'input',
      {
        source,
        itemName: name
      },
      $input
    )
    const itemBody = parent.matches(`.${this.classes.ITEMBODY}`)
      ? parent
      : parentWith(hasClass(this.classes.ITEMBODY), parent)
    setData('api', $input, itemBody)
  }

  handleRadioMode(details) {
    const that = this
    const { item, source, parent } = details
    const { name, data, options } = item

    let active = data.active
    if (!active || active === '') {
      active = Object.keys(data.values)[0]
    }

    Object.entries(data.values).forEach(([itemName, value]) => {
      const $radio = parseHTML(
        `<div class='pj-radio'><input class='${
          this.classes.TYPESCOMPONENT
        }' type="radio" id='${source}-${name}-${itemName}' name='${source}-${name}' value="${itemName}" /><label for='${source}-${name}-${itemName}'><i></i>${value}</label></div>`
      )

      parent.append($radio)

      if (itemName.toLowerCase() === 'id') {
        const $input = parseHTML(
          `<input type="text" class='pj-input' id='${source}-${name}-${itemName}-input' />`
        )
        parent.append($input)
        hideElement($input)

        // radio input event
        bindEvent(
          {
            type: this.eventName('change'),
            handler: e => {
              const inputVal = parseHTML(e.target).val()
              // set this.data val
              this.getSourceItem(source, name).data.active = inputVal
            }
          },
          query(`[id='${source}-${name}-${itemName}-input']`, parent)
        )
      }
    })

    const radioDefaults = {
      classes: { icon: 'icon-check-mini' },
      getGroup() {
        return queryAll(`input[name='${source}-${name}']`, parent)
      },
      onChange(e) {
        const $input = query('input[type="text"]', parent)
        hideElement($input)
        that.getSourceItem(source, name).data.active = e

        if (e.toLowerCase() === 'id') {
          showElement($input)
          that.getSourceItem(source, name).data.active = $input.value
        }
      }
    }
    const radioOptions = deepMerge(radioDefaults, options)
    const $radio = queryAll(`input[name='${source}-${name}']`, parent)
    const api = $radio.map(el => Radio.of(el, radioOptions))
    api.forEach(plugin => plugin.check(active, true))

    const itemBody = parent.matches(`.${this.classes.ITEMBODY}`)
      ? parent
      : parentWith(hasClass(this.classes.ITEMBODY), parent)
    setData('api', api, itemBody)
  }

  handleDropdownMode(details) {
    const that = this
    const { source, item, parent } = details
    const { data, options, connect, name } = item
    const dropdownData = []

    let values = data.values
    const $dropdown = parseHTML(
      `<div class='${
        this.classes.TYPESCOMPONENT
      }'><span class="pj-dropdown-trigger"></span></div>`
    )

    setData(
      'input',
      {
        source,
        itemName: item.name
      },
      $dropdown
    )

    // set dropdown if has connect key.
    if (connect) {
      const connectData = this.getSourceItem(source, connect).data

      let connectActive = connectData.active
      if (!connectActive) {
        connectActive = connectData.values[0]
      }

      values = data.values(connectActive).values
      // $dropdown.dataset.connect = connect
      setData('connect', connect, $dropdown)
      // === bind event ==== //
      bindEvent(
        {
          type: this.eventName(`linkPicker:${source}:${connect}:change`),
          handler: (e, instance, connectName) => {
            const api = getData('input', $dropdown)
            const dropdownData = []
            // let globalData = this.getData();

            const apiData = this.getSourceItem(source, name).data
            const callBackData = data.values(connectName)
            const apiActive = callBackData.active

            apiData.active = apiActive

            Object.entries(callBackData.values).forEach(([key, value]) => {
              dropdownData.push({
                label: value,
                name: key
              })
            })
            api.replaceByData(dropdownData)
            api.set(apiActive)
          }
        },
        this.element
      )
    }

    Object.entries(values).forEach(([key, value]) => {
      dropdownData.push({
        label: value,
        name: key
      })
    })

    // set dropdown default options
    const dropdownDefault = {
      // theme: 'default',
      imitateSelect: true,
      width: 160,
      data: dropdownData,
      // select: data.active,
      constraintToScrollParent: false,
      icon: 'icon-char icon-chevron-down',
      templates: {
        item() {
          return '<li class="{that.classes.ITEM}" data-value="{item.name}">{item.label}</li>'
        }
      },
      onChange(el) {
        const name = getData('value', el)
        // const connect = this.element.data('connect')
        const { source, itemName } = getData('input', this.element)

        that.getSourceItem(source, itemName).data.active = name
        that.trigger(`${source}:${itemName}:change`, name)
      }
    }

    const dropdownOptions = deepMerge(dropdownDefault, options)

    parent.append($dropdown)
    const api = Dropdown.of($dropdown, dropdownOptions)

    // set dropdown default value
    if (!data.active || data.active.length < 1) {
      data.active = dropdownData[0].name
    }
    api.set(data.active)

    const itemBody = parent.matches(`.${this.classes.ITEMBODY}`)
      ? parent
      : parentWith(hasClass(this.classes.ITEMBODY), parent)
    setData('api', api, itemBody)
  }

  swtichType() {
    // this.$typeDropdown.set(this.source);
    queryAll(`.${this.classes.TYPESCONTAINER}`, this.$dropdown).map(
      removeClass(this.classes.ACTIVE)
    )
    queryAll(
      `.${this.classes.TYPESCONTAINER}[data-type='${this.source}']`,
      this.$dropdown
    ).map(addClass(this.classes.ACTIVE))
  }

  getData() {
    return this.data
  }

  bind() {
    // open dropdown
    bindEvent(
      {
        type: this.eventName('click'),
        identity: { type: 'selector', value: `.${this.classes.EMPTY}` },
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.show()
        }
      },
      this.$wrap
    )

    //
    bindEvent(
      {
        type: this.eventName('click'),
        identity: { type: 'selector', value: `.${this.classes.ITEMBODY}` },
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          addClass('pj-dropdown-show', this.$trigger)
          addClass('pj-dropdown-show', this.$wrap)
          addClass('pj-dropdown-show', this.$dropdown.parentNode)
        }
      },
      this.$wrap
    )

    // switch Types
    this.$typeDropdown.options.onChange = v => {
      this.source = getData('value', v)
      this.swtichType()
    }
    // $.each(this.data, (sourceName, details) => {
    //   $.each(details.fields, (index, item) => {
    //     let connect = item.connect;

    //     if (connect) {
    //       this.element.on(this.eventName(`linkPicker:${sourceName}:${connect}:change`), (e, instance, name) => {

    //       })
    //     }
    //   })
    // });

    // input change
    bindEvent(
      {
        type: this.eventName('change'),
        identity: 'input[type="text"]',
        handler: ({ target: $input }) => {
          if (window.getComputedStyle($input).display === 'none') {
            return
          }
          const input = getData('input', $input)
          if (!input) {
            return
          }
          const { source, itemName } = input
          const inputVal = $input.value
          this.getSourceItem(source, itemName).data = inputVal
        }
      },
      this.$dropdown
    )

    // hold hover
    compose(
      bindEvent({
        type: 'mouseover',
        identity: {
          type: 'selector',
          value: `.${this.classes.FILL}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          addClass(this.classes.HOVER, this.$action)
        }
      }),
      bindEvent({
        type: 'mouseout',
        identity: {
          type: 'selector',
          value: `.${this.classes.FILL}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return false
          }
          if (this.is('holdHover')) {
            return false
          }

          removeClass(this.classes.HOVER, this.$action)
          return null
        }
      }),

      // editor link
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.ACTIONEDIT}`
        },
        handler: () => this.show()
      }),

      // cancel
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.DROPDOWNCANCEL}`
        },
        handler: () => this.hide()
      }),

      // save
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.DROPDOWNSAVE}`
        },
        handler: () => {
          this.update()
          this.hide()
        }
      })
    )(this.$wrap)

    // pop event
    this.pop.options.onShow = () => this.enter('holdHover')
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$action)
      this.leave('holdHover')
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventName(), this.element)
  }

  formatKey(val) {
    return val.replace(/\s/g, '-').toLocaleLowerCase()
  }
  parseTemp(tempName, options) {
    return template.compile(this.options.templates[tempName]())(options)
  }

  show() {
    // addClass('pj-dropdown-show', this.$trigger)
    // addClass('pj-dropdown-show', this.$wrap)
    // addClass('pj-dropdown-show', this.$dropdown.parentNode)
    addClass(this.classes.SHOW, this.$wrap)
  }

  hide() {
    // removeClass('pj-dropdown-show', this.$trigger)
    // removeClass('pj-dropdown-show', this.$wrap)
    // removeClass('pj-dropdown-show', this.$dropdown.parentNode)
    removeClass(this.classes.SHOW, this.$wrap)
  }

  clear() {
    removeClass(this.classes.WRITE, this.$wrap)
    this.element.value = ''
    query('input[type="text"]', this.$dropdown).value = ''
    // this.data = this.options.data;

    removeClass(this.classes.HOVER, this.$action)
  }

  getSourceItem(sourceName, itemName) {
    const data = this.getData()
    return data[sourceName].fields.filter(arr => arr.name === itemName)[0]
  }

  setSourceFieldData(sourceName, itemName, data) {
    const item = this.getSourceItem(sourceName, itemName)
    item.data = data
  }

  set(data) {
    this.source = data.source
    this.$typeDropdown.set(this.source)

    this.swtichType()

    delete data.source

    // update this.data
    this.updateData(data)

    // render
    this.render(data)

    // update
    this.update()
  }

  updateData(data) {
    Object.entries(data).forEach(([itemName, value]) => {
      const item = this.getSourceItem(this.source, itemName)
      const data = item.data
      if (isString(data)) {
        item.data = value
        return
      }

      item.data.active = value
    })
  }

  render(data) {
    const $source = query(
      `.${this.classes.TYPESCONTAINER}[data-type='${this.source}']`,
      this.$dropdown
    )

    const dataTypes = []
    Object.entries(data).forEach(([itemName]) => {
      const item = this.getSourceItem(this.source, itemName)
      dataTypes.push(item.type)
    })

    queryAll(`.${this.classes.ITEMBODY}`, $source).forEach(el => {
      const $this = el
      const type = getData('value', parent($this))
      if (data[type]) {
        const api = getData('api', $this)
        const apiType = Array.isArray(api) ? api[0].plugin : api

        if (!apiType) {
          api.value = data[type]
          return
        }
        if (apiType === 'dropdown') {
          api.set(data[type])
          return
        }
        if (apiType === 'radio') {
          if (data[type].indexOf('#') === 0) {
            api.forEach(plugin => plugin.set('id'))
            query('input[type="text"]', $this).value = data[type]
          } else {
            api.forEach(plugin => plugin.set(data[type]))
          }

          return
        }
      }
    })
  }

  update() {
    this.input = {}
    const globalData = this.getData()
    this.input.source = this.source

    Object.entries(globalData).forEach(([sourceName, details]) => {
      if (sourceName === this.source) {
        details.fields.forEach(item => {
          const active = isString(item.data) ? item.data : item.data.active
          this.input[item.name] = active
        })
      }
    })

    this.element.value = JSON.stringify(this.input)

    this.updatePreview()
  }

  updatePreview() {
    const data = this.get()
    const sourceName = data.source
    const source = this.getData()[sourceName]

    let preview = source.preview
    if (preview) {
      const keys = preview.match(/\{.*?\}/gi)
      keys.forEach(key => {
        const itemName = key
          .trim()
          .replace(/^\{/, '')
          .replace(/\}$/, '')

        const item = this.getSourceItem(sourceName, itemName)
        const itemData = item.data
        let value

        if (isString(itemData)) {
          value = itemData
        } else if (item.connect) {
          value = itemData.values(data[item.connect]).values[data[item.name]]
        } else {
          value = itemData.values[itemData.active]
          if (!value) {
            value = itemData.active
          }
        }

        preview = preview.replace(key, value)
      })
    }

    addClass(this.classes.WRITE, this.$wrap)
    query(`.${this.classes.LINK}`, this.$fill).textContent = preview
  }

  get() {
    return this.input
  }

  val(data) {
    if (data) {
      if (isNaN(data)) {
        data = JSON.parse(data.replace(/\'/g, '"')) /* eslint-disable-line */
      }

      this.set(data)
    }

    return JSON.stringify(this.get())
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.pop.enable()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
      this.pop.disable()
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }

      this.$typeDropdown.destroy()
      unwrap(this.element)
      removeClass(this.classes.INPUT, this.element)
      this.$empty.remove()
      this.$preview.remove()
      this.$dropdown.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerDatas(data) {
    Object.entries(data).forEach(([name, value]) => {
      LinkPicker.registerData(name, value)
    })
  }

  static registerData(name, data) {
    DATA[name] = data
  }

  static registerSources(data) {
    Object.entries(data).forEach(([name, value]) => {
      LinkPicker.registerSource(name, value)
    })
  }

  static registerSource(name, data) {
    SOURCES[name] = data
  }
}

export default LinkPicker
