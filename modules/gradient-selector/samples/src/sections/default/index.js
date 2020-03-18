import { query } from '@pluginjs/dom'
import GradientSelector from '@pluginjs/gradient-selector'

const data = {
  'Warm Flame':
    'linear-gradient(45deg, rgba(233,23,233,0.5) 0%, rgba(23,23,233,0.6) 99%, #fad0c4 100%)',
  'Night Fade': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'Spring Warnth':
    'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)',
  'Juicy Peach': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'Young Passion':
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'Lady Lips': 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'Sunny Morning': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'Rainy Ashville': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
  'Frozen Dreams':
    'linear-gradient(to top, rgb(253, 203, 241), rgb(253, 203, 241) 1%, rgb(230, 222, 233))',
  'Winter Neva':
    'linear-gradient(120deg, rgb(161, 196, 253), rgb(194, 233, 251))',
  'Dusty Grass':
    'linear-gradient(120deg, rgb(212, 252, 121), rgb(150, 230, 161))',
  'Tempting Azure':
    'linear-gradient(120deg, rgb(132, 250, 176), rgb(143, 211, 244))',
  'Heavy Rain':
    'linear-gradient(to top, rgb(207, 217, 223), rgb(226, 235, 240))',
  'Amy Crisp':
    'linear-gradient(120deg, rgb(166, 192, 254), rgb(246, 128, 132))',
  'Mean Fruit':
    'linear-gradient(120deg, rgb(252, 203, 144), rgb(213, 126, 235))',
  'Sharpeye Eagle':
    'linear-gradient(to top, rgb(152, 144, 227), rgb(177, 244, 207))',
  'Deep Blue':
    'linear-gradient(to right, rgb(106, 17, 203), rgb(37, 117, 252))',
  'Ripe Malinka':
    'linear-gradient(120deg, rgb(240, 147, 251), rgb(245, 87, 108))',
  'Cloudy Knoxville':
    'linear-gradient(120deg, rgb(253, 251, 251), rgb(235, 237, 238))',
  'Malibu Beach':
    'linear-gradient(to right, rgb(79, 172, 254), rgb(0, 242, 254))',
  'New Life': 'linear-gradient(to right, rgb(67, 233, 123), rgb(56, 249, 215))',
  'True Sunset':
    'linear-gradient(to right, rgb(250, 112, 154), rgb(254, 225, 64))',
  'Morpheus Den': 'linear-gradient(to top, rgb(48, 207, 208), rgb(51, 8, 103))',
  'Rare Wind':
    'linear-gradient(to top, rgb(168, 237, 234), rgb(254, 214, 227))',
  'Near Moon': 'linear-gradient(to top, rgb(94, 231, 223), rgb(180, 144, 202))',
  'Wild Apple':
    'linear-gradient(to top, rgb(210, 153, 194), rgb(254, 249, 215))',
  'Saint Petersburg':
    'linear-gradient(to right bottom, rgb(245, 247, 250), rgb(195, 207, 226))',
  'Ladoga Bottom':
    'linear-gradient(to top, rgb(235, 192, 253), rgb(217, 222, 216))',
  'Plum Plate':
    'linear-gradient(to right bottom, rgb(102, 126, 234), rgb(118, 75, 162))',
  'Everlasting Sky':
    'linear-gradient(to right bottom, rgb(253, 252, 251), rgb(226, 209, 195))',
  'Happy Fisher':
    'linear-gradient(120deg, rgb(137, 247, 254), rgb(102, 166, 255))',
  Blessing: 'linear-gradient(to top, rgb(253, 219, 146), rgb(209, 253, 255))'
}

GradientSelector.setData(data)

const element = query('#default .example-default')
GradientSelector.of(element, {})
