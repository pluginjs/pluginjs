import MediaQuery from './mediaQuery'
import Breakpoints from './main'
import { each } from '@pluginjs/utils'

export default class UnionSize extends MediaQuery {
  constructor(names) {
    const sizes = []
    const media = []

    each(names.split(' '), (i, name) => {
      const size = Breakpoints.get(name)
      if (size) {
        sizes.push(size)
        media.push(size.media)
      }
    })

    super(names, media.join(','))
  }
}
