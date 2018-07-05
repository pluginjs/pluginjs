import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#initialized .example-input')
VideoPicker.of(element, {})
