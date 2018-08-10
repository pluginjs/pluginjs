import * as styled from './src/main'

const body = `## API

${Object.keys(styled).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'styled',
    namespace: 'styled',
    Namespace: 'Styled',
    desc: '`styled` is a utility JavaScript library for control dom inline-style.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}