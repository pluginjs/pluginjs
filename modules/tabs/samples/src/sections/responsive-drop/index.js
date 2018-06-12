import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Tabs from '@pluginjs/tabs'

const element = query('.tabs', render(html, query('#responsive-drop')))
Tabs.of(element, {})
