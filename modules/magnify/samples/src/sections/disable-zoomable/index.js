import { queryAll } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const elements = queryAll('#disable-zoomable .example')

elements.forEach(element => {
  Magnify.of(element, {
    zoomable: false
  })
})
