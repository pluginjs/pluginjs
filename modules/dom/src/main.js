import { curry, curryWith, camelize } from '@pluginjs/utils'
import { isString, isElement, isEmptyObject } from '@pluginjs/is'

export const parseHTML = (...args) => {
  const htmlString = Array.isArray(args[0])
    ? args[0].reduce((result, str, index) => result + args[index] + str)
    : args[0]

  // if('content' in document.createElement('template')) {
  //   const temp = document.createElement('template')
  //   temp.innerHTML = htmlString
  //   return temp.content.cloneNode(true)
  // } else {
  const el = document.createElement('div')
  el.innerHTML = htmlString

  if (el.children.length === 1) {
    return el.children[0]
  }

  const fragment = document.createDocumentFragment()

  if (el.children.length) {
    while (el.children.length > 0) {
      fragment.appendChild(el.children[0])
    }
  } else {
    while (el.childNodes.length > 0) {
      fragment.appendChild(el.childNodes[0])
    }
  }

  return fragment
  // }
}

// ----------
// Traversal
// ----------
export const query = (selector, parent = document) =>
  parent.querySelector(selector)

export const queryAll = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector))

export const find = curry((selector, parent) => parent.querySelector(selector))

export const findAll = curry((selector, parent) =>
  Array.from(parent.querySelectorAll(selector))
)

export const has = (selector, parent) => {
  if (isString(selector)) {
    return Boolean(queryAll(selector, parent).length)
  }
  return parent.contains(selector)
}

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
    return []
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
    return []
  }
  return children(selector, el.parentNode).filter(element => element !== el)
}

export const prev = el => el.previousElementSibling

export const next = el => el.nextElementSibling

export const prevWith = curry((fn, el) => {
  const prevElement = el.previousElementSibling
  if (!prevElement) {
    return null
  }
  if (fn(prevElement)) {
    return prevElement
  }
  return prevWith(fn, prevElement)
})

export const nextWith = curry((fn, el) => {
  const nextElement = el.nextElementSibling
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
  const parentElement = el.parentNode
  if (!parentElement || parentElement === document) {
    return false
  }
  if (fn(parentElement)) {
    return parentElement
  }
  return parentWith(fn, parentElement)
})

export const closest = (selector, el) => {
  if (el.matches(selector)) {
    return el
  }
  return parentWith(el => el.matches(selector), el)
}

export const offsetParent = el => {
  let offsetParent = el.offsetParent

  while (offsetParent && offsetParent.style.position === 'static') {
    offsetParent = offsetParent.offsetParent
  }

  return offsetParent || document.documentElement
}

export const scrollParent = el => {
  return parentWith(parent => parent.scrollHeight > parent.clientHeight, el)
}

export const indexOf = el => {
  return [...el.parentElement.children].indexOf(el)
}

// ---------
// Data
// ----------
const dataStore = '__pluginjsData'
const getCachedData = el => {
  return (el[dataStore] = el[dataStore] || {})
}

export const getData = (key, el) => {
  if (isElement(key) && typeof el === 'undefined') {
    el = key
    key = undefined
  }

  const cache = getCachedData(el)
  if (key) {
    if (!(key in cache)) {
      let value = el.dataset[key] || el.dataset[camelize(key, false)]

      if (value !== undefined) {
        try {
          value = JSON.parse(value)
        } catch (e) {} // eslint-disable-line

        cache[key] = value
      }
    }

    return cache[key]
  }

  return cache
}

export const setData = (key, value, el) => {
  getCachedData(el)[key] = value

  return el
}

export const removeData = (key, el) => {
  if (isElement(key) && typeof el === 'undefined') {
    el = key
    key = undefined
  }

  if (typeof key === 'undefined') {
    delete el[dataStore]
  } else {
    delete getCachedData(el)[key]
  }

  return el
}

export const hasData = el => {
  return dataStore in el ? !isEmptyObject(el[dataStore]) : false
}

export const data = curryWith((key, value, el) => {
  if (isElement(value) && typeof el === 'undefined') {
    el = value
    value = undefined
  }

  if (typeof key === 'string') {
    if (typeof value !== 'undefined') {
      setData(key, value, el)
    } else {
      return getData(key, el)
    }
  } else {
    Object.entries(key).forEach(([k, v]) => setData(k, v, el))
  }

  return el
}, isElement)

// -----------
// Attributes
// -----------
export const attr = curryWith((args, value, el) => {
  if (isElement(value) && typeof el === 'undefined') {
    el = value
    value = undefined
  }

  if (typeof args === 'string') {
    if (typeof value !== 'undefined') {
      el.setAttribute(args, value)
    } else {
      return el.getAttribute(args)
    }
  } else {
    Object.entries(args).forEach(([key, value]) => el.setAttribute(key, value))
  }

  return el
}, isElement)

export const removeAttr = curry((attrs, el) => {
  attrs.split(' ').forEach(attr => {
    el.removeAttribute(attr)
  })

  return el
})

const propMap = {
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  for: 'htmlFor',
  class: 'className',
  maxlength: 'maxLength',
  cellspacing: 'cellSpacing',
  cellpadding: 'cellPadding',
  rowspan: 'rowSpan',
  colspan: 'colSpan',
  usemap: 'useMap',
  frameborder: 'frameBorder',
  contenteditable: 'contentEditable'
}

export const prop = curryWith((props, value, el) => {
  if (isElement(value) && typeof el === 'undefined') {
    el = value
    value = undefined
  }

  if (typeof props === 'string') {
    if (typeof value !== 'undefined') {
      el[propMap[props] || props] = value
    } else {
      return el[propMap[props] || props]
    }
  } else {
    Object.entries(props).forEach(([key, value]) => {
      el[propMap[key] || key] = value
    })
  }

  return el
}, isElement)

export const removeProp = curry((props, el) => {
  props.split(' ').forEach(prop => {
    prop = propMap[prop] || prop
    delete el[prop]
  })

  return el
})

// --------------
// Manipulation
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
  while (el.lastChild) {
    el.removeChild(el.lastChild)
  }
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

export const appendTo = curry((child, el) => {
  if (isString(child)) {
    child = parseHTML(child)
  }
  el.append(child)

  return child
})

export const prepend = curry((child, el) => {
  if (isString(child)) {
    el.insertAdjacentHTML('afterbegin', child)
  } else {
    el.prepend(child)
  }

  return el
})

export const prependTo = curry((child, el) => {
  if (isString(child)) {
    child = parseHTML(child)
  }
  el.prepend(child)

  return child
})

export const before = curry((newElement, el) => {
  if (isString(newElement)) {
    el.insertAdjacentHTML('beforebegin', newElement)
  } else {
    el.parentNode.insertBefore(newElement, el)
  }

  return el
})

export const insertBefore = curry((newElement, el) => {
  if (isString(newElement)) {
    newElement = parseHTML(newElement)
  }
  if (NodeList.prototype.isPrototypeOf(newElement)) {// eslint-disable-line
    newElement.forEach(i => {
      el.parentNode.insertBefore(i, el)
    })
  } else {
    el.parentNode.insertBefore(newElement, el)
  }

  return newElement
})

export const after = curry((newElement, el) => {
  if (isString(newElement)) {
    el.insertAdjacentHTML('afterend', newElement)
  } else {
    el.parentNode.insertBefore(newElement, el.nextElementSibling)
  }

  return el
})

export const insertAfter = curry((newElement, el) => {
  if (isString(newElement)) {
    newElement = parseHTML(newElement)
  }
  if (NodeList.prototype.isPrototypeOf(newElement)) {// eslint-disable-line
    newElement.forEach(i => {
      el.parentNode.insertBefore(i, el.nextElementSibling)
    })
  } else {
    el.parentNode.insertBefore(newElement, el.nextElementSibling)
  }

  return newElement
})

export const wrap = curry((wrapElement, el) => {
  if (isString(wrapElement)) {
    wrapElement = parseHTML(wrapElement)
  }

  insertBefore(wrapElement, el)
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

  const parentEl = el.parentNode

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

  el.parentNode.replaceChild(newContent, el)
  el.remove()

  return newContent
})
