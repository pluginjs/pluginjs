import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Modal from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Modal', () => {
  describe('Modal()', () => {
    test('should have Modal', () => {
      expect(Modal).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Modal.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Modal.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Modal.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Modal.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const modal = new Modal()

      expect(modal).toBeObject()
      expect(modal.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const modal = new Modal()

      expect(modal.options).toBeObject()
    })

    test('should have classes', () => {
      const modal = new Modal()

      expect(modal.classes).toBeObject()
    })
  })

  // describe('classes', () => {
  //   test('should use classes options', () => {
  //     let modal = new Modal({
  //       classes: {
  //         container: '{namespace}-body',
  //         active: '{namespace}-active'
  //       }
  //     });

  //     expect(modal.classes.CONTAINER).toEqual('pj-modal-body');
  //     expect(modal.classes.ACTIVE).toEqual('pj-modal-active');
  //   });

  //   test('should override class namespace', () => {
  //     let modal = new Modal({
  //       classes: {
  //         namespace: 'modal',
  //         container: '{namespace}-wrap'
  //       }
  //     });

  //     expect(modal.classes.NAMESPACE).toEqual('modal');
  //     expect(modal.classes.CONTAINER).toEqual('modal-wrap');
  //   });

  //   describe('getClass()', () => {
  //     test('should get class with namespace', () => {
  //       let modal = new Modal({
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(modal.getClass('foo')).toEqual('foo');
  //       expect(modal.getClass('{namespace}-foo')).toEqual('hello-foo');
  //     });

  //     test('should get class with arg', () => {
  //       let modal = new Modal({
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(modal.getClass('foo', 'arg', 'value')).toEqual('foo');
  //       expect(modal.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
  //         'hello-value'
  //       );
  //     });
  //   });
  // });

  // describe('theme', () => {
  //   describe('getThemeClass()', () => {
  //     test('should get theme classes with default namespace', () => {
  //       let modal = new Modal({
  //         theme: null,
  //         classes: {
  //           theme: '{namespace}--{theme}'
  //         }
  //       });

  //       expect(modal.getThemeClass()).toEqual('');
  //       expect(modal.getThemeClass('bar')).toEqual('pj-modal--bar');
  //       expect(modal.getThemeClass('foo bar')).toEqual(
  //         'pj-modal--foo pj-modal--bar'
  //       );
  //     });

  //     test('should get theme classes with namespace override', () => {
  //       let modal = new Modal({
  //         theme: null,
  //         classes: {
  //           namespace: 'hello',
  //           theme: '{namespace}--{theme}'
  //         }
  //       });

  //       expect(modal.getThemeClass()).toEqual('');
  //       expect(modal.getThemeClass('bar')).toEqual('hello--bar');
  //       expect(modal.getThemeClass('foo bar')).toEqual(
  //         'hello--foo hello--bar'
  //       );
  //     });

  //     test('should get theme classes correctly when no classes.THEME defined', () => {
  //       let modal = new Modal({
  //         theme: '{namespace}--foo'
  //       });

  //       // set to null for test
  //       modal.classes.THEME = null;

  //       expect(modal.getThemeClass()).toEqual('pj-modal--foo');
  //       expect(modal.getThemeClass('bar')).toEqual('bar');
  //       expect(modal.getThemeClass('{namespace}--bar')).toEqual(
  //         'pj-modal--bar'
  //       );
  //       expect(modal.getThemeClass('foo bar')).toEqual('foo bar');
  //       expect(
  //         modal.getThemeClass('{namespace}--foo {namespace}--bar')
  //       ).toEqual('pj-modal--foo pj-modal--bar');
  //     });
  //   });
  // });

  // describe('initialize()', () => {
  //   let $doc = $(window.document.body);

  //   afterEach(function() {
  //     $doc.off('modal:ready');
  //   });

  //   test('should trigger ready event', () => {
  //     let called = 0;

  //     $doc.on('modal:ready', function(event, api) {
  //       expect(api.is('initialized')).toBeTrue();
  //       called++;
  //     });

  //     new Modal();
  //     expect(called).toEqual(1);
  //   });
  // });

  // describe('destroy()', () => {
  //   let api = new Modal();
  //   let $doc = $(window.document.body);

  //   afterEach(function() {
  //     $doc.off('modal:destroy');
  //   });

  //   test('should trigger destroy event', () => {
  //     let called = 0;

  //     $doc.on('modal:destroy', function(event, api) {
  //       expect(api.is('initialized')).toBeFalse();
  //       called++;
  //     });

  //     api.destroy();

  //     expect(called).toEqual(1);
  //   });
  // });

  // describe('i18n', () => {
  //   let api = new Modal();
  //   let $doc = $(window.document.body);

  //   test('should have I18N', () => {
  //     expect(Modal.I18N).toBeObject();
  //   });

  //   describe('getLocale()', () => {
  //     test('should get default locale', () => {
  //       expect(api.getLocale()).toEqual(DEFAULTS.locale);
  //     });

  //     test('should get locale with options set', () => {
  //       api = new Modal({
  //         locale: 'zh-cn'
  //       });
  //       expect(api.getLocale()).toEqual('zh-cn');
  //     });
  //   });

  //   describe('setLocale()', () => {
  //     test('should override default locale', () => {
  //       api = new Modal();
  //       expect(api.getLocale()).toEqual(DEFAULTS.locale);

  //       api.setLocale('zh-cn');

  //       expect(api.getLocale()).toEqual('zh-cn');
  //     });
  //   });

  //   describe('addTransition', () => {
  //     test('should add transtion correctly', () => {
  //       Modal.I18N.addTranslation('zh-tw', {
  //         hello: '世界妳好'
  //       });
  //       api.setLocale('zh-tw');
  //       expect(api.translate('hello')).toEqual('世界妳好');
  //     });
  //   });

  //   describe('fallbacks', () => {
  //     test('should fallbacks to less specific locale', () => {
  //       api.setLocale('zh-cn');
  //       expect(api.translate('hello')).toEqual('世界你好');
  //     });
  //   });

  //   describe('translate()', () => {
  //     test('should get translated message', () => {
  //       api = new Modal();

  //       expect(api.translate('hello')).toEqual('Hello world');

  //       api.setLocale('zh');
  //       expect(api.translate('hello')).toEqual('世界你好');
  //     });

  //     test('should pass the variable to message', () => {
  //       api = new Modal();

  //       expect(
  //         api.translate('greeting', {
  //           name: 'John'
  //         })
  //       ).toEqual('Hello John!');

  //       api.setLocale('zh');

  //       expect(
  //         api.translate('greeting', {
  //           name: 'John'
  //         })
  //       ).toEqual('John 你好!');
  //     });

  //     test('should works with plurals', () => {
  //       api = new Modal();

  //       expect(
  //         api.translate('plurals', {
  //           count: '0',
  //           _number: 'count'
  //         })
  //       ).toEqual('no product');

  //       expect(
  //         api.translate('plurals', {
  //           count: '1',
  //           _number: 'count'
  //         })
  //       ).toEqual('1 product');

  //       expect(
  //         api.translate('plurals', {
  //           count: '2',
  //           _number: 'count'
  //         })
  //       ).toEqual('2 products');

  //       api.setLocale('zh');

  //       expect(
  //         api.translate('plurals', {
  //           count: '0',
  //           _number: 'count'
  //         })
  //       ).toEqual('0 个产品');

  //       expect(
  //         api.translate('plurals', {
  //           count: '1',
  //           _number: 'count'
  //         })
  //       ).toEqual('1 个产品');

  //       expect(
  //         api.translate('plurals', {
  //           count: '2',
  //           _number: 'count'
  //         })
  //       ).toEqual('2 个产品');
  //     });
  //   });
  // });
})
