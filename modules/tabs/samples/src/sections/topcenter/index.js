import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Tabs from '@pluginjs/tabs'

const element = query('.tabs', render(html, query('#topcenter')))
Tabs.of(element, {})
