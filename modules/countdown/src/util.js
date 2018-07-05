import { query } from '@pluginjs/dom'

// diff time
const getDiffTime = endTime => {
  let time = 0
  const nowTime = new Date().getTime()

  if (endTime >= nowTime) {
    time = (endTime - nowTime) / 1000
  }

  return time
}

const formatTime = i => {
  if (i < 10) {
    i = `0${i}`
  }
  return i
}

// set time value
const updateDomValue = (className, element, value) => {
  if (element !== null) {
    const dom = query(className, element)
    dom.innerHTML = formatTime(value)
  }
}

export { getDiffTime, formatTime, updateDomValue }
