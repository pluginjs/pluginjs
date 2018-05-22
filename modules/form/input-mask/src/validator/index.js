import { Model, map, reduce } from './model'
import { compose, curry } from '@pluginjs/utils'

const getRange = curry((blocks, index) => {
  if (!index) {
    return [0, blocks[index]]
  }

  const min =
    index >= 2
      ? blocks.filter((v, i) => i < index).reduce((a, b) => a + b)
      : blocks[index - 1]

  const max = blocks.filter((v, i) => i <= index).reduce((a, b) => a + b)
  return [min, max]
})

const sum = (a, b) => a + b

export const computeLens = compose(map(reduce(sum)), Model.of)

// baseFormat :: config => String
export const baseFormat = curry(({ blocks, delimiter }, data) => {
  const range = getRange(blocks)
  const blockLens = computeLens(blocks).join()
  return blocks
    .map((v, k) => data.slice(...range(k)))
    .filter(Boolean)
    .join(delimiter)
    .concat(data.slice(blockLens))
})

export const timeFormat = formattedData =>
  `${formattedData.slice(0, 5)} ${formattedData.slice(5)}`

export const lensLimit = curry((length, data) => {
  if (data.length > length) {
    return data.slice(0, length)
  }
  return data
})

const isNumber = data => {
  const result = !isNaN(Number(data.slice(-1)))
  if (!result) {
    // console.log('not number');
  }
  return result
}

const getNumberByStrRange = curry((data, min, max) => {
  if (data.length > min + 1) {
    return Number(data.slice(min, max))
  }
  return Number(`${data[min]}0`)
})

export const dateLimit = data => {
  const backspace = data.slice(0, -1)
  const range = getNumberByStrRange(data)
  const mm = range(4, 6)
  const dd = range(6, 8)
  // check isNumber
  if (!isNumber(data)) {
    return backspace
  }

  // check mm
  if (mm && mm > 12) {
    return backspace
  }

  // check dd
  if (dd && dd > 31) {
    return backspace
  }

  return data
}

export const timeLimit = curry((hourFormat, data) => {
  const type = ['AM', 'PM']
  const time = data.slice(0, 4)
  const range = getNumberByStrRange(time)
  const min = range(0, 2)
  const sec = range(2, 4)
  const is12Hour = hourFormat === '12'
  const backspace = data.slice(0, -1)

  // check isNumber
  if (!isNumber(time)) {
    return backspace
  }

  if (sec && sec > 60) {
    return backspace
  }

  if (!is12Hour) {
    if (min > 24) {
      return backspace
    }
    return data
  }

  if (min > 12) {
    return backspace
  }

  const unit = data.slice(4).toUpperCase()

  // check string limit
  if (unit.length === 1 && type.map(v => v[0]).find(v => v === unit)) {
    return time + unit
  }

  if (unit.length === 2) {
    if (type.find(v => v === unit)) {
      return time + unit
    }
    return time + unit[0]
  }

  return time
})
