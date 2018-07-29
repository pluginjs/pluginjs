import Notice from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Notice', () => {
  describe('Notice()', () => {
    test('should have Notice', () => {
      expect(Notice).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Notice.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Notice.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Notice.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Notice.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const notice = Notice.show()

      expect(notice).toBeObject()
      expect(notice.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const notice = new Notice()

      expect(notice.options).toBeObject()
    })

    test('should have classes', () => {
      const notice = new Notice()

      expect(notice.classes).toBeObject()
    })
  })

  // describe('classes', () => {
  //   test('should use classes options', () => {
  //     const notice = new Notice({
  //       classes: {
  //         container: '{namespace}-wrap',
  //         active: '{namespace}-active'
  //       }
  //     })

  //     expect(notice.classes.CONTAINER).toEqual('pj-notice-wrap')
  //     expect(notice.classes.ACTIVE).toEqual('pj-notice-active')
  //   })

  //   test('should override class namespace', () => {
  //     const notice = new Notice({
  //       classes: {
  //         namespace: 'notice',
  //         container: '{namespace}-wrap'
  //       }
  //     })

  //     expect(notice.classes.NAMESPACE).toEqual('notice')
  //     expect(notice.classes.CONTAINER).toEqual('notice-wrap')
  //   })

  //   describe('getClass()', () => {
  //     test('should get class with namespace', () => {
  //       const notice = new Notice({ classes: { namespace: 'hello' } })

  //       expect(notice.getClass('foo')).toEqual('foo')
  //       expect(notice.getClass('{namespace}-foo')).toEqual('hello-foo')
  //     })

  //     test('should get class with arg', () => {
  //       const notice = new Notice({ classes: { namespace: 'hello' } })

  //       expect(notice.getClass('foo', 'arg', 'value')).toEqual('foo')
  //       expect(notice.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
  //         'hello-value'
  //       )
  //     })
  //   })
  // })

  // describe('theme', () => {
  //   describe('getThemeClass()', () => {
  //     test('should get theme classes with default namespace', () => {
  //       const notice = new Notice({
  //         theme: null,
  //         classes: { theme: '{namespace}--{theme}' }
  //       })

  //       expect(notice.getThemeClass()).toEqual('')
  //       expect(notice.getThemeClass('bar')).toEqual('pj-notice--bar')
  //       expect(notice.getThemeClass('foo bar')).toEqual(
  //         'pj-notice--foo pj-notice--bar'
  //       )
  //     })

  //     test('should get theme classes with namespace override', () => {
  //       const notice = new Notice({
  //         theme: null,
  //         classes: {
  //           namespace: 'hello',
  //           theme: '{namespace}--{theme}'
  //         }
  //       })

  //       expect(notice.getThemeClass()).toEqual('')
  //       expect(notice.getThemeClass('bar')).toEqual('hello--bar')
  //       expect(notice.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
  //     })

  //     test('should get theme classes correctly when no classes.THEME defined', () => {
  //       const notice = new Notice({ theme: '{namespace}--foo' })

  //       // set to null for test
  //       notice.classes.THEME = null

  //       expect(notice.getThemeClass()).toEqual('pj-notice--foo')
  //       expect(notice.getThemeClass('bar')).toEqual('bar')
  //       expect(notice.getThemeClass('{namespace}--bar')).toEqual(
  //         'pj-notice--bar'
  //       )
  //       expect(notice.getThemeClass('foo bar')).toEqual('foo bar')
  //       expect(
  //         notice.getThemeClass('{namespace}--foo {namespace}--bar')
  //       ).toEqual('pj-notice--foo pj-notice--bar')
  //     })
  //   })
  // })

  // // describe('initialize()', () => {
  // //   let $doc = $(window.document.body);

  // //   afterEach(function() {
  // //     $doc.off('notice:ready');
  // //   });

  // //   test('should trigger ready event', () => {
  // //     let called = 0;

  // //     $doc.on('notice:ready', function(event, api) {
  // //       expect(api.is('initialized')).toBeTrue();
  // //       called++;
  // //     });

  // //     new Notice();
  // //     expect(called).toEqual(1);
  // //   });
  // // });

  // describe('destroy()', () => {
  //   const api = new Notice()
  //   const $element = api.$element

  //   afterEach(() => {
  //     $element.off('notice:destroy')
  //   })

  //   test('should trigger destroy event', () => {
  //     let called = 0

  //     $element.on('notice:destroy', (event, api) => {
  //       expect(api.is('initialized')).toBeFalse()
  //       called++
  //     })

  //     api.destroy()

  //     expect(called).toEqual(1)
  //   })
  // })
})
