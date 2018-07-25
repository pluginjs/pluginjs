import * as decorator from './src/main'

const body = `## API

${Object.keys(decorator).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'decorator',
    namespace: 'decorator',
    Namespace: 'Decorator',
    desc: '`decorator` is a class decorator library for extend component class.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}
