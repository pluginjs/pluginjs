import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Units from '@pluginjs/units'

const element = query('.example-default', render(html, query('#default')))
Units.of(element, { data: ['px', '%'] })
