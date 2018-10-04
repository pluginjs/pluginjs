import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'
import feather from 'feather-icons'
// see https://github.com/feathericons/feather

const element = query('#manage .example')
const icons = [
  'activity',
  'anchor',
  'aperture',
  'archive',
  'award',
  'bell-off',
  'bell',
  'book',
  'bookmark',
  'calendar',
  'chrome',
  'clipboard',
  'code',
  'command',
  'compass',
  'cpu',
  'credit-card',
  'database',
  'disc',
  'download',
  'feather',
  'film',
  'gift',
  'globe',
  'grid',
  'headphones',
  'heart',
  'image',
  'instagram',
  'layers',
  'layout',
  'life-buoy',
  'map',
  'mic',
  'music',
  'package',
  'paperclip',
  'phone',
  'power',
  'printer',
  'send',
  'server',
  'settings',
  'shield',
  'scissors',
  'search',
  'send',
  'shopping-bag',
  'shopping-cart',
  'sliders',
  'smartphone',
  'speaker',
  'star',
  'sun',
  'sunrise',
  'sunset',
  'target',
  'terminal',
  'thermometer',
  'thumbs-down',
  'thumbs-up',
  'truck',
  'umbrella',
  'user',
  'users',
  'video',
  'watch',
  'wind',
  'youtube'
]
const source = icons.map(icon => {
  const ficon = feather.icons[icon]
  return {
    name: ficon.name,
    tags: ficon.tags,
    svg: ficon.toSvg()
  }
})
SvgPicker.of(element, {
  source(resolve) {
    resolve(source)
  },
  manage(resolve) {
    const items = Array.from(source)
    const updated = []
    while (items.length) {
      const random = Math.floor(Math.random() * items.length)
      updated.push(items[random])
      items.splice(random, 1)
    }

    resolve(updated)
  }
})
