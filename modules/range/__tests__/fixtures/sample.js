import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
  <input type="text" class="example-default" data-units='{"px":{"min": 10, "max": 100, "step": 10}}'>
`
