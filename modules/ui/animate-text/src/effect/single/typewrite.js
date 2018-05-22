export default ({ target, duration, loop, delay }) => {
  const text = target.textContent
  const textArr = text.split('')
  const chunk = Array(textArr.length + 1)
    .fill(1)
    .map((v, k) => k)
  const indexList = chunk.concat(chunk.slice().reverse())
  const myObject = { textLen: 0 }
  return {
    targets: myObject,
    textLen: indexList.length - 1,
    duration: duration || 2000,
    easing: 'linear',
    round: 1,
    loop: loop || false,
    delay,
    update: () => {
      const text = textArr.slice(0, indexList[myObject.textLen]).join('')
      target.textContent = `${text}|`
    }
  }
}
