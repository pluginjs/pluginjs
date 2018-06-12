import { parseHTML } from '@pluginjs/dom'

export default () => parseHTML`
    <h2>Initialized by input value</h2>
    <input type="text" class="input" value="red" />
`
