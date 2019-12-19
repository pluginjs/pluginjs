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

export const dependencies = ['units', 'range']
