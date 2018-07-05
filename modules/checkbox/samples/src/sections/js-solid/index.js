import { queryAll } from '@pluginjs/dom'
import Checkbox from '@pluginjs/checkbox'

queryAll('#js-solid input[type="checkbox"]').forEach(element => {
  Checkbox.of(element, {
    classes: {
      icon: 'icon-check-mini'
    }
  })
})
