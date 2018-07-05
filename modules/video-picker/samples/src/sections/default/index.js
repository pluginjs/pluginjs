import { query } from '@pluginjs/dom'
import VideoPicker from '@pluginjs/video-picker'

const element = query('#default .example-default')
VideoPicker.of(element, {})
