import * as utils from './src/main'

const body = `## API

${Object.keys(utils).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'dom',
    namespace: 'dom',
    Namespace: 'Dom',
    desc: '`dom` is a utility JavaScript library for control dom interfaces.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}