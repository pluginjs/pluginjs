import LinkPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const source = [
  {
    value: 'internal',
    label: 'Internal Link'
  },
  {
    value: 'external',
    label: 'External Link'
  }
]
const internalValue = [
  {
    value: 'page',
    label: 'Page',
    children: [
      {
        value: '1',
        label: 'Home'
      },
      {
        value: '2',
        label: 'Blog'
      },
      {
        value: '3',
        label: 'About Us'
      },
      {
        value: '4',
        label: 'Contact Us'
      }
    ]
  },
  {
    value: 'post',
    label: 'Post',
    children: [
      {
        value: '5',
        label: 'Hello World'
      },
      {
        value: '6',
        label: 'This is Blog Post'
      }
    ]
  }
]
const targetValue = [
  {
    value: '_blank',
    label: 'New window'
  },
  {
    value: '_self',
    label: 'Same window'
  },
  {
    value: '_parent',
    label: 'Parent window'
  },
  {
    value: '_top',
    label: 'Top window'
  }
]
const value = '{"type":"internal","internal":[],"target":"_self","title":""}'
const data = {
  internal: [],
  target: '_self',
  title: '',
  type: 'internal'
}
describe('LinkPicker', () => {
  describe('LinkPicker()', () => {
    test('should have LinkPicker', () => {
      expect(LinkPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(LinkPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(LinkPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(LinkPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(LinkPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const linkPicker = LinkPicker.of(generateHTMLSample())

      expect(linkPicker).toBeObject()
      expect(linkPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const linkPicker = LinkPicker.of(generateHTMLSample())

      expect(linkPicker.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = LinkPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = LinkPicker.of(generateHTMLSample())
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('linkPicker:ready', () => {
        called++
      })

      const api = LinkPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = LinkPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('linkPicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample()
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue,
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue,
        onChange(value) {
          called = true

          expect(value).toBeString()
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue,
        onChange(value) {
          called = true

          expect(value).toBe(value)
        }
      })

      api.set({ source: 'scroll', target: '#top', title: 'sdfsdf' })

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = LinkPicker.of($element)

      expect(api.get()).toBeObject()
    })

    test('should get the value with value', () => {
      $element = generateHTMLSample(value)
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue
      })
      expect(api.get()).toEqual(data)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = LinkPicker.of($element)
    })

    test('should set the value', () => {
      $element = generateHTMLSample(value)
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue
      })
      expect(api.get()).toBeObject()
      api.set(value)
      expect(api.get()).toEqual(data)
    })
  })

  describe('val()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue
      })

      expect(api.val()).toBeString()
    })
    test('should set the value', () => {
      $element = generateHTMLSample()
      api = LinkPicker.of($element, {
        source,
        internalValue,
        targetValue
      })
      api.val(value)
      expect(api.val()).toBeString()
      expect(api.get()).toEqual(data)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = LinkPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('linkPicker:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = LinkPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('linkPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
