const body = `## API

- emit
- on
- once
- off
- addListener
- addOneTimeListener
- removeListener
- removeAllListeners
- ensureListener
- hasListeners
- getListeners
- getSortedListeners
- clearSortedListeners`

export default {
  meta: {
    moduleName: 'emitter',
    namespace: 'emitter',
    Namespace: 'Emitter',
    desc: '`emitter` is a utility JavaScript library for event emitter.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}