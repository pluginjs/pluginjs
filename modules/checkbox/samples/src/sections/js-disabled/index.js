import { queryAll } from '@pluginjs/dom'
import Checkbox from '@pluginjs/checkbox'

queryAll('#disabled input[type="checkbox"]').forEach(element => {
  Checkbox.of(element, {
    classes: {
      icon: 'pj-icon pj-icon-check'
    },
    disabled: true
  })
})

// const element = queryAll('#disabled input[type="checkbox"]')
// Checkbox.of(element, {
//   classes: {
//     icon: 'icon-check-mini'
//   },
//   disabled: true
// })
