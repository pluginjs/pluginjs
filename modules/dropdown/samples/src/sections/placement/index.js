import { queryAll } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

queryAll('#placement .dropdown-example').forEach(el => {
  Dropdown.of(el, {
    placement: el.dataset.placement
  })
})
