import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Shorten from '../../src/main.js'
import { defaults as DEFAULTS } from '../../src/constant'
describe('Shorten', () => {
  describe('Shorten()', () => {
    it('should have Shorten', () => {
      expect(Shorten).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Shorten.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Shorten.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Shorten.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const shorten = new Shorten(element)

      expect(shorten).to.be.an('object')
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const shorten = new Shorten(element, {
        chars: 200,
        ellipses: '***'
      })

      expect(shorten.options).to.be.an('object')
      expect(shorten.options.chars).to.be.equal(200)
      expect(shorten.options.ellipses).to.be.equal('***')
      expect(shorten.options.chars).to.be.an('number')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asShorten()).to.be.equal($element)

      const api = $element.data('shorten')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asShorten()
      expect($element.asShorten('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
      $element.html(
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam'
      )
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('shorten:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asShorten()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div'))
        .html(
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos At vero eos At vero eos At vero eos At vero eos'
        )
        .asShorten()
      api = $element.data('shorten')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('shorten:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asShorten('destroy')

      expect(called).to.be.equal(1)
    })
  })
})
