import Units from '@pluginjs/units'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'unitsRange'

export const events = deepMerge(Units.events, {
  READY: 'ready',
  CHANGE: 'change',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  CHANGEINPUT: 'changeInput',
  CHANGEUNIT: 'changeUnit',
  CHANGESTATIC: 'changeStatic'
})

export const classes = deepMerge(Units.classes, {
  NAMESPACE: 'pj-units',
  CONTAINER: `pj-${namespace}`
})

export const methods = deepMerge(Units.methods, [])

export const defaults = deepMerge(Units.defaults, {})

defaults.units = {
  inherit: false,
  px: {
    min: 0,
    max: 150,
    step: 1
  },
  '%': {
    min: 0,
    max: 100,
    step: 1
  }
}

export const dependencies = ['units', 'range']
