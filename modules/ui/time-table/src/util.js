function isEmpty(value) {
  return typeof value === 'undefined'
}

function dateParse(dateString) {
  const SEPARATOR_BAR = '-'
  const SEPARATOR_SLASH = '/'
  const SEPARATOR_DOT = '.'
  let dateArray
  if (dateString.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateString.split(SEPARATOR_BAR)
  } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
    dateArray = dateString.split(SEPARATOR_SLASH)
  } else {
    dateArray = dateString.split(SEPARATOR_DOT)
  }
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
}

function dateCompare(dateString, compareDateString) {
  const dateTime = dateParse(dateString).getTime()
  const compareDateTime = dateParse(compareDateString).getTime()
  if (compareDateTime > dateTime) {
    return 1
  } else if (compareDateTime == dateTime) {
    return 0
  }
  return -1
}

function isDateBetween(dateString, startDateString, endDateString) {
  if (isEmpty(dateString)) {
    // console.log('dateString不能为空')
    return
  }
  if (isEmpty(startDateString)) {
    // console.log('startDateString不能为空')
    return
  }
  if (isEmpty(endDateString)) {
    // console.log('endDateString不能为空')
    return
  }
  let flag = false
  const startFlag = dateCompare(dateString, startDateString) < 1
  const endFlag = dateCompare(dateString, endDateString) > -1
  if (startFlag && endFlag) {
    flag = true
  }
  return flag
}

const currentColor = ''
let colorStyleIndex = 0
function random(arr) {
  return Math.floor(Math.random() * arr.length + 1) - 1
}
function randomColor() {
  const colorStyle = ['#0ecccc', '#35cc62', '#ffb54c', '#fa6557']
  colorStyleIndex++
  if (colorStyleIndex == colorStyle.length) {
    colorStyleIndex = 0
  }
  return colorStyle[colorStyleIndex]
  // let n = random(colorStyle)
  // if (currentColor !== colorStyle[n]) {
  //   currentColor = colorStyle[n]
  //   return currentColor
  // } else {
  //   return randomColor()
  // }
}

function isDatesBetween(
  startDateString,
  endDateString,
  startDateCompareString,
  endDateCompareString
) {
  if (isEmpty(startDateString)) {
    // console.log('startDateString不能为空')
    return
  }
  if (isEmpty(endDateString)) {
    // console.log('endDateString不能为空')
    return
  }
  if (isEmpty(startDateCompareString)) {
    // console.log('startDateCompareString不能为空')
    return
  }
  if (isEmpty(endDateCompareString)) {
    // console.log('endDateCompareString不能为空')
    return
  }
  let flag = false
  const startFlag = dateCompare(startDateCompareString, startDateString) < 1
  const endFlag = dateCompare(endDateCompareString, endDateString) > -1
  if (startFlag && endFlag) {
    flag = true
  }
  return flag
}

const util = {
  dateParse,
  dateCompare,
  isDateBetween,
  isDatesBetween,
  randomColor
}

export default util
