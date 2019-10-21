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
  disableRootMargin: false,
  rootMargin: null, // also can have values similar to the CSS margin property, e.g."10px 20px 30px 40px"(top, right, bottom, left)
  reference: 'top' // ["top"|"bottom"] Which side to use as base when calculation element position.
}
