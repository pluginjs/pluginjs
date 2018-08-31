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
  INPUT: '{namespace}-input',
  EMPTY: '{namespace}-empty',
  WRITE: '{namespace}-write',
  TRIGGER: '{namespace}-trigger',
  HOVER: '{namespace}-fill-hover',
  REMOVEANIMATE: '{namespace}-remove-animate',
  FILL: '{namespace}-fill',
  FILLACTION: '{namespace}-fill-action',
  FILLCONTENT: '{namespace}-fill-content',
  FILLNAME: '{namespace}-fill-name',
  FILLCOORD: '{namespace}-fill-coord',
  EDIT: '{namespace}-edit',
  REMOVE: '{namespace}-remove',
  ICON: '{namespace}-icon',
  DROPDOWN: '{namespace}-dropdown',
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
  icon: 'pj-icon pj-icon-pin-map',
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
    trigger() {
      return `<div class="{classes.TRIGGER}">
      </div>`
    },
    empty() {
      return `<div class="{classes.EMPTY}"><i class="{classes.ICON} pj-icon pj-icon-pin-map"></i>{addPlace}
      </div>`
    },
    fill() {
      return `<div class="{classes.FILL}"><i class="{classes.ICON} pj-icon pj-icon-pin-map"></i><div class='{classes.FILLCONTENT}'><span class='{classes.FILLNAME}'></span><span class='{classes.FILLCOORD}'></span></div>
      </div>`
    },
    fillAction() {
      return `<div class="{classes.FILLACTION}"><i class="{classes.EDIT} pj-icon pj-icon-edit"></i><i class="{classes.REMOVE} pj-icon pj-icon-delete"></i>
      </div>`
    },
    dropdown() {
      return `<div class='{classes.DROPDOWN}'><div class='{classes.CONTENT}'></div>
      </div>`
    },
    action() {
      return `<div class='{classes.ACTION}'><button type='button' class='{classes.CANCEL} pj-btn pj-btn-transparent'>{cancelTitle}</button><button type='button' class='{classes.SAVE} pj-btn pj-btn-primary'>{saveTitle}</button>
      </div>`
    },
    item() {
      return `<div class='{classes.ITEM}'><span class='{classes.ITEMTITLE}'>{titleName}</span><input class='{type} pj-input' type="text">
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
    if (data && typeof data !== 'undefined') {
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
