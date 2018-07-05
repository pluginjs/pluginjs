import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const element = query('.example-multiple', render(html, query('#multiple')))

Select.of(element, { multiple: true })
