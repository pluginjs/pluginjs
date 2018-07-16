import { queryAll } from '@pluginjs/dom'
import Radio from '@pluginjs/radio'

queryAll('#disabled input').forEach(element => {
  Radio.of(element, {
    classes: {
      icon: 'icon-check-mini'
    },
    disabled: true
  })
})
