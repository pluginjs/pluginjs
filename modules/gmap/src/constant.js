export const namespace = 'gmap'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  ELEMENT: '{namespace}',
  CONTENT: '{namespace}-content'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'addMarker',
  'addMarkers',
  'removerMarker',
  'clearMarkers'
]

export const defaults = {
  theme: null,
  apiKey: '',
  mapType: 'ROADMAP', // ROADMAP, SATELLITE, HYBRID, TERRAIN

  // map options
  backgroundColor: '#e5e3df', // Color used for the background of the Map div.
  defaultUI: true, // Enables/disables all default UI.
  doubleClickZoom: false, // Enables/disables zoom and center on double click.
  mapTypeControl: true, // The initial enabled/disabled state of the Map type control.
  maxZoom: null, // The maximum zoom level which will be displayed on the map. If omitted, or set to null, the maximum zoom from the current map type is used instead.
  minZoom: null, // The minimum zoom level which will be displayed on the map. If omitted, or set to null, the minimum zoom from the current map type is used instead.
  panControl: false, // The enabled/disabled state of the Pan control.
  rotateControl: false, // The enabled/disabled state of the Rotate control.
  scaleControl: false, // The initial enabled/disabled state of the Scale control.
  scrollwheel: false, // If false, disables scrollwheel zooming on the map.
  streetViewControl: false, // The initial enabled/disabled state of the Street View Pegman control.
  styles: false, // Styles to apply to each of the default map types.
  zoom: 3, // The initial Map zoom level
  zoomControl: true, // The enabled/disabled state of the Zoom control.

  controlsPositions: {
    mapType: null,
    pan: null,
    rotate: null,
    scale: null,
    streetView: null,
    zoom: null
  },

  // position
  latitude: null,
  longitude: null,
  address: '',

  // markers
  markers: [],
  icon: {
    url: 'http://www.google.com/mapfiles/marker.png',
    size: [20, 34],
    anchor: [9, 34]
  },

  // marker
  marker: true,
  content: '',
  popup: true,

  // google libraries
  libraries: null,

  // callback
  onInit: null,
  onReady: null
}

export const info = { version: '0.3.4' }
