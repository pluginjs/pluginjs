import keyframes from './src/main'

const body = `## API

${Object.keys(keyframes).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'keyframes',
    namespace: 'keyframes',
    Namespace: 'Keyframes',
    desc: '`keyframes` is a utility JavaScript library for animation effect.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}