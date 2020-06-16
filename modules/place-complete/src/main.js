import AutoComplete from '@pluginjs/auto-complete'
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
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  isObject,
  isArray,
  isPlainObject,
  isFunction,
  isString
} from '@pluginjs/is'

let googleMapsApiLoaded = false

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class PlaceComplete extends AutoComplete {
  constructor(element, options = {}) {
    super(element, options)

    if (isString(this.options.types)) {
      this.options.types = [this.options.types]
    }

    if (
      !(
        isObject(window.google) &&
        window.google.maps &&
        window.google.maps.places
      )
    ) {
      this.loadScript()
    } else {
      this.initializePlaces()
    }
  }

  initializePlaces() {
    this.autocompleteService = new window.google.maps.places.AutocompleteService()

    if (this.options.country) {
      this.autocompleteService.setComponentRestrictions({
        country: this.options.country
      })
    }

    this.geocoderService = new window.google.maps.Geocoder()
  }

  queryItems(query = '') {
    // if (query.length < this.options.minChars) {
    //   query = ''
    // }

    this.query = query

    if (!this.autocompleteService) {
      if (isArray(this.options.source) || isPlainObject(this.options.source)) {
        this.resolveData(this.options.source)
      } else if (isFunction(this.options.source)) {
        this.enter('loading')
        this.options.source.call(this, query, this.resolveData.bind(this))
      }
    } else if (query.length >= this.options.minChars) {
      this.fetchPredictions(query)
    }
  }

  fetchPredictions(query) {
    this.autocompleteService.getPlacePredictions(
      {
        input: query,
        types: this.options.types,
        ...this.options.searchOptions
      },
      this.resolvePlaceData.bind(this)
    )
  }

  resolvePlaceData(data, status) {
    if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
      this.trigger(EVENTS.ERROR, status)
      return
    }

    this.resolveData(data)
  }

  geocodeByAddress(address, resolve, reject) {
    this.geocoderService.geocode({ address }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        if (reject) {
          reject(status)
        }
      }
      if (resolve) {
        resolve(results)
      }
    })
  }

  geocodeByPlaceId(placeId, resolve, reject) {
    this.geocoderService.geocode({ placeId }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        if (reject) {
          reject(status)
        }
      }
      if (resolve) {
        resolve(results)
      }
    })
  }

  loadScript() {
    if (googleMapsApiLoaded) {
      return
    }
    googleMapsApiLoaded = true
    const script = document.createElement('script')
    script.type = 'text/javascript'
    const key = this.options.apiKey ? `&key=${this.options.apiKey}` : ''
    script.src = `${
      document.location.protocol
    }//maps.googleapis.com/maps/api/js?callback=placeCompleteOnScriptLoaded${key}&libraries=places`

    document.body.appendChild(script)
  }

  bind() {
    bindEvent(
      this.selfEventName(EVENTS.SELECT),
      (e, api, item) => {
        if (item) {
          this.geocodeByPlaceId(
            item.place_id,
            place => {
              this.setPlace(this.formatPlace(item.description, place[0]))
            },
            (...args) => {
              this.trigger(EVENTS.ERROR, ...args)
            }
          )
        }
      },
      this.element
    )

    bindEvent(
      this.eventName('change'),
      () => {
        const value = this.element.value
        if (value && value.length >= this.options.minChars) {
          this.geocodeByAddress(
            value,
            place => {
              if(place && place.length > 0)
              this.setPlace(this.formatPlace(value, place[0]))
            },
            (...args) => {
              this.trigger(EVENTS.ERROR, ...args)
            }
          )
        }
      },
      this.element
    )
    super.bind()
  }

  setPlace(place) {
    if ((this.place && this.place.address !== place.address) || !this.place) {
      this.place = place

      this.trigger(EVENTS.PLACECHANGE, place)
    }
  }

  findComponent(type, components) {
    return components.find(component => component.types.includes(type))
  }

  formatPlace(address, place) {
    const components = place.address_components
    const locality = this.findComponent('locality', components)
    const administrativeAreaLevel1 = this.findComponent(
      'administrative_area_level_1',
      components
    )
    const administrativeAreaLevel2 = this.findComponent(
      'administrative_area_level_2',
      components
    )
    const country = this.findComponent('country', components)
    const postalCode = this.findComponent('postal_code', components)
    const sublocality = this.findComponent('sublocality', components)
    const route = this.findComponent('route', components)
    const premise = this.findComponent('premise', components)
    const streetNumber = this.findComponent('street_number', components)

    const data = {
      id: place.place_id,
      address,
      location: place.geometry.location,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    }

    if (locality) {
      data.locality = locality.long_name || locality.short_name
    }
    if (administrativeAreaLevel1) {
      data.administrativeAreaLevel1 =
        administrativeAreaLevel1.long_name ||
        administrativeAreaLevel1.short_name
    }
    if (administrativeAreaLevel2) {
      data.administrativeAreaLevel2 =
        administrativeAreaLevel2.long_name ||
        administrativeAreaLevel2.short_name
    }
    if (country) {
      data.countryCode = country.short_name
      data.country = country.long_name
    }
    if (postalCode) {
      data.postalCode = postalCode.long_name
    }
    if (sublocality) {
      data.sublocality = sublocality.short_name
    }
    if (premise) {
      data.premise = premise.long_name
    }
    if (route) {
      data.route = route.long_name
    }
    if (streetNumber) {
      data.streetNumber = streetNumber.short_name
    }

    return data
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    super.unbind()
  }
}

window.placeCompleteOnScriptLoaded = () => {
  PlaceComplete.getInstances().forEach(instance => instance.initializePlaces())
}

export default PlaceComplete
