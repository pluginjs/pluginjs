import { query } from '@pluginjs/dom'
import TagList from '@pluginjs/tag-list'

const element = query('#locale .example-locale')
const data = ['interface', 'ui-design', 'web-design', 'typography', 'landing']

TagList.of(element, { locale: 'zh', data })
