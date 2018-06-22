import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <input type="text" class="example-input" value='{"type":"line", "id":"bell"}'>
`
