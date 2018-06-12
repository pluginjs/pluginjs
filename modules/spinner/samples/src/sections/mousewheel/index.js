import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-mousewheel', render(html, query('#mousewheel')))

Spinner.of(element, { mousewheel: true })
