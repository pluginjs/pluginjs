import { query } from '@pluginjs/dom'
import LinkPicker from '@pluginjs/link-picker'

const element = query('#default .link-picker-default')

LinkPicker.of(element, {})
