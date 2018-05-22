import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Modal from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Modal', () => {
  describe('Modal()', () => {
    it('should have Modal', () => {
      expect(Modal).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Modal.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Modal.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Modal.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Modal.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work correctly', () => {
      const modal = new Modal()

      expect(modal).to.be.an('object')
      expect(modal.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const modal = new Modal()

      expect(modal.options).to.be.an('object')
    })

    it('should have classes', () => {
      const modal = new Modal()

      expect(modal.classes).to.be.an('object')
    })
  })

  // describe('classes', () => {
  //   it('should use classes options', () => {
  //     let modal = new Modal({
  //       classes: {
  //         container: '{namespace}-body',
  //         active: '{namespace}-active'
  //       }
  //     });

  //     expect(modal.classes.CONTAINER).to.be.equal('pj-modal-body');
  //     expect(modal.classes.ACTIVE).to.be.equal('pj-modal-active');
  //   });

  //   it('should override class namespace', () => {
  //     let modal = new Modal({
  //       classes: {
  //         namespace: 'modal',
  //         container: '{namespace}-wrap'
  //       }
  //     });

  //     expect(modal.classes.NAMESPACE).to.be.equal('modal');
  //     expect(modal.classes.CONTAINER).to.be.equal('modal-wrap');
  //   });

  //   describe('getClass()', () => {
  //     it('should get class with namespace', () => {
  //       let modal = new Modal({
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(modal.getClass('foo')).to.be.equal('foo');
  //       expect(modal.getClass('{namespace}-foo')).to.be.equal('hello-foo');
  //     });

  //     it('should get class with arg', () => {
  //       let modal = new Modal({
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(modal.getClass('foo', 'arg', 'value')).to.be.equal('foo');
  //       expect(modal.getClass('{namespace}-{arg}', 'arg', 'value')).to.be.equal(
  //         'hello-value'
  //       );
  //     });
  //   });
  // });

  // describe('theme', () => {
  //   describe('getThemeClass()', () => {
  //     it('should get theme classes with default namespace', () => {
  //       let modal = new Modal({
  //         theme: null,
  //         classes: {
  //           theme: '{namespace}--{theme}'
  //         }
  //       });

  //       expect(modal.getThemeClass()).to.be.equal('');
  //       expect(modal.getThemeClass('bar')).to.be.equal('pj-modal--bar');
  //       expect(modal.getThemeClass('foo bar')).to.be.equal(
  //         'pj-modal--foo pj-modal--bar'
  //       );
  //     });

  //     it('should get theme classes with namespace override', () => {
  //       let modal = new Modal({
  //         theme: null,
  //         classes: {
  //           namespace: 'hello',
  //           theme: '{namespace}--{theme}'
  //         }
  //       });

  //       expect(modal.getThemeClass()).to.be.equal('');
  //       expect(modal.getThemeClass('bar')).to.be.equal('hello--bar');
  //       expect(modal.getThemeClass('foo bar')).to.be.equal(
  //         'hello--foo hello--bar'
  //       );
  //     });

  //     it('should get theme classes correctly when no classes.THEME defined', () => {
  //       let modal = new Modal({
  //         theme: '{namespace}--foo'
  //       });

  //       // set to null for test
  //       modal.classes.THEME = null;

  //       expect(modal.getThemeClass()).to.be.equal('pj-modal--foo');
  //       expect(modal.getThemeClass('bar')).to.be.equal('bar');
  //       expect(modal.getThemeClass('{namespace}--bar')).to.be.equal(
  //         'pj-modal--bar'
  //       );
  //       expect(modal.getThemeClass('foo bar')).to.be.equal('foo bar');
  //       expect(
  //         modal.getThemeClass('{namespace}--foo {namespace}--bar')
  //       ).to.be.equal('pj-modal--foo pj-modal--bar');
  //     });
  //   });
  // });

  // describe('initialize()', () => {
  //   let $doc = $(window.document.body);

  //   afterEach(function() {
  //     $doc.off('modal:ready');
  //   });

  //   it('should trigger ready event', () => {
  //     let called = 0;

  //     $doc.on('modal:ready', function(event, api) {
  //       expect(api.is('initialized')).to.be.true;
  //       called++;
  //     });

  //     new Modal();
  //     expect(called).to.be.equal(1);
  //   });
  // });

  // describe('destroy()', () => {
  //   let api = new Modal();
  //   let $doc = $(window.document.body);

  //   afterEach(function() {
  //     $doc.off('modal:destroy');
  //   });

  //   it('should trigger destroy event', () => {
  //     let called = 0;

  //     $doc.on('modal:destroy', function(event, api) {
  //       expect(api.is('initialized')).to.be.false;
  //       called++;
  //     });

  //     api.destroy();

  //     expect(called).to.be.equal(1);
  //   });
  // });

  // describe('i18n', () => {
  //   let api = new Modal();
  //   let $doc = $(window.document.body);

  //   it('should have I18N', () => {
  //     expect(Modal.I18N).to.be.an('object');
  //   });

  //   describe('getLocale()', () => {
  //     it('should get default locale', () => {
  //       expect(api.getLocale()).to.be.equal(DEFAULTS.locale);
  //     });

  //     it('should get locale with options set', () => {
  //       api = new Modal({
  //         locale: 'zh-cn'
  //       });
  //       expect(api.getLocale()).to.be.equal('zh-cn');
  //     });
  //   });

  //   describe('setLocale()', () => {
  //     it('should override default locale', () => {
  //       api = new Modal();
  //       expect(api.getLocale()).to.be.equal(DEFAULTS.locale);

  //       api.setLocale('zh-cn');

  //       expect(api.getLocale()).to.be.equal('zh-cn');
  //     });
  //   });

  //   describe('addTransition', () => {
  //     it('should add transtion correctly', () => {
  //       Modal.I18N.addTranslation('zh-tw', {
  //         hello: '世界妳好'
  //       });
  //       api.setLocale('zh-tw');
  //       expect(api.translate('hello')).to.be.equal('世界妳好');
  //     });
  //   });

  //   describe('fallbacks', () => {
  //     it('should fallbacks to less specific locale', () => {
  //       api.setLocale('zh-cn');
  //       expect(api.translate('hello')).to.be.equal('世界你好');
  //     });
  //   });

  //   describe('translate()', () => {
  //     it('should get translated message', () => {
  //       api = new Modal();

  //       expect(api.translate('hello')).to.be.equal('Hello world');

  //       api.setLocale('zh');
  //       expect(api.translate('hello')).to.be.equal('世界你好');
  //     });

  //     it('should pass the variable to message', () => {
  //       api = new Modal();

  //       expect(
  //         api.translate('greeting', {
  //           name: 'John'
  //         })
  //       ).to.be.equal('Hello John!');

  //       api.setLocale('zh');

  //       expect(
  //         api.translate('greeting', {
  //           name: 'John'
  //         })
  //       ).to.be.equal('John 你好!');
  //     });

  //     it('should works with plurals', () => {
  //       api = new Modal();

  //       expect(
  //         api.translate('plurals', {
  //           count: '0',
  //           _number: 'count'
  //         })
  //       ).to.be.equal('no product');

  //       expect(
  //         api.translate('plurals', {
  //           count: '1',
  //           _number: 'count'
  //         })
  //       ).to.be.equal('1 product');

  //       expect(
  //         api.translate('plurals', {
  //           count: '2',
  //           _number: 'count'
  //         })
  //       ).to.be.equal('2 products');

  //       api.setLocale('zh');

  //       expect(
  //         api.translate('plurals', {
  //           count: '0',
  //           _number: 'count'
  //         })
  //       ).to.be.equal('0 个产品');

  //       expect(
  //         api.translate('plurals', {
  //           count: '1',
  //           _number: 'count'
  //         })
  //       ).to.be.equal('1 个产品');

  //       expect(
  //         api.translate('plurals', {
  //           count: '2',
  //           _number: 'count'
  //         })
  //       ).to.be.equal('2 个产品');
  //     });
  //   });
  // });
})
