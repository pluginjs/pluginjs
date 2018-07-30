import valueParse from './parser'

export const namespace = 'patternPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  WRAP: '{namespace}-wrap',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show',
  CLOSE: '{namespace}-close',
  // init
  INFO: '{namespace}-info',
  INFOIMG: '{namespace}-info-img',
  EDITOR: '{namespace}-editor',
  REMOVE: '{namespace}-remove',
  // EMPTY: '{namespace}-empty',
  HOVER: '{namespace}-hover',
  // panel
  PREVIEWIMG: '{namespace}-preview-img',
  FORECOLOR: '{namespace}-forecolor',
  BGCOLOR: '{namespace}-bgcolor',
  OPACITY: '{namespace}-opacity',
  // select panel
  SELECTORLIST: '{namespace}-selector-list',
  SELECTORITEM: '{namespace}-selector-item',

  DROPDOWN: '{namespace}-dropdown',
  TRIGGER: '{namespace}-trigger',
  INPUT: '{namespace}-input',
  EMPTY: '{namespace}-empty',
  FILL: '{namespace}-fill'
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
  bgcolor: '#eee', // background color.
  disabled: false,
  templates: {
    item() {
      return '<li class="{class}"></li>'
    },
    dropdown() {
      return `<div class='{classes.DROPDOWN}'>
      </div>`
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
      return `<div class='{classes.FILL }'><i class='{icon}'></i>{text}
      </div>`
    },
    empty() {
      return `<div class='{classes.EMPTY}'><image class='{classes.INFOPOSTER}' />
      </div>`
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
      window.value = value
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
      return (
        parseFloat(
          value['background-image']
            .match(/fill-opacity=('|")(.*?)('|")/g)
            .toString()
            .match(/\d\.\d*|\d/g)[0]
        ) * 100
      )
    }
    if (type === 'background-color') {
      return value['background-color']
    }
    return undefined
  }
}

export const dependencies = ['scrollable', 'pop-dialog', 'color-picker']

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
    selectorContent: 'Choose a PatternPicker'
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
    selectorContent: '选择一个模式'
  }
}
