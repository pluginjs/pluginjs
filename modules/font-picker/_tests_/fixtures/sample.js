import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<h2>default</h2>
<div class="example">
  <input type="text" class="font-picker-default"/>
</div>
`
