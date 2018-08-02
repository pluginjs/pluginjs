import * as classes from '../src/main'

describe('classes', () => {
  test('addClass', () => {
    const dom = document.createElement('div')
    classes.addClass('foo', 'bar', dom)
    expect(classes.hasClass('foo', dom)).toBeTrue()
    expect(classes.hasClass('bar', dom)).toBeTrue()
  })
})
