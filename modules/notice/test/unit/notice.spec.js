import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Notice from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Notice', () => {
  describe('Notice()', () => {
    it('should have Notice', () => {
      expect(Notice).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Notice.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Notice.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Notice.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Notice.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work correctly', () => {
      const notice = new Notice()

      expect(notice).to.be.an('object')
      expect(notice.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const notice = new Notice()

      expect(notice.options).to.be.an('object')
    })

    it('should have classes', () => {
      const notice = new Notice()

      expect(notice.classes).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const notice = new Notice({
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(notice.classes.CONTAINER).to.be.equal('pj-notice-wrap')
      expect(notice.classes.ACTIVE).to.be.equal('pj-notice-active')
    })

    it('should override class namespace', () => {
      const notice = new Notice({
        classes: {
          namespace: 'notice',
          container: '{namespace}-wrap'
        }
      })

      expect(notice.classes.NAMESPACE).to.be.equal('notice')
      expect(notice.classes.CONTAINER).to.be.equal('notice-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const notice = new Notice({ classes: { namespace: 'hello' } })

        expect(notice.getClass('foo')).to.be.equal('foo')
        expect(notice.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const notice = new Notice({ classes: { namespace: 'hello' } })

        expect(notice.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          notice.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const notice = new Notice({
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(notice.getThemeClass()).to.be.equal('')
        expect(notice.getThemeClass('bar')).to.be.equal('pj-notice--bar')
        expect(notice.getThemeClass('foo bar')).to.be.equal(
          'pj-notice--foo pj-notice--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const notice = new Notice({
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(notice.getThemeClass()).to.be.equal('')
        expect(notice.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(notice.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const notice = new Notice({ theme: '{namespace}--foo' })

        // set to null for test
        notice.classes.THEME = null

        expect(notice.getThemeClass()).to.be.equal('pj-notice--foo')
        expect(notice.getThemeClass('bar')).to.be.equal('bar')
        expect(notice.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-notice--bar'
        )
        expect(notice.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          notice.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-notice--foo pj-notice--bar')
      })
    })
  })

  // describe('initialize()', () => {
  //   let $doc = $(window.document.body);

  //   afterEach(function() {
  //     $doc.off('notice:ready');
  //   });

  //   it('should trigger ready event', () => {
  //     let called = 0;

  //     $doc.on('notice:ready', function(event, api) {
  //       expect(api.is('initialized')).to.be.true;
  //       called++;
  //     });

  //     new Notice();
  //     expect(called).to.be.equal(1);
  //   });
  // });

  describe('destroy()', () => {
    const api = new Notice()
    const $element = api.$element

    afterEach(() => {
      $element.off('notice:destroy')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('notice:destroy', (event, api) => {
        console.log(1)
        expect(api.is('initialized')).to.be.false
        called++
      })

      api.destroy()

      expect(called).to.be.equal(1)
    })
  })
})
