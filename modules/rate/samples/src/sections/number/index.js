import { query } from '@pluginjs/dom'
import Rate from '@pluginjs/rate'

const element = query('#number .number')
const api = Rate.of(element, {
  max: 7,
  onChangeHoverScore: () => {
    const hoverScore = api.getHoverScore()
    const t = `score: ${hoverScore}`
    const value = document.querySelector('.numberscore')
    value.innerHTML = t
  }
})
