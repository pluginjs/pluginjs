import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query('.example-attribute', render(html, query('#attribute')))

Range.of(element, { isRange: true })
