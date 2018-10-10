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
      expect(dom.parseHTML('<div></div>')).toEqual(
        document.createElement('div')
      )
    })
  })

  describe('Data helper', () => {
    test('setData/getData', () => {
      const el = document.createElement('div')

      dom.setData('foo', 'bar', el)
      expect(dom.getData('foo', el)).toBe('bar')
    })

    test('hasData', () => {
      const el = document.createElement('div')

      expect(dom.hasData(el)).toBeFalse()

      dom.setData('foo', 'bar', el)
      expect(dom.hasData(el)).toBeTrue()
    })

    test('data with value', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      dom.append(el, parent)
      dom.data('foo', 'bar', el)

      expect(dom.data('foo', el)).toBe('bar')
    })

    test('data with object value', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      dom.append(el, parent)
      dom.data({ foo: 'bar' }, el)

      expect(dom.data('foo', el)).toBe('bar')
    })

    test('data with camelCase data-*', () => {
      const el = dom.parseHTML('<div data-hello-world="true"></div>')

      expect(dom.data('helloWorld', el)).toBe(true)
      expect(dom.data('hello-world', el)).toBe(true)
    })

    test('data with data-*', () => {
      const el = dom.parseHTML('<div data-foo="bar"></div>')

      expect(dom.data('foo', el)).toBe('bar')
    })

    test('data with json data-*', () => {
      const el = dom.parseHTML('<div data-json=\'{"foo":"bar"}\'></div>')

      expect(dom.data('json', el)).toEqual({ foo: 'bar' })
    })

    test('override data with data-*', () => {
      const el = dom.parseHTML('<div data-foo="bar"></div>')

      dom.data({ foo: 'qux' }, el)

      expect(dom.data('foo', el)).toBe('qux')
      expect(dom.attr('data-foo', el)).toBe('bar')
      expect(el.dataset.foo).toBe('bar')
    })

    test('removeData', () => {
      const el = document.createElement('div')

      dom.setData('foo', 'bar', el)
      expect(dom.getData('foo', el)).toBe('bar')

      dom.removeData('foo', el)
      expect(dom.getData('foo', el)).toBeUndefined()
    })
  })

  describe('Attributes helper', () => {
    test('attr', () => {
      const el = dom.parseHTML('<div foo="bar"></div>')

      expect(dom.attr('foo', el)).toBe('bar')
    })

    test('attr with value', () => {
      const el = document.createElement('div')
      dom.attr('foo', 'bar', el)

      expect(dom.attr('foo', el)).toBe('bar')
    })

    test('attr with object value', () => {
      const el = document.createElement('div')
      dom.attr({ foo: 'bar' }, el)
      expect(dom.attr('foo', el)).toBe('bar')
    })

    test('removeAttr', () => {
      const el = dom.parseHTML('<div foo="bar"></div>')
      expect(dom.attr('foo', el)).toBe('bar')

      dom.removeAttr('foo', el)
      expect(dom.attr('foo', el)).toBeNull()
    })
  })

  describe('Prop helper', () => {
    test('prop with id', () => {
      const el = dom.parseHTML('<div id="foo"></div>')

      expect(dom.prop('id', el)).toBe('foo')
    })

    test('prop with input props', () => {
      const el = dom.parseHTML(
        '<input type="text" tabindex="-1" maxlength="5" readonly class="propTest" />'
      )

      expect(dom.prop('tabindex', el)).toEqual(-1)
      expect(dom.prop('maxlength', el)).toEqual(5)
      expect(dom.prop('readonly', el)).toBeTrue()
      expect(dom.prop('class', el)).toEqual('propTest')
    })

    test('prop with table props', () => {
      const el = dom.parseHTML(`<table cellspacing="5" cellpadding="5">
  <tr>
    <td id="td" rowspan="2" colspan="2"></td>
  </tr>
</table>`)

      expect(dom.prop('cellspacing', el)).toEqual('5')
      expect(dom.prop('cellpadding', el)).toEqual('5')
      const td = dom.find('#td', el)
      expect(dom.prop('rowspan', td)).toEqual(2)
      expect(dom.prop('colspan', td)).toEqual(2)
    })

    // test('prop with contenteditable', () => {
    //   const el = dom.parseHTML('<div contenteditable="true"></div>')
    //   expect(dom.prop('contenteditable', el)).toBeTrue()
    // })

    test('prop with usemap', () => {
      const parent = dom.parseHTML(
        '<div><img usemap="#map" /><map name="map"></map></div>'
      )
      const el = dom.find('img', parent)
      expect(dom.prop('usemap', el)).toEqual('#map')
    })

    test('prop with checked', () => {
      const el = dom.parseHTML('<input type="checkbox" checked />')

      expect(dom.prop('checked', el)).toBeTrue()
    })

    test('prop with value', () => {
      const el = dom.parseHTML('<input type="checkbox" checked />')

      expect(dom.prop('checked', el)).toBeTrue()

      dom.prop('checked', false, el)

      expect(dom.prop('checked', el)).toBeFalse()
    })

    test('prop with object values', () => {
      const el = dom.parseHTML('<input type="checkbox" checked />')
      dom.prop({ class: 'propTest', checked: false, disabled: true }, el)

      expect(dom.prop('class', el)).toEqual('propTest')
      expect(dom.prop('checked', el)).toBeFalse()
      expect(dom.prop('disabled', el)).toBeTrue()
    })

    test('removeProp', () => {
      const el = document.createElement('div')

      dom.prop({ hello: 'world' }, el)
      expect(dom.prop('hello', el)).toBe('world')

      dom.removeProp('hello', el)
      expect(dom.prop('hello', el)).toBeUndefined()
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
      expect(dom.insertBefore(el, children)).toBe(el)

      expect(dom.next(el)).toEqual(children)
    })

    test('insertBefore with text', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')

      dom.append(children, parent)
      dom.insertBefore('<div>foo</div>', children)

      expect(dom.prev(children).innerHTML).toEqual('foo')
    })

    test('before', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const el = document.createElement('div')

      dom.append(children, parent)
      expect(dom.before(el, children)).toBe(children)

      expect(dom.next(el)).toEqual(children)
    })

    test('insertAfter', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const el = document.createElement('div')

      dom.append(children, parent)
      expect(dom.insertAfter(el, children)).toBe(el)

      expect(dom.prev(el)).toEqual(children)
    })

    test('insertAfter with text', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')

      dom.append(children, parent)
      dom.insertAfter('<div>foo</div>', children)

      expect(dom.next(children).innerHTML).toEqual('foo')
    })

    test('after', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      const el = document.createElement('div')

      dom.append(children, parent)
      expect(dom.after(el, children)).toBe(children)

      expect(dom.prev(el)).toEqual(children)
    })

    test('wrap', () => {
      const parent = document.createElement('div')
      const el = document.createElement('div')
      const wrapElement = document.createElement('div')

      dom.append(el, parent)
      expect(dom.wrap(wrapElement, el)).toEqual(wrapElement)

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
})
