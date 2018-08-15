const body = `## API

- request
- exit
- toggle
- isBreakpoints
- enabled
- exit
- element
- isBreakpoints`

export default {
  meta: {
    moduleName: 'breakpoints',
    namespace: 'breakpoints',
    Namespace: 'Breakpoints',
    desc: '`breakpoints` is a utility JavaScript library for breakpoints.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}
