import ImageSelector from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const datas = {
  data: [
    {
      value: 'without',
      label: 'Without',
      img: '../../plugins/image-selector/images/without.png'
    },
    {
      value: 'left',
      label: 'Left',
      img: '../../plugins/image-selector/images/left.png'
    },
    {
      value: 'double-left',
      label: 'Double Left',
      img: '../../plugins/image-selector/images/double-left.png'
    },
    {
      value: 'right',
      label: 'Right',
      img: '../../plugins/image-selector/images/right.png'
    },
    {
      value: 'double-right',
      label: 'Double Right',
      img: '../../plugins/image-selector/images/double-right.png'
    },
    {
      value: 'both-sider',
      label: 'Both Sider',
      img: '../../plugins/image-selector/images/both-sider.png'
    }
  ]
}

describe('ImageSelector', () => {
  describe('ImageSelector()', () => {
    test('should have ImageSelector', () => {
      expect(ImageSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImageSelector.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ImageSelector.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ImageSelector.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ImageSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample(), datas)

      expect(imageSelector).toBeObject()
      expect(imageSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample(), datas)

      expect(imageSelector.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = ImageSelector.of($element, datas)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ImageSelector.of(generateHTMLSample(), datas)
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ImageSelector.of(generateHTMLSample(), datas)
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('imageSelector:ready', () => {
        called++
      })

      const api = ImageSelector.of($element, datas)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element, datas)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('imageSelector:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element, datas)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('imageSelector:enable', () => {
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
      api = ImageSelector.of($element, datas)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('imageSelector:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
