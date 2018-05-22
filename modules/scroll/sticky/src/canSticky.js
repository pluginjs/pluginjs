class Can {
  static sticky() {
    let _canSticky = false
    if (typeof window !== 'undefined') {
      if (
        window.Modernizr &&
        window.Modernizr.hasOwnProperty('csspositionsticky')
      ) {
        return (_canSticky = window.Modernizr.csspositionsticky)
      }

      const documentFragment = document.documentElement
      const testEl = document.createElement('div')
      documentFragment.appendChild(testEl)
      const prefixedSticky = ['sticky', '-webkit-sticky']

      for (let i = 0; i < prefixedSticky.length; i++) {
        testEl.style.position = prefixedSticky[i]
        _canSticky = Boolean(
          window.getComputedStyle(testEl).position.match('sticky')
        )
        if (_canSticky) {
          break
        }
      }
      documentFragment.removeChild(testEl)
    }
    return _canSticky
  }
}

export default Can
