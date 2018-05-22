import { curry } from '@pluginjs/utils'

// fmap :: (a -> b) -> f a -> f b
export const fmap = curry((f, functor) =>
  of(f(functor.value), functor.constructor)
)
export const map = curry((f, functor) => functor.map(f))

// of :: a -> f -> f a
export const of = curry((value, Typeclass) => new Typeclass(value))

// join :: f a -> a
export const join = monoids => monoids.join()

// flatMap :: (a -> b) -> f a -> f b
export const flatMap = curry((f, functor) =>
  of(f(functor.value), functor.constructor)
)

export class Functor {
  constructor(value) {
    this.value = value
  }

  fmap(f) {
    return new Functor(f(this.value))
  }
}

export class Applicative extends Functor {
  pure() {}
}

export class Monoids extends Applicative {
  join() {
    return this.val
  }
}

export class Monad extends Monoids {
  flatMap() {}
}
