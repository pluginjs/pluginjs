import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'
import feather from 'feather-icons'
// see https://github.com/feathericons/feather

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

const element = query('#default .example')
const init = () => {
  return SvgPicker.of(element, {
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
}
let api = init()

query('.api').addEventListener('click', event => {
  const el = event.target
  
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = init()
      break
    case 'get':
      console.info(api.get())
      break
    case 'set':
      api.set({
        name: 'globe',
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'
      })
      break
    case 'val':
      console.info(api.val())
      break
    case 'val_set':
      api.val(
        '{"name":"heart","tags":["like","love"],"svg":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" class=\\"feather feather-heart\\"><path d=\\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\\"></path></svg>"}'
      )
      break
    case 'clear':
      api.clear()
      break
    case 'manage':
      api.manage()
      break
    case 'disable':
      api.disable()
      break
    case 'enable':
      api.enable()
      break
    case 'destroy':
      api.destroy()
      break
    default: {
      console.info(el.dataset.api)
    }
  }
})
