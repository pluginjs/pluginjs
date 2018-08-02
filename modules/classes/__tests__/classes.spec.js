import * as classes from '../src/main'

describe('classes', () => {
  test('hasClass', () => {
    const dom = document.createElement('div')
    dom.classList.add('foo')
    expect(classes.hasClass('foo', dom)).toBe(dom.classList.contains('foo'))
  })
  test('addClass', () => {
    const dom = document.createElement('div')
    classes.addClass('foo', 'bar', dom)
    expect(classes.hasClass('foo', dom)).toBeTrue()
    expect(classes.hasClass('bar', dom)).toBeTrue()
  })
  test('removeClass', () => {
    const dom = document.createElement('div')
    classes.addClass('foo', 'bar', dom)
    classes.removeClass('foo', 'bar', dom)
    expect(classes.hasClass('foo', dom)).toBeFalse()
    expect(classes.hasClass('bar', dom)).toBeFalse()
  })
  test('indexOfClass', () => {
    const dom = document.createElement('div')
    classes.addClass('foo', 'bar', dom)
    expect(classes.indexOfClass('bar', dom)).toBe(dom.classList.item('bar'))
  })
  test('toggleClass', () => {
    const dom = document.createElement('div')
    classes.addClass('foo', dom)
    classes.toggleClass('foo', dom)
    expect(classes.hasClass('foo', dom)).toBeFalse()
  })
})
