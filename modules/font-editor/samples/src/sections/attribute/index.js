import { query } from '@pluginjs/dom'
import FontEditor from '@pluginjs/font-editor'

const element = query('#attribute .example-attribute')
FontEditor.of(element, {})
