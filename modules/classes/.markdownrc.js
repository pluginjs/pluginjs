const body = `## API

- addClass
- removeClass
- indexOfClass
- hasClass
- toggleClass`

export default {
  meta: {
    moduleName: 'classes',
    namespace: 'classes',
    Namespace: 'Classes',
    desc: '`classes` is a utility JavaScript library for control class interfaces.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}