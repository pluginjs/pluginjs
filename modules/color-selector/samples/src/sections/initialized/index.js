import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const data = {
  scheme: {
    primary: {name: 'Primary', color: '#55a4f2'},
    fontColor: {name: 'FontColor', color: '#ccc'},
    brown: {name: 'Brown', color: '#55a4f2'},
    lightblue: {name: 'Lightblue', color: '#55a4f2'},
    1: {name: '1', color: '#55a4f2'},
    2: {name: '3', color: '#55a4f2'},
  }
}

ColorSelector.setCollectionData(data)

const element = query('#initialized .input')
ColorSelector.of(element, {})
