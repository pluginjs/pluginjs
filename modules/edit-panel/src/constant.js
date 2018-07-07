export const namespace = 'editPanel'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGE: 'change',
  OPENPANEL: 'openPanel',
  CLOSEPANEL: 'closePanel',
  OPENSELECTOR: 'openSelector',
  CLOSESELECTOR: 'closeSelector'
}

export const BASIC = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}-{theme}',
  ACTIVE: '{namespace}-active',
  DISABLED: '{namespace}-disabled',
  SHOW: '{namespace}-show',
  FILL: '{namespace}-fill',
  // CLOSE: '{namespace}-close',
  WRAP: '{namespace}-wrap',
  DATA: '{namespace}-data'
}

export const INIT_INFO = {
  INIT: '{namespace}-init',
  INFO: '{namespace}-info',
  INFOCONTENT: '{namespace}-info-content',
  EDITOR: '{namespace}-editor',
  REMOVE: '{namespace}-remove'
}

export const ACTION = {
  ACTION: '{namespace}-action',
  CANCEL: '{namespace}-cancel',
  SAVE: '{namespace}-save'
}

export const PANEL = {
  PANEL: '{namespace}-panel',
  PREVIEW: '{namespace}-preview',
  PREVIEWCONTENT: '{namespace}-preview-content',
  COMPONENT: '{namespace}-component',
  COMPONENTTITLE: '{namespace}-component-title',
  COMPONENTCONTENT: '{namespace}-component-content'
}

export const SELECTOR = {
  SELECTOR: '{namespace}-selector',
  SELECTORWRAP: '{namespace}-selector-wrap',
  SELECTORTITLE: '{namespace}-selector-title',
  SELECTORCONTENT: '{namespace}-selector-content',
  SELECTORCONTENTTITLE: '{namespace}-selector-content-title',
  SELECTORLIST: '{namespace}-selector-list',
  SELECTORITEM: '{namespace}-selector-item'
}

export const classes = {
  ...BASIC,
  ...INIT_INFO,
  ...PANEL,
  ...SELECTOR,
  ...ACTION
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'openPanel',
  'closePanel',
  'openSelector',
  'closeSelector',
  'disabledSelector',
  'enabledSelector'
]

export const defaults = {
  theme: null,
  // pluginName: null, // if has value, The NAMESPACE will be replaced.
  init: {
    icon: 'icon-picture',
    text: 'default text'
  },
  components: [
    {
      title: '', // component's title
      element: null, // component element
      type: '', // colorPicker, switch, spinner and so on. if null, compontent is custom
      options: {} // your selected plugin's option, if type is null, options is disabled.
    }
  ],
  hasSelector: true,
  selector: {
    title: 'default selector title',
    // contentTitle: 'defalut selector content title',
    icon: 'icon-close'
  },
  action: {
    panel: {
      cancel: {
        title: 'Cancel',
        class: ''
      },
      save: {
        title: 'Save',
        class: ''
      }
    },
    selector: {
      cancel: {
        title: 'Cancel',
        class: ''
      },
      save: {
        title: 'Use It',
        class: ''
      }
    }
  },
  templates: {
    // data() {
    //   return `<input class='{class}' type="text"/>`;
    // },
    wrap() {
      return `<div class='{class}'></div>`
    },
    init() {
      return `<div class='{class}'><i class='{icon}'></i>{text}</div>`
    },
    info() {
      return `<div class='{class}'><div class='{content}'></div></div>`
    },
    infoAction() {
      return `<div class='{class}'><i class='icon-pencil-square'></i><i class='icon-trash'></i></div>`
    },
    panel() {
      return `<section class='{class}'>
        <div class='{preview}'>
        </div>
      </section>`
    },
    panelAction() {
      return `<div class='{class}'></div>`
    },
    previewContent() {
      return `<div class='{class}'></div>`
    },
    selector() {
      return `<section class='{class}'>
        <header class='{titleClass}'>
          {title}
          <i class='{close} {icon}'></i>
        </header>
        <div class='{contentClass}'>
        </div>
      </section>`
    },
    selectorList() {
      return `<ul class='{class}'></ul>`
    },
    component() {
      return `<div class='{class}'>
        <span class='{titleClass}'>{title}</span>
        <div class='{contentClass}'></div>
      </div>`
    }
  }
}

export const dependencies = ['modal']

