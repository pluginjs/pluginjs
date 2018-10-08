import { query } from '@pluginjs/dom'
import SvgPicker from '@pluginjs/svg-picker'
import feather from 'feather-icons'
// see https://github.com/feathericons/feather

const icons = {
  Arrows: [
    'arrow-down-circle',
    'arrow-down-left',
    'arrow-down-right',
    'arrow-down',
    'arrow-left-circle',
    'arrow-left',
    'arrow-right-circle',
    'arrow-right',
    'arrow-up-circle',
    'arrow-up-left',
    'arrow-up-right',
    'arrow-up',
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'chevrons-down',
    'chevrons-left',
    'chevrons-right',
    'chevrons-up',
    'corner-down-left',
    'corner-down-right',
    'corner-left-down',
    'corner-left-up',
    'corner-right-down',
    'corner-right-up',
    'corner-up-left',
    'corner-up-right'
  ],
  Devices: [
    'camera',
    'hard-drive',
    'mic',
    'monitor',
    'phone',
    'printer',
    'radio',
    'server',
    'smartphone',
    'speaker',
    'tablet',
    'tv',
    'video',
    'watch'
  ],
  Social: [
    'chrome',
    'codepen',
    'facebook',
    'github',
    'gitlab',
    'instagram',
    'linkedin',
    'pocket',
    'slack',
    'twitter',
    'youtube'
  ],
  Weather: [
    'cloud-drizzle',
    'cloud-lightning',
    'cloud-off',
    'cloud-rain',
    'cloud-snow',
    'cloud',
    'droplet',
    'sun',
    'sunrise',
    'sunset',
    'wind'
  ]
}

const element = query('#group .example')

SvgPicker.of(element, {
  source(resolve) {
    const source = []
    Object.keys(icons).forEach(category => {
      const group = {
        name: category,
        children: []
      }
      icons[category].forEach(icon => {
        const ficon = feather.icons[icon]
        group.children.push({
          name: ficon.name,
          category,
          tags: ficon.tags,
          svg: ficon.toSvg()
        })
      })
      source.push(group)
    })

    console.info(source)
    resolve(source)
  }
})
