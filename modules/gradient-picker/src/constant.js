export const namespace = 'gradientPicker'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  UPDATE: 'update',
  CHANGE: 'change',
  COLORCHANGE: 'colorChange',
  CLICK: 'click'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  INPUT: '{namespace}-input',
  TRIGGER: '{namespace}-trigger',
  DISABLED: '{namespace}-disabled',
  CLEARABLE: '{namespace}-clearable',
  CLEAR: '{namespace}-clear',
  // panel
  PANEL: '{namespace}-panel',
  INLINE: '{namespace}-inline',
  HANDLE: '{namespace}-handle',
  CONTENT: '{namespace}-content',
  CONTROL: '{namespace}-control',
  // preview
  PREVIEW: '{namespace}-preview',
  PREVIEWCOLOR: '{namespace}-preview-color',
  PREVIEWBG: '{namespace}-preview-bg',
  COLORPICKER: '{namespace}-colorPicker',
  // handle
  BAR: '{namespace}-bar',
  BARVIEW: '{namespace}-bar-view',
  // CONTENT: '{namespace}-content',
  DELETE: '{namespace}-delete',
  DELETEACTIVE: '{namespace}-delete-active',
  MODE: '{namespace}-mode',

  MARKER: '{namespace}-marker',
  MARKERACTIVE: '{namespace}-marker-active',
  WHEEL: '{namespace}-wheel',
  WHEELHANDLE: '{namespace}-wheel-handle',
  WHEELANGLE: '{namespace}-wheel-angle',

  SAVE: '{namespace}-save'
}

export const methods = ['enable', 'disable', 'destroy']

export const translations = {
  en: {
    ok: 'OK'
  },
  zh: {
    ok: 'DONE'
  }
}

export const defaults = {
  responsiveDropdownFull: true,
  theme: null,
  placeholder: 'choose color',
  inline: false,
  clearable: false,
  clickWindowHide: true,
  touchOff: null,
  reference: null,
  dropdown: {
    placement: 'bottom-start' // top
  },
  templates: {
    wrap() {
      return '<div class="{classes.NAMESPACE}"></div>'
    },
    preview() {
      return `<div class="{classes.PREVIEW}">
      <span class="{classes.PREVIEWCOLOR}"></span>
      <span class="{classes.PREVIEWBG}"></span>
            </div>`
    },
    remove() {
      return '<i class="{classes.REMOVE} pj-icon pj-icon-remove"></i>'
    },
    panel() {
      return `<div class="{classes.PANEL}">
      <div class="{classes.HANDLE}"></div>
      <div class="{classes.CONTENT}">
      <input type="type" class="{classes.COLORPICKER}" />
      </div>
      <div class="{classes.CONTROL}"></div>
    </div>`
    },
    actionBar() {
      return `<div class="{classes.BAR}">
        <div class="{classes.BARVIEW}"></div>
        </div>`
    },
    wheel() {
      return `<div class="{classes.WHEEL}">
        <div class="{classes.WHEELHANDLE}"></div>
        </div>`
    },
    angle() {
      return '<input class="pj-input pj-input-sm {classes.WHEELANGLE}" type="text"/>'
    },
    delete() {
      return '<i class="pj-icon pj-icon-trash {classes.DELETE}"></i>'
    },
    selector() {
      return `<div class='{classes.MODE}'>
        <input type="text" />
        </div>`
    },
    save() {
      return '<button type="button" class="{classes.SAVE} pj-btn pj-btn-block pj-btn-outline">{text}</button>'
    }
  },
  process(data) {
    return JSON.stringify(data)
  }
}

export const dependencies = []
