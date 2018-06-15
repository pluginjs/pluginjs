import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-units', render(html, query('#units')))
const datas = {
  theme: null,
  unit: {
    px: {
      min: 5,
      max: 10,
      step: 1
    },
    '%': {
      min: 10,
      max: 60,
      step: 5
    }
  }
}
Spinner.of(element, { datas })
