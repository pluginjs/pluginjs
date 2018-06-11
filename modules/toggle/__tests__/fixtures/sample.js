import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
<h2>Default</h2>
<div class="example">
<input class="example-default" type="checkbox" checked="checked">
</div>
`
