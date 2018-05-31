export const namespace = 'countdown'
export const classes = {
  NAMESPACE: `pj-${namespace}`,
  YEAR: `${namespace}-years`,
  MONTH: `${namespace}-months`,
  WEEK: `${namespace}-weeks`,
  DAY: `${namespace}-days`,
  HOUR: `${namespace}-hours`,
  MINUTES: `${namespace}-minutes`,
  SECONDS: `${namespace}-seconds`,
  NUMBER: `${namespace}-number`,
  PROGRESS: 'progress'
}

export const methods = [
  'enable',
  'disable',
  'destroy',
  'bind',
  'unbind',
  'build'
]

export const dormatDirectiveKeys = {
  Y: 'years',
  M: 'months',
  W: 'weeks',
  d: 'days',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
}

export const defaults = {
  type: 'default',
  format: 'd,h,m,s',
  label: null,
  labelsite: 'under',
  due: '2018-12-28 19:32:28',
  now: null,
  size: 100,
  barcolor: '#ccc',
  barsize: 4,
  trackcolor: '#55a4f2',
  linecap: 'round'
}

export const info = { version: '0.2.2' }
