import { curry } from '@pluginjs/utils'

export class Model {
  constructor(data) {
    this.__value = data
  }
  // value1 -> func -> func -> value2
  static of(data) {
    return new Model(data)
  }

  isNothing() {
    return !this.__value
  }

  join() {
    return this.isNothing() ? '' : this.__value
  }

  map(f) {
    return Model.of(f(this.__value))
  }

  chain(f) {
    return this.map(f).join()
  }
}

export const map = curry((f, functor) => functor.map(f))

export const chain = curry((f, monad) => monad.chain(f))

export const reduce = curry((f, v) => v.reduce(f))
