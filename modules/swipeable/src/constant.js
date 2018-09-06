export const namespace = 'swipeable'

export const events = {
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy',
  START: 'start',
  MOVE: 'move',
  END: 'end',
  RESIZE: 'resize',
  SNAIL: 'snail',
  THROW: 'throw',
  DECAYEND: 'decayend',
  REBOUND: 'rebound',
  REBOUNDEND: 'reboundend'
}

export const classes = {
  NAMESPACE: `pj-${namespace}`,
  CONTAINER: '{namespace}-container',
  VERTICAL: '{namespace}-vertical',
  DISABLED: '{namespace}-disabled'
}

export const methods = ['enable', 'disable', 'destroy']

export const defaults = {
  container: null,
  rebound: false,
  reboundPos: 100, // 1%~100% (without %)
  offset: 0,
  duration: 400,
  power: 2,
  decay: false,
  axis: 'x' // 'x' or 'y'
}

export const dependencies = ['Hammer', 'anime']
