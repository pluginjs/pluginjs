import {
  transform3D,
  transform,
  transition,
  svg,
  pointer,
  pointerEvent,
  touch
} from '../src/main'

describe('feature', () => {
  test('should test transform3D', () => {
    expect(transform3D()).toBeBoolean()
  })

  test('should test transform', () => {
    expect(transform()).toBeBoolean()
  })

  test('should test transition', () => {
    expect(transition()).toBeBoolean()
  })

  /* Jsdom doesn't support this case */

  // test('should test transition property', () => {
  //   expect(transitionProperty()).toBe('transition')
  // })

  // test('should test transform property', () => {
  //   expect(transformProperty()).toBe('transform')
  // })

  // test('should test animation property', () => {
  //   expect(animationProperty()).toBe('animation')
  // })

  // test('should test transition end event', () => {
  //   expect(transitionEndEvent()).toBe('transition')
  // })

  // test('should test animation end event', () => {
  //   expect(animationEndEvent()).toBe('animation')
  // })

  test('should test svg', () => {
    expect(svg()).toBeBoolean()
  })

  test('should test touch', () => {
    expect(touch).toBeBoolean()
  })

  test('should test pointer', () => {
    expect(pointer).toBeBoolean()
  })

  test('should get pointer event', () => {
    expect(pointerEvent('pointerdown')).toBe('pointerdown')
  })
})
