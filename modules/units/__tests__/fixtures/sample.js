import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<h2>Default</h2>
<div class="example">
    <input type="text" class="example-default">
</div>
`
