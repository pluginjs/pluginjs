import * as utils from './src/main'

const body = `## API

${Object.keys(utils).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'utils',
    namespace: 'utils',
    Namespace: 'Utils',
    desc: '`utils` is a utility JavaScript library.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}