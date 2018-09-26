import { query } from '@pluginjs/dom'
import Cascader from '@pluginjs/cascader'

const element = query('#clearable .example')

const getChildren = index => {
  return [
    'Foo',
    'Bar',
    'Baz',
    'Qux',
    'Quux',
    'Quuz',
    'Corge',
    'Grault',
    'Garply',
    'Waldo',
    'Fred',
    'Plugh'
  ].map(item => {
    return {
      value: `${item.toLowerCase()}-${index}`,
      label: `${item} ${index}`
    }
  })
}

Cascader.of(element, {
  clearable: true,
  source: [
    {
      value: 1,
      label: 'Group 1',
      children: getChildren(1)
    },
    {
      value: 2,
      label: 'Group 2',
      children: getChildren(2)
    },
    {
      value: 3,
      label: 'Group 3',
      children: getChildren(3)
    },
    {
      value: 4,
      label: 'Group 4',
      children: getChildren(4)
    },
    {
      value: 5,
      label: 'Group 5',
      children: getChildren(5)
    }
  ]
})
