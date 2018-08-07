import { curry, compose, curryWith } from '@pluginjs/utils'
import { isString, isElement } from '@pluginjs/is'

// 解析 HTML/SVG/XML 字符串
export const parseHTML = (...args) => {
  const htmlString = Array.isArray(args[0])
    ? args[0].reduce((result, str, index) => result + args[index] + str)
    : args[0]
  const childNodes = compose(
    children,
    html(htmlString)
  )(document.createElement('div'))
  if (childNodes.length === 1) {
    return childNodes[0]
  }
  return childNodes
}

// ---------
// traversal
// ----------
export const query = (selector, parent = document) =>
  parent.querySelector(selector)

export const queryAll = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector))

export const find = curry((selector, parent) => parent.querySelector(selector))

export const findAll = curry((selector, parent) =>
  Array.from(parent.querySelectorAll(selector))
)

export const contains = curry((el, parent) => parent.contains(el))

export const contents = el => {
  if (el.tagName === 'IFRAME') {
    return [el.contentDocument]
  }

  return el.childNodes
}

export const children = (selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }
  if (!isElement(el)) {
    return null
  }
  if (isString(selector)) {
    return Array.from(el.children).filter(c => c.matches(selector))
  }
  return Array.from(el.children)
}

export const siblings = (selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }
  if (!isElement(el)) {
    return null
  }

  const childrenArr = children(selector, el.parentNode)
  const index = childrenArr.indexOf(el)
  if (index > -1) {
    childrenArr.splice(index, 1)
  }
  return childrenArr
}

export const prev = el => el.previousElementSibling

export const next = el => el.nextElementSibling

export const prevWith = curry((fn, el) => {
  const prevElement = prev(el)
  if (!prevElement) {
    return null
  }
  if (fn(prevElement)) {
    return prevElement
  }
  return prevWith(fn, prevElement)
})

export const nextWith = curry((fn, el) => {
  const nextElement = next(el)
  if (!nextElement) {
    return null
  }
  if (fn(nextElement)) {
    return nextElement
  }
  return nextWith(fn, nextElement)
})

export const parent = el => el.parentNode

export const parents = (selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }

  const result = []
  let last = el

  while (
    isElement(last) &&
    last.parentNode &&
    last !== document.body.parentNode
  ) {
    last = last.parentNode

    if (!selector || (selector && last.matches(selector))) {
      result.push(last)
    }
  }

  return result
}

export const parentWith = curry((fn, el) => {
  const parentElement = parent(el)
  if (!parentElement || parentElement === document) {
    return false
  }
  if (fn(parentElement)) {
    return parentElement
  }
  return parentWith(fn, parentElement)
})

export const closest = curry((selector, el) => {
  if (el.matches(selector)) {
    return el
  }
  return parentWith(el => el.matches(selector), el)
})

// ---------
// data
// ----------
const objDataName = 'objData'

export const setObjData = (name, data, el) => {
  if (!el[objDataName]) {
    el[objDataName] = {}
  }

  el[objDataName][name] = data
  return el
}

export const getObjData = (name, el) => {
  if (!el[objDataName]) {
    return false
  }

  return el[objDataName][name]
}

export const dataset = curry((args, el) => {
  if (typeof args === 'string') {
    return el.dataset[args]
  }
  Object.entries(args).forEach(([k, v]) => {
    el.dataset[k] = v
  })
  return el
})

export const clearData = el => {
  Object.keys(el).map(name => el.removeAttribute(`data-${name}`))
  return el
}

// ----------
// attributes
// -----------
export const attr = curry((args, el) => {
  if (typeof args === 'string') {
    return el.getAttribute(args)
  }
  Object.entries(args).forEach(([k, v]) => el.setAttribute(k, v))
  return el
})

export const removeAttr = curry((name, el) => {
  el.removeAttribute(name)
  return el
})

// -------------
// manipulation
// --------------
export const clone = curry(el => el.cloneNode(true))

export const detach = curry(el => {
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }

  return el
})

export const remove = curry(el => el.remove())

export const empty = curry(el => {
  el.innerHTML = ''
  return el
})

export const html = curryWith((content, el) => {
  if (!isString(content) && typeof el === 'undefined') {
    el = content
    content = undefined
  }

  if (typeof content === 'undefined') {
    return el.innerHTML
  }

  el.innerHTML = content

  return el
}, isElement)

export const text = curryWith((content, el) => {
  if (!isString(content) && typeof el === 'undefined') {
    el = content
    content = undefined
  }

  if (typeof content === 'undefined') {
    return el.textContent
  }

  el.textContent = content

  return el
}, isElement)

export const append = curry((child, el) => {
  if (isString(child)) {
    el.insertAdjacentHTML('beforeend', child)
  } else {
    el.append(child)
  }
  return el
})

export const prepend = curry((child, el) => {
  if (isString(child)) {
    el.insertAdjacentHTML('afterbegin', child)
  } else {
    el.prepend(child)
  }
  return el
})

export const insertBefore = curry((newElement, el) => {
  if (isString(newElement)) {
    el.insertAdjacentHTML('beforebegin', newElement)
  } else {
    const parentElement = parent(el)
    parentElement.insertBefore(newElement, el)
  }
  return el
})

export const insertAfter = curry((newElement, el) => {
  if (isString(newElement)) {
    el.insertAdjacentHTML('afterend', newElement)
  } else {
    const parentElement = parent(el)
    parentElement.insertBefore(newElement, el.nextElementSibling)
  }
  return el
})

export const wrap = curry((wrapElement, el) => {
  if (isString(wrapElement)) {
    wrapElement = parseHTML(wrapElement)
  }

  insertBefore(wrapElement, el)
  remove(el)
  append(el, wrapElement)
  return wrapElement
})

export const wrapInner = curry((newElement, el) => {
  if (isString(newElement)) {
    newElement = parseHTML(newElement)
  }

  newElement.innerHTML = el.innerHTML
  el.innerHTML = ''
  el.append(newElement)
  return el
})

export const wrapAll = curry((wrapElement, elementList) => {
  if (isString(wrapElement)) {
    wrapElement = parseHTML(wrapElement)
  }

  insertBefore(wrapElement, elementList[0])
  wrapElement.append(...elementList)
  return wrapElement
})

export const unwrap = curryWith((selector, el) => {
  if (!isString(selector) && typeof el === 'undefined') {
    el = selector
    selector = undefined
  }

  const parentEl = parent(el)

  if (!selector || parentEl.matches(selector)) {
    children(parentEl).forEach(child => {
      insertBefore(child, parentEl)
    })

    parentEl.remove()
  }
  return el
}, isElement)

export const replace = curry((newContent, el) => {
  if (isString(newContent)) {
    newContent = parseHTML(newContent)
  }

  const parent = el.parentNode

  parent.replaceChild(newContent, el)
  el.remove()

  return newContent
})

export const fade = curry((type, { duration, callback }, element) => {
  const isIn = type === 'in'
  let opacity = isIn ? 0 : 1
  let start

  if (isIn) {
    if (element.style.display === 'none') {
      element.style.display = 'inline'
    }
    element.style.opacity = opacity
  }

  function step(timestamp) {
    if (!start) {
      start = timestamp
    }
    const progress = timestamp - start
    const percent = progress / duration
    opacity = isIn ? opacity + percent : opacity - percent
    element.style.opacity = opacity

    if (opacity <= 0) {
      element.style.display = 'none'
    }

    if (progress < duration) {
      window.requestAnimationFrame(step)
    } else if (callback) {
      callback()
    }
  }

  window.requestAnimationFrame(step)
})

export const fadeOut = fade('out')
export const fadeIn = fade('in')
