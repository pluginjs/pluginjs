import { queryAll } from '@pluginjs/dom'
import Magnify from '@pluginjs/magnify'

const elements = queryAll('#disable-loader .example')

elements.forEach(element => {
  Magnify.of(element, {
    loader: false
  })
})
