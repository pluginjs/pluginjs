import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#locale .example-locale')
VideoPicker.of(element, { locale: 'zh' })
