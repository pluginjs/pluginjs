import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ToggleLIst from '@pluginjs/toggle-list'

const element = query('.example-input', render(html, query('#initvalue')))
ToggleLIst.of(element, {})
