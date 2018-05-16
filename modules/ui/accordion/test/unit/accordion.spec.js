import jsdom from 'mocha-jsdom'
import Accordion from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getAccordionElement = () => parseHTML`
  <ul class="accordion pj-accordion pj-accordion--default">
    <li class="pj-accordion-pane pj-accordion-active">
      <div class="pj-accordion-pane-header">Section 1</div>
      <div class="pj-accordion-pane-content">
        <div class="pj-accordion-pane-content-inner">
          This's section 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing elit. Fusce veli tortor.
        </div>
      </div>
    </li>
    <li class="pj-accordion-pane">
      <div class="pj-accordion-pane-header">Section 2</div>
      <div class="pj-accordion-pane-content">
        <div class="pj-accordion-pane-content-inner">
          This's section 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing elit. Fusce veli tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
    </li>
    <li class="pj-accordion-pane">
      <div class="pj-accordion-pane-header">Section 3</div>
      <div class="pj-accordion-pane-content">
        <div class="pj-accordion-pane-content-inner">
          This's section 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit tortor, dictum in gravida nec, aliquet non lorem. pellentesque. ipiscing elit. Fusce veli tortor.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
    </li>
  </ul>`
describe('Accordion', () => {
  describe('Accordion()', () => {
    it('should have Accordion', () => {
      expect(Accordion).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Accordion.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Accordion.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Accordion.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Accordion.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const accordion = Accordion.of(getAccordionElement())

      expect(accordion).to.be.an('object')
      expect(accordion.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const accordion = Accordion.of(getAccordionElement())

      expect(accordion.options).to.be.an('object')
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getAccordionElement()
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('accordion:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      Accordion.of($element)
      expect(called).to.be.equal(1)
    })
  })
})
