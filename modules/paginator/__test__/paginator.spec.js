import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Paginator from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Paginator', () => {
  // describe('Paginator()', () => {
  //   test('should have Paginator', () => {
  //     expect(Paginator).toBeFunction();
  //   });

  //   test('should have defaults', () => {
  //     expect(Paginator.defaults).toBeObject();
  //   });

  //   test('should have events', () => {
  //     expect(Paginator.events).toBeObject();
  //   });

  //   test('should have classes', () => {
  //     expect(Paginator.classes).toBeObject();
  //   });

  //   test('should have methods', () => {
  //     expect(Paginator.methods).toBeArray();
  //   });
  // });

  // describe('constructor()', () => {
  //   test('should work with element', () => {
  //     let element = document.createElement('div');
  //     let paginator = new Paginator(element);

  //     expect(paginator).toBeObject();
  //     expect(paginator.options).toEqual(DEFAULTS);
  //   });

  //   test('should have options', () => {
  //     let element = document.createElement('div');
  //     let paginator = new Paginator(element);

  //     expect(paginator.options).toBeObject();
  //   });
  // });

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPaginator()).toEqual($element)

      const api = $element.data('paginator')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  // describe('api call', () => {
  //   test('should not call bind', () => {
  //     let $element = $(document.createElement('div')).asPaginator();
  //     expect($element.asPaginator('bind')).toBeNil();
  //   });

  //   test('should call destroy', () => {
  //     let $element = $(document.createElement('div')).asPaginator();
  //     expect($element.asPaginator('destroy')).toEqual($element);
  //   });
  // });

  // describe('initialize()', () => {
  //   let $element;

  //   beforeEach(function() {
  //     $element = $(document.createElement('div'))
  //   });

  //   test('should trigger ready event', () => {
  //     let called = 0;

  //     $element.on('paginator:ready', function(event, api) {
  //       expect(api.is('initialized')).toBeTrue();
  //       called ++;
  //     });

  //     $element.asPaginator();
  //     expect(called).toEqual(1);
  //   });
  // });

  // describe('destroy()', () => {
  //   let $element;
  //   let api;

  //   beforeEach(function() {
  //     $element = $(document.createElement('div')).asPaginator();
  //     api = $element.data('paginator');
  //   });

  //   test('should trigger destroy event', () => {
  //     let called = 0;

  //     $element.on('paginator:destroy', function(event, api) {
  //       expect(api.is('initialized')).toBeFalse();
  //       called ++;
  //     });

  //     $element.asPaginator('destroy');

  //     expect(called).toEqual(1);
  //   });
  // });

  // describe('enable()', () => {
  //   let $element;
  //   let api;

  //   beforeEach(function() {
  //     $element = $(document.createElement('div')).asPaginator();
  //     api = $element.data('paginator');
  //   });

  //   test('should enable the plugin', () => {
  //     $element.asPaginator('disable');
  //     $element.asPaginator('enable');

  //     expect(api.is('disabled')).toBeFalse();
  //   });

  //   test('should trigger enable event', () => {
  //     let called = 0;

  //     $element.on('paginator:enable', function(event, api) {
  //       expect(api.is('disabled')).toBeFalse();
  //       called ++;
  //     });

  //     $element.asPaginator('enable');
  //     expect(called).toEqual(1);
  //   });
  // });

  // describe('disable()', () => {
  //   let $element;
  //   let api;

  //   beforeEach(function() {
  //      $element = $(document.createElement('div')).asPaginator();
  //      api = $element.data('paginator');
  //   });

  //   test('should disable the plugin', () => {
  //     $element.asPaginator('disable');

  //     expect(api.is('disabled')).toBeTrue();
  //   });

  //   test('should trigger disable event', () => {
  //     let called = 0;

  //     $element.on('paginator:disable', function(event, api) {
  //       expect(api.is('disabled')).toBeTrue();
  //       called ++;
  //     });

  //     $element.asPaginator('disable');
  //     expect(called).toEqual(1);
  //   });
  // });
})
