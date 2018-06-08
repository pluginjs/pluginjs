import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Paginator from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Paginator', () => {
  // describe('Paginator()', () => {
  //   it('should have Paginator', () => {
  //     expect(Paginator).to.be.an('function');
  //   });

  //   it('should have defaults', () => {
  //     expect(Paginator.defaults).to.be.an('object');
  //   });

  //   it('should have events', () => {
  //     expect(Paginator.events).to.be.an('object');
  //   });

  //   it('should have classes', () => {
  //     expect(Paginator.classes).to.be.an('object');
  //   });

  //   it('should have methods', () => {
  //     expect(Paginator.methods).to.be.an('array');
  //   });
  // });

  // describe('constructor()', () => {
  //   it('should work with element', () => {
  //     let element = document.createElement('div');
  //     let paginator = new Paginator(element);

  //     expect(paginator).to.be.an('object');
  //     expect(paginator.options).to.be.eql(DEFAULTS);
  //   });

  //   it('should have options', () => {
  //     let element = document.createElement('div');
  //     let paginator = new Paginator(element);

  //     expect(paginator.options).to.be.an('object');
  //   });
  // });

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPaginator()).to.be.equal($element)

      const api = $element.data('paginator')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  // describe('api call', () => {
  //   it('should not call bind', () => {
  //     let $element = $(document.createElement('div')).asPaginator();
  //     expect($element.asPaginator('bind')).to.be.undefined;
  //   });

  //   it('should call destroy', () => {
  //     let $element = $(document.createElement('div')).asPaginator();
  //     expect($element.asPaginator('destroy')).to.be.equal($element);
  //   });
  // });

  // describe('initialize()', () => {
  //   let $element;

  //   beforeEach(function() {
  //     $element = $(document.createElement('div'))
  //   });

  //   it('should trigger ready event', () => {
  //     let called = 0;

  //     $element.on('paginator:ready', function(event, api) {
  //       expect(api.is('initialized')).to.be.true;
  //       called ++;
  //     });

  //     $element.asPaginator();
  //     expect(called).to.be.equal(1);
  //   });
  // });

  // describe('destroy()', () => {
  //   let $element;
  //   let api;

  //   beforeEach(function() {
  //     $element = $(document.createElement('div')).asPaginator();
  //     api = $element.data('paginator');
  //   });

  //   it('should trigger destroy event', () => {
  //     let called = 0;

  //     $element.on('paginator:destroy', function(event, api) {
  //       expect(api.is('initialized')).to.be.false;
  //       called ++;
  //     });

  //     $element.asPaginator('destroy');

  //     expect(called).to.be.equal(1);
  //   });
  // });

  // describe('enable()', () => {
  //   let $element;
  //   let api;

  //   beforeEach(function() {
  //     $element = $(document.createElement('div')).asPaginator();
  //     api = $element.data('paginator');
  //   });

  //   it('should enable the plugin', () => {
  //     $element.asPaginator('disable');
  //     $element.asPaginator('enable');

  //     expect(api.is('disabled')).to.be.false;
  //   });

  //   it('should trigger enable event', () => {
  //     let called = 0;

  //     $element.on('paginator:enable', function(event, api) {
  //       expect(api.is('disabled')).to.be.false;
  //       called ++;
  //     });

  //     $element.asPaginator('enable');
  //     expect(called).to.be.equal(1);
  //   });
  // });

  // describe('disable()', () => {
  //   let $element;
  //   let api;

  //   beforeEach(function() {
  //      $element = $(document.createElement('div')).asPaginator();
  //      api = $element.data('paginator');
  //   });

  //   it('should disable the plugin', () => {
  //     $element.asPaginator('disable');

  //     expect(api.is('disabled')).to.be.true;
  //   });

  //   it('should trigger disable event', () => {
  //     let called = 0;

  //     $element.on('paginator:disable', function(event, api) {
  //       expect(api.is('disabled')).to.be.true;
  //       called ++;
  //     });

  //     $element.asPaginator('disable');
  //     expect(called).to.be.equal(1);
  //   });
  // });
})
