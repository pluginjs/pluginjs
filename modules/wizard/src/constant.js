/* eslint no-empty-function: "off" */
import { find, children } from '@pluginjs/dom'

export const namespace = 'wizard'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  AFTERCHANGE: 'afterChange',
  BEFORECHANGE: 'beforeChange',
  NEXT: 'next',
  BACK: 'back',
  FINISH: 'finish',
  INIT: 'init'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  SUCCESS: '{namespace}-success',
  ERROR: '{namespace}-error',
  STEP: {
    DONE: '{namespace}-done',
    ERROR: '{namespace}-error',
    ACTIVE: '{namespace}-current',
    DISABLED: '{namespace}-disabled',
    ACTIVING: '{namespace}-activing',
    LOADING: '{namespace}-loading',
    FORMGROUP: '{namespace}-formGroup'
  },

  PANE: {
    CONTENT: '{namespace}-content',
    ACTIVE: '{namespace}-active',
    ACTIVING: '{namespace}-activing'
  },

  BUTTONS: {
    CONTAINER: '{namespace}-buttons',
    BACK: '{namespace}-back',
    NEXT: '{namespace}-next',
    FINISH: '{namespace}-finish'
  },

  BUTTON: {
    HIDE: '{namespace}-hide',
    DISABLED: '{namespace}-disabled'
  }
}

export const methods = ['enable', 'disable', 'destroy', 'get']

export const defaults = {
  theme: null,

  step: '.pj-wizard-steps > li',

  getPane(index, step, classes) {
    return children(find(`.${classes.CONTENT}`, step))[index]
  },

  buttonsAppendTo: 'this',
  autoFocus: true,
  keyboard: true,

  enableWhenVisited: false,

  loading: {
    show() {},
    hide() {},
    fail() {}
  },

  cacheContent: false,

  validator() {
    return true
  },

  locale: 'en',
  localeFallbacks: true
}

export const translations = {
  en: {
    back: 'Back',
    next: 'Next',
    finish: 'Finish'
  },
  zh: {
    back: '返回',
    next: '前进',
    finish: '完成'
  }
}
