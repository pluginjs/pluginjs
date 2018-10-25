import { query } from '@pluginjs/dom'
import FontEditor from '@pluginjs/font-editor'

const element = query('#disabled .example-disabled')
FontEditor.of(element, {
  disabled: true
})
