const body = `## API

- prefixedProperty
- transitionProperty
- transformProperty
- animationProperty
- transitionEndEvent
- animationEndEvent
- transform3D
- transform
- transition
- sticky
- svg
- touch
- pointer
- pointerEvent`

export default {
  meta: {
    moduleName: 'feature',
    namespace: 'feature',
    Namespace: 'Feature',
    desc: '`feature` is a utility JavaScript library for special helper.',
    body
  },
  output: './README.md',
  template: 'README.utils'
}
