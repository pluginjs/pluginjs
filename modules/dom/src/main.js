import { curry, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'

const objDataName = 'objData'

export const query = (selector, parent = document) =>
  parent.querySelector(selector)

export const queryAll = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector))

export const find = curry((selector, parent) => parent.querySelector(selector))

export const finds = curry((selector, parent) =>
  Array.from(parent.querySelectorAll(selector))
)

export const remove = el => el.remove()

export const html = curry((content, el) => {
  el.innerHTML = content
  return el
})

export const children = el => {
  if (!el) {
    return null
  }
  return Array.from(el.children)
}

export const childrenSelect = (selector, el) =>
  Array.from(el.children).filter(c => c.nodeName.toLowerCase() === selector)

export const getSiblings = el => {
  const childrenArr = children(el.parentNode)
  const index = childrenArr.indexOf(el)
  if (index > -1) {
    childrenArr.splice(index, 1)
  }
  return childrenArr
}

export const attrVerify = (attrName, value, el) => {
  const Obj = {
    data: element => {
      const [key, v] = value.split('=')
      if (
        !is.null(element.dataset[key]) &&
        !is.undefined(element.dataset[key])
      ) {
        if (v) {
          return element.dataset[key] === v
        }
        return true
      }
      return false
    },
    tagName: element => element.nodeName.toLowerCase() === value,
    class: element => element.classList.contains(value),
    id: element => element.id === value,
    attr: element => {
      const [key, v] = value.split('=')
      if (
        !is.null(element.getAttribute(key)) &&
        !is.undefined(element.getAttribute(key))
      ) {
        if (v) {
          return element.getAttribute(key) === v
        }
        return true
      }
      return false
    }
  }
  return Obj[attrName] && Obj[attrName](el)
}

export const childQuery = ({ type, value, level = 3 }, el) => {
  const res = []

  const hasChild = element => Array.from(element.children).lenght !== 0

  const childNodeCompare = (element, l) => {
    if (hasChild(element)) {
      Array.from(element.children).forEach(c => {
        if (attrVerify(type, value, c)) {
          res.push(c)
        }

        if (hasChild(c) && l > 0) {
          childNodeCompare(c, l - 1)
        }
      })
    }
  }

  childNodeCompare(el, level)

  return res
}

export const Each = (obj, callback) => {
  let i = 0
  let length

  if (is.array(obj)) {
    length = obj.length
    for (; i < length; i++) {
      callback(obj[i], i)
    }
  } else {
    Object.entries(obj).map(([k, v]) => callback(k, v))
  }

  return obj
}

export const parentQuery = ({ type, value, level = 3 }, el) => {
  const res = []
  const parentCompare = element => {
    if (attrVerify(type, value, element.parentNode)) {
      res.push(element.parentNode)
    }
    level--
    if (level >= 0) {
      parentCompare(element.parentNode)
    }
  }

  parentCompare(el)
  return res
}

export const parent = el => el.parentNode
// 解析 HTML/SVG/XML 字符串
export const parseHTML = (...args) => {
  const htmlString = Array.isArray(args[0])
    ? args[0].reduce((result, str, index) => result + args[index] + str)
    : args[0]
  const childNodes = compose(children, html(htmlString))(
    document.createElement('div')
  )
  if (childNodes.length === 1) {
    return childNodes[0]
  }
  return childNodes
}

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

export const clone = el => el.cloneNode(true)

export const empty = el => {
  el.innerHTML = ''
  return el
}

export const prev = el => el.previousElementSibling

export const next = el => el.nextElementSibling

export const attr = curry((args, el) => {
  if (typeof args === 'string') {
    return el.getAttribute(args)
  }
  Object.entries(args).forEach(([k, v]) => el.setAttribute(k, v))
  return el
})
export const removeAttribute = curry((name, el) => el.removeAttribute(name))

export const dataset = curry((args, el) => {
  if (typeof args === 'string') {
    return el.dataset[args]
  }
  Object.entries(args).forEach(([k, v]) => {
    el.dataset[k] = v
  })
  return el
})

export const text = curry((content, el) => {
  el.textContent = content
  return el
})

export const append = curry((child, el) => {
  if (is.string(child)) {
    el.insertAdjacentHTML('beforeend', child)
  } else {
    el.append(child)
  }
  return el
})

export const prepend = curry((child, el) => {
  if (is.string(child)) {
    el.insertAdjacentHTML('afterbegin', child)
  } else {
    el.prepend(child)
  }
  return el
})

export const insertBefore = curry((newElement, el) => {
  if (is.string(newElement)) {
    el.insertAdjacentHTML('beforebegin', newElement)
  } else {
    const parentElement = parent(el)
    parentElement.insertBefore(newElement, el)
  }
  return el
})

export const insertAfter = curry((newElement, el) => {
  if (is.string(newElement)) {
    el.insertAdjacentHTML('afterend', newElement)
  } else {
    const parentElement = parent(el)
    parentElement.insertBefore(newElement, el.nextElementSibling)
  }
  return el
})

export const wrap = curry((wrapElement, el) => {
  if (is.string(wrapElement)) {
    wrapElement = parseHTML(wrapElement)
  }
  // compose(append(wrapElement), clone, insertBefore(wrapElement))(el)
  insertBefore(wrapElement, el)
  remove(el)
  append(el, wrapElement)
  return wrapElement
})

export const wrapInner = (newElement, wrap) => {
  if (is.string(newElement)) {
    newElement = parseHTML(newElement)
  }
  newElement.innerHTML = wrap.innerHTML
  wrap.innerHTML = ''
  wrap.append(newElement)
  return wrap
}

export const wrapAll = (wrapElement, elementList) => {
  insertBefore(wrapElement, elementList[0])
  wrapElement.append(...elementList)
  return wrapElement
}

export const unwrap = el => {
  const parentEl = parent(el)
  children(parentEl).forEach(child => {
    insertBefore(child, parentEl)
  })
  parentEl.remove()
  return el
}

export const clearChild = el => {
  children(el).map(remove)
  return el
}

export const parentWith = curry((fn, el) => {
  const parentElement = parent(el)
  // console.log(el, parentElement)
  if (!parentElement || parentElement === document) {
    return false
  }
  if (fn(parentElement)) {
    return parentElement
  }
  return parentWith(fn, parentElement)
})

export const clearData = el => {
  Object.keys(el).map(name => el.removeAttribute(`data-${name}`))
  return el
}

export const contains = curry((el, parent) => parent.contains(el))

export const closest = curry((selector, el) => {
  if (el.matches(selector)) {
    return el
  }
  return parentWith(el => el.matches(selector), el)
})

export const nextElementWith = curry((fn, el) => {
  const nextElement = next(el)
  if (fn(nextElement)) {
    return nextElement
  }
  return nextElementWith(fn, nextElement)
})

// == animation == //

export const fade = curry((type, { duration, callback }, element) => {
  const isIn = type === 'in'
  let opacity = isIn ? 0 : 1
  let start = null

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
