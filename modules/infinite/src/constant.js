import { insertBefore } from '@pluginjs/dom'
import { isEmpty } from '@pluginjs/is'

export const namespace = 'infinite'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  LOAD: 'load',
  LOADED: 'loaded',
  RENDER: 'render',
  ERROR: 'error',
  END: 'end'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}',
  SENTINELS: '{namespace}-sentinels',
  LOADER: '{namespace}-loader',
  LOADING: '{namespace}-loading',
  END: '{namespace}-end',
  ERROR: '{namespace}-error',
  BUTTON: '{namespace}-button pj-btn',
  HORIZONTAL: '{namespace}-horizontal',
  NEXT: '{namespace}-next'
}

export const methods = ['load', 'enable', 'disable', 'destroy']

export const defaults = {
  trigger: 'scroll', // button
  theme: null,
  item: null,
  horizontal: false,
  loader: {
    color: 'currentColor'
  },
  offset: 0,
  url: null,
  checkEnd(count) {
    return isEmpty(this.getNextUrl(count))
  },
  load(count, resolve, reject) {
    return this.loadFromUrl(count, resolve, reject)
  },
  render(content) {
    insertBefore(content, this.$last)
  },
  fetchOptions: {},
  templates: {
    end() {
      return '<div class="{classes.END}">{endText}</div>'
    },
    error() {
      return '<div class="{classes.ERROR}">{errorText}</div>'
    },
    button() {
      return '<div class="{classes.BUTTON}">{buttonText}</div>'
    }
  }
}

export const translations = {
  en: {
    endText: 'End of Content',
    errorText: 'Load Error',
    buttonText: 'View More'
  },
  zh: {
    endText: '没有更多内容',
    errorText: '加载出错',
    buttonText: '查看更多'
  }
}

export const dependencies = ['whatwg-fetch']
