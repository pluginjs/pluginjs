import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
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
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import PopDialog from '@pluginjs/pop-dialog'
import Gmap from '@pluginjs/gmap'
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
class MapPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

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

    if (!is.emptyObject(this.data)) {
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
    wrap($wrap, addClass(this.classes.INFO, this.element))
    this.$wrap = parentWith(
      el => el.matches(`.${this.classes.NAMESPACE}`),
      this.element
    )

    // create init
    this.$init = parseHTML(
      this.createEl('init', {
        class: this.classes.INIT,
        icon: this.classes.ICON,
        addPlace: this.translate('addPlace')
      })
    )

    // create preview
    this.$preview = parseHTML(
      this.createEl('preview', {
        class: this.classes.PREVIEW,
        icon: this.classes.ICON,
        content: this.classes.PREVIEWCONTENT,
        placename: this.classes.PREVIEWNAME,
        coord: this.classes.PREVIEWCOORD,
        action: this.classes.PREVIEWACTION
      })
    )
    this.$previewName = query(`.${this.classes.PREVIEWNAME}`, this.$preview)
    this.$previewCoord = query(`.${this.classes.PREVIEWCOORD}`, this.$preview)

    // create preview action
    this.$previewAction = parseHTML(
      this.createEl('previewAction', {
        class: this.classes.PREVIEWACTION,
        edit: this.classes.EDIT,
        remove: this.classes.REMOVE
      })
    )

    // create panel
    this.$panel = parseHTML(
      this.createEl('panel', {
        class: this.classes.PANEL,
        content: this.classes.CONTENT
      })
    )

    this.$wrap.append(this.$init, this.$preview, this.$panel)

    this.$preview.append(this.$previewAction)
    this.buildPanelItem()
    this.buildPop()
  }

  buildPop() {
    const that = this

    this.pop = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$previewAction),
      {
        placement: 'bottom',
        content: this.translate('deleteTitle'),
        buttons: {
          cancel: { label: this.translate('cancel') },
          delete: {
            label: this.translate('delete'),
            color: 'danger',
            fn(resolve) {
              addClass(that.classes.REMOVEANIMATE, that.$preview)
              setTimeout(() => {
                that.clear()
                removeClass(that.classes.REMOVEANIMATE, that.$preview)
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
        class: this.classes.ITEM,
        title: this.classes.ITEMTITLE,
        titleName: this.translate('place'),
        type: this.classes.PLACE
      })
    )

    // create action
    this.$action = parseHTML(
      this.createEl('action', {
        class: this.classes.ACTION,
        cancel: this.classes.CANCEL,
        save: this.classes.SAVE,
        saveTitle: this.translate('save'),
        cancelTitle: this.translate('cancel')
      })
    )

    list.push(this.$place)
    if (this.options.showLatlng) {
      const $lat = parseHTML(
        this.createEl('item', {
          class: this.classes.ITEM,
          title: this.classes.ITEMTITLE,
          titleName: this.translate('latitude'),
          type: this.classes.LAT
        })
      )

      const $lng = parseHTML(
        this.createEl('item', {
          class: this.classes.ITEM,
          title: this.classes.ITEMTITLE,
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

    this.$panel.append(...list)

    // this.initMap();
  }

  initMap(set = false) {
    const that = this
    const $map = query(`.${this.classes.MAP}`, this.$panel)

    const options = deepMerge(this.options.gmapOptions, {
      onReady() {
        // console.log('google map is on ready.')
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
    const $place = query(`.${this.classes.PLACE}`, this.$panel)

    const config = {}

    this.autoComplete = new google.maps.places.Autocomplete($place, config)

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

    // set lat&lng preview
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

      const latlng = new google.maps.LatLng(position)
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
      // preview action button event
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.PREVIEWACTION} .${this.classes.EDIT}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.open()
        }
      }),
      // $preview event
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          if (this.is('holdHover')) {
            return
          }

          removeClass(this.classes.HOVER, this.$preview)
          this.leave('holdHover')
        }
      }),
      // $preview event
      bindEvent({
        type: this.eventName('mouseover'),
        identity: {
          type: 'selector',
          value: `.${this.classes.PREVIEW}`
        },
        handler: () => {
          if (this.is('disabled')) {
            return
          }

          addClass(this.classes.HOVER, this.$preview)
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        identity: {
          type: 'selector',
          value: `.${this.classes.INIT}`
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
      removeClass(this.classes.HOVER, this.$preview)
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
        query(`.${this.classes.LAT}`, this.$panel)
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
        query(`.${this.classes.LNG}`, this.$panel)
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

    addClass(this.classes.SHOW, this.$wrap)
    this.enter('open')
  }

  close() {
    removeClass(this.classes.SHOW, this.$wrap)
    this.leave('open')
  }

  hasLatlng() {
    return is.number(this.data.lat) && is.number(this.data.lng)
  }

  set(data) {
    if (is.emptyObject(data)) {
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
    if (is.undefined(data)) {
      return this.options.process.call(this, this.get())
    }

    if (is.string(data)) {
      data = this.options.parse.call(this, data)
      return this.set(data)
    }
    return false
  }

  update() {
    this.$previewName.textContent = this.data.place
    if (this.hasLatlng()) {
      const latitude = `${this.translate('latitude')}:${this.data.lat.toFixed(
        2
      )}`
      const longitude = `${this.translate('longitude')}:${this.data.lng.toFixed(
        2
      )}`
      this.$previewCoord.textContent = `${latitude} ${longitude}`
    }
    this.element.value = this.val()
    addClass(this.classes.FILL, this.$wrap)
  }

  clear() {
    this.data = {}
    removeClass(this.classes.FILL, this.$wrap)
    children(query(`.${this.classes.PREVIEWCONTENT}`, this.$preview)).forEach(
      el => {
        el.textContent = ''
      }
    )
    query(`.${this.classes.ITEM} input`, this.$panel).value = ''

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
      // console.log('text', this.$wrap)
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
        // this.$wrapper.removeClass(this.getThemeClass());
      }
      compose(unwrap, clearData, removeClass(this.classes.INFO))(this.element)
      this.$init.remove()
      this.$preview.remove()
      this.$panel.remove()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default MapPicker
