import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const element = query('.example-defined', render(html, query('#defined')))

Select.of(element, {
  templates: {
    item() {
      return '<li class="{that.classes.ITEM}" data-value="{item.value}">{item.label} <span>test</span></li>'
    }
  }
})
