export function processor(target, key, descriptor) {
  target._processor = descriptor.value
}

export function action(target, key, descriptor) {
  const { configurable, enumerable, writable } = descriptor
  return {
    configurable,
    enumerable,
    writable,
    value(...args) {
      const action = descriptor.value.apply(this, args)
      const nextState = this._processor(action)
      return nextState
    }
  }
}
