import { query } from '@pluginjs/dom'
import FontEditor from '@pluginjs/font-editor'

const element = query('#default .example-default')
const instance = FontEditor.of(element)
console.log('instance', instance)
