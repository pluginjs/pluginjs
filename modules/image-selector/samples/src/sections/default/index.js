import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ImageSelector from '@pluginjs/image-selector'

const element = query('.example-default', render(html, query('#default')))
ImageSelector.of(element, {
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
