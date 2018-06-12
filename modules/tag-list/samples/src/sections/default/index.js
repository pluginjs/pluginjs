import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import TagList from '@pluginjs/tag-list'

const element = query('.example-default', render(html, query('#default')))
const datas = ['hello', 'world']
TagList.of(element, { data: datas })
