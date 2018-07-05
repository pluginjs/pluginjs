import { query } from '@pluginjs/dom'
import GradientPicker from '@pluginjs/gradient-picker'

const data = {
  'warm-flame':
    'linear-gradient(45deg, rgba(233,23,233,0.5) 0%, rgba(23,23,233,0.6) 99%, #fad0c4 100%)',
  'night-fade': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'spring-warnth':
    'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)',
  'juicy-peach': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'young-passion':
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'lady-lips': 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'sunny-morning': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'rainy-ashville': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
}

GradientPicker.setData(data)

const element = query('#initialized .example-input')
GradientPicker.of(element, {})
