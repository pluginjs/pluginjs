import { query } from '@pluginjs/dom'
import LinkPicker from '@pluginjs/link-picker'

const element = query('#default .link-picker-default')

LinkPicker.of(element, {
  source: [
    {
      value: 'internal',
      label: 'Internal Link'
    },
    {
      value: 'external',
      label: 'External Link'
    }
  ],
  internalValue: [
    {
      value: 'page',
      label: 'Page',
      children: [
        {
          value: '1',
          label: 'Home'
        },
        {
          value: '2',
          label: 'Blog'
        },
        {
          value: '3',
          label: 'About Us'
        },
        {
          value: '4',
          label: 'Contact Us'
        }
      ]
    },
    {
      value: 'post',
      label: 'Post',
      children: [
        {
          value: '5',
          label: 'Hello World'
        },
        {
          value: '6',
          label: 'This is Blog Post'
        }
      ]
    }
  ],
  targetValue: [
    {
      value: '_blank',
      label: 'New window'
    },
    {
      value: '_self',
      label: 'Same window'
    },
    {
      value: '_parent',
      label: 'Parent window'
    },
    {
      value: '_top',
      label: 'Top window'
    }
  ]
})
