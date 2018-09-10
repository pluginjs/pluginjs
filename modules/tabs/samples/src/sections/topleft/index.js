import { query } from '@pluginjs/dom'
import Tabs from '@pluginjs/tabs'

const element = query('#topleft .example')
Tabs.of(element, {
  navLabelTpl:
    '<a href="javascript:void(0)"><i class=\'tab-icon icon-char icon-chevron-down\'></i>tab133</a>'
})
