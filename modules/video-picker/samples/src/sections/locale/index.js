import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import VideoPicker from '@pluginjs/video-picker'

const element = query('.example-locale', render(html, query('#locale')))
VideoPicker.of(element, { locale: 'zh' })
