import $ from 'jquery'
import {
  transform3D,
  transform,
  transition,
  transitionProperty,
  transformProperty,
  animationProperty,
  transitionEndEvent,
  animationEndEvent,
  isSupportedSvg,
  pointer,
  pointerEvent,
  touch
} from '../src'

describe('feature', () => {
  it('should test transform3D', () => {
    expect(transform3D).to.be.an('boolean')
  })

  it('should test transform', () => {
    expect(transform).to.be.an('boolean')
  })

  it('should test transition', () => {
    expect(transition).to.be.an('boolean')
  })

  it('should test transition property', () => {
    expect(transitionProperty()).to.contain('transition')
  })

  it('should test transform property', () => {
    expect(transformProperty()).to.contain('transform')
  })

  it('should test animation property', () => {
    expect(animationProperty()).to.contain('animation')
  })

  it('should test transition end event', () => {
    expect(transitionEndEvent()).to.contain('transition')
  })

  it('should test animation end event', () => {
    expect(animationEndEvent()).to.contain('animation')
  })

  it('should test svg', () => {
    expect(isSupportedSvg()).to.be.an('boolean')
  })

  it('should test touch', () => {
    expect(touch).to.be.an('boolean')
  })

  it('should test pointer', () => {
    expect(pointer).to.be.an('boolean')
  })

  it('should get pointer event', () => {
    expect(pointerEvent('pointerdown')).to.contain('ointer')
  })
})
