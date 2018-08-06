import * as dom from '../src/main'

describe('Dom helper', () => {
  test('query', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    parent.append(children)
    expect(dom.query('div', parent)).toBe(children)
  })
  test('queryAll', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 2 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    expect(dom.queryAll('div', parent)).toEqual(children)
  })
  test('find', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    parent.append(children)
    expect(dom.find('div', parent)).toBe(children)
  })
  test('findAll', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 2 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    expect(dom.findAll('div', parent)).toEqual(children)
  })
  test('remove', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    parent.append(children)
    dom.remove(children)
    expect(dom.find('div', parent)).toBeNull()
  })
  test('html', () => {
    const parent = document.createElement('div')
    const html = '<div></div>'
    dom.html(html, parent)
    expect(parent.innerHTML).toBe(html)
  })
  test('children', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 2 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    expect(dom.children(parent)).toEqual(children)
  })
  test('children filtered by a selector', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 2 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    children[0].classList.add('foo')
    expect(dom.children('.foo', parent)).toEqual([children[0]])
  })
  test('siblings', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 2 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    expect(dom.siblings(children[1])).toEqual([children[0]])
  })

  test('siblings filtered by a selector', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 3 }, () =>
      document.createElement('div')
    )
    parent.append(...children)

    children[0].classList.add('foo')

    expect(dom.siblings(children[1])).toEqual([children[0], children[2]])
    expect(dom.siblings('.foo', children[1])).toEqual([children[0]])
  })

  test('parent', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    parent.append(children)
    expect(dom.parent(children)).toEqual(parent)
  })

  test('parents', () => {
    const ancestor = document.createElement('div')
    const parent = document.createElement('div')
    const children = document.createElement('div')
    parent.append(children)
    ancestor.append(parent)
    expect(dom.parents(children)).toEqual([parent, ancestor])
  })

  test('parents with selector', () => {
    const ancestor = document.createElement('div')
    const parent = document.createElement('div')
    const children = document.createElement('div')
    ancestor.classList.add('foo')
    ancestor.append(parent)
    parent.append(children)
    expect(dom.parents('.foo', children)).toEqual([ancestor])
  })

  test('parentWith', () => {
    const parent = document.createElement('div')
    const el = document.createElement('div')
    const children = document.createElement('div')
    dom.attr({ foo: 'bar' }, parent)
    dom.append(children, parent)
    dom.append(el, children)
    expect(dom.parentWith(el => el.matches('[foo=bar]'), el)).toEqual(parent)
  })

  test('closest', () => {
    const parent = document.createElement('div')
    const el = document.createElement('div')
    const children = document.createElement('div')
    dom.attr({ foo: 'bar' }, parent)
    dom.append(children, parent)
    dom.append(el, children)
    expect(dom.closest('[foo=bar]', el)).toEqual(parent)
  })

  test('parseHTML', () => {
    expect(dom.parseHTML`<div></div>`).toEqual(document.createElement('div'))
  })

  test('setObjData/getObjData', () => {
    const el = document.createElement('div')
    dom.setObjData('foo', 'bar', el)
    expect(dom.getObjData('foo', el)).toBe('bar')
  })
  test('clone', () => {
    const el = document.createElement('div')
    expect(dom.clone(el)).toEqual(el.cloneNode(true))
  })
  test('empty', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    parent.append(children)
    expect(dom.children(dom.empty(parent))).toEqual([])
  })
  test('prev', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 3 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    expect(dom.prev(children[1])).toEqual(children[0])
  })
  test('next', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 3 }, () =>
      document.createElement('div')
    )
    parent.append(...children)
    expect(dom.next(children[1])).toEqual(children[2])
  })
  test('attr', () => {
    const el = document.createElement('div')
    dom.attr({ foo: 'bar' }, el)
    expect(el.getAttribute('foo')).toBe('bar')
  })
  test('removeAttr', () => {
    const el = document.createElement('div')
    dom.attr({ foo: 'bar' }, el)
    dom.removeAttr('foo', el)
    expect(el.getAttribute('foo')).toBeNull()
  })
  test('dataset', () => {
    const el = document.createElement('div')
    dom.dataset({ foo: 'bar' }, el)
    expect(el.dataset.foo).toBe('bar')
  })
  test('text', () => {
    const el = document.createElement('div')
    dom.text('foo', el)
    expect(el.textContent).toBe('foo')
  })
  test('append', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 3 }, () =>
      document.createElement('div')
    )
    children.map(el => dom.append(el, parent))
    const last = arr => arr[arr.length - 1]
    expect(last(dom.children(parent))).toEqual(last(children))
  })
  test('prepend', () => {
    const parent = document.createElement('div')
    const children = Array.from({ length: 3 }, () =>
      document.createElement('div')
    )
    children.map(el => dom.prepend(el, parent))
    const first = arr => arr[0]
    expect(first(dom.children(parent))).toEqual(children[2])
  })
  test('insertBefore', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    const el = document.createElement('div')
    dom.append(children, parent)
    dom.insertBefore(el, children)
    expect(dom.next(el)).toEqual(children)
  })
  test('insertAfter', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    const el = document.createElement('div')
    dom.append(children, parent)
    dom.insertAfter(el, children)
    expect(dom.prev(el)).toEqual(children)
  })
  test('wrap', () => {
    const parent = document.createElement('div')
    const el = document.createElement('div')
    const wrapElement = document.createElement('div')
    dom.append(el, parent)
    dom.wrap(wrapElement, el)
    expect(dom.parent(el)).toEqual(wrapElement)
  })
  test('wrapInner', () => {
    const newElement = document.createElement('div')
    const el = document.createElement('div')
    const wrapElement = document.createElement('div')
    dom.append(el, newElement)
    dom.wrapInner(newElement, wrapElement)
    expect(dom.parent(newElement)).toEqual(wrapElement)
  })
  test('wrapAll', () => {
    const parent = document.createElement('div')
    const elements = Array.from({ length: 3 }, () =>
      document.createElement('div')
    )
    const wrapElement = document.createElement('div')
    elements.map(el => dom.append(el, parent))
    dom.wrapAll(wrapElement, elements)
    expect(dom.parent(elements[0])).toEqual(wrapElement)
    expect(dom.parent(wrapElement)).toEqual(parent)
  })
  test('unwrap', () => {
    const parent = document.createElement('div')
    const el = document.createElement('div')
    const wrapElement = document.createElement('div')
    dom.append(el, parent)
    dom.append(wrapElement, el)
    dom.unwrap(wrapElement)
    expect(dom.parent(wrapElement)).toEqual(parent)
  })
  test('clearChild', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    dom.append(children, parent)
    dom.clearChild(parent)
    expect(dom.children(parent)).toHaveLength(0)
  })

  test('clearData', () => {
    const el = document.createElement('div')
    el.foo = 'bar'
    dom.dataset({ foo: 'bar' }, el)
    dom.clearData(el)
    expect(el.dataset.foo).toBeNil()
  })
  test('contains', () => {
    const parent = document.createElement('div')
    const el = document.createElement('div')
    dom.append(el, parent)
    expect(dom.contains(el, parent)).toBeTrue()
  })

  test('nextElementWith', () => {
    const parent = document.createElement('div')
    const children = document.createElement('div')
    const anotherChildren = document.createElement('div')
    dom.attr({ foo: 'bar' }, anotherChildren)
    dom.append(children, parent)
    dom.append(anotherChildren, parent)
    expect(
      dom.nextElementWith(el => el.getAttribute('foo') === 'bar', children)
    ).toEqual(anotherChildren)
    expect(
      dom.nextElementWith(el => el.getAttribute('bar') === 'foo', children)
    ).toBeNull()
  })
  // test('fade', () => {})
  // test('fadeOut', () => {})
  // test('fadeIn', () => {})
})
