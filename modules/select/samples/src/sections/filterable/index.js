import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const element = query('.example-filterable', render(html, query('#filterable')))

Select.of(element, { filterable: true })
