export const namespace = 'tableSort'

export const events = {
  UPDATE: 'update',
  READY: 'ready',
  ENABLE: 'enable',
  DISABLE: 'disable',
  DESTROY: 'destroy'
}

export const classes = { NAMESPACE: `pj-${namespace}` }

export const methods = [
  'enable',
  'disable',
  'destroy',
  'append',
  'replace',
  'sort'
]

export const defaults = {
  icons: {
    sort: 'pj-icon pj-icon-sort',
    asc: 'pj-icon pj-icon-sort-ascending',
    desc: 'pj-icon pj-icon-sort-descending'
  }
}
