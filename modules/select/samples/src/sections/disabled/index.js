import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const element = query('.example-disabled', render(html, query('#disabled')))

Select.of(element, {})
