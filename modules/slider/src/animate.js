export const linear = (direction, distance) => {
  const translate = direction === 'horizontal' ? 'translateX' : 'translateY'
  return {
    prev: {
      transform: `${translate}(${distance}px)`,
      transition: 'all .3s ease 0s',
      zIndex: 1,
      display: 'block',
      opacity: 1,
      visibility: 'hidden'
    },
    current: {
      transform: `${translate}(0px)`,
      transition: 'all .3s ease 0s',
      zIndex: 2,
      display: 'block',
      opacity: 1
    },
    next: {
      transform: `${translate}(${-1 * distance}px)`,
      transition: 'all .3s ease 0s',
      zIndex: 1,
      display: 'block',
      opacity: 1,
      visibility: 'hidden'
    }
  }
}
export const fade = {
  prev: {
    transform: '',
    transition: 'all .3s ease 0s',
    zIndex: 1,
    display: 'block',
    opacity: 0,
    visibility: 'hidden'
  },
  current: {
    transform: '',
    transition: 'all .3s ease 0s',
    zIndex: 2,
    display: 'block',
    opacity: 1,
    visibility: 'visible'
  },
  next: {
    transform: '',
    transition: 'all .3s ease 0s',
    zIndex: 1,
    display: 'block',
    opacity: 0,
    visibility: 'hidden'
  }
}
export const cube = (direction, distance) => {
  const half = (value, percent) => {
    const defaultPercent = 2
    return value / (percent || defaultPercent)
  }
  const halfRotate = half('180')
  const rotate = direction === 'horizontal' ? 'rotateY' : 'rotateX'
  const value = direction === 'horizontal' ? halfRotate : halfRotate * -1
  return {
    prev: {
      transform: `${rotate}(${value}deg) translateZ(${half(distance)}px)`,
      transition: 'all .7s cubic-bezier(0.15, 0.9, 0.25, 1) 0s',
      zIndex: 1,
      display: 'block',
      opacity: 1,
      visibility: 'hidden'
    },
    current: {
      transform: `${rotate}(0deg) translateZ(${half(distance)}px)`,
      transition: 'all .7s cubic-bezier(0.15, 0.9, 0.25, 1) 0s',
      zIndex: 2,
      display: 'block',
      opacity: 1,
      visibility: 'visible'
    },
    next: {
      transform: `${rotate}(${-1 * value}deg) translateZ(${half(distance)}px)`,
      transition: 'all .7s cubic-bezier(0.15, 0.9, 0.25, 1) 0s',
      zIndex: 1,
      display: 'block',
      opacity: 1,
      visibility: 'hidden'
    }
  }
}
