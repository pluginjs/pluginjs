import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const data = {
  scheme: {
    primary: {name: 'Primary', color: '#55a4f2'},
    fontColor: {name: 'FontColor', color: '#ccc'},
    brown: {name: 'Brown', color: '#55a4f2'},
    lightblue: {name: 'Lightblue', color: '#55a4f2'},
    g1: {name: '1', color: '#55a4f2'},
    fh: {name: '3', color: '#55a4f2'},
    gg2: {name: '3', color: '#55a4f2'},
    hg2: {name: '3', color: '#55a4f2'},
    gd2: {name: '3', color: '#55a4f2'},
    fds2: {name: '3', color: '#55a4f2'},
    dsa2: {name: '3', color: '#55a4f2'},
    dd2: {name: '3', color: '#55a4f2'},
    ssd2: {name: '3', color: '#55a4f2'},
    sss2: {name: '3', color: '#55a4f2'},
    dd2: {name: '3', color: '#55a4f2'},
    fff2: {name: '3', color: '#55a4f2'},
    ff2: {name: '3', color: '#55a4f2'},
    d2: {name: '3', color: '#55a4f2'},
    p: {name: '3', color: '#55a4f2'},
    o: {name: '3', color: '#55a4f2'},
    i: {name: '3', color: '#55a4f2'},
    u: {name: '3', color: '#55a4f2'},
    y: {name: '3', color: '#55a4f2'},
    t: {name: '3', color: '#55a4f2'},
    r: {name: '3', color: '#55a4f2'},
    e: {name: '3', color: '#55a4f2'},
    w: {name: '3', color: '#55a4f2'},
    q: {name: '3', color: '#55a4f2'},
  }
}

ColorSelector.setCollectionData(data)

const element = query('#initialized .input')
ColorSelector.of(element, {})
