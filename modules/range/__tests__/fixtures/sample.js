import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<h2>Default</h2>
<div class="example">
  <input type="text" class="example-default" data-units='{"px":{"min": 10, "max": 100, "step": 10}}'>
</div>
`
