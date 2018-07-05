import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#defined .example-defined')

Select.of(element, {
  templates: {
    item() {
      return '<li class="{that.classes.ITEM}" data-value="{item.value}">{item.label} <span>test</span></li>'
    }
  }
})
