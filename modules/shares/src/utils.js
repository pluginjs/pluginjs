export const openPopup = (url, id, width, height) => {
  const left = Math.round(screen.width / 2 - width / 2)
  let top = 0

  if (screen.height > height) {
    top = Math.round(screen.height / 3 - height / 2)
  }

  const win = window.open(
    url,
    id,
    `left=${left},top=${top},width=${width},height=${height},personalbar=0,toolbar=0,scrollbars=1,resizable=1`
  )

  if (!win) {
    location.href = url
    return null
  }

  win.focus()

  return win
}

export const template = (text, data) => {
  /* eslint no-useless-escape: 'off' */
  if (text) {
    return text.replace(/\{([^\}]+)\}/g, (value, key) => {
      return key in data ? data[key] : value
    })
  }
  return ''
}

export const makeUrl = (text, data) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      data[key] = encodeURIComponent(data[key])
    }
  }

  return template(text, data)
}

export const createTempLink = url => {
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.style = 'display: none'
  document.body.appendChild(anchor)

  setTimeout(() => {
    anchor.click()
    document.body.removeChild(anchor)
  })
}
