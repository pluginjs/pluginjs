export default function({ target, delay, duration, loop }) {
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
  // console.log(widthList);
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
    translateY: childrens.map(() => {
      const value = childrenWrap((el, i) => i * clientHeight * -1)
      return {
        value,
        duration
      }
    }),
    rotateX: childrens.map((v, keyframeIndex) => {
      const value = childrenWrap((el, i) => {
        if (keyframeIndex === childrens.length - 1 && i === 0) {
          return 0
        }
        if (keyframeIndex === childrens.length - 2 && i === 0) {
          return -90
        }
        if (i === keyframeIndex + 1) {
          return 0
        }
        if (i > keyframeIndex + 1) {
          return -90
        }
        if (i < keyframeIndex + 1) {
          return 90
        }
        // return 90
        return undefined
      })
      return {
        value,
        duration
      }
    }),
    translateZ: childrens.map(() => {
      const value = childrenWrap(() => `${clientHeight}px`)
      return {
        value,
        duration
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
    duration,
    delay,
    loop
  }
}
