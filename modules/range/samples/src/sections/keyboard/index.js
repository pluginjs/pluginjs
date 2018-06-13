import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query('.example-keyboard', render(html, query('#keyboard')))

Range.of(element, { keyboard: true })
