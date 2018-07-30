const timeType = (type, time) => {
  switch (type) {
    case 's':
      return {
        current: Math.floor(time % 60),
        remain: time,
        step: 60
      }

    case 'TS':
      return {
        current: Math.floor(time),
        remain: time,
        step: 60
      }

    case 'm':
      return {
        current: Math.floor(time / 60) % 60,
        remain: Math.floor(time / 60),
        step: 60
      }

    case 'TM':
      return {
        current: Math.floor(time / 60),
        remain: Math.floor(time / 60),
        step: 60
      }

    case 'h':
      return {
        current: Math.floor(time / 3600) % 24,
        remain: Math.floor(time / 3600),
        step: 24
      }

    case 'TH':
      return {
        current: Math.floor(time / 3600),
        remain: Math.floor(time / 3600),
        step: 24
      }

    case 'd':
      return {
        current: Math.floor(time / 3600 / 24),
        remain: Math.floor(time / 3600 / 24),
        step: 30
      }

    case 'DM':
      return {
        current: Math.floor((time / 3600 / 24) % 30.438),
        remain: Math.floor(time / 3600 / 24),
        step: 30
      }

    case 'DW':
      return {
        current: Math.floor(time / 3600 / 24) % 7,
        remain: Math.floor(time / 3600 / 24),
        step: 7
      }

    case 'W':
      return {
        current: Math.floor(time / 3600 / 24 / 7),
        remain: Math.floor(time / 3600 / 24 / 7),
        step: 4
      }

    case 'WM':
      return {
        current: Math.floor(time / 3600 / 24 / 7) % 4,
        remain: Math.floor(time / 3600 / 24 / 7) % 4,
        step: 4
      }

    case 'M':
      return {
        current: Math.floor(time / 3600 / 24 / 30.4368),
        step: 12
      }

    case 'YM':
      return {
        current:
          Math.floor(time / 3600 / 24 / 365) > 0
            ? Math.floor((time - time / 3600 / 24 / 365) % 30.4368)
            : Math.floor(time / 3600 / 24 / 30.4368),
        step: 12
      }

    case 'Y':
      return {
        current: Math.floor(time / 3600 / 24 / 365),
        remain: Math.floor(time / 3600 / 24 / 365),
        step: 5
      }

    default:
      return {
        current: 0,
        remain: 0,
        step: 0
      }
  }
}

export default timeType
