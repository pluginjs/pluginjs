import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-layout-both', render(html, query('#both')))

Spinner.of(element, { layout: 'both' })
