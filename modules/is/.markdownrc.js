import is from './src/main'

const body = `## API

${Object.keys(is).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'is',
    namespace: 'is',
    Namespace: 'Is',
    desc: '`is` is a utility JavaScript library for type check.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}