import Component from '@pluginjs/component'
import { compose, deepMerge } from '@pluginjs/utils'
import {
  parseHTML,
  query,
  clearData,
  wrap,
  parentWith,
  children,
  unwrap
} from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { isString, isNumber, isEmptyObject } from '@pluginjs/is'
import Dropdown from '@pluginjs/dropdown'
import template from '@pluginjs/template'
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
import Gmap from '@pluginjs/gmap'
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
class MapPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)

    this.initStates()
    this.initClasses(CLASSES)
    this.setupI18n()

    this.data = {}
    this.$map = null

    this.initData()
    this.initialize()
  }

  initialize() {
    this.build()

    if (!isEmptyObject(this.data)) {
      this.update()

      if (this.data.place && !this.hasLatlng()) {
        this.set(this.data)
      }
    }

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    // initialize by element value
    const inputVal = this.element.value.trim()
    if (inputVal !== '') {
      this.data = this.options.parse(inputVal)
    } else {
      if (this.options.latlng.lat && this.options.latlng.lng) {
        this.data = {
          lat: parseFloat(this.options.latlng.lat),
          lng: parseFloat(this.options.latlng.lng)
        }
      }

      if (this.options.place) {
        this.data.place = this.options.place
      }
    }
  }

  build() {
    const $wrap = parseHTML(`<div class='${this.classes.NAMESPACE}'></div>`)
    if (this.options.theme) {
      addClass(this.classes.THEME, $wrap)
    }
    wrap($wrap, addClass(this.classes.INPUT, this.element))
    this.$wrap = parentWith(
      el => el.matches(`.${this.classes.NAMESPACE}`),
      this.element
    )
    // console.log(this.options.theme)
    // console.log(this.classes.THEME)
    console.log($wrap)
    console.log(this.$wrap)
    // create mapPicker dropdown

    // create trigger
    this.$trigger = parseHTML(
      this.createEl('trigger', {
        classes: this.classes
      })
    )

    // create empty
    this.$empty = parseHTML(
      this.createEl('empty', {
        classes: this.classes,
        addPlace: this.translate('addPlace')
      })
    )

    // create fill
    this.$fill = parseHTML(
      this.createEl('fill', {
        classes: this.classes,
        action: this.classes.FILLACTION
      })
    )
    this.$fillName = query(`.${this.classes.FILLNAME}`, this.$fill)
    this.$fillCoord = query(`.${this.classes.FILLCOORD}`, this.$fill)

    // create fill action
    this.$fillAction = parseHTML(
      this.createEl('fillAction', {
        classes: this.classes
      })
    )

    // create dropdown
    this.$dropdown = parseHTML(
      this.createEl('dropdown', {
        classes: this.classes
      })
    )
    this.$trigger.append(this.$empty, this.$fill)
    this.$wrap.append(this.$trigger, this.$dropdown)
    this.$fill.append(this.$fillAction)
    this.buildPanelItem()
    this.buildPop()
    this.initDropdown()
  }

  initDropdown() {
    const dropdownConf = {
      // data: this.getTimeList().map(value => ({ label: value })),
      // placeholder: this.options.placeholder,
      placement: 'bottom-left',
      imitateSelect: true,
      // inputLabel: true,
      hideOutClick: false,
      constraintToScrollParent: false,
      templates: this.options.templates
    }
    this.mapDropdown = Dropdown.of(this.$empty, dropdownConf)
  }

  buildPop() {
    const that = this

    this.pop = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$fillAction),
      {
        placement: 'bottom',
        content: this.translate('deleteTitle'),
        buttons: {
          cancel: { label: this.translate('cancel') },
          delete: {
            label: this.translate('delete'),
            color: 'danger',
            fn(resolve) {
              addClass(that.classes.REMOVEANIMATE, that.$fill)
              setTimeout(() => {
                that.clear()
                removeClass(that.classes.REMOVEANIMATE, that.$fill)
              }, 500)
              resolve()
            }
          }
        }
      }
    )
  }

  buildPanelItem() {
    const list = []

    // create input items
    this.$place = parseHTML(
      this.createEl('item', {
        classes: this.classes,
        titleName: this.translate('place'),
        type: this.classes.PLACE
      })
    )

    // create action
    this.$action = parseHTML(
      this.createEl('action', {
        classes: this.classes,
        saveTitle: this.translate('save'),
        cancelTitle: this.translate('cancel')
      })
    )

    list.push(this.$place)
    if (this.options.showLatlng) {
      const $lat = parseHTML(
        this.createEl('item', {
          classes: this.classes,
          titleName: this.translate('latitude'),
          type: this.classes.LAT
        })
      )

      const $lng = parseHTML(
        this.createEl('item', {
          classes: this.classes,
          titleName: this.translate('longitude'),
          type: this.classes.LNG
        })
      )

      list.push($lat, $lng)

      this.$lat = query(`.${this.classes.LAT}`, $lat)
      this.$lng = query(`.${this.classes.LNG}`, $lng)
    }

    list.push(
      parseHTML(`<div class='${this.classes.MAP}'></div>`),
      this.$action
    )

    this.$dropdown.append(...list)

    // this.initMap();
  }

  initMap(set = false) {
    const that = this
    const $map = query(`.${this.classes.MAP}`, this.$dropdown)

    const options = deepMerge(this.options.gmapOptions, {
      onReady() {
        // init autoComplete
        that.initAutoComplete()

        if (that.hasLatlng()) {
          that.set(that.data)
        } else if (that.data.place) {
          const map = that.$map.getMap()
          const latlng = map.getCenter()

          that.data.lat = latlng.lat()
          that.data.lng = latlng.lng()
          that.set(that.data)
        }
      }
    })

    if (this.data.place && !this.hasLatlng()) {
      options.address = this.data.place
    }

    setTimeout(() => {
      this.$map = Gmap.of($map, options)
      if (set) {
        this.set(this.data)
      }
    }, 200)
  }

  initAutoComplete() {
    const $place = query(`.${this.classes.PLACE}`, this.$dropdown)
    const config = {}

    this.autoComplete = new google.maps.places.Autocomplete($place, config) /* eslint-disable-line */
    // autoComplete event
    this.autoComplete.addListener('place_changed', () => {
      const place = this.autoComplete.getPlace()
      if (place.geometry) {
        this.data.place = place.formatted_address
        const location = place.geometry.location
        const lat = location.lat()
        const lng = location.lng()

        this.createMarker({ lat, lng })
        // map.setZoom(15);
      }
    })
  }

  createMarker(latlng, opts = {}) {
    const { lat, lng } = latlng

    const coord = { latitude: lat, longitude: lng }

    const options = deepMerge(this.options.markerOptions, opts, coord)

    this.$map.clearMarkers()
    this.$map.addMarker(options, true)

    // set lat&lng fill
    this.setLatLng({ lat, lng })

    this.place = this.$map.markers[0]
    // marker drag event
    this.place.addListener('dragend', () => {
      this.setLatLng(this.place.getPosition())
    })
  }

  setPosition(position) {
    const { lat, lng } = position
    if (!lat || !lng) {
      return
    }

    if (this.place) {
      Object.entries(position).forEach(([i, v]) => {
        position[i] = parseFloat(v)
      })

      const latlng = new google.maps.LatLng(position)  /* eslint-disable-line */
      this.place.setPosition(latlng)
      this.$map.move(latlng)
      this.data = {
        ...this.data,
        ...position
      }
    }
  }

  setLatLng(latlng) {
    let { lat, lng } = latlng

    lat = typeof lat === 'function' ? lat() : lat
    lng = typeof lng === 'function' ? lng() : lng

    if (this.options.showLatlng) {
      this.$lat.value = lat
      this.$lng.value = lng
    }

    // set data
    this.data = {
      ...this.data,
      lat,
      lng
    }
  }

  createEl(name, options) {
    return template.compile(this.options.templates[name]())(options)
  }

  bind() {
    compose(
      // action button event
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.SAVE}`
        },
        handler: e => {
          e.preventDefault()
          this.close()
          if (this.hasLatlng()) {
            this.update()
          }
        }
      }),
      // action button event
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.CANCEL}`
        },
        handler: () => this.close()
      }),
      // fill action button event
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.FILLACTION} .${this.classes.EDIT}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.open()
        }
      }),
      // $fill event
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          if (this.is('holdHover')) {
            return
          }

          removeClass(this.classes.HOVER, this.$fill)
          this.leave('holdHover')
        }
      }),
      // $fill event
      bindEvent({
        type: this.eventName('mouseover'),
        identity: {
          type: 'selector',
          value: `.${this.classes.FILL}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return
          }

          addClass(this.classes.HOVER, this.$fill)
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.EMPTY}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          if (!this.is('open')) {
            this.open()
          }
        }
      })
    )(this.$wrap)

    // pop event
    this.pop.options.onShow = () => this.enter('holdHover')
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$fill)
      this.leave('holdHover')
    }

    // change $lat&$lng input
    if (this.options.showLatlng) {
      bindEvent(
        {
          type: this.eventName('change'),
          handler: () => {
            const lat = this.$lat.value
            const lng = this.$lng.value
            this.setPosition({ lat, lng })
          }
        },
        query(`.${this.classes.LAT}`, this.$dropdown)
      )

      bindEvent(
        {
          type: this.eventName('change'),
          handler: () => {
            const lat = this.$lat.value
            const lng = this.$lng.value

            this.setPosition({ lat, lng })
          }
        },
        query(`.${this.classes.LNG}`, this.$dropdown)
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
  }

  open() {
    if (!this.$map) {
      this.initMap()
    }

    addClass('pj-dropdown-show', this.$trigger)
    addClass('pj-dropdown-show', this.$wrap)
    addClass('pj-dropdown-show', this.$dropdown.parentNode)
    addClass(this.classes.SHOW, this.$wrap)
    this.enter('open')
  }

  close() {
    removeClass('pj-dropdown-show', this.$trigger)
    removeClass('pj-dropdown-show', this.$wrap)
    removeClass('pj-dropdown-show', this.$dropdown.parentNode)
    removeClass(this.classes.SHOW, this.$wrap)
    this.leave('open')
  }

  hasLatlng() {
    return isNumber(this.data.lat) && isNumber(this.data.lng)
  }

  set(data) {
    if (isEmptyObject(data)) {
      return
    }

    if (this.hasLatlng()) {
      data = {
        ...data,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng)
      }
    }

    if (this.$map && this.$map.is('initialized')) {
      this.clear()

      if (data.place) {
        query(`.${this.classes.PLACE}`, this.$place).value = data.place
      }

      this.createMarker(data)
      this.$map.MAP.setCenter(data)
    } else {
      // this.initMap(true);
    }

    this.data = data
    this.update()
  }

  get() {
    return this.data
  }

  val(data) {
    if (typeof data === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    if (isString(data)) {
      data = this.options.parse.call(this, data)
      return this.set(data)
    }
    return false
  }

  update() {
    this.$fillName.textContent = this.data.place
    if (this.hasLatlng()) {
      const latitude = `${this.translate('latitude')}:${this.data.lat.toFixed(
        2
      )}`
      const longitude = `${this.translate('longitude')}:${this.data.lng.toFixed(
        2
      )}`
      this.$fillCoord.textContent = `${latitude} ${longitude}`
    }
    this.element.value = this.val()
    addClass(this.classes.WRITE, this.$wrap)
  }

  clear() {
    this.data = {}
    removeClass(this.classes.WRITE, this.$wrap)
    children(query(`.${this.classes.FILLCONTENT}`, this.$fill)).forEach(el => {
      el.textContent = ''
    })
    query(`.${this.classes.ITEM} input`, this.$dropdown).value = ''

    if (this.$map) {
      this.$map.clearMarkers()
    }
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
        // removeClass(this.getThemeClass(, this.$wrapper));
      }
      compose(
        unwrap,
        clearData,
        removeClass(this.classes.INPUT)
      )(this.element)
      this.$empty.remove()
      this.$fill.remove()
      this.$dropdown.remove()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default MapPicker
