import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Units from '@pluginjs/units'

const element = query('.example-input', render(html, query('#initvalue')))
Units.of(element, { data: ['px', '%'] })
