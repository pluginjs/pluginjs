import { query } from '@pluginjs/dom'
import Tree from '@pluginjs/tree'

const element = query('#default .example')

const data = [
  {
    name: 'Home'
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
            name: 'Gallery'
          }
        ]
      },
      {
        name: 'list'
      }
    ]
  },
  {
    name: 'Work',
    children: [
      {
        name: 'list'
      },
      {
        name: 'list2'
      }
    ]
  },
  {
    name: 'WorkPages',
    children: [
      {
        name: 'list'
      },
      {
        name: 'list2'
      }
    ]
  },
  {
    name: 'Nested'
  }
]

Tree.of(element, {
  data,
  autoOpen: [2, 1],
  multiSelect: true,
  canUnselect: false
})
