import { compose } from '@pluginjs/utils'

// time2AST :: String -> AST
const time2AST = time => {
  const [pureTime, format] = time.split(' ')
  const [hour, min] = pureTime.split(':')
  return {
    hour: Number(hour),
    min: Number(min),
    format
  }
}

// parseTimeAST :: AST -> String
const parseTimeAST = timeAST => {
  const { hour, min, format } = timeAST
  const isGtTen = n => (n >= 10 ? n : `0${n}`)  /* eslint-disable-line */
  return `${isGtTen(hour)}:${isGtTen(min)}${format ? ` ${format}` : ''}`
}

// timeAST2Minute :: AST -> minute
const timeAST2Minute = AST => {
  const { hour, min, format } = AST
  switch (format) {
    case 'AM': {
      return hour * 60 + min
    }

    case 'PM': {
      return (hour + 12) * 60 + min
    }

    default: {
      return hour * 60 + min
    }
  }
}

// minute2TimeAST :: minute -> AST
const minute2TimeAST = minute => {
  const hour = Math.floor(minute / 60)
  const min = minute - hour * 60
  return {
    hour,
    min
  }
}

const time2Minute = compose(
  timeAST2Minute,
  time2AST
)

// convertTo12HourFormat :: { hour, min } -> { hour, min, format }
const convertTo12HourFormat = timeAST => {
  const { hour } = timeAST
  if (hour > 12) {
    return {
      ...timeAST,
      hour: hour - 12,
      format: 'PM'
    }
  }
  return {
    ...timeAST,
    format: 'AM'
  }
}

// splitTime :: Number || function -> timeList
const splitTime = (step, range) => {
  const point = i => {
    if (typeof step === 'function') {
      return step(i)
    }
    return Number(step)
  }
  const getTimeList = (range = [0, 24 * 60], result = [], index = 0) => {
    const [minTime, maxTime] = range
    if (maxTime < minTime) {
      return result
    }
    const nextPoint = point(index)
    const nextTotal = maxTime - nextPoint
    const nextTimeNode = result.length
      ? result[result.length - 1] + nextPoint
      : minTime
    return getTimeList([minTime, nextTotal], [...result, nextTimeNode], index++)
  }
  return getTimeList(range)
}

// formatTime :: (boolean, timeList) -> timeList
const formatTime = (use24HourFormat, timeList) => {
  if (!use24HourFormat) {
    return timeList.map(
      compose(
        parseTimeAST,
        convertTo12HourFormat,
        minute2TimeAST
      )
    )
  }

  return timeList.map(
    compose(
      parseTimeAST,
      minute2TimeAST
    )
  )
}

export { time2Minute, splitTime, formatTime }
