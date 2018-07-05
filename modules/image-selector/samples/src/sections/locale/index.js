import { query } from '@pluginjs/dom'
import ImageSelector from '@pluginjs/image-selector'

const element = query('#locale .example-locale')
ImageSelector.of(element, {
  locale: 'zh',
  select: 'right',
  data: [
    {
      value: 'without',
      label: 'Without',
      img: '../../plugins/image-selector/images/without.png'
    },
    {
      value: 'left',
      label: 'Left',
      img: '../../plugins/image-selector/images/left.png'
    },
    {
      value: 'double-left',
      label: 'Double Left',
      img: '../../plugins/image-selector/images/double-left.png'
    },
    {
      value: 'right',
      label: 'Right',
      img: '../../plugins/image-selector/images/right.png'
    },
    {
      value: 'double-right',
      label: 'Double Right',
      img: '../../plugins/image-selector/images/double-right.png'
    },
    {
      value: 'both-sider',
      label: 'Both Sider',
      img: '../../plugins/image-selector/images/both-sider.png'
    }
  ]
})
