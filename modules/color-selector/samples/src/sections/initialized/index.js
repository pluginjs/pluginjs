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
    alphaTest: 'rgba(210,133,89,.3)',
    'Gradient Bg': 'linear-gradient(90deg, #fff 0%,#2aaedc 40%, #000 100%)'
  }
}

ColorSelector.setCollectionData(data)

const element = query('#initialized .input')
ColorSelector.of(element, {})
