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
  childrens.forEach(el => {
    el.style.opacity = 0
    el.style.position = 'absolute'
  })
  const clientHeight = target.parentElement.clientHeight
  target.style.height = `${clientHeight}px`
  const DOWNTOMID = [clientHeight, 0]
  const MIDTOUP = [0, clientHeight * -1]
  const UPTOHIDDEN = [clientHeight * -1, clientHeight * -1]
  const totalDuration = duration * childrens.length
  const delayDuration = totalDuration / 4
  const childrensDuration = totalDuration - delayDuration
  const animationGroup = SyncAnimation.of().createAnimationGroup(
    anime => anime.pause(),
    anime => anime.play()
  )
  const joinSyncAnimationGroup = anime => animationGroup.push(anime)
  return {
    container: {
      targets: target,
      width: [
        [widthList[widthList.length - 1], widthList[0]],
        ...widthList.slice(1)
      ],
      duration: totalDuration,
      easing: 'easeInOutQuart',
      begin: joinSyncAnimationGroup,
      loop
    },
    childrens: childrens.map(el => {
      return {
        targets: el,
        opacity: [[0, 1], 1, [1, 0]],
        translateY: [
          DOWNTOMID,
          MIDTOUP,
          { value: UPTOHIDDEN, delay: delayDuration }
        ],
        duration: childrensDuration,
        begin: joinSyncAnimationGroup,
        complete: () => {
          childrens.forEach((el, index) => {
            Object.assign(el.style, childrensOriginStyle[index])
          })
        },
        loop,
        delay
      }
    })
  }
}
