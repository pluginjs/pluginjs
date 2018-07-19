import { query } from '@pluginjs/dom'
import Gmap from '@pluginjs/gmap'

const element = query('#marker .gmap')
Gmap.of(element, {
  piKey: 'AIzaSyDSx-q31rWQKqLwUahg6TrZ3R_5NT0LhFE'
})
