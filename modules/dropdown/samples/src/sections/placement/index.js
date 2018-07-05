import { query } from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'

const body = query('#placement')
const element1 = query('.dropdown-placement-1', body)
const element2 = query('.dropdown-placement-2', body)
const element3 = query('.dropdown-placement-3', body)
const element4 = query('.dropdown-placement-4', body)
const element5 = query('.dropdown-placement-5', body)
const element6 = query('.dropdown-placement-6', body)
const element7 = query('.dropdown-placement-7', body)
const element8 = query('.dropdown-placement-8', body)
const element9 = query('.dropdown-placement-9', body)
const element10 = query('.dropdown-placement-10', body)
const element11 = query('.dropdown-placement-11', body)
const element12 = query('.dropdown-placement-12', body)

Dropdown.of(element1, {})
Dropdown.of(element2, {
  placement: 'bottom'
})
Dropdown.of(element3, {
  placement: 'bottom-end'
})
Dropdown.of(element4, {
  placement: 'top-start'
})
Dropdown.of(element5, {
  placement: 'top'
})
Dropdown.of(element6, {
  placement: 'top-end'
})
Dropdown.of(element7, {
  placement: 'right-start'
})
Dropdown.of(element8, {
  placement: 'right'
})
Dropdown.of(element9, {
  placement: 'right-end'
})
Dropdown.of(element10, {
  placement: 'left-start'
})
Dropdown.of(element11, {
  placement: 'left'
})
Dropdown.of(element12, {
  placement: 'left-end'
})
