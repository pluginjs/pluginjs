import * as dom from '../src/main'

describe('Dom helper', () => {
  describe('Traversal helper', () => {
    test('query', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      parent.append(children)
      expect(dom.query('div', parent)).toBe(children)
    })

    test('query with class', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      children.classList.add('foo')
      parent.append(children)
      expect(dom.query('.foo', parent)).toBe(children)
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

    test('has with element', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      dom.append(el, parent)
      expect(dom.has(el, parent)).toBeTrue()
    })

    test('has with selector', () => {
      const parent = document.createElement('div')
      dom.append('<div class="foo"></div>', parent)
      console.info(dom.html(parent))
      expect(dom.has('div', parent)).toBeTrue()
    })

    test('contents', () => {
      const parent = document.createElement('div')
      dom.html('<span>hello</span>another<span>world</span>', parent)

      expect(dom.contents(parent)).toHaveLength(3)
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

    test('nextWith', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const anotherChildren = document.createElement('div')
      dom.attr({ foo: 'bar' }, anotherChildren)
      dom.append(children, parent)
      dom.append(anotherChildren, parent)
      expect(
        dom.nextWith(el => el.getAttribute('foo') === 'bar', children)
      ).toEqual(anotherChildren)
      expect(
        dom.nextWith(el => el.getAttribute('bar') === 'foo', children)
      ).toBeNull()
    })

    test('prevWith', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const anotherChildren = document.createElement('div')
      dom.attr({ foo: 'bar' }, anotherChildren)
      dom.append(children, parent)
      dom.prepend(anotherChildren, parent)
      expect(
        dom.prevWith(el => el.getAttribute('foo') === 'bar', children)
      ).toEqual(anotherChildren)
      expect(
        dom.prevWith(el => el.getAttribute('bar') === 'foo', children)
      ).toBeNull()
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
  })

  describe('Data helper', () => {
    test('setObjData/getObjData', () => {
      const el = document.createElement('div')
      dom.setObjData('foo', 'bar', el)
      expect(dom.getObjData('foo', el)).toBe('bar')
    })

    test('dataset', () => {
      const el = document.createElement('div')
      dom.dataset({ foo: 'bar' }, el)
      expect(el.dataset.foo).toBe('bar')
    })

    test('clearData', () => {
      const el = document.createElement('div')
      el.foo = 'bar'
      dom.dataset({ foo: 'bar' }, el)
      dom.clearData(el)
      expect(el.dataset.foo).toBeNil()
    })
  })

  describe('Attributes helper', () => {
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
  })

  describe('Manipulation helper', () => {
    test('clone', () => {
      const el = document.createElement('div')
      expect(dom.clone(el)).toEqual(el.cloneNode(true))
    })

    test('detach', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')

      parent.append(children)
      dom.detach(children)

      expect(dom.children(parent)).toEqual([])
    })

    test('remove', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      parent.append(children)
      dom.remove(children)
      expect(dom.find('div', parent)).toBeNull()
    })

    test('empty', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      parent.append(children)
      expect(dom.children(dom.empty(parent))).toEqual([])
    })

    test('html', () => {
      const element = document.createElement('div')
      element.innerHTML = 'foo'

      expect(dom.html(element)).toEqual('foo')
    })

    test('html with content', () => {
      const element = document.createElement('div')
      const html = '<div></div>'

      dom.html(html, element)
      expect(element.innerHTML).toBe(html)
    })

    test('text', () => {
      const element = document.createElement('div')
      element.textContent = 'foo'

      expect(dom.text(element)).toEqual('foo')
    })

    test('text with content', () => {
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

    test('append with text', () => {
      const parent = document.createElement('div')

      dom.append('<div>foo</div>', parent)
      dom.append('<div>bar</div>', parent)
      expect(parent.innerHTML).toEqual('<div>foo</div><div>bar</div>')
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

    test('prepend with text', () => {
      const parent = document.createElement('div')

      dom.prepend('<div>foo</div>', parent)
      dom.prepend('<div>bar</div>', parent)

      expect(parent.innerHTML).toEqual('<div>bar</div><div>foo</div>')
    })

    test('insertBefore', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const el = document.createElement('div')

      dom.append(children, parent)
      dom.insertBefore(el, children)

      expect(dom.next(el)).toEqual(children)
    })

    test('insertBefore with text', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')

      dom.append(children, parent)
      dom.insertBefore('<div>foo</div>', children)

      expect(dom.prev(children).innerHTML).toEqual('foo')
    })

    test('insertAfter', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const el = document.createElement('div')

      dom.append(children, parent)
      dom.insertAfter(el, children)

      expect(dom.prev(el)).toEqual(children)
    })

    test('insertAfter with text', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')

      dom.append(children, parent)
      dom.insertAfter('<div>foo</div>', children)

      expect(dom.next(children).innerHTML).toEqual('foo')
    })

    test('wrap', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      const wrapElement = document.createElement('div')

      dom.append(el, parent)
      dom.wrap(wrapElement, el)

      expect(dom.parent(el)).toEqual(wrapElement)
      expect(dom.parent(dom.parent(el))).toEqual(parent)
    })

    test('wrap with text', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')

      dom.append(el, parent)
      dom.wrap('<div class="foo"></div>', el)

      expect(dom.parent(el).classList.contains('foo')).toBeTrue()
      expect(dom.parent(dom.parent(el))).toEqual(parent)
    })

    test('wrapInner', () => {
      const element = document.createElement('div')
      const oldElement = document.createElement('div')
      const newElement = document.createElement('div')

      dom.append(oldElement, element)
      dom.wrapInner(newElement, element)

      expect(dom.children(element)).toEqual([newElement])
    })

    test('wrapInner with text', () => {
      const element = document.createElement('div')
      const oldElement = document.createElement('div')

      dom.append(oldElement, element)
      dom.wrapInner('<div class="new"></div>', element)

      expect(dom.children(element)[0].classList.contains('new')).toBeTrue()
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

    test('wrapAll with text', () => {
      const parent = document.createElement('div')
      const elements = Array.from({ length: 3 }, () =>
        document.createElement('div')
      )

      elements.map(el => dom.append(el, parent))
      dom.wrapAll('<div class="new"></div>', elements)

      expect(dom.parent(elements[0]).classList.contains('new')).toBeTrue()
      expect(dom.parent(dom.parent(elements[0]))).toEqual(parent)
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

    test('unwrap with selector matches', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      const wrapElement = document.createElement('div')

      dom.append(el, parent)
      dom.append(wrapElement, el)
      dom.unwrap('div', wrapElement)

      expect(dom.parent(wrapElement)).toEqual(parent)
    })

    test('unwrap with selector not matches', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      const wrapElement = document.createElement('div')

      dom.append(el, parent)
      dom.append(wrapElement, el)
      dom.unwrap('.foo', wrapElement)

      expect(dom.parent(wrapElement)).toEqual(el)
    })

    test('replace', () => {
      const element = document.createElement('div')
      const parent = document.createElement('div')
      const newElement = document.createElement('div')
      dom.html('foo', newElement)

      dom.append(element, parent)
      dom.replace(newElement, element)

      expect(dom.children(parent)).toEqual([newElement])
    })

    test('replace with text', () => {
      const element = document.createElement('div')
      const parent = document.createElement('div')

      dom.append(element, parent)
      dom.replace('<div>foo</div>', element)

      expect(dom.html(dom.children(parent)[0])).toEqual('foo')
    })
  })

  // test('fade', () => {})
  // test('fadeOut', () => {})
  // test('fadeIn', () => {})
})
