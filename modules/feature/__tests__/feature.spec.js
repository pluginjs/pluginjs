import {
  transform3D,
  transform,
  transition,
  transitionProperty,
  transformProperty,
  animationProperty,
  transitionEndEvent,
  animationEndEvent,
  svg,
  pointer,
  pointerEvent,
  touch
} from '../src'

describe('feature', () => {
  test('should test transform3D', () => {
    expect(transform3D).toBeBoolean()
  })

  test('should test transform', () => {
    expect(transform).toBeBoolean()
  })

  test('should test transition', () => {
    expect(transition).toBeBoolean()
  })

  test('should test transition property', () => {
    expect(transitionProperty()).toContainKey('transition')
  })

  test('should test transform property', () => {
    expect(transformProperty()).toContainKey('transform')
  })

  test('should test animation property', () => {
    expect(animationProperty()).toContainKey('animation')
  })

  test('should test transition end event', () => {
    expect(transitionEndEvent()).toContainKey('transition')
  })

  test('should test animation end event', () => {
    expect(animationEndEvent()).toContainKey('animation')
  })

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
    expect(pointerEvent('pointerdown')).toContainKey('ointer')
  })
})
