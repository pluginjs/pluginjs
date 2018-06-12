const body = `## API

- request
- exit
- toggle
- isFullscreen
- enabled
- exit
- element
- isFullscreen`

export default {
  meta: {
    moduleName: 'fullscreen',
    namespace: 'fullscreen',
    Namespace: 'Fullscreen',
    desc: '`fullscreen` is a utility JavaScript library for fullscreen.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}