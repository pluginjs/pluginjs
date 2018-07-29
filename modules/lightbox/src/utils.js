const Utils = {
  hasScrollBar(winHeight) {
    return (
      document.body.scrollHeight >
      (winHeight || window.document.documentElement.clientHeight)
    )
  },
  getScrollbarSize() {
    let scrollbarSize = 0
    if (typeof scrollbarSize === 'undefined') {
      const scrollDiv = document.createElement('div')
      scrollDiv.style.cssText =
        'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
      document.body.appendChild(scrollDiv)
      scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
    }
    return scrollbarSize
  }
}

export default Utils
