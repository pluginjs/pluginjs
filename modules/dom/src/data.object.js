import { curry } from '@pluginjs/utils'

export const prop = curry((name, object) => object[name])
