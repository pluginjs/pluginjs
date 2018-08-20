import { query } from '@pluginjs/dom'
import Tree from '@pluginjs/tree'

const element = query('#arrows .files')

const data = [
  {
    name: 'Home',
    children: [
      {
        name: 'Work'
      },
      {
        name: 'Pages'
      }
    ]
  },
  {
    name: 'Blog',
    children: [
      {
        name: 'About',
        children: [
          {
            name: 'Grid'
          },
          {
            name: 'Nest'
          },
          {
            name: 'Gallery',
            children: [
              {
                name: 'child.png'
              },
              {
                name: 'child2.jpg'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Contact'
  }
]

Tree.of(element, {
  data,
  multiSelect: false,
  canUnselect: false
})