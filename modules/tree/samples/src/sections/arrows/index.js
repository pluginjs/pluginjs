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
    name: 'Nested',
    children: [
      {
        name: 'list'
      },
      {
        name: 'list2'
      }
    ]
  }
]

Tree.of(element, {
  data,
  multiSelect: true,
  canUnselect: false
})
