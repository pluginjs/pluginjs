import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Units from '@pluginjs/units'

const element = query('.example-disabled', render(html, query('#disabled')))
Units.of(element, { disabled: true, data: ['px'] })
