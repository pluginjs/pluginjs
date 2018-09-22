import Select from '@pluginjs/select'
import { deepMerge } from '@pluginjs/utils'
import { isString, isArray } from '@pluginjs/is'

export const namespace = 'multiSelect'

export const events = deepMerge(Select.events, {
  UNSELECT: 'unselect'
})

export const classes = deepMerge(Select.classes, {
  NAMESPACE: 'pj-select',
  WRAP: '{namespace} pj-select-multi',
  CHIP: '{namespace}-chip',
  CHIPUNSELECT: '{namespace}-chip-unselect',
  REACHMAX: '{namespace}-reach-max',
  REACHMAXTEXT: '{namespace}-reach-max-text',
  HIDESELECTED: '{namespace}-hide-selected',
  ALLSELECTED: '{namespace}-all-selected'
})

export const methods = deepMerge(Select.methods, [])

export const defaults = deepMerge(Select.defaults, {
  max: null,
  hideSelected: true,
  parse(value) {
    if (isString(value)) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return []
      }
    }
    return []
  },
  process(value) {
    if (value && isArray(value) && value.length !== 0) {
      return JSON.stringify(value)
    }
    return ''
  },
  templates: {
    chip() {
      return '<div class="{classes.CHIP}" data-value="{option.value}">{option.label}<i class="{classes.CHIPUNSELECT}"></i></div>'
    }
  }
})

export const translations = {
  en: {
    reachMaxText: 'You can only select {max} items'
  },
  zh: {
    reachMaxText: '最多只能选择 {max} 项'
  }
}

export const dependencies = ['select']
