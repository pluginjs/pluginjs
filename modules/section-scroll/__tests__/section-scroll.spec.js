// import SectionScroll from '../src/main'
// import generateHTMLSample from './fixtures/sample'

describe('SectionScroll', () => {
  // describe('SectionScroll()', () => {
  //   test('should have SectionScroll', () => {
  //     expect(SectionScroll).toBeFunction()
  //   })

  //   test('should have defaults', () => {
  //     expect(SectionScroll.defaults).toBeObject()
  //   })

  //   test('should have events', () => {
  //     expect(SectionScroll.events).toBeObject()
  //   })

  //   test('should have classes', () => {
  //     expect(SectionScroll.classes).toBeObject()
  //   })

  //   test('should have methods', () => {
  //     expect(SectionScroll.methods).toBeArray()
  //   })
  // })

  describe('constructor()', () => {
    test('should work with element', () => {
      // document.body.appendChild(generateHTMLSample())
      // const sectionScroll = SectionScroll.of(generateHTMLSample(), {
      //   itemSelector: '.section',
      //   titleSelector: '.section-title'
      // })
      //   expect(sectionScroll).toBeObject()
    })

    // test('should have options', () => {
    //   document.body.appendChild(generateHTMLSample())
    //   const sectionScroll = SectionScroll.of(generateHTMLSample(), {
    //     itemSelector: '.section',
    //     titleSelector: '.section-title'
    //   })

    //   expect(sectionScroll.options).toBeObject()
    // })
  })

  // describe('api call', () => {
  //   test('should not call bind', () => {
  //     const sectionScroll = SectionScroll.of(generateHTMLSample())
  //     expect(sectionScroll.bind()).toBeNil()
  //   })

  //   test('should call destroy', () => {
  //     const sectionScroll = SectionScroll.of(generateHTMLSample())
  //     sectionScroll.destroy()
  //   })
  // })

  // describe('initialize()', () => {
  //   let $element

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //   })

  //   test('should trigger ready event', () => {
  //     let called = 0

  //     $element.addEventListener('sectionScroll:ready', () => {
  //       called++
  //     })
  //     const instance = SectionScroll.of($element)
  //     expect(called).toEqual(1)
  //     expect(instance.is('initialized')).toBeTrue()
  //   })
  // })

  // describe('destroy()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = SectionScroll.of($element)
  //   })

  //   test('should trigger destroy event', () => {
  //     let called = 0

  //     $element.addEventListener('sectionScroll:destroy', () => {
  //       expect(api.is('initialized')).toBeFalse()
  //       called++
  //     })

  //     api.destroy()

  //     expect(called).toEqual(1)
  //   })
  // })

  // describe('enable()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = SectionScroll.of($element)
  //   })

  //   test('should enable the plugin', () => {
  //     api.disable()
  //     api.enable()

  //     expect(api.is('disabled')).toBeFalse()
  //   })

  //   test('should trigger enable event', () => {
  //     let called = 0

  //     $element.addEventListener('sectionScroll:enable', () => {
  //       expect(api.is('disabled')).toBeFalse()
  //       called++
  //     })

  //     api.enable()
  //     expect(called).toEqual(1)
  //   })
  // })

  // describe('disable()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = SectionScroll.of($element)
  //   })

  //   test('should disable the plugin', () => {
  //     api.disable()

  //     expect(api.is('disabled')).toBeTrue()
  //   })

  //   test('should trigger disable event', () => {
  //     let called = 0

  //     $element.addEventListener('sectionScroll:disable', () => {
  //       expect(api.is('disabled')).toBeTrue()
  //       called++
  //     })

  //     api.disable()
  //     expect(called).toEqual(1)
  //   })
  // })
})
