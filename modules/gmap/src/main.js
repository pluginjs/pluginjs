import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { isObject } from '@pluginjs/is'
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
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

let googleMapsApiLoaded = false

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Gmap extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    this.markers = []
    addClass(this.classes.ELEMENT, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.setupStates()
    if (!(isObject(window.google) && window.google.maps)) {
      console.log(11)
      this.loadScript()
    } else {
      console.log(22)
      this.initialize()
    }
  }

  loadScript() {
    if (googleMapsApiLoaded) {
      return null
    }
    googleMapsApiLoaded = true
    const script = document.createElement('script')
    script.type = 'text/javascript'
    const key = this.options.apiKey ? `&key=${this.options.apiKey}` : ''
    script.src = `${
      document.location.protocol
    }//maps.googleapis.com/maps/api/js?callback=gmapOnScriptLoaded${key}`
    if (this.options.libraries) {
      script.src += `&libraries=${this.options.libraries}`
    }

    document.body.appendChild(script)

    return null
  }

  initialize() {
    const options = this.options
    const mapOptions = {
      backgroundColor: options.backgroundColor,
      center: new window.google.maps.LatLng(
        options.latitude,
        options.longitude
      ),
      disableDefaultUI: !options.defaultUI,
      disableDoubleClickZoom: !options.doubleClickZoom,
      draggable: true,
      keyboardShortcuts: true,
      mapTypeControl: options.mapTypeControl,
      mapTypeControlOptions: {},
      mapTypeId: window.google.maps.MapTypeId[options.mapType],
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      panControl: options.panControl,
      panControlOptions: {},
      rotateControl: options.rotateControl,
      rotateControlOptions: {},
      scaleControl: options.scaleControl,
      scaleControlOptions: {},
      scrollwheel: options.scrollwheel,
      streetViewControl: options.streetViewControl,
      streetViewControlOptions: {},
      zoom: options.zoom,
      zoomControl: options.zoomControl,
      zoomControlOptions: {}
    }

    if (options.controlsPositions.mapType) {
      mapOptions.mapTypeControlOptions.position =
        options.controlsPositions.mapType
    }
    if (options.controlsPositions.pan) {
      mapOptions.panControlOptions.position = options.controlsPositions.pan
    }
    if (options.controlsPositions.rotate) {
      mapOptions.rotateControlOptions.position =
        options.controlsPositions.rotate
    }
    if (options.controlsPositions.scale) {
      mapOptions.scaleControlOptions.position = options.controlsPositions.scale
    }
    if (options.controlsPositions.streetView) {
      mapOptions.streetViewControlOptions.position =
        options.controlsPositions.streetView
    }
    if (options.controlsPositions.zoom) {
      mapOptions.zoomControlOptions.position = options.controlsPositions.zoom
    }
    if (options.styles) {
      mapOptions.styles = options.styles
    }

    const process = () => {
      this.MAP = new window.google.maps.Map(this.element, mapOptions)

      if (this.options.marker) {
        this.addMarker({
          latitude: options.latitude,
          longitude: options.longitude,
          address: options.address,
          content: options.content,
          popup: options.popup
        })
      }

      this.addMarkers(this.options.markers)
      this.enter('initialized')
      this.trigger(EVENTS.READY)
    }

    this.GEOCEDER = new window.google.maps.Geocoder()

    if (options.address) {
      this.GEOCEDER.geocode({ address: options.address }, result => {
        if (result && result.length) {
          mapOptions.center = result[0].geometry.location
        }
        process()
      })
    } else {
      process()
    }
  }

  getMap() {
    return this.MAP
  }

  removeMarker(index) {
    this.markers[index].setMap(null)
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.removeMarker(i)
    }

    this.markers = []
  }

  addMarker(opts, move = false) {
    const markerOptions = {}

    opts = Object.assign(
      {
        icon: this.options.icon,
        content: '',
        popup: false
      },
      opts
    )

    markerOptions.draggable = opts.draggable
    markerOptions.icon = {
      url: opts.icon.url,
      size: new window.google.maps.Size(opts.icon.size[0], opts.icon.size[1]),
      anchor: new window.google.maps.Point(
        opts.icon.anchor[0],
        opts.icon.anchor[1]
      )
    }

    const process = () => {
      const marker = new window.google.maps.Marker(markerOptions)
      marker.setMap(this.MAP)
      this.markers.push(marker)

      if (opts.content) {
        const infowindow = new window.google.maps.InfoWindow({
          content: `<div class="${this.classes.CONTENT}">${opts.content}</div>`
        })

        window.google.maps.event.addListener(marker, 'click', () => {
          infowindow.open(this.MAP, marker)
        })

        if (opts.popup) {
          infowindow.open(this.MAP, marker)
        }
      }
    }

    if (
      Object.prototype.hasOwnProperty.call(opts, 'latitude') &&
      Object.prototype.hasOwnProperty.call(opts, 'longitude') &&
      opts.latitude &&
      opts.longitude
    ) {
      markerOptions.position = new window.google.maps.LatLng(
        opts.latitude,
        opts.longitude
      )

      if (move) {
        this.move(markerOptions.position)
      }

      process()
    } else if (Object.prototype.hasOwnProperty.call(opts, 'address')) {
      this.GEOCEDER.geocode({ address: opts.address }, result => {
        if (result && result.length) {
          markerOptions.position = result[0].geometry.location
          process()
        }
      })
    }
  }

  move(location) {
    this.MAP.panTo(location)
  }

  addMarkers(array) {
    for (let i = 0; i < array.length; i++) {
      this.addMarker(array[i])
    }

    return this.markers
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
      removeClass(this.classes.ELEMENT, this.element)

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

window.gmapOnScriptLoaded = () => {
  Gmap.getInstances().forEach(instance => instance.initialize())
}

export default Gmap
