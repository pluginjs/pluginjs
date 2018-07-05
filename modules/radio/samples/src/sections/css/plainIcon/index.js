import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
// import Radio from '@pluginjs/radio'

query('input[type="radio"]', render(html, query('#cssPlainIcon')))
