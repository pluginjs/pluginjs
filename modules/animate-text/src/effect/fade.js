export default ({ target, delay, duration, loop }) => {
  const childrens = Array.from(target.children)
  const getWidthList = target => {
    const container = target.cloneNode(true)
    container.style.display = 'inline-block'
    container.style.visibility = 'hidden'
    document.body.appendChild(container)
    const widthList = Array.from(container.children).map(
      node => node.offsetWidth
    )
    document.body.removeChild(container)
    return widthList
  }
  const widthList = getWidthList(target)
  const clientHeight = target.clientHeight
  // console.log(widthList)
  const childrenWrap = fn => (el, i) => {
    if (el !== target) {
      return fn(el, i - 1)
    }
    return undefined
  }
  const parentWrap = fn => (el, i) => {
    if (el === target) {
      return fn(el, i)
    }
    return undefined
  }
  return {
    targets: [target, ...childrens],
    translateY: childrens.map((v, keyframeIndex) => {
      let value = childrenWrap(() => clientHeight * (keyframeIndex + 1) * -1)
      if (keyframeIndex === childrens.length - 1) {
        value = childrenWrap(
          (el, i) => (i ? clientHeight * (keyframeIndex + 1) * -1 : 0)
        )
      }
      if (keyframeIndex === childrens.length - 2) {
        value = childrenWrap(
          (el, i) =>
            i ? clientHeight * (keyframeIndex + 1) * -1 : clientHeight
        )
      }
      return {
        value,
        duration: duration / 2,
        delay: duration / 2
      }
    }),
    visibility: childrens.map((v, keyframeIndex) => {
      if (keyframeIndex === childrens.length - 2) {
        return {
          value: childrenWrap((el, i) => (i ? 'visible' : 'hidden')),
          duration
        }
      }
      return {
        value: childrenWrap(() => 'visible'),
        duration
      }
    }),
    opacity: Array.from(
      { length: childrens.length * 2 },
      (v, keyframeIndex) => {
        const isVisible = keyframeIndex % 2
        return {
          value: parentWrap(() => (isVisible ? 1 : 0)),
          duration: duration / 2
        }
      }
    ),
    width: childrens.map((v, keyframeIndex) => {
      if (keyframeIndex === childrens.length - 1) {
        return {
          value: parentWrap(() => widthList[0]),
          duration
        }
      }
      return {
        value: parentWrap(() => widthList[keyframeIndex + 1]),
        duration
      }
    }),
    easing: 'easeInOutQuart',
    // duration,
    delay,
    loop
  }
}
