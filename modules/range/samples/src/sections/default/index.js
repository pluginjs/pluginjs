import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Range from '@pluginjs/range'

const element = query('.example-default', render(html, query('#default')))

Range.of(element, {})
