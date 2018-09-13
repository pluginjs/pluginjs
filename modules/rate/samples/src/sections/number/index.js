import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#number .number')
const api = Rate.of(element, {
  max: 7,
  iconSize: '26px',
  value: 3.5,
  onChangeHoverScore: () => {
    const hoverScore = api.getHoverScore()
    const t = `score: ${hoverScore}`
    const value = document.querySelector('.numberscore')
    value.innerHTML = t
  },
  onMouseLeave: () => {
    const score = api.getScore()
    const t = `score: ${score}`
    const value = document.querySelector('.numberscore')
    value.innerHTML = t
  }
})
