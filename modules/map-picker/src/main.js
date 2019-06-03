import Component from '@pluginjs/component'
import { compose, deepMerge } from '@pluginjs/utils'
import { parseHTML, query, queryAll, wrap, unwrap } from '@pluginjs/dom'
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
import Gmap from '@pluginjs/gmap'
import PlaceComplete from '@pluginjs/place-complete'
import Trigger from './trigger'
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
    super(element)

    this.setupOptions(options)

    this.setupStates()
    this.setupClasses()
    this.setupI18n()

    this.data = {}
    this.$map = null

    this.initData()
    this.initialize()
  }

  initialize() {
    this.build()

    if (!isEmptyObject(this.data)) {
      this.update(false)

      if (this.data.place && !this.hasLatlng()) {
        this.set(this.data, false)
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
    }
    // else {
    //   if (this.options.latlng.lat && this.options.latlng.lng) {
    //     this.data = {
    //       lat: parseFloat(this.options.latlng.lat),
    //       lng: parseFloat(this.options.latlng.lng)
    //     }
    //   }

    //   if (this.options.place) {
    //     this.data.place = this.options.place
    //   }
    // }
  }

  build() {
    addClass(this.classes.INPUT, this.element)
    this.$wrap = wrap(
      `<div class='${this.classes.NAMESPACE}'></div>`,
      this.element
    )
    if (this.options.theme) {
      addClass(this.classes.THEME, this.$wrap)
    }

    // create dropdown
    this.$dropdown = parseHTML(
      this.createEl('dropdown', {
        classes: this.classes
      })
    )
    this.TRIGGER = new Trigger(this)
    this.$wrap.append(this.$dropdown)
    this.buildPanelItem()
    // this.buildPop()
    this.initDropdown(this.options.dropdown)
  }

  initDropdown(options = {}) {
    const that = this
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      ...options,
      reference: that.TRIGGER.$trigger,
      // placement: 'bottom-left',
      target: this.$dropdown,
      hideOutClick: true,
      templates: this.options.templates,
      onShow: () => {
        if (!this.DROPDOWN.is('builded')) {
          this.buildDropdown()
        }
        this.DROPDOWN.update()
      },
      onHide: () => {
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
      }
    })
  }

  buildDropdown() {
    this.$dropdown.append(...this.$list)

    // change $lat&$lng input
    if (this.options.showLatlng) {
      bindEvent(
        this.eventName('change'),
        () => {
          const lat = this.$lat.value
          const lng = this.$lng.value
          this.setPosition({ lat, lng })
        },
        query(`.${this.classes.LAT}`, this.$dropdown)
      )
      bindEvent(
        this.eventName('change'),
        () => {
          const lat = this.$lat.value
          const lng = this.$lng.value

          this.setPosition({ lat, lng })
        },
        query(`.${this.classes.LNG}`, this.$dropdown)
      )
    }
  }

  buildPanelItem() {
    this.$list = []

    // create input items
    this.$place = parseHTML(
      this.createEl('field', {
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

    this.$list.push(this.$place)
    if (this.options.showLatlng) {
      const $lat = parseHTML(
        this.createEl('field', {
          classes: this.classes,
          titleName: this.translate('latitude'),
          type: this.classes.LAT
        })
      )

      const $lng = parseHTML(
        this.createEl('field', {
          classes: this.classes,
          titleName: this.translate('longitude'),
          type: this.classes.LNG
        })
      )

      this.$list.push($lat, $lng)

      this.$lat = query(`.${this.classes.LAT}`, $lat)
      this.$lng = query(`.${this.classes.LNG}`, $lng)
    }

    this.$list.push(
      parseHTML(`<div class='${this.classes.MAP}'></div>`),
      this.$action
    )
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

    const that = this
    this.PlaceComplete = new PlaceComplete($place, {
      onPlaceChange(place) {
        const lat = place.latitude
        const lng = place.longitude

        that.data.place = place.address
        that.createMarker({ lat, lng })
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
      bindEvent(this.eventName('click'), `.${this.classes.SAVE}`, e => {
        e.preventDefault()
        this.close()
        if (this.hasLatlng()) {
          this.update()
        }
      }),
      // action button event
      bindEvent(this.eventName('click'), `.${this.classes.CANCEL}`, () =>
        this.close()
      )
    )(this.$wrap)
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
  }

  open() {
    this.DROPDOWN.show()
    if (!this.$map) {
      this.initMap()
    }

    addClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
    addClass(this.classes.SHOW, this.$wrap)
    this.enter('open')
  }

  close() {
    removeClass(this.classes.SHOW, this.$wrap)
    this.DROPDOWN.hide()
    this.leave('open')
  }

  hasLatlng() {
    return isNumber(this.data.lat) && isNumber(this.data.lng)
  }

  set(data, trigger = true) {
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
    this.update(trigger)
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

  update(trigger = true) {
    this.TRIGGER.$fillName.textContent = this.data.place
    if (this.hasLatlng()) {
      const latitude = `${this.translate('latitude')}:${this.data.lat.toFixed(
        2
      )}`
      const longitude = `${this.translate('longitude')}:${this.data.lng.toFixed(
        2
      )}`
      this.TRIGGER.$fillCoord.textContent = `${latitude} ${longitude}`
    }
    this.element.value = this.val()
    addClass(this.classes.WRITE, this.$wrap)

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.val())
    }
  }

  clear() {
    this.data = {}
    this.element.value = ''
    removeClass(this.classes.WRITE, this.$wrap)
    this.TRIGGER.clear()

    queryAll(`.${this.classes.FIELD} input`, this.$dropdown).forEach(el => {
      el.value = ''
    })

    if (this.$map) {
      this.$map.clearMarkers()
    }
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.TRIGGER.DELETEPOP.enable()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
      this.TRIGGER.DELETEPOP.disable()
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
        // clearData,
        removeClass(this.classes.INPUT)
      )(this.element)
      this.TRIGGER.$empty.remove()
      this.TRIGGER.$fill.remove()
      this.$dropdown.remove()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default MapPicker
