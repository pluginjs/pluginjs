import is from '@pluginjs/is'

export const namespace = 'toggleList'

export const events = {
  READY: 'ready',
  CHECK: 'check',
  UNCHECK: 'uncheck',
  DESTROY: 'destroy'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  THEME: '{namespace}--{theme}',
  SWITCH: '{namespace}-toggle',
  UNCHECKED: '{namespace}-unchecked',
  CHECKED: '{namespace}-checked'
}

export const methods = [
  'set',
  'get',
  'val',
  'toggle',
  'enable',
  'disable',
  'destroy'
]

export const defaults = {
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
    if (data && !is.undefined(data)) {
      return JSON.stringify(data)
    }
    return ''
  }
}

export const dependencies = ['toggle', 'list']

