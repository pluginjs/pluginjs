const body = `## API

- render
- compile
- parse`

export default {
  meta: {
    moduleName: 'template',
    namespace: 'template',
    Namespace: 'Template',
    desc: '`template` is a utility JavaScript library for html template parse.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}