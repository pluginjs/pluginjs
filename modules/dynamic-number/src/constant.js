export const namespace = 'dynamicNumber'

export const events = {
  READY: 'ready',
  START: 'start',
  STOP: 'stop',
  COMPLETE: 'complete',
  RESET: 'reset',
  RESUME: 'resume',
  RESTART: 'restart',
  UPDATE: 'update',
  DESTROY: 'destroy'
}

export const methods = ['start', 'stop', 'finish', 'reset', 'destroy', 'go']

export const defaults = {
  from: 0,
  to: 100,
  delay: 0,
  duration: 2000,
  decimals: 0,
  loop: false,
  easing: x => x, // 'ease', 'linear', 'ease-in', 'ease-out'
  autoplay: false,
  direction: 'normal', // reverse, alternate
  format(value, options) {
    return value.toFixed(options.decimals)
  }
}
