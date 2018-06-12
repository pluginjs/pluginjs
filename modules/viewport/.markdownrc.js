const usage = '```Javascript\nnew Viewport(el, options)\n```'
const body = `## Usage

${usage}

## API

- on
- off
- eventMapper
- isVisible`

export default {
  meta: {
    moduleName: 'viewport',
    namespace: 'viewport',
    Namespace: 'Viewport',
    desc: '`viewport` is a utility JavaScript library to control viewport.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}