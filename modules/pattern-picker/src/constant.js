/* eslint-disable no-undefined */
import valueParse from './parser'

export const namespace = 'patternPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  SWITCHMODULE: 'switchModule'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  WRAP: '{namespace}-wrap',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  OPENDISABLE: '{namespace}-open-disabled',
  SHOW: '{namespace}-show',
  CLOSE: '{namespace}-close',
  // init
  FILL: '{namespace}-fill',
  FILLIMG: '{namespace}-fill-img',
  TRIGGERACTION: '{namespace}-trigger-action',
  EDITOR: '{namespace}-editor',
  REMOVE: '{namespace}-remove',
  // EMPTY: '{namespace}-empty',
  HOVER: '{namespace}-hover',
  // panel
  PREVIEW: '{namespace}-preview',
  PREVIEWIMG: '{namespace}-preview-img',
  FORECOLOR: '{namespace}-forecolor',
  BGCOLOR: '{namespace}-bgcolor',
  OPACITY: '{namespace}-opacity',

  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  INPUT: '{namespace}-input',
  EMPTY: '{namespace}-empty',
  FIELD: '{namespace}-field {namespace}-{field}',
  FIELDTITLE: '{namespace}-field-title',
  FIELDCONTENT: '{namespace}-field-content',
  CONTROL: '{namespace}-control',
  CANCEL: '{namespace}-cancel',
  SAVE: '{namespace}-save',
  // panel
  PANEL: '{namespace}-panel',
  TRIGGERPANEL: '{namespace}-panel-swicher',
  CONTAINERPANEL: '{namespace}-panel-container',
  COLLECTIONTRIGGER: '{namespace}-panel-swicher-collection',
  CUSTOMTRIGGER: '{namespace}-panel-swicher-custom',
  TRIGGERACTIVE: '{namespace}-panel-swicher-custom-active',
  COLLECTIONPANEL: '{namespace}-panel-collection',
  CUSTOMPANEL: '{namespace}-panel-custom',
  SELECTED: '{namespace}-selected',
  SCHEME: '{namespace}-scheme',
  MANAGE: '{namespace}-manage',
  COLLECTIONITEM: '{namespace}-collection-item',
  COLLECTIONITEMACTIVE: '{namespace}-collection-item-active'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'set',
  'get',
  'val',
  'clear'
]

export const defaults = {
  theme: null,
  locale: 'en',
  data: null, // [json]images data
  bgColor: '#eee', // background color.
  disabled: false,
  module: 'collection', // collection || custom
  manage() {},  /* eslint-disable-line */
  templates: {
    item() {
      return '<li class="{class}"></li>'
    },
    trigger() {
      return `<div class="{classes.TRIGGER}">
      </div>`
    },
    input() {
      return `<div class='{classes.INPUT}'>
      </div>`
    },
    fill() {
      return `<div class='{classes.FILL }'><div class='{classes.FILLIMG}'></div>
      </div>`
    },
    empty() {
      return `<div class='{classes.EMPTY}'><i class='{icon}'></i>{text}
      </div>`
    },
    triggerAction() {
      return `<div class='{classes.TRIGGERACTION}'><i class='pj-icon pj-icon-edit  {classes.EDITOR}'></i><i class='pj-icon pj-icon-remove {classes.REMOVE}'></i>
      </div>`
    },
    panel() {
      return `<div class='{classes.PANEL}'>
      <div class='{classes.TRIGGERPANEL}'>
      <i class="{classes.COLLECTIONTRIGGER}" data-type="collection"></i>
      <i class="{classes.CUSTOMTRIGGER}" data-type="custom"></i>
      </div>
      <div class='{classes.CONTAINERPANEL}'>
      <div class="{classes.COLLECTIONPANEL}"></div>
      <div class="{classes.CUSTOMPANEL}"></div>
      </div>
    </div>`
    },
    foreColor() {
      return `<div class='{field}'>
      <div class='{classes.FIELDTITLE}'>{foreColor}</div>
      <div class='{classes.FIELDCONTENT}'>
      <input class='{classes.FORECOLOR} pj-input' placeholder='choose color' />
      </div>
      </div>`
    },
    bgColor() {
      return `<div class='{field}'>
      <div class='{classes.FIELDTITLE}'>{bgColor}</div>
      <div class='{classes.FIELDCONTENT}'>
      <input class='{classes.BGCOLOR} pj-input' placeholder='choose color' />
      </div>
      </div>`
    },
    opacity() {
      return `<div class='{field}'>
      <div class='{classes.FIELDTITLE}'>{opacity}</div>
      <div class='{classes.FIELDCONTENT}'>
      <input type='text' class='{classes.OPACITY} pj-input' />
      </div>
      </div>`
    },
    scheme() {
      return '<div class="{classes.SCHEME}"></div>'
    },
    manage() {
      return '<div class="pj-btn pj-btn-block {classes.MANAGE}"><i class="pj-icon pj-icon-setting"></i>{manageText}</div>'
    },
    collectionItem() {
      return '<span class="{classes.COLLECTIONITEM}"></span>'
    },
    control() {
      return '<div class="{classes.CONTROL}"><button type="button" class="{classes.SAVE} pj-btn pj-btn-block  pj-btn-outline">{text}</button></div>'
    }
  },

  process(value) {
    if (value && typeof value !== 'undefined') {
      return JSON.stringify(value).replace(/("|\\")/g, '&quot;')
    }
    return ''
  },
  parse(value) {
    if (value) {
      try {
        return valueParse(value)
      } catch (e) {
        return null
      }
    }
    return null
  },
  format(value, type) {
    if (typeof type === 'undefined') {
      return value
    }
    if (type === 'color') {
      let color = value['background-image']
        .match(/fill=('|").*?('|")/g)
        .toString()
        .match(/(\w){6,8}/g)
        .toString()
      if (color.length > 6) {
        color = `#${color.slice(2)}`
      } else {
        color = `#${color}`
      }
      return color
    }
    if (type === 'opacity') {
      if (value['background-image'].match(/fill-opacity=('|")(.*?)('|")/g)) {
        console.log(
          value['background-image'].match(/fill-opacity=('|")(.*?)('|")/g)
        )
        return (
          parseFloat(
            value['background-image']
              .match(/fill-opacity=('|")(.*?)('|")/g)
              .toString()
              .match(/\d\.\d*|\d/g)[0]
          ) * 100
        )
      }
    }
    if (type === 'background-color') {
      return value['background-color']
    }
    return undefined
  }
}

export const dependencies = ['pop-dialog', 'color-selector']

export const translations = {
  en: {
    // cancel: 'Cancel',
    deleteTitle: 'Are you sure you want to delete?',
    delete: 'Delete',
    choosePattern: 'Choose Pattern',
    foreColor: 'ForeColor',
    bgColor: 'BgColor',
    opacity: 'Opacity',
    save: 'Save',
    cancel: 'Cancel',
    useIt: 'Use It',
    selectorTitle: 'Preset Background Library',
    selectorContent: 'Choose a PatternPicker',
    manage: 'Manage',
    collection: 'Collection',
    custom: 'Custom'
  },
  zh: {
    // cancel: '取消',
    deleteTitle: '你确定要删除？',
    delete: '删除',
    choosePattern: '选择图片',
    foreColor: '前颜色',
    bgColor: '背景颜色',
    opacity: '透明度',
    save: '保存',
    cancel: '取消',
    useIt: '使用',
    selectorTitle: '预设背景库',
    selectorContent: '选择一个模式',
    manage: '管理',
    collection: '收藏',
    solid: '自定义'
  }
}
