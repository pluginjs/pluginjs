import { query } from '@pluginjs/dom'
import Spinner from '@pluginjs/spinner'

const element = query('#units .example-units')
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
