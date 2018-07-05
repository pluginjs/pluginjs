import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const data = {
  scheme: {
    Primary: '#55a4f2',
    fontColor: '#ccc',
    'bg Color': '#f2a654',
    'border Color': '#f1f1f1'
  },
  favorites: {
    red: 'red',
    brown: 'brown',
    lightblue: 'lightblue',
    green: 'green',
    alphaTest: 'rgba(210,133,89,.3)',
    'Gradient Bg': 'linear-gradient(90deg, #fff 0%,#2aaedc 40%, #000 100%)'
  }
}

ColorPicker.setCollectionData(data)

const element = query('#initialized .input')
ColorPicker.of(element, {})
