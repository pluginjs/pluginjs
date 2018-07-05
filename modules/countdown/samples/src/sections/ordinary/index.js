import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import CountDown from '@pluginjs/countdown'

const element = query('.countdown', render(html, query('#ordinary')))
CountDown.of(element, {})
