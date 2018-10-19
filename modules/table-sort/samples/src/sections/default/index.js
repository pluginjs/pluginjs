import { query } from '@pluginjs/dom'
import TableSort from '@pluginjs/table-sort'

const element = query('#default .table-sort')

const instance = TableSort.of(element, {
  onReady() {
    console.log('ready', 'event')
  },
  onDestroy() {
    console.log('destroy', 'event')
  },
  onEnable() {
    console.log('enable', 'event')
  },
  onDisable() {
    console.log('disable', 'event')
  }
})
query('.api-append').addEventListener('click', () =>
  instance.append([
    {
      'some int': 233,
      'some float': 0.233,
      'some string': 'hello-world'
    },
    {
      'some int': 2333,
      'some float': 0.23,
      'some string': 'hello world!'
    }
  ])
)
query('.api-replace').addEventListener('click', () =>
  instance.replace([
    {
      'some int': 233,
      'some float': 0.233,
      'some string': 'hello-world'
    },
    {
      'some int': 2333,
      'some float': 0.23,
      'some string': 'hello world!'
    }
  ])
)
query('.api-sort').addEventListener('click', () =>
  instance.sort({ index: 1, direction: 'asc' })
)
