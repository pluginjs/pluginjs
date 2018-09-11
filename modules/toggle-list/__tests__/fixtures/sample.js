import { parseHTML } from '@pluginjs/dom'

export default value => {
  if (typeof value !== 'undefined') {
    return parseHTML`<input class="example-input" type="text" value='${value}'>`
  }
  return parseHTML`<input class="example-input" type="text">`
}
