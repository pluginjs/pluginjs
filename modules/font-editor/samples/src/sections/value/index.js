import { query } from '@pluginjs/dom'
import FontEditor from '@pluginjs/font-editor'

const element = query('#value .example-value')
FontEditor.of(element)
