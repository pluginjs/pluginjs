const formaters = {
  percentage(n, options) {
    return `${n.toFixed(options.decimals)}%`
  },
  currency(n, options) {
    return options.indicator + formaters.group(n, options)
  },
  group(n, options) {
    const decimals = options.decimals
    let s = ''
    if (decimals) {
      const k = Math.pow(10, decimals)
      s = String(Math.round(n * k) / k)
    } else {
      s = String(Math.round(n))
    }
    s = s.split('.')

    if (s[0].length > 3) {
      const reg = new RegExp(`\\B(?=(?:\\d{${options.size}})+(?!\\d))`, 'g')
      s[0] = s[0].replace(reg, options.separator)
    }
    if ((s[1] || '').length < decimals) {
      s[1] = s[1] || ''
      s[1] += new Array(decimals - s[1].length + 1).join('0')
    }
    return s.join(options.decimalsPoint)
  }
}

export default formaters
