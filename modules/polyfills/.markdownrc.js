// const body = `## API

// - register
// - stateable
// - eventable
// - themeable
// - styleable
// - translateable`

import polyfills from './index'

const body = `## API

${Object.keys(polyfills).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'polyfills',
    namespace: 'polyfills',
    Namespace: 'Polyfills',
    desc: '`polyfills` is a utility JavaScript library for pluginjs.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}