export const namespace = 'dynamicNumber'

export const events = {
  READY: 'ready',
  START: 'start',
  STOP: 'stop',
  FINISH: 'finish',
  RESET: 'reset',
  DESTROY: 'destroy'
}

export const methods = ['start', 'stop', 'finish', 'reset', 'destroy', 'go']

export const defaults = {
  from: 0,
  to: 100,
  duration: 1000,
  decimals: 0,
  format(n, options) {
    return n.toFixed(options.decimals)
  },
  percentage: { decimals: 0 },
  currency: {
    indicator: '$',
    size: 3,
    decimals: '2',
    separator: ',',
    decimalsPoint: '.'
  },
  group: {
    size: 3,
    decimals: '2',
    separator: ',',
    decimalsPoint: '.'
  }
}

