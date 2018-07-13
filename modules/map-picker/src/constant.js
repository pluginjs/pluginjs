import is from '@pluginjs/is'

export const namespace = 'mapPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  MAP: '{namespace}-map',
  INFO: '{namespace}-info',
  INIT: '{namespace}-init',
  FILL: '{namespace}-fill',
  HOVER: '{namespace}-hover',
  REMOVEANIMATE: '{namespace}-remove-animate',
  PREVIEW: '{namespace}-preview',
  PREVIEWACTION: '{namespace}-preview-action',
  PREVIEWCONTENT: '{namespace}-preview-content',
  PREVIEWNAME: '{namespace}-preview-name',
  PREVIEWCOORD: '{namespace}-preview-coord',
  EDIT: '{namespace}-edit',
  REMOVE: '{namespace}-remove',
  ICON: '{namespace}-icon',
  PANEL: '{namespace}-panel',
  CONTENT: '{namespace}-panel-content',
  ITEM: '{namespace}-item',
  ITEMTITLE: '{namespace}-item-title',
  LAT: '{namespace}-lat',
  LNG: '{namespace}-lng',
  PLACE: '{namespace}-place',
  ACTION: '{namespace}-action',
  CANCEL: '{namespace}-canel',
  SAVE: '{namespace}-save',
  SHOW: '{namespace}-show',
  LOADING: '{namespace}-loading',
  LOADINGWRAP: '{namespace}-loading-wrap',
  DISABLED: '{namespace}-disabled'
}

export const methods = ['set', 'get', 'val', 'enable', 'disable', 'destroy']

export const defaults = {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  icon: 'icon-pin-map',
  disabled: false,
  place: null, // set place, priority the coord
  latlng: {}, // {lat: xxx, lng: xxx}
  showLatlng: true,
  gmapOptions: {
    // gmap plugin options
    apiKey: 'AIzaSyDSx-q31rWQKqLwUahg6TrZ3R_5NT0LhFE',
    mapTypeControl: false,
    zoomControl: true,
    zoom: 12,
    libraries: 'places'
  },
  markerOptions: { draggable: true },
  templates: {
    init() {
      return `<div class="{class}"><i class="{icon} icon-pin-map"></i>{addPlace}
      </div>`
    },
    preview() {
      return `<div class="{class}"><i class="{icon} icon-pin-map"></i><div class='{content}'><span class='{placename}'></span><span class='{coord}'></span></div>
      </div>`
    },
    previewAction() {
      return `<div class="{class}"><i class="{edit} icon-pencil-square"></i><i class="{remove} icon-trash"></i>
      </div>`
    },
    panel() {
      return `<div class='{class}'><div class='{content}'></div>
      </div>`
    },
    action() {
      return `<div class='{class}'><button type='button' class='{cancel} pj-btn pj-btn-transparent'>{cancelTitle}</button><button type='button' class='{save} pj-btn pj-btn-primary'>{saveTitle}</button>
      </div>`
    },
    item() {
      return `<div class='{class}'><span class='{title}'>{titleName}</span><input class='{type} pj-input' type="text">
      </div>`
    },
    loading() {
      return `<div class='{classwrap}'><div class='{class}'></div>
      </div>`
    }
  },
  parse(data) {
    if (data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        return {}
      }
    }
    return {}
  },
  process(data) {
    if (data && !is.undefined(data)) {
      return JSON.stringify(data)
    }
    return ''
  }
}

export const dependencies = ['gmap', 'pop-dialog']

export const translations = {
  en: {
    cancel: 'Cancel',
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete',
    addPlace: 'Add Places',
    save: 'Save',
    place: 'Places',
    latitude: 'Latitude',
    longitude: 'Longitude'
  },
  zh: {
    cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除',
    addPlace: '添加地址',
    save: '保存',
    place: '地址',
    latitude: '纬度',
    longitude: '经度'
  }
}
