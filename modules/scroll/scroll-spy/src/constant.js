export const namespace = 'scrollSpy'

export const events = {
  READY: 'ready',
  DESTROY: 'destroy',
  CHANGE: 'change',
  ENABLE: 'enable',
  DISABLE: 'disable'
}

export const methods = ['destroy', 'getCurrHref', 'enable', 'disable']

export const defaults = {
  itemSelector: 'a',
  activeClass: 'active',
  threshold: 0, //  to be considered upon calculation
  hashTimeout: 600,
  hrefFrom: 'data-href',
  changeHash: true,
  cloestActive: '',
  reference: 'top' // ["top"|"bottom"] Which side to use as base when calculation element position.
}

export const info = { version: '0.0.1' }
