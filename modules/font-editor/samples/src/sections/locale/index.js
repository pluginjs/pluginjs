import { query } from '@pluginjs/dom'
import FontEditor from '@pluginjs/font-editor'

const element = query('#locale .example-locale')
FontEditor.of(element, {
  locale: 'zh'
})
