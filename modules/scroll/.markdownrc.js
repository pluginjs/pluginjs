const body = `## API

- to
- toX
- toY
- by
- byX
- byY
- intoView
- top`

export default {
  meta: {
    moduleName: 'scroll',
    namespace: 'scroll',
    Namespace: 'Scroll',
    desc: '`scroll` is a utility JavaScript library for scroll interface.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}