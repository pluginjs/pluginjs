import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#disabled .example-locale')
VideoPicker.of(element, { locale: 'zh', disabled: true })
