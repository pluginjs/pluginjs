import SyncAnimation from './sync-animation'

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
  const childrensOriginStyle = childrens.map(el => {
    const styles = window.getComputedStyle(el)
    const originStyle = {
      opacity: styles.opacity,
      position: styles.position
    }
    el.style.opacity = 0
    el.style.position = 'absolute'
    return originStyle
  })
  target.style.height = `${target.parentElement.clientHeight}px`
  const animationGroup = SyncAnimation.of().createAnimationGroup(
    anime => anime.pause(),
    anime => anime.play()
  )
  const joinSyncAnimationGroup = anime => animationGroup.push(anime)
  const totalDuration = duration * childrens.length
  const childrensDuration = totalDuration / 2
  const delayDuration = childrensDuration / 4
  const shownDuration = (childrensDuration - delayDuration) / 15
  const gradientDuration =
    (childrensDuration - delayDuration - shownDuration) / 2
  return {
    container: {
      targets: target,
      width: [
        [widthList[widthList.length - 1], widthList[0]],
        ...widthList.slice(1)
      ],
      duration: 1000 * childrens.length,
      easing: 'easeInOutQuart',
      begin: joinSyncAnimationGroup,
      loop
    },
    childrens: childrens.map(el => {
      return {
        targets: el,
        opacity: [
          { value: [0, 1], duration: gradientDuration }, // 700
          { value: 1, duration: shownDuration }, // 100
          { value: [1, 0], duration: gradientDuration }, // 700
          {
            value: 0,
            duration: delayDuration, // 500
            delay: childrensDuration // 2000
          }
        ],
        easing: 'easeInOutQuart',
        duration: childrensDuration, // 2000
        begin: joinSyncAnimationGroup,
        complete: () => {
          childrens.forEach((el, index) => {
            Object.assign(el.style, childrensOriginStyle[index])
          })
        },
        delay,
        loop
      }
    })
  }
}
