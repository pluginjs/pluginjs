const body = `## API

- register
- stateable
- eventable
- themeable
- styleable
- translateable`

export default {
  meta: {
    moduleName: 'pluginjs',
    namespace: 'pluginjs',
    Namespace: 'Pluginjs',
    desc: '`pluginjs` is a utility JavaScript library for pluginjs.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}