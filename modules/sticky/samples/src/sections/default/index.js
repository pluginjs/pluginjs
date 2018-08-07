import { query } from '@pluginjs/dom'
import Sticky from '@pluginjs/sticky'

const elementA = query('#default .headingA')
const elementB = query('#default .headingB')
const elementC = query('#default .headingC')
const elementD = query('#default .headingD')
Sticky.of(elementA, {
  spacing: 0,
  onSticky() {
    console.log('trigger sticky')
  },
  onStuck() {
    console.log('trigger stuck')
  },
  onUnsticky() {
    console.log('trigger unsticky')
  }
})
Sticky.of(elementB, {
  spacing: 24
})
Sticky.of(elementC, {
  spacing: 48
})
Sticky.of(elementD, {
  spacing: 72
})
