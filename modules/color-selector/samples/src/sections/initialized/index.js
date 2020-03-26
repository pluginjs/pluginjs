import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const data = {
  scheme: {
    Primary: '#55a4f2',
    fontColor: '#ccc',
    'bg Color': '#f2a654',
    'border Color': '#f1f1f1',
    red: 'red',
    brown: 'brown',
    lightblue: 'lightblue',
    green: 'green',
    1: 'green',
    2: 'green',
    3: 'green',
    4: 'green',
    5: 'green',
    6: 'green',
    7: 'green',
    8: 'green',
    9: 'green',
    12: 'green',
    11: 'green',
    13: 'green',
    14: 'green',
    15: 'green',
    16: 'rgba(210,133,89,.3)',
    333: 'rgba(210,133,89,.3)',
    222: 'rgba(210,133,89,.3)',
    111: 'rgba(210,133,89,.3)',
  }
}

ColorSelector.setCollectionData(data)

const element = query('#initialized .input')
ColorSelector.of(element, {})
