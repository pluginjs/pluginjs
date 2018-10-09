import { parseHTML } from '@pluginjs/dom'

export default value => {
  if (typeof value !== 'undefined') {
    return parseHTML`<input type="text" class="example" value='${value}'>`
  }
  return parseHTML`<input type="text" class="example">`
}
