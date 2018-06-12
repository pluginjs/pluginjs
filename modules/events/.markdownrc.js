import * as events from './src/main'

const body = `## API

${Object.keys(events).map(fnName => `- ${fnName}`).join('\n')}`

export default {
  meta: {
    moduleName: 'events',
    namespace: 'events',
    Namespace: 'Events',
    desc: '`events` is a utility JavaScript library for dom event interface.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}