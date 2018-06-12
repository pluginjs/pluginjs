import easing from './src/main'

const body = `## API

${Object.keys(easing).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'easing',
    namespace: 'easing',
    Namespace: 'Easing',
    desc: '`easing` is a utility JavaScript library for animation effect.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}