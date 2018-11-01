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
  selector: 'a',
  activeClass: 'active',
  container: null,
  threshold: 0, //  to be considered upon calculation
  hrefFrom: 'href',
  cloestActive: '',
  reference: 'top' // ["top"|"bottom"] Which side to use as base when calculation element position.
}
