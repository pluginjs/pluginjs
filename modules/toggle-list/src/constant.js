import List from '@pluginjs/list'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'toggleList'

export const events = {
  READY: 'ready',
  CHECK: 'check',
  UNCHECK: 'uncheck',
  DESTROY: 'destroy'
}

export const classes = deepMerge(List.classes, {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  SWITCH: '{namespace}-toggle',
  UNCHECKED: '{namespace}-unchecked',
  CHECKED: '{namespace}-checked'
})

export const methods = [
  'set',
  'get',
  'val',
  'toggle',
  'enable',
  'disable',
  'destroy'
]

export const defaults = deepMerge(List.defaults, {
  theme: null,
  locale: 'en',
  localeFallbacks: true,
  actions: [
    {
      tagName: 'input',
      trigger: 'pj-toggleList-toggle',
      attrs: 'checked="checked"',
      event: 'click',
      init: null
    }
  ],
  format(data) {
    return JSON.stringify(data, (key, val) => {
      if (key === 'toggle') {
        return undefined
      }
      return val
    })
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
})

export const dependencies = ['toggle', 'list']
