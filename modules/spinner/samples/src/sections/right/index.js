import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-layout-right', render(html, query('#right')))

Spinner.of(element, { layout: 'right' })
