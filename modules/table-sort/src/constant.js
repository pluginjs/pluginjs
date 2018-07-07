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
  'init',
  'enable',
  'disable',
  'destroy',
  'append',
  'replace',
  'sort'
]

export const defaults = {
  icons: {
    sort: 'icon-sort',
    asc: 'icon-sort-ascending',
    desc: 'icon-sort-descending'
  }
}
