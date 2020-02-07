import { query } from '@pluginjs/dom'
import FontEditor from '@pluginjs/font-editor'

const element = query('#default .example-default')
FontEditor.of(element)
