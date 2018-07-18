import { query } from '@pluginjs/dom'
import Tree from '@pluginjs/tree'

const element = query('#tree .files')

const data = [
  {
    name: 'node',
    children: [
      {
        name: 'child1.png'
      },
      {
        name: 'child2.jpg'
      }
    ]
  },
  {
    name: 'node2',
    children: [
      {
        name: 'node3',
        children: [
          {
            name: 'child3.txt'
          },
          {
            name: 'child4.js'
          },
          {
            name: 'node4',
            children: [
              {
                name: 'child5.png'
              },
              {
                name: 'child6.jpg'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'child5.php'
  }
]

Tree.of(element, {
  data,
  multiSelect: false,
  canUnselect: false
})
