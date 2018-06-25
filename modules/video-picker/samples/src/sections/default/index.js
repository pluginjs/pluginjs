import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import VideoPicker from '@pluginjs/video-picker'

const element = query('.example-default', render(html, query('#default')))
VideoPicker.of(element, {})
