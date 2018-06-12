const body = `## API

- registerEvent
- handler
- Each
- on
- off
- dispatch
- parseKeys
- processKey
- processModifiers
- distribute
- getKeyName
- getKeyCode
- up
- down`

export default {
  meta: {
    moduleName: 'keyboard',
    namespace: 'keyboard',
    Namespace: 'Keyboard',
    desc: '`keyboard` is a utility JavaScript library for keyboard event.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}