const body = `## API

- emit
- on
- once
- off
- addListener
- addListenerOnce
- removeListener
- removeAllListeners
- ensureListener
- hasListeners
- getListeners`

export default {
  meta: {
    moduleName: 'simple-emitter',
    namespace: 'simple-emitter',
    Namespace: 'SimpleEmitter',
    desc: '`simple-emitter` is a utility JavaScript library for event emitter.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}
