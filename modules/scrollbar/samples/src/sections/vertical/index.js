import { query, queryAll } from '@pluginjs/dom'
import Scrollbar from '@pluginjs/scrollbar'

const element = query('.example-scrollbar-vertical')
const btnTo = queryAll('.api-move-to')
const btnBy = queryAll('.api-move-by')

const API = Scrollbar.of(element, {
  direction: 'vertical',
  minHandleLength: 100,
  handleLength: 100,
  maxHandleLength: 100,
  mouseDrag: true,
  touchDrag: true,
  pointerDrag: true,
  clickMove: true,
  clickMoveStep: 0.2, // 0 - 1
  mousewheel: true,
  mousewheelSpeed: 50,
  keyboard: true,
  useCssTransforms3d: true,
  useCssTransforms: true,
  useCssTransitions: true,
  duration: '800',
  easing: 'ease'
})

btnTo.forEach(btn => {
  btn.addEventListener('click', e => {
    const to = e.target.dataset.to
    API.moveTo(to)
  })
})

btnBy.forEach(btn => {
  btn.addEventListener('click', e => {
    const by = e.target.dataset.by
    API.moveBy(by)
  })
})
