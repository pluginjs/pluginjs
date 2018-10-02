import { query } from '@pluginjs/dom'
import PlaceComplete from '@pluginjs/place-complete'

const element = query('#default .example')
PlaceComplete.of(element, {
  onPlaceChange(place) {
    console.info(place)
  }
})
